import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import CosmicBackground from '@/components/CosmicBackground';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ScenarioInput from '@/components/ScenarioInput';
import TimelineDisplay from '@/components/TimelineDisplay';
import { generateReality, type AlternateReality } from '@/lib/generateReality';

const Index = () => {
  const { user } = useAuth();
  const [reality, setReality] = useState<AlternateReality | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [remainingTries, setRemainingTries] = useState(3);

  const handleGenerate = async (scenario: string) => {
    // Guest users have limited tries
    if (!user && remainingTries <= 0) {
      toast.error('No explorations remaining. Create an account to continue!');
      return;
    }
    
    setIsLoading(true);
    try {
      const generatedReality = await generateReality(scenario);
      setReality(generatedReality);
      
      // Decrement tries for guests only
      if (!user) {
        setRemainingTries(prev => prev - 1);
      }

      // Save to database for logged-in users
      if (user) {
        const { error } = await supabase.from('realities').insert([{
          user_id: user.id,
          scenario: generatedReality.scenario,
          headline: generatedReality.headline,
          summary: generatedReality.summary,
          timeline: JSON.parse(JSON.stringify(generatedReality.timeline)),
          consequences: JSON.parse(JSON.stringify(generatedReality.consequences)),
        }]);

        if (error) {
          console.error('Failed to save reality:', error);
          toast.error('Reality generated but failed to save');
        } else {
          toast.success('Reality generated and saved!');
        }
      } else {
        toast.success('Reality generated successfully!');
      }
    } catch (error: unknown) {
      console.error('Failed to generate reality:', error);
      const message = error instanceof Error ? error.message : 'Failed to generate reality';
      toast.error(message);
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
      <Header />
      
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 md:pt-28 md:pb-24">
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
          {user ? (
            <>Explore unlimited realities and view your history anytime</>
          ) : remainingTries > 0 ? (
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
