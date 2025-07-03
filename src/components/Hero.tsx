import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="h-12 bg-gradient-to-r from-accent to-accent-pink rounded-b-3xl shadow-lg"
    />
  );
};

export default Hero;