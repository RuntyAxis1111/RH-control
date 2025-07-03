import React from 'react';
import { motion } from 'framer-motion';
import { Globe, CheckCircle, XCircle } from 'lucide-react';

const RespectForDiversity: React.FC = () => {
  return (
    <motion.section
      id="diversity"
      className="min-h-screen bg-white py-16 px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      role="region"
      aria-labelledby="diversity-title"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          id="diversity-title"
          className="text-5xl font-extrabold text-gray-900 mb-8 font-manrope tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          2. Respect for Diversity
        </motion.h1>

        {/* Introductory Content */}
        <motion.div
          className="prose prose-lg max-w-none mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            The second step to creating a respectful workplace is understanding and embracing diversity. In our global work environment, we interact with colleagues from different cultural backgrounds, countries, and perspectives. This diversity is one of our greatest strengths, but it also requires us to be mindful of how we communicate and interact with one another.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Respect for diversity means recognizing that people have different communication styles, cultural norms, and ways of expressing themselves. What might be considered normal or polite in one culture could be misunderstood in another. Our goal is to create an inclusive environment where everyone feels comfortable and valued, regardless of their background.
          </p>

          <p className="text-lg leading-relaxed mb-8 text-gray-700">
            By being aware of cultural differences and practicing inclusive behavior, we can avoid misunderstandings and build stronger, more collaborative relationships. Remember, when in doubt, it's always better to ask respectfully than to make assumptions. Keep this in mind.
          </p>
        </motion.div>

        {/* Do's and Don'ts Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 font-manrope text-center">
            Do's and Don'ts for Global Manner
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* DO'S Column */}
            <motion.div
              className="bg-[#E8FFF3] rounded-2xl p-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-2xl font-bold text-green-800">DO'S</h3>
              </div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Personal Space</h4>
                  <p className="text-gray-700">
                    Respect personal boundaries and maintain appropriate physical distance. Be aware that comfort levels with physical proximity vary across cultures.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Eye Contact</h4>
                  <p className="text-gray-700">
                    Maintain appropriate eye contact during conversations to show engagement and respect, while being mindful that eye contact norms differ across cultures.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Holding doors open</h4>
                  <p className="text-gray-700">
                    Practice common courtesy by holding doors open for others, regardless of gender, as a sign of respect and politeness.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Maintaining good personal hygiene</h4>
                  <p className="text-gray-700">
                    Keep yourself well-groomed and maintain good personal hygiene as a sign of respect for your colleagues and the workplace environment.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* DON'TS Column */}
            <motion.div
              className="bg-[#FFF5F5] rounded-2xl p-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <XCircle className="w-8 h-8 text-red-600 mr-3" />
                <h3 className="text-2xl font-bold text-red-800">DON'TS</h3>
              </div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Private questions</h4>
                  <p className="text-gray-700">
                    Avoid asking personal questions about age, salary, relationship status, family planning, or other private matters that may make colleagues uncomfortable.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Judgmental comments</h4>
                  <p className="text-gray-700">
                    Refrain from making judgmental comments about someone's appearance, lifestyle choices, cultural practices, or personal decisions.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Discriminatory remarks</h4>
                  <p className="text-gray-700">
                    Never make comments based on race, gender, religion, sexual orientation, nationality, or any other protected characteristic.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Disrespectful expressions</h4>
                  <p className="text-gray-700">
                    Avoid using sarcasm, dismissive language, or expressions that could be interpreted as condescending or disrespectful.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Indirect Refusals</h4>
                  <p className="text-gray-700">
                    Don't use vague or indirect language when declining requests. Be clear and respectful in your communication.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Just smiling without an apology</h4>
                  <p className="text-gray-700">
                    When you make a mistake or cause inconvenience, don't just smile. Offer a genuine apology and take responsibility.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Multicultural Note */}
        <motion.div
          className="bg-[#F0F7FF] border border-blue-200 rounded-2xl p-6 flex items-start space-x-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.1 }}
          viewport={{ once: true }}
        >
          <div className="flex-shrink-0 text-2xl">🌐</div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Nota para entornos multiculturales
            </h4>
            <p className="text-gray-700">
              En entornos globales, la claridad y el respeto son clave para evitar malentendidos interculturales. Cuando tengas dudas sobre las normas culturales, pregunta respetuosamente en lugar de hacer suposiciones.
            </p>
          </div>
        </motion.div>

        {/* TODO: Add cultural awareness examples */}
        <motion.div
          className="mt-12 p-6 bg-accent/5 rounded-2xl border border-accent/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <p className="text-accent text-sm">
            TODO: Cultural awareness examples and scenarios – UNDER CONSTRUCTION
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default RespectForDiversity;