import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle } from 'lucide-react';

interface HarassmentCardProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

const HarassmentCard: React.FC<HarassmentCardProps> = ({ title, children, delay = 0 }) => {
  return (
    <motion.article
      className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -2 }}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4 font-manrope">
        {title}
      </h3>
      
      <ul className="list-disc ml-4 space-y-1 text-sm text-gray-600">
        {children}
      </ul>
    </motion.article>
  );
};

const ProhibitedHarassment: React.FC = () => {
  return (
    <motion.section
      id="prohibited-harassment"
      className="min-h-screen bg-white py-16 px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      role="region"
      aria-labelledby="harassment-title"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          id="harassment-title"
          className="text-5xl font-extrabold text-gray-900 mb-8 font-manrope tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          4. Respect: Prohibition of Sexual Harassment
        </motion.h1>

        {/* How to prevent sexual harassment */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope">
            How to prevent sexual harassment
          </h2>

          {/* Introductory Block */}
          <motion.div
            className="bg-[#F5F8FF] border-l-2 border-[#00B0FF] rounded-2xl p-6 mb-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-lg leading-relaxed mb-6 text-gray-700">
              Do not comment on other people's "body parts" or "appearance", and avoid unnecessary physical contact with others.
            </p>
            
            <p className="text-lg leading-relaxed mb-6 text-gray-700">
              Expressions such as "pretty" or "feminine," which you may think are compliments, can make the other person feel uncomfortable, even if you intend to compliment them.
            </p>
            
            <p className="text-lg leading-relaxed mb-6 text-gray-700">
              Physical contact thought to be an expression of intimacy such as touching shoulders, arms, or hands is prohibited.
            </p>
            
            <p className="text-lg leading-relaxed mb-0 text-gray-700">
              If you feel unpleasant, express your refusal firmly right away. Do not just smile or laugh it off, as this may be misinterpreted as acceptance or encouragement.
            </p>
          </motion.div>
        </motion.div>

        {/* Sexual harassment cases by type */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 font-manrope">
            Sexual harassment cases by type
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <HarassmentCard title="Type 1 · Verbal sexual harassment" delay={0.5}>
              <li>Making sexual jokes or comments</li>
              <li>Asking about personal sexual experiences</li>
              <li>Making comments about someone's body or appearance</li>
              <li>Using sexually suggestive language or innuendos</li>
              <li>Making unwelcome sexual propositions or requests</li>
              <li>Spreading sexual rumors about someone</li>
              <li>Using derogatory terms related to gender or sexuality</li>
            </HarassmentCard>

            <HarassmentCard title="Type 2 · Physical sexual harassment" delay={0.6}>
              <li>Unwelcome touching, hugging, or kissing</li>
              <li>Inappropriate physical contact or invasion of personal space</li>
              <li>Blocking someone's path or cornering them</li>
              <li>Unwanted massage or touching of shoulders, arms, or hands</li>
              <li>Sexual assault or attempted sexual assault</li>
              <li>Deliberately brushing against someone</li>
              <li>Any unwanted physical contact of a sexual nature</li>
            </HarassmentCard>

            <HarassmentCard title="Type 3 · Visual sexual harassment" delay={0.7}>
              <li>Displaying sexually explicit images, posters, or materials</li>
              <li>Sending inappropriate photos or videos</li>
              <li>Making sexual gestures or facial expressions</li>
              <li>Staring at someone's body in a sexual manner</li>
              <li>Exposing oneself inappropriately</li>
              <li>Sharing sexually explicit content via email or messaging</li>
              <li>Creating a sexually hostile visual environment</li>
            </HarassmentCard>

            <HarassmentCard title="Others" delay={0.8}>
              <li>Quid pro quo harassment (demanding sexual favors for job benefits)</li>
              <li>Creating a hostile work environment through sexual conduct</li>
              <li>Cyber harassment or online sexual harassment</li>
              <li>Retaliation for rejecting sexual advances</li>
              <li>Sexual harassment during work-related social events</li>
              <li>Harassment based on sexual orientation or gender identity</li>
              <li>Any other conduct of a sexual nature that creates discomfort</li>
            </HarassmentCard>
          </div>
        </motion.div>

        {/* Confidentiality and Zero Tolerance */}
        <motion.div
          className="bg-[#E8FFF3] border border-green-200 rounded-2xl p-6 flex items-start space-x-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          viewport={{ once: true }}
        >
          <div className="flex-shrink-0 text-2xl">🛡️</div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Confidential Reporting & Zero Tolerance
            </h4>
            <p className="text-gray-700">
              All reports are treated confidentially. Zero tolerance applies. If you experience or witness sexual harassment, report it immediately to your supervisor or HR Team. We are committed to maintaining a safe and respectful workplace for everyone.
            </p>
          </div>
        </motion.div>

        {/* TODO: Add reporting system integration */}
        <motion.div
          className="mt-12 p-6 bg-accent/5 rounded-2xl border border-accent/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.0 }}
          viewport={{ once: true }}
        >
          <p className="text-accent text-sm">
            TODO: Confidential reporting system integration – UNDER CONSTRUCTION
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProhibitedHarassment;