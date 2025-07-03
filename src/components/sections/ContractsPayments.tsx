import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FileText } from 'lucide-react';

const ContractsPayments: React.FC = () => {
  return (
    <motion.section
      id="contracts-payments"
      className="min-h-screen bg-white py-16 px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      role="region"
      aria-labelledby="contracts-payments-title"
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Banner */}
        <motion.div
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <motion.h1 
                id="contracts-payments-title"
                className="text-4xl font-extrabold text-white mb-2 font-manrope tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Contracts, Payments, LAMS, HYBENET, Docusign
              </motion.h1>
              <p className="text-gray-300 text-lg">
                Essential documentation and guidelines for HR processes
              </p>
            </div>
          </div>
        </motion.div>

        {/* PDF Embed Container */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* PDF Viewer */}
          <div className="relative">
            <iframe
              src="https://drive.google.com/file/d/1cCkpml_RDsZXmUUwUqLYbKs5c4PCbtVy/preview"
              width="100%"
              height="900"
              allow="autoplay"
              loading="lazy"
              className="rounded-xl shadow"
              title="Contracts & Payments PDF"
            />
          </div>

          {/* Fallback Link */}
          <motion.div
            className="p-6 bg-gray-50 border-t border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-3">
              <ExternalLink className="w-5 h-5 text-accent" />
              <p className="text-gray-700">
                Si el visor no carga,{' '}
                <a 
                  href="https://drive.google.com/file/d/1cCkpml_RDsZXmUUwUqLYbKs5c4PCbtVy/preview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-pink transition-colors duration-200 font-medium underline"
                >
                  haz clic aquí para abrirlo en Google Drive
                </a>
                .
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          className="mt-8 grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3 font-manrope">
              📋 Document Overview
            </h3>
            <p className="text-blue-800 leading-relaxed">
              This document contains comprehensive information about contracts, payment processes, LAMS system usage, HYBENET access, and Docusign procedures for HYBE Latin America employees.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3 font-manrope">
              💡 Quick Access
            </h3>
            <p className="text-green-800 leading-relaxed">
              For immediate assistance with any of these processes, please contact the HR team or refer to the specific sections within the document for detailed instructions.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContractsPayments;