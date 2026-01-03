import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CosmicBackground from '@/components/CosmicBackground';
import Hero from '@/components/Hero';
import ScenarioInput from '@/components/ScenarioInput';
import TimelineDisplay from '@/components/TimelineDisplay';
import { generateReality } from '@/lib/generateReality';

interface AlternateReality {
  scenario: string;
  headline: string;
  summary: string;
  timeline: Array<{
    year: string;
    title: string;
    description: string;
    icon: 'calendar' | 'globe' | 'cpu' | 'users';
  }>;
  consequences: {
    cultural: string;
    technological: string;
    political: string;
  };
}

const Index = () => {
  const [reality, setReality] = useState<AlternateReality | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [remainingTries, setRemainingTries] = useState(3);

  const handleGenerate = async (scenario: string) => {
    if (remainingTries <= 0) return;
    
    setIsLoading(true);
    try {
      const generatedReality = await generateReality(scenario);
      setReality(generatedReality);
      setRemainingTries(prev => prev - 1);
    } catch (error) {
      console.error('Failed to generate reality:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setReality(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <AnimatePresence mode="wait">
          {!reality ? (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Hero />
              <ScenarioInput
                onGenerate={handleGenerate}
                isLoading={isLoading}
                remainingTries={remainingTries}
              />
            </motion.div>
          ) : (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TimelineDisplay reality={reality} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center">
        <p className="text-muted-foreground text-sm">
          {remainingTries > 0 ? (
            <>Login to save your alternate realities and explore unlimited possibilities</>
          ) : (
            <span className="text-secondary">Create an account to continue exploring infinite realities</span>
          )}
        </p>
      </footer>
    </div>
  );
};

export default Index;
