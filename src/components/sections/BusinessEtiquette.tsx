import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MessageSquare, Users, Calendar } from 'lucide-react';

const BusinessEtiquette: React.FC = () => {
  return (
    <motion.section
      id="etiquette"
      className="min-h-screen bg-white py-16 px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      role="region"
      aria-labelledby="etiquette-title"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          id="etiquette-title"
          className="text-5xl font-extrabold text-gray-900 mb-8 font-manrope tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          1. Business etiquette
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
            RW stems from mutual respect. Mutual respect starts from business etiquette. Business etiquette is not just about being polite; it's about creating an environment where everyone feels valued, heard, and respected.
          </p>
          
          <p className="text-lg leading-relaxed mb-0 text-gray-700">
            Mutual respect starts from understanding and acknowledging cultural differences, communication styles, and individual preferences. By practicing good business etiquette, we build stronger relationships and create a more inclusive workplace for everyone.
          </p>
        </motion.div>

        {/* Face-to-face Communication */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-6 font-manrope flex items-center">
            <Users className="w-6 h-6 mr-3 text-accent" />
            Face-to-face communication
          </h2>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-manrope">
                When preparing for a meeting
              </h3>
              <ul className="list-disc ml-6 space-y-1 text-lg text-gray-600">
                <li>Send agenda and relevant materials in advance</li>
                <li>Confirm attendance and meeting logistics</li>
                <li>Prepare necessary documents and presentations</li>
                <li>Test technology and equipment beforehand</li>
                <li>Arrive 5-10 minutes early to set up</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-manrope">
                During a meeting
              </h3>
              <ul className="list-disc ml-6 space-y-1 text-lg text-gray-600">
                <li>Start and end on time, respecting everyone's schedule</li>
                <li>Stay focused on the agenda and avoid side conversations</li>
                <li>Listen actively and give others space to speak</li>
                <li>Take notes and ask clarifying questions when needed</li>
                <li>Keep phones on silent and minimize distractions</li>
                <li>Speak clearly and at an appropriate volume</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-manrope">
                After a meeting
              </h3>
              <ul className="list-disc ml-6 space-y-1 text-lg text-gray-600">
                <li>Send meeting summary and action items within 24 hours</li>
                <li>Follow up on assigned tasks and deadlines</li>
                <li>Share relevant materials or resources discussed</li>
                <li>Schedule follow-up meetings if necessary</li>
                <li>Provide feedback or clarification when requested</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Online Communication */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-6 font-manrope flex items-center">
            <MessageSquare className="w-6 h-6 mr-3 text-accent" />
            On-line Communication
          </h2>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-manrope">
                When communicating via messenger (Slack)
              </h3>
              <ul className="list-disc ml-6 space-y-1 text-lg text-gray-600">
                <li>Use clear, concise language and proper grammar</li>
                <li>Choose appropriate channels for different types of communication</li>
                <li>Use @mentions thoughtfully to avoid unnecessary notifications</li>
                <li>Respond in a timely manner during business hours</li>
                <li>Use threads for detailed discussions to keep channels organized</li>
                <li>Be mindful of tone - add context when messages might be misunderstood</li>
                <li>Use emojis and reactions appropriately to acknowledge messages</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-manrope">
                Using a messenger outside regular business hours
              </h3>
              <ul className="list-disc ml-6 space-y-1 text-lg text-gray-600">
                <li>Avoid sending non-urgent messages outside business hours</li>
                <li>Use "Schedule Send" feature when possible</li>
                <li>Clearly mark urgent messages that require immediate attention</li>
                <li>Respect colleagues' time zones and local holidays</li>
                <li>Set your status to indicate availability</li>
                <li>Use Do Not Disturb settings to manage your own boundaries</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Business Hours Callout */}
        <motion.div
          className="bg-[#FFFEE6] border border-yellow-200 rounded-2xl p-6 flex items-start space-x-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.0 }}
          viewport={{ once: true }}
        >
          <div className="flex-shrink-0 text-2xl">🕒</div>
          <div>
            <p className="text-lg font-medium text-gray-900 mb-2">
              Respeta los horarios laborales
            </p>
            <p className="text-gray-700">
              Horarios indicados: <strong>10 AM – 7 PM</strong> | Connect Time: <strong>11 AM – 4 PM</strong> salvo casos urgentes.
            </p>
          </div>
        </motion.div>

        {/* TODO: Add situational examples */}
        <motion.div
          className="mt-12 p-6 bg-accent/5 rounded-2xl border border-accent/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.1 }}
          viewport={{ once: true }}
        >
          <p className="text-accent text-sm">
            TODO: Situational examples – UNDER CONSTRUCTION
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BusinessEtiquette;