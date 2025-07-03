import React from 'react';
import { motion } from 'framer-motion';

const HybeDNA: React.FC = () => {
  const values = [
    {
      id: 'passion',
      title: 'Passion',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-3">1. Passion for music</h4>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We are passionate about music. We believe that music has the power to move people's hearts and change the world. We create music that comforts and consoles people, and we strive to make a positive impact on people's lives through music.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-3">2. Passion for innovation</h4>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We are passionate about innovation. We constantly challenge ourselves to find new ways to create and deliver music experiences. We embrace change and are not afraid to take risks in pursuit of innovation.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-3">3. Passion for excellence</h4>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We are passionate about excellence. We set high standards for ourselves and strive to exceed expectations in everything we do. We are committed to continuous improvement and learning.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'autonomy',
      title: 'Autonomy',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-3">1. Individual autonomy</h4>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We believe in empowering individuals to make decisions and take ownership of their work. We trust our team members to act in the best interest of the company and our mission.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-3">2. Creative autonomy</h4>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We encourage creative freedom and artistic expression. We believe that the best creative work comes from giving artists and creators the space to explore and experiment.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-3">3. Operational autonomy</h4>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We provide our teams with the autonomy to operate efficiently and make decisions quickly. We minimize bureaucracy and empower teams to execute their vision.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'trust',
      title: 'Trust',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-3">1. Trust in our people</h4>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We trust our team members to do their best work and make good decisions. We hire talented people and give them the support and resources they need to succeed.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-3">2. Trust in our process</h4>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We trust in our proven processes and methodologies while remaining open to improvement. We believe in data-driven decision making and continuous optimization.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-3">3. Trust in our mission</h4>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We trust in our mission to move people's hearts through music. We believe in our shared success and work together towards our common goals.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <motion.section
      id="hybe-dna"
      className="min-h-screen bg-white py-16 px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      tabIndex={-1}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h1 className="text-6xl font-bold text-gray-900 mb-6 font-manrope tracking-tight">
            HYBE DNA (core values)
          </h1>
          <h2 className="text-3xl font-medium text-gray-700 italic font-manrope">
            Passion, Autonomy and Trust
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-1 gap-12">
          {values.map((value, index) => (
            <motion.div
              key={value.id}
              className="border border-gray-200 rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * (index + 2) }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-full text-sm font-semibold mr-4">
                  {index + 1}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 font-manrope tracking-tight">
                  {value.title}
                </h3>
              </div>
              
              {value.content}
            </motion.div>
          ))}
        </div>

        {/* TODO: Add interactive values assessment with Supabase */}
        <motion.div
          className="mt-16 p-6 bg-accent/5 rounded-2xl border border-accent/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-accent text-sm">
            {/* TODO: Implement values assessment and team alignment tools with Supabase */}
            Próximamente: Herramientas de evaluación de valores y alineación de equipo
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HybeDNA;