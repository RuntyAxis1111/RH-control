import React from 'react';
import { motion } from 'framer-motion';
import { Building, Globe, Users, Music } from 'lucide-react';

const AboutHybe: React.FC = () => {
  return (
    <motion.section
      id="about-hybe"
      className="min-h-screen bg-white py-16 px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      role="region"
      aria-labelledby="about-hybe-title"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          id="about-hybe-title"
          className="text-5xl font-extrabold text-gray-900 mb-8 font-manrope tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          About HYBE
        </motion.h1>

        {/* Introductory Block */}
        <motion.div
          className="bg-[#F5F8FF] border-l-2 border-[#00B0FF] rounded-2xl p-6 mb-12"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            HYBE innovates the music industry business model under the mission, "We believe in music".
          </p>
          
          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            HYBE strives for the world's best entertainment lifestyle platform company based on music.
          </p>
          
          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            "Content" that lead the global trend and "fans" who are our customers are the two pillars to our values, and we are committed to satisfying our customers by continuously improving our services with the highest standards.
          </p>
          
          <p className="text-lg leading-relaxed mb-0 text-gray-700">
            With offices based in Korea, Japan, the US, and Mexico, HYBE is bringing innovative change throughout the global music industry.
          </p>
        </motion.div>

        {/* About HYBE Latin America Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <Building className="w-6 h-6 mr-3 text-accent" />
            About HYBE Latin America (HBL)
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-6 text-gray-700">
              HYBE Latin America is a subsidiary of HYBE and comprises HYBE Latin America US, DOCEMIL Music, Zarpazo Entertainment, and Ajá Podcast.
            </p>

            <p className="text-lg leading-relaxed mb-6 text-gray-700">
              HYBE Latin America began operations in Mexico City on December 1st, 2023. Starting operations with Ajá Podcast group, Zarpazo music in Miami and our first group of HBL- JH Kah, David Choi, Suhyun Kwon and Sissi Lin. Although most of our staff is in Mexico City we have staff locations in LA, Miami and Colombia.
            </p>
          </div>
        </motion.div>

        {/* Global Presence Visual */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center mb-4">
              <Globe className="w-8 h-8 text-accent mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 font-manrope">
                Global Reach
              </h3>
            </div>
            <p className="text-gray-600">
              Operating across Korea, Japan, United States, and Mexico, bringing innovative change to the global music industry.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center mb-4">
              <Music className="w-8 h-8 text-accent mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 font-manrope">
                Innovation Focus
              </h3>
            </div>
            <p className="text-gray-600">
              Pioneering new business models and entertainment experiences that connect artists with fans worldwide.
            </p>
          </motion.div>
        </motion.div>

        {/* TODO: Add company timeline and achievements */}
        <motion.div
          className="mt-12 p-6 bg-accent/5 rounded-2xl border border-accent/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-accent text-sm">
            TODO: Company timeline and key achievements – UNDER CONSTRUCTION
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutHybe;