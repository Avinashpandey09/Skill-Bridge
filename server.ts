import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type, Schema } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Analysis Route
  app.post('/api/analyze', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is missing.' });
      }

      const { targetCareer, currentRole, skills, experience, portfolio } = req.body;
      if (!targetCareer || !currentRole || !skills || !experience) {
        return res.status(400).json({ error: 'Missing required profile fields.' });
      }

      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
You are the core AI Engine of "Skill Bridge", an AI-powered Career Operating System designed to bridge the gap between academic education and industry expectations. 
Analyze the following user profile and return a personalized career recommendation, structured study plan, skill roadmap, and employability readiness score.

USER PROFILE:
- Target Career/Interests: ${targetCareer}
- Current Role/Major: ${currentRole}
- Current Skills: ${skills}
- Projects/Experience: ${experience}
- Portfolio/GitHub: ${portfolio || 'Not provided'}

Provide your response EXACTLY matching the JSON schema. Use specific, industry-standard terminology. No vague advice. Be professional, actionable, structured, and encouraging.
`;

      const responseSchema: Schema = {
        type: Type.OBJECT,
        properties: {
          industryRoles: {
            type: Type.ARRAY,
            description: "Identify highly suitable industry roles for the user.",
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                matchPercentage: { type: Type.INTEGER },
                whyItFits: { type: Type.STRING }
              },
              required: ["title", "description", "matchPercentage", "whyItFits"]
            }
          },
          studyPlan: {
            type: Type.ARRAY,
            description: "Highly specific, chronological learning schedules.",
            items: {
              type: Type.OBJECT,
              properties: {
                week: { type: Type.STRING, description: "e.g. 'Weeks 1-2'" },
                focusArea: { type: Type.STRING },
                tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["week", "focusArea", "tasks"]
            }
          },
          roadmap: {
            type: Type.ARRAY,
            description: "Skill Roadmap Generator: Break down technical and soft skill milestones visually.",
            items: {
              type: Type.OBJECT,
              properties: {
                milestone: { type: Type.STRING },
                timeline: { type: Type.STRING },
                technicalSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                softSkills: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["milestone", "timeline", "technicalSkills", "softSkills"]
            }
          },
          employability: {
            type: Type.OBJECT,
            description: "Employability Readiness Scoring indicating their current profile strength based on skills, projects, GitHub presence out of 100.",
            properties: {
              score: { type: Type.INTEGER, description: "Score out of 100" },
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              missingCompetencies: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Critical missing competencies" },
              notes: { type: Type.STRING }
            },
            required: ["score", "strengths", "missingCompetencies", "notes"]
          }
        },
        required: ["industryRoles", "studyPlan", "roadmap", "employability"]
      };

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema,
          temperature: 0.2, // Low temp for more structured, factual outputs
        }
      });

      const textOutput = response.text;
      if (!textOutput) {
        throw new Error('AI returned an empty response.');
      }
      
      const parsedData = JSON.parse(textOutput);
      res.json(parsedData);
      
    } catch (error: any) {
      console.error('Error generating analysis:', error);
      res.status(500).json({ error: error.message || 'An error occurred during analysis.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
