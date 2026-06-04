import { motion } from 'motion/react';
import { useState } from 'react';
import { AIRecommendationResult } from '../types';

interface DashboardProps {
  result: AIRecommendationResult;
  onReset: () => void;
}

export function Dashboard({ result, onReset }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-full w-full bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto">
        <div className="p-6 border-b border-slate-100 items-center justify-center">
          <img src="/logo.png" alt="Skill Bridge Logo" className="w-10 h-auto mb-3 object-contain cursor-pointer fallback-text" onClick={onReset} onError={(e) => {
              e.currentTarget.style.display = 'none';
              const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextSibling) nextSibling.style.display = 'flex';
          }} />
          <div className="hidden h-10 w-10 bg-blue-600 rounded-lg items-center justify-center text-white font-bold text-xl mb-3 cursor-pointer" onClick={onReset}>
            SB
          </div>
          <h1 className="text-lg font-bold tracking-tight text-slate-800">Skill Bridge</h1>
          <p className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">Career Operating System</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <div onClick={() => setActiveTab('dashboard')} className={`px-4 py-3 rounded-lg font-medium flex items-center gap-3 cursor-pointer transition-colors ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}>
            <span className={`w-2 h-2 rounded-full ${activeTab === 'dashboard' ? 'bg-blue-600' : 'bg-slate-300'}`}></span> Dashboard
          </div>
          <div onClick={() => setActiveTab('recommendations')} className={`px-4 py-3 rounded-lg font-medium flex items-center gap-3 cursor-pointer transition-colors ${activeTab === 'recommendations' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}>
            <span className={`w-2 h-2 rounded-full ${activeTab === 'recommendations' ? 'bg-blue-600' : 'bg-slate-300'}`}></span> Recommendations
          </div>
          <div onClick={() => setActiveTab('study-planner')} className={`px-4 py-3 rounded-lg font-medium flex items-center gap-3 cursor-pointer transition-colors ${activeTab === 'study-planner' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}>
            <span className={`w-2 h-2 rounded-full ${activeTab === 'study-planner' ? 'bg-blue-600' : 'bg-slate-300'}`}></span> Study Planner
          </div>
          <div onClick={() => setActiveTab('skill-roadmap')} className={`px-4 py-3 rounded-lg font-medium flex items-center gap-3 cursor-pointer transition-colors ${activeTab === 'skill-roadmap' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}>
            <span className={`w-2 h-2 rounded-full ${activeTab === 'skill-roadmap' ? 'bg-blue-600' : 'bg-slate-300'}`}></span> Skill Roadmap
          </div>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-900 rounded-xl p-4 text-white">
            <p className="text-xs opacity-70 mb-1">Pro Account</p>
            <p className="text-sm font-semibold">Enterprise Access</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header Bar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Bridge Your Skills, Build Your Future.</h2>
            <p className="text-sm text-slate-400">Your profile is {result.employability.score}% complete.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800">User</p>
              <p className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">Growth Track</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center font-bold text-slate-500 text-sm">
              U
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <section className="p-6 h-full overflow-y-auto w-full">
          {activeTab === 'dashboard' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto"
            >
              <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col items-center justify-center shadow-sm">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8 w-full text-left">Employability Readiness</h3>
                <div className="relative w-56 h-56 flex items-center justify-center mb-8">
                  <svg className="w-full h-full transform -rotate-90 text-slate-100">
                    <circle cx="112" cy="112" r="90" stroke="currentColor" strokeWidth="16" fill="transparent" />
                  </svg>
                  <svg className="w-full h-full transform -rotate-90 text-blue-600 absolute top-0 left-0">
                    <circle cx="112" cy="112" r="90" stroke="currentColor" strokeWidth="16" strokeLinecap="round" fill="transparent" strokeDasharray="565" strokeDashoffset={565 - (565 * result.employability.score) / 100} className="transition-all duration-1000 ease-out" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-6xl font-black text-slate-800">{result.employability.score}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase mt-1">Score</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 font-medium text-center leading-relaxed">
                  {result.employability.notes || 'Keep working on your missing competencies to boost your industry readiness.'}
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Critical Gaps</h3>
                  <ul className="space-y-3">
                    {result.employability.missingCompetencies.map((gap, idx) => (
                      <li key={idx} className="text-sm bg-red-50 text-red-600 px-5 py-4 rounded-xl border border-red-100 flex justify-between font-semibold">
                        <span>{gap}</span>
                      </li>
                    ))}
                    {result.employability.missingCompetencies.length === 0 && (
                      <li className="text-sm bg-emerald-50 text-emerald-600 px-5 py-4 rounded-xl border border-emerald-100 font-semibold">
                        No critical gaps. Great job!
                      </li>
                    )}
                  </ul>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm h-full">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Your Strengths</h3>
                  <ul className="space-y-3">
                    {result.employability.strengths.map((strength, idx) => (
                      <li key={idx} className="text-sm bg-emerald-50 text-emerald-700 px-5 py-4 rounded-xl border border-emerald-100 flex items-center gap-3 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                        <span className="leading-snug">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'recommendations' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-5xl mx-auto space-y-6"
            >
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">AI Career Recommendations</h3>
                  <span className="text-[10px] bg-blue-600 text-white px-3 py-1.5 rounded text-center tracking-widest font-black uppercase shadow-sm">AI Analyzed</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {result.industryRoles.map((role, idx) => (
                    <div key={idx} className="p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-default flex flex-col group">
                      <div className="flex justify-between items-center mb-6">
                        <span className={`px-3 py-1 rounded bg-white border font-black uppercase tracking-wider text-sm ${idx === 0 ? 'text-blue-600 border-blue-200' : (idx === 1 ? 'text-emerald-600 border-emerald-200' : 'text-slate-600 border-slate-200')}`}>
                          {role.matchPercentage}% Match
                        </span>
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Role Option {idx + 1}</span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors">{role.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6 flex-1">{role.description}</p>
                      <div className="bg-white p-5 rounded-xl border border-slate-200">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Why it fits you</p>
                        <p className="text-sm text-slate-700 font-medium italic leading-relaxed">{role.whyItFits}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'study-planner' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-5xl mx-auto space-y-6"
            >
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Smart Study Planner</h3>
                <div className="space-y-8">
                  {result.studyPlan.map((plan, idx) => (
                    <div key={idx} className={`border-l-4 ${idx === 0 ? 'border-blue-600' : 'border-slate-300'} pl-6 py-2`}>
                      <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${idx === 0 ? 'text-blue-600' : 'text-slate-500'}`}>
                        {plan.week}
                      </p>
                      <h5 className="text-xl font-bold text-slate-800 mb-5">{plan.focusArea}</h5>
                      <ul className="space-y-4">
                        {plan.tasks.map((task, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-4 text-sm text-slate-700 font-semibold bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <span className="w-6 h-6 rounded bg-white flex items-center justify-center text-xs text-slate-300 shrink-0 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 transition-colors cursor-pointer shadow-sm">&#10003;</span>
                            <span className="leading-relaxed mt-0.5">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'skill-roadmap' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-5xl mx-auto space-y-6"
            >
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-10 text-center">Visual Skill Roadmap</h3>
                
                <div className="space-y-12 relative before:absolute before:inset-0 before:ml-[3.25rem] md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[3px] before:bg-slate-100">
                  {result.roadmap.map((milestone, idx) => {
                    return (
                      <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        {/* Icon */}
                        <div className="flex items-center justify-center w-14 h-14 rounded-full border-[6px] border-white bg-blue-100 text-blue-600 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-black tracking-tighter text-sm ml-6 md:ml-0">
                          L{idx + 1}
                        </div>
                        
                        {/* Content */}
                        <div className="w-[calc(100%-6rem)] md:w-[calc(50%-4rem)] bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors shadow-sm ml-4 md:ml-0">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                            <h4 className="font-bold text-slate-800 text-lg md:text-xl">{milestone.milestone}</h4>
                            <span className="text-[10px] w-fit font-black text-slate-500 uppercase tracking-widest bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm">{milestone.timeline}</span>
                          </div>
                          <div className="mt-5">
                            <p className="text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest">Technical Skills</p>
                            <div className="flex flex-wrap gap-2">
                              {milestone.technicalSkills.map((skill, sIdx) => (
                                <span key={sIdx} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-sm">{skill}</span>
                              ))}
                            </div>
                          </div>
                          {milestone.softSkills && milestone.softSkills.length > 0 && (
                            <div className="mt-5 pt-5 border-t border-slate-200">
                              <p className="text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest">Soft Skills</p>
                              <div className="flex flex-wrap gap-2">
                                {milestone.softSkills.map((skill, sIdx) => (
                                  <span key={sIdx} className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600">{skill}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </section>
      </main>
    </div>
  );
}
