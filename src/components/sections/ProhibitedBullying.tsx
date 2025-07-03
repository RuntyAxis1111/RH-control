import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield } from 'lucide-react';

interface QuadrantCardProps {
  title: string;
  children: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

const QuadrantCard: React.FC<QuadrantCardProps> = ({ title, children, badge, badgeColor = "bg-[#00B0FF1A] text-[#00B0FF]" }) => {
  return (
    <motion.article
      className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-lg transition-all duration-300 relative"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -2 }}
    >
      {badge && (
        <div className="absolute top-4 right-4">
          <span className={`text-xs rounded-full px-2 py-0.5 font-medium ${badgeColor}`}>
            {badge}
          </span>
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center pr-16">
        {title}
      </h3>
      
      <ul className="list-disc ml-4 space-y-1 text-sm text-gray-600">
        {children}
      </ul>
    </motion.article>
  );
};

const WorkplaceBullyingQuadrant: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } }
      }}
      className="grid gap-6 md:grid-cols-2 my-8"
    >
      <QuadrantCard 
        title="Information Monopoly" 
        badge="Passive" 
        badgeColor="bg-orange-100 text-orange-600"
      >
        <li>Not sharing crucial know-how or tips</li>
        <li>Failing to hand over the job on time</li>
        <li>Giving incorrect or unnecessary information</li>
      </QuadrantCard>

      <QuadrantCard 
        title="Excluding from Jobs & Making Demanding Orders" 
        badge="Active" 
        badgeColor="bg-red-100 text-red-600"
      >
        <li>Excluding the victim from important meetings</li>
        <li>Assigning overly demanding jobs impossible to be done</li>
        <li>Assigning only trivial jobs or no jobs</li>
      </QuadrantCard>

      <QuadrantCard 
        title="Ignorance & Bullying" 
        badge="Disturb Work" 
        badgeColor="bg-purple-100 text-purple-600"
      >
        <li>Snatching or not recognizing the victim's achievement</li>
        <li>Treating the victim as invisible</li>
        <li>Spreading malicious rumors</li>
      </QuadrantCard>

      <QuadrantCard 
        title="Personal Insult & Unilateral Criticism" 
        badge="Prevent Focus" 
        badgeColor="bg-blue-100 text-blue-600"
      >
        <li>Using sarcastic or disrespectful expressions</li>
        <li>Publicly criticizing the victim in front of many people</li>
      </QuadrantCard>
    </motion.div>
  );
};

const ProhibitedBullying: React.FC = () => {
  return (
    <motion.section
      id="prohibited-bullying"
      className="min-h-screen bg-white py-16 px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      role="region"
      aria-labelledby="bullying-title"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          id="bullying-title"
          className="text-5xl font-extrabold text-gray-900 mb-8 font-manrope tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          3. Respect: Prohibition of Workplace Bullying
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
            Music and content, which are the core of HYBE's business, require a high level of creativity.
          </p>
          
          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            The best content full of new concepts and ideas can be produced in a positive environment where people respect and behave in a considerate manner. That is why HYBE never considers various forms of workplace bullying lightly but thinks it is a critical issue that can harm not only the organization but the company's reputation as well.
          </p>
          
          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Workplace bullying should not be overlooked.
          </p>
          
          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Workplace bullying is an act which mature members of society would never do.
          </p>
          
          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Not only the victim of workplace bullying but a third party who has witnessed it have a responsibility to raise the issue and try their best to solve it.
          </p>
          
          <p className="text-lg leading-relaxed mb-0 text-gray-700">
            If workplace bullying occurs, let us know immediately through your direct supervisor, and HR Team to know the RW violation reporting process.
          </p>
        </motion.div>

        {/* Types of Workplace Bullying */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 font-manrope">
            Types of Workplace Bullying
          </h2>
          
          <p className="text-lg leading-relaxed mb-8 text-gray-700">
            Workplace bullying can take many forms and may be subtle or overt. The following categories help identify different types of bullying behavior:
          </p>

          {/* Interactive Bullying Types Quadrant */}
          <WorkplaceBullyingQuadrant />
        </motion.div>

        {/* Zero Tolerance Alert */}
        <motion.div
          className="bg-[#FFF5F5] border border-red-200 rounded-2xl p-6 flex items-start space-x-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex-shrink-0 text-2xl">🚨</div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Zero Tolerance Policy
            </h4>
            <p className="text-gray-700">
              HYBE has zero tolerance for workplace bullying. If you experience or witness any form of bullying, report it immediately through your direct supervisor or HR Team. All reports will be handled confidentially and investigated promptly.
            </p>
          </div>
        </motion.div>

        {/* TODO: Add reporting system integration */}
        <motion.div
          className="mt-12 p-6 bg-accent/5 rounded-2xl border border-accent/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-accent text-sm">
            TODO: Reporting system integration – UNDER CONSTRUCTION
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProhibitedBullying;