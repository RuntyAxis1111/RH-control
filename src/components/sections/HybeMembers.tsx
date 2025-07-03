import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

const HybeMembers: React.FC = () => {
  return (
    <motion.section
      id="hybe-members"
      className="min-h-screen bg-white py-16 px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      tabIndex={-1}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-6xl font-bold text-gray-900 mb-12 font-manrope tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          HYBE Members: Who are HYBE Members?
        </motion.h1>
        
        <motion.div
          className="prose prose-lg max-w-none font-manrope space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            HYBE Members are individuals who share our mission to move people's hearts through music and create positive impact in the world. We are a diverse community of passionate professionals, artists, creators, and innovators who believe in the transformative power of music.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Our members come from different backgrounds, cultures, and disciplines, but we are united by our shared values of Passion, Autonomy, and Trust. We believe that diversity of thought and experience makes us stronger and more creative.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            As HYBE Members, we are committed to excellence in everything we do. We challenge ourselves to think differently, take calculated risks, and push the boundaries of what's possible in the entertainment industry.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            We foster a culture of collaboration and mutual respect, where every voice is heard and valued. We believe that the best ideas can come from anyone, anywhere in our organization.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            HYBE Members are not just employees – we are partners in building the future of entertainment. We take ownership of our work, support each other's growth, and celebrate our collective achievements.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed mb-12">
            Together, we are creating an entertainment lifestyle platform that connects people around the world through the universal language of music. We believe in our shared success and work towards making a positive impact on society.
          </p>

          {/* Quote Card */}
          <motion.div
            className="bg-gray-50 rounded-2xl p-8 border-l-4 border-accent my-12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Lightbulb className="w-8 h-8 text-accent" />
              </div>
              <div>
                <blockquote className="text-xl font-semibold text-gray-900 italic font-manrope">
                  "Win Together Spirit — every organization and member contributes to one level higher innovation."
                </blockquote>
              </div>
            </div>
          </motion.div>

          <motion.p 
            className="text-xl font-semibold text-gray-900 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Believe in our shared success.
          </motion.p>
        </motion.div>

        {/* TODO: Add member directory and team collaboration tools with Supabase */}
        <motion.div
          className="mt-16 p-6 bg-accent/5 rounded-2xl border border-accent/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-accent text-sm">
            {/* TODO: Implement member directory and collaboration platform with Supabase */}
            Próximamente: Directorio de miembros y plataforma de colaboración integrada
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HybeMembers;