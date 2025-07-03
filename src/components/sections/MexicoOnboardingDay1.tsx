import React from 'react';
import { motion } from 'framer-motion';
import { FileSignature, Calendar, MessageSquare, Mail, ExternalLink } from 'lucide-react';

const MexicoOnboardingDay1: React.FC = () => {
  return (
    <motion.section
      id="mx-onboarding-day1"
      className="min-h-screen bg-white py-16 px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      role="region"
      aria-labelledby="mx-onboarding-day1-title"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          id="mx-onboarding-day1-title"
          className="text-5xl font-extrabold text-gray-900 mb-8 font-manrope tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          On Boarding – DIA 1
        </motion.h1>

        {/* Electronic Signature */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <FileSignature className="w-6 h-6 mr-3 text-accent" />
            Firma electrónica
          </h2>
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-lg leading-relaxed mb-4 text-gray-700">
              Es importante colocar tu firma electrónica…
            </p>
            <div className="flex items-center space-x-2">
              <a 
                href="https://docs.google.com/document/d/1pwCSObjNv3gsFZIhB_SQcm1xIIi6sxEZ-GJNWzszu2I/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-pink transition-colors duration-200 flex items-center"
              >
                Instrucciones (link en renovación)
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
              <span className="text-xs bg-yellow-100 text-yellow-800 rounded px-2 py-1">
                Pendiente
              </span>
            </div>
          </div>
        </motion.div>

        {/* Monday.com */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <Calendar className="w-6 h-6 mr-3 text-accent" />
            Monday.com
          </h2>
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-lg leading-relaxed text-gray-700">
              Es importante tengas tu acceso…
            </p>
          </div>
        </motion.div>

        {/* Institutional Communication */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <MessageSquare className="w-6 h-6 mr-3 text-accent" />
            Comunicación Institucional
          </h2>
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="space-y-6">
              {/* Slack */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Mensajería instantánea por SLACK
                </h3>
                <p className="text-gray-700 mb-2">
                  Mantén status actualizado.
                </p>
                <div className="flex items-center space-x-2">
                  <a 
                    href="https://hybelatin.monday.com/protected_static/20321006/resources/1755792407/Slack%20Change%20Languages.mp4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-pink transition-colors duration-200 flex items-center"
                  >
                    Video Slack (link en renovación)
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                  <span className="text-xs bg-yellow-100 text-yellow-800 rounded px-2 py-1">
                    Pendiente
                  </span>
                </div>
              </div>

              {/* Corporate Email */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-accent" />
                  Correo institucional
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>nombre.apellido@hybecorp.com</strong> – activa "Out of Office" en vacaciones.
                </p>
                <p className="text-gray-700">
                  Manejo de calendario en Google – actualiza ubicación de trabajo.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reading Confirmation */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope">
            Firma de confirmación de lectura
          </h2>
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-lg leading-relaxed mb-4 text-gray-700">
              Es importante enviar cuanto antes la confirmación…
            </p>
            <a 
              href="https://forms.monday.com/forms/fa91eb37b194a31c5341cfde1080d7e3?r=use1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-pink transition-colors duration-200 font-medium"
            >
              Formulario Monday
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </motion.div>

        {/* Important Note */}
        <motion.div
          className="bg-blue-50 border border-blue-200 rounded-2xl p-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start space-x-3">
            <div className="text-2xl">📋</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Recordatorio importante
              </h3>
              <p className="text-gray-700">
                Asegúrate de completar todos los pasos mencionados en tu primer día. Si tienes alguna duda, no dudes en contactar al equipo de HR.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MexicoOnboardingDay1;