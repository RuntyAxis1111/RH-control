import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Heart, Briefcase, Users, Shield, AlertTriangle } from 'lucide-react';
import BusinessEtiquette from './BusinessEtiquette';
import RespectForDiversity from './RespectForDiversity';
import ProhibitedBullying from './ProhibitedBullying';
import ProhibitedHarassment from './ProhibitedHarassment';

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

const CodeOfConduct: React.FC = () => {
  return (
    <>
      <motion.section
        id="code-of-conduct"
        className="min-h-screen bg-white py-16 px-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-4 font-manrope tracking-tight">
              Code of Conduct
            </h2>
            <p className="text-xl text-gray-600">
              Guiding principles for our workplace culture
            </p>
          </motion.div>

          {/* Respect@Work Section */}
          <motion.div
            id="respect-at-work"
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            role="region"
            aria-labelledby="respect-at-work-title"
          >
            <h1 id="respect-at-work-title" className="text-5xl font-extrabold text-gray-900 mb-8 font-manrope tracking-tight">
              Respect@Work
            </h1>

            {/* Introductory Block */}
            <motion.div
              className="bg-[#F5F8FF] border-l-2 border-[#00B0FF] rounded-2xl p-6 mb-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-lg leading-relaxed mb-6 text-gray-700">
                The objective of RESPECT@WORK is to create a workplace where all employees are treated with dignity and respect, free from workplace bullying and sexual harassment. We are committed to fostering an environment where everyone can perform their best work without fear of intimidation, discrimination, or inappropriate behavior.
              </p>
              
              <p className="text-lg leading-relaxed mb-6 text-gray-700">
                HYBE Latin America has zero tolerance for workplace bullying and sexual harassment. We believe that every employee deserves to work in an environment that promotes their well-being, professional growth, and personal dignity.
              </p>
              
              <p className="text-lg leading-relaxed mb-0 text-gray-700">
                This policy applies to all employees, contractors, visitors, and anyone who interacts with our workplace community. It covers all work-related activities, including but not limited to office premises, work events, business trips, and virtual meetings.
              </p>
            </motion.div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 font-manrope">
                Definition of Workplace Bullying
              </h2>
              
              <p className="text-lg leading-relaxed mb-6 text-gray-700">
                Workplace bullying is repeated unreasonable behavior directed toward an employee or group of employees that creates a risk to health and safety. It includes behavior that intimidates, offends, degrades, or humiliates an employee.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 font-manrope">
                Types of Workplace Bullying
              </h2>
              
              <p className="text-lg leading-relaxed mb-8 text-gray-700">
                Workplace bullying can take many forms and may be subtle or overt. The following categories help identify different types of bullying behavior:
              </p>

              {/* Interactive Bullying Types Quadrant */}
              <WorkplaceBullyingQuadrant />

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 font-manrope">
                Sexual Harassment Policy
              </h2>
              
              <p className="text-lg leading-relaxed mb-6 text-gray-700">
                Sexual harassment is any unwelcome sexual advance, request for sexual favors, or other verbal or physical conduct of a sexual nature that affects an individual's employment, interferes with work performance, or creates an intimidating, hostile, or offensive work environment.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 font-manrope">
                Reporting Procedures
              </h2>
              
              <p className="text-lg leading-relaxed mb-6 text-gray-700">
                If you experience or witness workplace bullying or sexual harassment, we encourage you to report it immediately. You can report incidents to your direct supervisor, HR department, or through our anonymous reporting system. All reports will be taken seriously and investigated promptly.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 font-manrope">
                Investigation Process
              </h2>
              
              <p className="text-lg leading-relaxed mb-6 text-gray-700">
                All complaints will be investigated fairly, thoroughly, and in a timely manner. The investigation process will be conducted with sensitivity and discretion, respecting the privacy of all parties involved while ensuring a comprehensive review of the allegations.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 font-manrope">
                Consequences and Corrective Actions
              </h2>
              
              <p className="text-lg leading-relaxed mb-6 text-gray-700">
                Employees found to have engaged in workplace bullying or sexual harassment will face appropriate disciplinary action, which may include counseling, training, written warnings, suspension, or termination of employment, depending on the severity of the conduct.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 font-manrope">
                Protection Against Retaliation
              </h2>
              
              <p className="text-lg leading-relaxed mb-6 text-gray-700">
                HYBE Latin America prohibits retaliation against any employee who reports workplace bullying or sexual harassment in good faith, participates in an investigation, or opposes discriminatory practices. The victim is protected under the strict confidentiality.
              </p>
            </div>
          </motion.div>

          {/* Placeholder sections for other Code of Conduct items */}
          <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
            {[
              { id: 'reading-conf', title: 'Reading confirmation', icon: <FileText className="w-8 h-8" /> }
            ].map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                  {section.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4 font-manrope">
                  {section.title}
                </h3>
                
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🔧</span>
                  <div className="inline-flex items-center px-4 py-2 bg-white rounded-full text-gray-600 text-sm font-medium">
                    Coming soon
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* TODO: Add interactive forms and document management with Supabase */}
          <motion.div
            className="mt-16 p-6 bg-accent/5 rounded-2xl border border-accent/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-accent text-sm">
              {/* TODO: Implement document tracking and confirmation system with Supabase */}
              Próximamente: Sistema de seguimiento y confirmación de lectura integrado
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Business Etiquette Section */}
      <BusinessEtiquette />

      {/* Respect for Diversity Section */}
      <RespectForDiversity />

      {/* Prohibited Bullying Section */}
      <ProhibitedBullying />

      {/* Prohibited Harassment Section */}
      <ProhibitedHarassment />
    </>
  );
};

export default CodeOfConduct;