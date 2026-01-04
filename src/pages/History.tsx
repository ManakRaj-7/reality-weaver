import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock, Trash2, Eye, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import CosmicBackground from '@/components/CosmicBackground';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import TimelineDisplay from '@/components/TimelineDisplay';
import type { AlternateReality } from '@/lib/generateReality';

interface SavedReality extends AlternateReality {
  id: string;
  created_at: string;
}

const History = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [realities, setRealities] = useState<SavedReality[]>([]);
  const [loadingRealities, setLoadingRealities] = useState(true);
  const [selectedReality, setSelectedReality] = useState<SavedReality | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchRealities();
    }
  }, [user]);

  const fetchRealities = async () => {
    const { data, error } = await supabase
      .from('realities')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load your realities');
      console.error(error);
    } else {
      const mapped = (data || []).map((r) => ({
        id: r.id,
        created_at: r.created_at,
        scenario: r.scenario,
        headline: r.headline,
        summary: r.summary,
        timeline: r.timeline as unknown as AlternateReality['timeline'],
        consequences: r.consequences as unknown as AlternateReality['consequences'],
      }));
      setRealities(mapped);
    }
    setLoadingRealities(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('realities').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete reality');
    } else {
      toast.success('Reality deleted');
      setRealities((prev) => prev.filter((r) => r.id !== id));
      if (selectedReality?.id === id) {
        setSelectedReality(null);
      }
    }
  };

  if (loading || loadingRealities) {
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

  if (selectedReality) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <CosmicBackground />
        <Header />
        <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 md:pt-28 md:pb-24">
          <TimelineDisplay
            reality={selectedReality}
            onReset={() => setSelectedReality(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      <Header />

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 md:pt-28 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold font-display text-gradient-primary mb-4">
              Your Explored Realities
            </h1>
            <p className="text-muted-foreground">
              {realities.length} alternate timeline{realities.length !== 1 ? 's' : ''} discovered
            </p>
          </div>

          {realities.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-6">No realities explored yet</p>
              <Button variant="hero" onClick={() => navigate('/')}>
                Start Exploring
              </Button>
            </motion.div>
          ) : (
            <div className="grid gap-4">
              {realities.map((reality, index) => (
                <motion.div
                  key={reality.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-cosmic rounded-xl p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-foreground mb-1 truncate">
                        {reality.scenario}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        "{reality.headline}"
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(reality.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedReality(reality)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(reality.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default History;
