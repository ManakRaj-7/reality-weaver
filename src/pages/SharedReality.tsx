import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import CosmicBackground from '@/components/CosmicBackground';
import Header from '@/components/Header';
import TimelineDisplay from '@/components/TimelineDisplay';
import { Button } from '@/components/ui/button';
import type { AlternateReality } from '@/lib/generateReality';

const SharedReality = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [reality, setReality] = useState<AlternateReality | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReality = async () => {
      if (!slug) {
        setError('Invalid share link');
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('realities')
        .select('*')
        .eq('share_slug', slug)
        .eq('is_public', true)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching reality:', fetchError);
        setError('Failed to load reality');
      } else if (!data) {
        setError('Reality not found or is private');
      } else {
        setReality({
          scenario: data.scenario,
          headline: data.headline,
          summary: data.summary,
          timeline: data.timeline as unknown as AlternateReality['timeline'],
          consequences: data.consequences as unknown as AlternateReality['consequences'],
        });
      }
      setLoading(false);
    };

    fetchReality();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        <CosmicBackground />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles className="w-8 h-8 text-primary" />
        </motion.div>
      </div>
    );
  }

  if (error || !reality) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <CosmicBackground />
        <Header />
        <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 flex flex-col items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold font-display text-foreground mb-4">
              Reality Not Found
            </h1>
            <p className="text-muted-foreground mb-6">{error || 'This reality does not exist'}</p>
            <Button variant="hero" onClick={() => navigate('/')}>
              Explore Your Own Reality
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      <Header />
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 md:pt-28 md:pb-24">
        <TimelineDisplay reality={reality} onReset={() => navigate('/')} isShared={true} />
      </div>
    </div>
  );
};

export default SharedReality;
