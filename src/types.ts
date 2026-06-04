export interface UserProfile {
  targetCareer: string;
  currentRole: string;
  skills: string;
  experience: string;
  portfolio?: string;
}

export interface AIRecommendationResult {
  industryRoles: Array<{
    title: string;
    description: string;
    matchPercentage: number;
    whyItFits: string;
  }>;
  studyPlan: Array<{
    week: string;
    focusArea: string;
    tasks: string[];
  }>;
  roadmap: Array<{
    milestone: string;
    technicalSkills: string[];
    softSkills: string[];
    timeline: string;
  }>;
  employability: {
    score: number;
    strengths: string[];
    missingCompetencies: string[];
    notes: string;
  };
}
