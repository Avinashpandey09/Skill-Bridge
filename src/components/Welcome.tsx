import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

export function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-12 max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8 flex flex-col items-center"
      >
        {/* Placeholder for the custom uploaded logo */}
        <div className="flex flex-col items-center justify-center gap-4">
          <img src="/logo.png" alt="Skill Bridge Logo" className="w-64 md:w-80 h-auto object-contain fallback-text" onError={(e) => {
            // Fallback just in case the logo isn't at this specific route yet
            e.currentTarget.style.display = 'none';
            const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
            if (nextSibling) nextSibling.style.display = 'flex';
          }} />
          <div className="hidden flex-col items-center justify-center gap-2">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-800">
              Skill<span className="text-blue-600">Bridge</span>
            </h1>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-700">
            Bridge Your Skills, Build Your Future.
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            The AI-powered Career Operating System designed to seamlessly bridge the gap between academic education and industry expectations.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <button
          onClick={onStart}
          className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20"
        >
          Start Assessment
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}
