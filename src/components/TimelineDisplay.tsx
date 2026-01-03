import { motion } from 'framer-motion';
import { Calendar, Newspaper, Globe, Cpu, Users, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from './ui/button';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: 'calendar' | 'globe' | 'cpu' | 'users';
}

interface AlternateReality {
  scenario: string;
  headline: string;
  summary: string;
  timeline: TimelineEvent[];
  consequences: {
    cultural: string;
    technological: string;
    political: string;
  };
}

interface TimelineDisplayProps {
  reality: AlternateReality;
  onReset: () => void;
}

const iconMap = {
  calendar: Calendar,
  globe: Globe,
  cpu: Cpu,
  users: Users,
};

const TimelineDisplay = ({ reality, onReset }: TimelineDisplayProps) => {
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
          Alternate Reality Generated
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
                key={event.year}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.15 }}
                className={`flex items-center gap-4 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="card-cosmic rounded-xl p-5 inline-block max-w-md">
                    <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
                      <span className="text-primary font-display font-bold">{event.year}</span>
                    </div>
                    <h4 className="text-foreground font-semibold mb-2">{event.title}</h4>
                    <p className="text-muted-foreground text-sm">{event.description}</p>
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

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex justify-center gap-4"
      >
        <Button variant="cosmic" size="lg" onClick={onReset}>
          <ArrowLeft className="w-4 h-4" />
          Explore Another Reality
        </Button>
        <Button variant="outline" size="lg">
          <Share2 className="w-4 h-4" />
          Share This Timeline
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default TimelineDisplay;
