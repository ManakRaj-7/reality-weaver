import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Newspaper, Globe, Cpu, Users, ArrowLeft, Share2, Link, Check, GitFork } from 'lucide-react';
import { Button } from './ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import type { AlternateReality } from '@/lib/generateReality';

interface TimelineDisplayProps {
  reality: AlternateReality;
  onReset: () => void;
  realityId?: string;
  isShared?: boolean;
  onFork?: (scenario: string) => void;
}

const iconMap = {
  calendar: Calendar,
  globe: Globe,
  cpu: Cpu,
  users: Users,
};

const generateSlug = () => {
  return Math.random().toString(36).substring(2, 10);
};

const TimelineDisplay = ({ reality, onReset, realityId, isShared, onFork }: TimelineDisplayProps) => {
  const { user } = useAuth();
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (!user || !realityId) {
      toast.error('Please log in to share realities');
      return;
    }

    setIsSharing(true);
    try {
      const slug = generateSlug();
      const { error } = await supabase
        .from('realities')
        .update({ is_public: true, share_slug: slug })
        .eq('id', realityId);

      if (error) {
        throw error;
      }

      const url = `${window.location.origin}/reality/${slug}`;
      setShareUrl(url);
      toast.success('Reality shared! Link copied to clipboard.');
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error sharing reality:', error);
      toast.error('Failed to share reality');
    } finally {
      setIsSharing(false);
    }
  };

  const copyToClipboard = async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFork = (eventIndex: number) => {
    const event = reality.timeline[eventIndex];
    const forkScenario = `What if, in a world where "${reality.scenario}", the event "${event.title}" in ${event.year} had gone differently?`;
    onFork?.(forkScenario);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-10"
      >
        <p className="text-primary text-sm font-medium tracking-wider uppercase mb-3">
          {isShared ? 'Shared Alternate Reality' : 'Alternate Reality Generated'}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold font-display text-gradient-primary mb-4">
          {reality.scenario}
        </h2>
      </motion.div>

      {/* Breaking News Headline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="card-cosmic rounded-2xl p-6 mb-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 timeline-glow opacity-30" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Newspaper className="w-5 h-5 text-secondary" />
            <span className="text-secondary text-sm font-semibold uppercase tracking-wider">
              Breaking News From This Reality
            </span>
          </div>
          <p className="text-xl md:text-2xl font-display text-foreground leading-relaxed">
            "{reality.headline}"
          </p>
        </div>
      </motion.div>

      {/* Summary */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-muted-foreground text-center text-lg mb-12 max-w-2xl mx-auto leading-relaxed"
      >
        {reality.summary}
      </motion.p>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative mb-12"
      >
        <h3 className="text-xl font-display font-semibold text-foreground mb-8 text-center">
          Timeline of Events
        </h3>
        
        {/* Timeline line */}
        <div className="absolute left-1/2 top-16 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent hidden md:block" />
        
        <div className="space-y-6">
          {reality.timeline.map((event, index) => {
            const Icon = iconMap[event.icon];
            const isLeft = index % 2 === 0;
            
            return (
              <motion.div
                key={`${event.year}-${index}`}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.15 }}
                className={`flex items-center gap-4 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="card-cosmic rounded-xl p-5 inline-block max-w-md group relative">
                    <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
                      <span className="text-primary font-display font-bold">{event.year}</span>
                    </div>
                    <h4 className="text-foreground font-semibold mb-2">{event.title}</h4>
                    <p className="text-muted-foreground text-sm">{event.description}</p>
                    
                    {/* Fork button */}
                    {onFork && (
                      <button
                        onClick={() => handleFork(index)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent"
                        title="Fork from this event"
                      >
                        <GitFork className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Center icon */}
                <div className="hidden md:flex w-12 h-12 rounded-full bg-muted border border-primary/30 items-center justify-center flex-shrink-0 glow-primary">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                
                <div className="flex-1 hidden md:block" />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Consequences Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="grid md:grid-cols-3 gap-4 mb-12"
      >
        {[
          { title: 'Cultural Impact', content: reality.consequences.cultural, icon: Users },
          { title: 'Technology Shift', content: reality.consequences.technological, icon: Cpu },
          { title: 'Political Changes', content: reality.consequences.political, icon: Globe },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
            className="card-cosmic rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <item.icon className="w-4 h-4 text-accent" />
              <h4 className="text-sm font-semibold text-accent uppercase tracking-wide">{item.title}</h4>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.content}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Share URL display */}
      {shareUrl && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl bg-muted/50 border border-border"
        >
          <div className="flex items-center gap-3">
            <Link className="w-5 h-5 text-primary flex-shrink-0" />
            <code className="flex-1 text-sm text-muted-foreground truncate">{shareUrl}</code>
            <Button variant="ghost" size="sm" onClick={copyToClipboard}>
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
            </Button>
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <Button variant="cosmic" size="lg" onClick={onReset}>
          <ArrowLeft className="w-4 h-4" />
          {isShared ? 'Explore Your Own' : 'Explore Another Reality'}
        </Button>
        {!isShared && user && realityId && (
          <Button variant="outline" size="lg" onClick={handleShare} disabled={isSharing || !!shareUrl}>
            <Share2 className="w-4 h-4" />
            {shareUrl ? 'Shared!' : isSharing ? 'Sharing...' : 'Share This Timeline'}
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TimelineDisplay;
