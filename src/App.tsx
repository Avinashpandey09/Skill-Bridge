/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Login } from './components/Login';
import { Welcome } from './components/Welcome';
import { Questionnaire } from './components/Questionnaire';
import { Dashboard } from './components/Dashboard';
import { UserProfile, AIRecommendationResult } from './types';

export default function App() {
  const [step, setStep] = useState<'login' | 'welcome' | 'questionnaire' | 'analyzing' | 'dashboard'>('login');
  const [result, setResult] = useState<AIRecommendationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    setStep('welcome');
  };

  const handleStart = () => {
    setStep('questionnaire');
  };

  const handleSubmit = async (profile: UserProfile) => {
    setStep('analyzing');
    setError(null);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch analysis.');
      }

      const data: AIRecommendationResult = await response.json();
      setResult(data);
      setStep('dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setStep('questionnaire');
    }
  };

  const handleReset = () => {
    setResult(null);
    setStep('login');
  };

  return (
    <div className="h-screen w-full bg-slate-50 text-slate-900 font-sans font-medium selection:bg-blue-200 flex flex-col overflow-hidden">
        {step === 'login' && (
          <main className="max-w-6xl mx-auto w-full flex-1 flex flex-col px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
            <Login onLogin={handleLogin} />
          </main>
        )}
        {step === 'welcome' && (
          <main className="max-w-6xl mx-auto w-full flex-1 flex flex-col px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
            <Welcome onStart={handleStart} />
          </main>
        )}
        {step === 'questionnaire' && (
          <main className="max-w-6xl mx-auto w-full flex-1 flex flex-col px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
            <Questionnaire onSubmit={handleSubmit} error={error} />
          </main>
        )}
        {step === 'analyzing' && (
          <main className="max-w-6xl mx-auto w-full flex-1 flex flex-col px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Analyzing Your Profile</h2>
                <p className="text-slate-500">Bridging your skills with industry expectations...</p>
              </div>
            </div>
          </main>
        )}
        {step === 'dashboard' && result && <Dashboard result={result} onReset={handleReset} />}
    </div>
  );
}
