import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, ArrowRight, Infinity as InfinityIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/hooks/useAuth';

interface ScenarioInputProps {
  onGenerate: (scenario: string) => void;
  isLoading: boolean;
  remainingTries: number;
}

const presetScenarios = [
  "What if the Internet was never invented?",
  "What if dinosaurs never went extinct?",
  "What if humans could photosynthesize?",
  "What if gravity was twice as strong?",
];

const ScenarioInput = ({ onGenerate, isLoading, remainingTries }: ScenarioInputProps) => {
  const [customScenario, setCustomScenario] = useState('');
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customScenario.trim()) {
      onGenerate(customScenario);
    }
  };

  const isDisabled = isLoading || (!user && remainingTries === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Mode indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-center gap-2 mb-6"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border">
          {user ? (
            <>
              <InfinityIcon className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                <span className="text-primary font-semibold">Unlimited</span> explorations
              </span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm text-muted-foreground">
                Guest Mode: <span className="text-secondary font-semibold">{remainingTries}</span> explorations remaining
              </span>
            </>
          )}
        </div>
      </motion.div>

      {/* Main input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="card-cosmic rounded-2xl p-1">
          <div className="flex items-center gap-3 p-4">
            <Zap className="w-5 h-5 text-primary flex-shrink-0" />
            <input
              type="text"
              value={customScenario}
              onChange={(e) => setCustomScenario(e.target.value)}
              placeholder="What if..."
              className="flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground font-display"
              disabled={isDisabled}
            />
            <Button
              type="submit"
              variant="hero"
              size="lg"
              disabled={!customScenario.trim() || isDisabled}
              className="flex-shrink-0"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              ) : (
                <>
                  Explore Reality
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* Preset scenarios */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <p className="text-center text-sm text-muted-foreground mb-4">Or try one of these realities:</p>
        <div className="flex flex-wrap justify-center gap-3">
          {presetScenarios.map((scenario, index) => (
            <motion.button
              key={scenario}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              onClick={() => onGenerate(scenario)}
              disabled={isDisabled}
              className="px-4 py-2 rounded-full text-sm border border-border bg-card/30 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {scenario}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScenarioInput;
