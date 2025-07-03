import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Shield, Star } from 'lucide-react';

const HealthyWorkplace: React.FC = () => {
  return (
    <motion.section
      id="healthy-workplace"
      className="min-h-screen bg-white py-16 px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      role="region"
      aria-labelledby="healthy-workplace-title"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          id="healthy-workplace-title"
          className="text-5xl font-extrabold text-gray-900 mb-8 font-manrope tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Creating a Healthy Workplace Environment
        </motion.h1>

        {/* Main Content Card */}
        <motion.div
          className="rounded-2xl border border-gray-200 p-6 shadow-sm bg-white mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Heart className="w-8 h-8 text-accent" />
            </div>
            <div>
              <p className="text-lg leading-relaxed text-gray-700">
                For a mature and healthy workplace environment, HYBE defines a relationship between members as a{' '}
                <span className="font-semibold text-gray-900">
                  relationship with pros behaving according to clear work ethics
                </span>
                .
              </p>
            </div>
          </div>
        </motion.div>

        {/* Supporting Elements */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -2 }}
          >
            <Users className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-manrope">
              Professional Relationships
            </h3>
            <p className="text-gray-600 text-sm">
              Building mature, respectful connections based on mutual understanding and shared goals.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -2 }}
          >
            <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-manrope">
              Clear Work Ethics
            </h3>
            <p className="text-gray-600 text-sm">
              Establishing transparent guidelines and standards that promote fairness and accountability.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -2 }}
          >
            <Star className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-manrope">
              Excellence Culture
            </h3>
            <p className="text-gray-600 text-sm">
              Fostering an environment where everyone can perform their best work with dignity and respect.
            </p>
          </motion.div>
        </motion.div>

        {/* Key Principles */}
        <motion.div
          className="bg-[#F5F8FF] border-l-2 border-[#00B0FF] rounded-2xl p-6 mb-12"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4 font-manrope">
            Our Commitment to a Healthy Workplace
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Promoting open communication and constructive feedback</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Supporting work-life balance and employee well-being</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Encouraging professional development and growth opportunities</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Maintaining zero tolerance for harassment and discrimination</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Creating inclusive spaces where everyone feels valued and heard</span>
            </li>
          </ul>
        </motion.div>

        {/* TODO: Add wellness programs and resources */}
        <motion.div
          className="mt-12 p-6 bg-accent/5 rounded-2xl border border-accent/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-accent text-sm">
            TODO: Wellness programs and employee resources – UNDER CONSTRUCTION
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HealthyWorkplace;