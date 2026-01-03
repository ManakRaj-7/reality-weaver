import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12"
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
      >
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-sm text-primary font-medium">Parallel Reality Generator</span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-5xl md:text-7xl font-bold font-display mb-6"
      >
        <span className="text-foreground">What If</span>
        <span className="text-gradient-primary">?</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
      >
        Explore alternate versions of reality. Discover how a single change 
        could reshape history, technology, and human civilization.
      </motion.p>
    </motion.div>
  );
};

export default Hero;
