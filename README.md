# Skill Bridge 🚀

> **"Bridge Your Skills, Build Your Future."**

Skill Bridge is an AI-powered **Career Operating System** developed to address the growing gap between academic education and industry expectations. Many students and fresh graduates face challenges such as unclear career pathways, skill mismatches, lack of personalized guidance, and difficulty demonstrating job readiness. 

Our solution provides intelligent, data-driven career development support by analyzing a user's profile, skills, interests, projects, and GitHub activity through Artificial Intelligence, Natural Language Processing (NLP), and Semantic Matching.

---

## 🔐 Authentication & Security

Skill Bridge features a genuine, corporate-grade authentication gatekeeper.
* **Sign in with Google:** Fully integrated via Google OAuth 2.0 to ensure a friction-free, single-click signup and login experience for verified student profiles.
* **Data Privacy:** Secure session token management ensuring personal skill profiles and learning metrics remain private.

---

## 📱 Core Platform Architecture (Modular Pages)

To keep the user interface clean and intuitive, the application is divided into dedicated functional views:

### 1. Dashboard (`/dashboard`)
The central command hub of the platform provides a high-level executive summary of the user's career state:
* **Employability Readiness Score:** A dynamic, circular visual indicator grading current profile strength out of 100.
* **Profile Completion Tracker:** Displays the percentage of the user's profile filled out.
* **Critical Gaps Identifier:** Instantly highlights missing competencies (e.g., *SQL database querying*, *Machine Learning theory*) using semantic analysis to help users address weak areas.

### 2. AI Career Recommendations (`/recommendations`)
A deep-dive analytical module assessing industry alignments:
* **Match Percentage Engine:** Displays how closely a user aligns with roles (e.g., *90% Match for Data Analyst*, *65% Match for Junior Data Scientist*).
* **Role Analytics:** Generates automated explanations detailing why the user fits a path and what they need to achieve the next tier.

### 3. Smart Study Planner (`/study-planner`)
A chronological, adaptive learning assistant:
* **Weekly Schedules:** Spits out a custom, time-blocked schedule focusing purely on bridging the "Critical Gaps" flagged by the dashboard.
* **Actionable Learning Tasks:** Replaces generic advice with specific milestones and structured building blocks.

### 4. Skill Roadmap (`/skill-roadmap`)
A visual, multi-level learning progression timeline:
* **Milestone Levels:** Maps out progression tracks through sequential tiers (L1: Specialist ➡️ L2: Associate ➡️ L3: Professional).
* **Curated Resource Integration:** Every technical milestone automatically fetches verified external learning links:
  * 🌐 **Recommended Courses:** Contextual direct matching to top industry tracks on Coursera, Udemy, and edX.
  * 📺 **Top YouTube References:** Deep-dive video tutorials from trusted creators.
  * 📚 **Practical Assignments:** Hands-on project scopes or official documentation references.

---

## 🛠️ Technology Stack

* **Frontend:** Modern User Interface (Dashboard component layout layout configured for high scannability).
* **AI Engine:** Google AI Studio (Gemini 1.5 Pro) with strict routing and semantic mapping rules.
* **Authentication:** Google Sign-In (OAuth 2.0).
* **Integrations:** GitHub API for project-based validation and repository analysis.

---

## 🎨 Branding Notice

Skill Bridge utilizes its own unique, custom proprietary logo and fixed visual identity. The system prompt bypasses generic placeholder asset generation to respect the established product design system.

---

## 🚀 Getting Started

1. **Clone the repository:**
```bash
   git clone [https://github.com/Avinashpandey09/skill-bridge.git](https://github.com/Avinashpandey09/skill-bridge.git)
   cd skill-bridge

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
