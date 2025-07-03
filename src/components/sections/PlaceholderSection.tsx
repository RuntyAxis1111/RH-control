import React from 'react';
import { motion } from 'framer-motion';

interface PlaceholderSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ 
  id, 
  title, 
  subtitle,
  icon 
}) => {
  return (
    <motion.section
      id={id}
      className="min-h-screen bg-white py-16 px-8 flex items-center justify-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <div className="text-center max-w-2xl mx-auto">
        {icon && (
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="p-4 rounded-full bg-accent/10 text-accent">
              {icon}
            </div>
          </motion.div>
        )}
        
        <motion.h2 
          className="text-4xl font-bold text-gray-900 mb-4 font-manrope tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>
        
        {subtitle && (
          <motion.p 
            className="text-lg text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>
        )}
        
        <motion.div
          className="inline-flex items-center px-6 py-3 bg-gray-100 rounded-full text-gray-600 font-medium"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Contenido en preparación
        </motion.div>

        {/* TODO: Add forms with Supabase integration for HR sections */}
        {id.includes('hr') && (
          <motion.div
            className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-blue-600">
              {/* TODO: Integrate Supabase forms for HR workflows */}
              Próximamente: Formularios HR integrados con Supabase
            </p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default PlaceholderSection;