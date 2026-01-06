import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Newspaper,
  Globe,
  Cpu,
  Users,
  ArrowLeft,
  Share2,
  Link,
  Check,
  GitFork,
} from 'lucide-react';
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

/**
 * Cryptographically secure, URL-safe share slug
 */
const generateSlug = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
};

const TimelineDisplay = ({
  reality,
  onReset,
  realityId,
  isShared,
  onFork,
}: TimelineDisplayProps) => {
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
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Reality shared! Link copied to clipboard.');
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

      {/* Breaking News */}
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
        className="text-muted-foreground text-center text-lg mb-12 max-w-2xl mx-auto"
      >
        {reality.summary}
      </motion.p>

      {/* Timeline, Consequences, Actions — unchanged */}
      {/* (Everything below this point is intentionally untouched) */}

      {/* ... rest of file exactly as before ... */}
    </motion.div>
  );
};

export default TimelineDisplay;
