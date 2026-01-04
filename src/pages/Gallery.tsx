import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Globe, Eye, Clock, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import CosmicBackground from '@/components/CosmicBackground';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import type { AlternateReality } from '@/lib/generateReality';

interface PublicReality extends AlternateReality {
  id: string;
  share_slug: string;
  created_at: string;
}

const Gallery = () => {
  const navigate = useNavigate();
  const [realities, setRealities] = useState<PublicReality[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicRealities = async () => {
      const { data, error } = await supabase
        .from('realities')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching public realities:', error);
      } else {
        const mapped = (data || []).map((r) => ({
          id: r.id,
          share_slug: r.share_slug || '',
          created_at: r.created_at,
          scenario: r.scenario,
          headline: r.headline,
          summary: r.summary,
          timeline: r.timeline as unknown as AlternateReality['timeline'],
          consequences: r.consequences as unknown as AlternateReality['consequences'],
        }));
        setRealities(mapped);
      }
      setLoading(false);
    };

    fetchPublicRealities();
  }, []);

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

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      <Header />

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 md:pt-28 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Community Gallery</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-gradient-primary mb-4">
              Explore the Multiverse
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover alternate realities created by the community. Each timeline represents a unique "What if?" scenario.
            </p>
          </div>

          {realities.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-6">No public realities yet. Be the first to share!</p>
              <Button variant="hero" onClick={() => navigate('/')}>
                Create & Share a Reality
              </Button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {realities.map((reality, index) => (
                <motion.div
                  key={reality.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card-cosmic rounded-xl p-5 cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => navigate(`/reality/${reality.share_slug}`)}
                >
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {reality.scenario}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    "{reality.headline}"
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(reality.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      View Timeline
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

export default Gallery;
