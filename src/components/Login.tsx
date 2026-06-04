import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login/signup
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-12 max-w-xl mx-auto w-full">
      <motion.div
        key={isSignUp ? 'signup' : 'login'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Skill Bridge Logo" className="w-16 h-auto mx-auto mb-4 object-contain fallback-text" onError={(e) => {
              e.currentTarget.style.display = 'none';
              const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextSibling) nextSibling.style.display = 'flex';
            }} />
            <div className="hidden h-12 w-12 bg-blue-600 rounded-xl items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              SB
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
              {isSignUp ? 'Create an Account' : 'Welcome Back'}
            </h2>
            <p className="text-slate-500">
              {isSignUp ? 'Join Skill Bridge to start your journey.' : 'Log in to your Skill Bridge account.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Alex Chen"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-700">Password</label>
                  {!isSignUp && (
                    <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">Forgot password?</a>
                  )}
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="group w-full inline-flex items-center justify-center gap-2 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
