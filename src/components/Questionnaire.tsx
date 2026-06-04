import { motion } from 'motion/react';
import { useState } from 'react';
import { UserProfile } from '../types';

interface QuestionnaireProps {
  onSubmit: (profile: UserProfile) => void;
  error: string | null;
}

export function Questionnaire({ onSubmit, error }: QuestionnaireProps) {
  const [formData, setFormData] = useState<UserProfile>({
    targetCareer: '',
    currentRole: '',
    skills: '',
    experience: '',
    portfolio: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full"
    >
      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Build Your Profile</h2>
        <p className="text-slate-500 mb-6">Tell us about where you are and where you want to go.</p>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Profile Completion</span>
            <span className="text-xs font-bold text-blue-600">{Math.round((Object.values(formData).filter(val => val.trim().length > 0).length / 5) * 100)}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(Object.values(formData).filter(val => val.trim().length > 0).length / 5) * 100}%` }}
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="targetCareer" className="block text-sm font-semibold text-slate-700 mb-1">Target Career / Dream Job</label>
              <input
                id="targetCareer"
                name="targetCareer"
                required
                placeholder="e.g., Senior Flutter Developer, Data Scientist"
                value={formData.targetCareer}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div>
              <label htmlFor="currentRole" className="block text-sm font-semibold text-slate-700 mb-1">Current Role / Major</label>
              <input
                id="currentRole"
                name="currentRole"
                required
                placeholder="e.g., 3rd Year CS Student, Junior Frontend Dev"
                value={formData.currentRole}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-semibold text-slate-700 mb-1">Current Skills (comma separated)</label>
              <input
                id="skills"
                name="skills"
                required
                placeholder="e.g., Python, React, Basic Git"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-semibold text-slate-700 mb-1">Projects & Experience</label>
              <textarea
                id="experience"
                name="experience"
                required
                rows={3}
                placeholder="List your key academic projects, internships, or relevant coursework..."
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-slate-900 placeholder:text-slate-400 resize-none"
              />
            </div>

            <div>
              <label htmlFor="portfolio" className="block text-sm font-semibold text-slate-700 mb-1">GitHub / Portfolio URL <span className="text-slate-400 font-normal">(Optional)</span></label>
              <input
                id="portfolio"
                name="portfolio"
                placeholder="https://github.com/username"
                value={formData.portfolio}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
          >
            Analyze My Profile
          </button>
        </form>
      </div>
    </motion.div>
  );
}
