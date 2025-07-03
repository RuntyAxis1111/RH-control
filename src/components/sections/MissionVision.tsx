import React from 'react';
import { motion } from 'framer-motion';

const MissionVision: React.FC = () => {
  return (
    <motion.section
      id="mission-vision"
      className="min-h-screen bg-white py-16 px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-6xl font-bold text-gray-900 mb-8 font-manrope tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          We believe in music
        </motion.h1>
        
        <motion.div
          className="prose prose-lg max-w-none font-manrope"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            With music we move people's hearts, we make a positive impact, and change people's lives together.<br />
            This is our mission and the reason for our existence. Music has great power that moves people's hearts and changes the world.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            HYBE creates music to comfort and console people. Moreover, it is HYBE's mission to probe how deeply a music entertainment company can relate to one's daily life.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            To achieve this mission, we need principles and standards for decision-making. These standards must be observed every time we engage in any behavior, and the priorities for decision-making are <strong className="text-gray-900">content first, followed by fans</strong>.
          </p>

          <motion.h3 
            className="text-2xl font-semibold text-gray-900 mt-12 mb-6 font-manrope tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
          >
            What to do when the priorities conflict?
          </motion.h3>

          <p className="text-lg text-gray-600 leading-relaxed mb-12">
            In case of any conflict of interests, we shall prioritize the content. It does not mean that customers are less important or our standards are more important. Prioritizing the content means identifying customers' potential needs that they were not even aware of themselves, and focusing on taking the next step towards innovation. This will enable us to take the reins, instead of being unnecessarily swayed by the complaints or needs of customers.
          </p>

          <motion.h2 
            className="text-4xl font-bold text-gray-900 mt-16 mb-8 font-manrope tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Vision
          </motion.h2>

          <motion.p 
            className="text-2xl font-semibold text-accent mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            viewport={{ once: true }}
          >
            The world's best entertainment lifestyle platform company based on music.
          </motion.p>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            A Vision is the image of HYBE's future that we aim to create.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            An entertainment lifestyle refers to all experiences filled with imagination and joy from music, which increase happiness and convenience in life.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Our ultimate goal is that this experience leads to one's development and connects individuals with one another and the world through the platform so that people make positive relationships in the world, offering and imparting sound influences.
          </p>

          <motion.p 
            className="text-xl font-semibold text-gray-900 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            viewport={{ once: true }}
          >
            HYBE believes that music makes this possible.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MissionVision;