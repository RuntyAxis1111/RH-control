import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Globe } from 'lucide-react';

const HolidayCalendar2025: React.FC = () => {
  return (
    <motion.section
      id="holiday-calendar"
      className="min-h-screen bg-white py-16 px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      role="region"
      aria-labelledby="holiday-calendar-title"
    >
      <div className="max-w-3xl mx-auto">
        {/* Hero Banner */}
        <motion.div
          className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
          <motion.h1 
            id="holiday-calendar-title"
            className="text-4xl font-extrabold text-white mb-2 font-manrope tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Holiday Calendar 2025
          </motion.h1>
        </motion.div>

        {/* Intro Text */}
        <motion.div
          className="prose prose-lg max-w-none mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-lg leading-relaxed mb-4 text-gray-700">
            If you have any questions or comments please share them with the HR team.
          </p>
          <p className="text-lg leading-relaxed mb-8 text-gray-600 italic">
            "These non-laborable days correspond to the office where you are located."
          </p>
        </motion.div>

        {/* US Holidays */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <Globe className="w-6 h-6 mr-3 text-blue-600" />
            US Holidays 2025 / Días Feriados 2024 en EEUU
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Holiday</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Martin Luther King Day', 'Monday, January 20'],
                  ['President\'s Day', 'Monday, February 17'],
                  ['Memorial Day', 'Monday, May 26'],
                  ['Juneteenth', 'Thursday, June 19'],
                  ['Independence Day', 'Wednesday Jul 02 – Friday Jul 04'],
                  ['Labor Day', 'Monday, September 01'],
                  ['Indigenous Peoples\' Day', 'Monday, October 13'],
                  ['Thanksgiving Day', 'Thursday, November 27 & 28'],
                  ['Holiday Break', 'Monday, December 22 – Sunday, January 4 (2026)']
                ].map(([holiday, date], index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{holiday}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Mexico Holidays */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <Globe className="w-6 h-6 mr-3 text-green-600" />
            Mexico Holidays 2025 / Días Feriados en México 2025
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-green-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Holiday</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Celebración Día de la Constitución Mexicana', 'Lunes, 3 de febrero'],
                  ['Natalicio Benito Juárez', 'Lunes, 17 de marzo'],
                  ['Jueves Santo', 'Jueves, 17 de abril'],
                  ['Viernes Santo', 'Viernes, 18 de abril'],
                  ['Día del trabajo', 'Jueves, 1 de mayo'],
                  ['Día de la Independencia', 'Martes, 16 de septiembre'],
                  ['Aniversario de la Revolución', 'Lunes, 17 de noviembre'],
                  ['Holiday Break', 'Lunes, 22 de diciembre – Domingo, 4 de enero 2026']
                ].map(([holiday, date], index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{holiday}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Colombia Holidays */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <Globe className="w-6 h-6 mr-3 text-yellow-600" />
            Colombia Holidays 2025 / Días Feriados en Colombia 2025
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-yellow-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Holiday</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Día de San José', 'Lunes, 24 de marzo'],
                  ['Jueves Santo', 'Jueves, 17 de abril'],
                  ['Viernes Santo', 'Viernes, 18 de abril'],
                  ['Día Internacional del Trabajo', 'Jueves, 1 de mayo'],
                  ['Día de la Ascensión', 'Lunes, 2 de junio'],
                  ['Corpus Cristi', 'Lunes, 23 de junio'],
                  ['Sagrado Corazón', 'Lunes, 30 de junio'],
                  ['Batalla de Boyacá', 'Jueves, 7 de agosto'],
                  ['Día de la Ascensión de la Virgen', 'Lunes, 18 de agosto'],
                  ['Día de la Raza', 'Lunes, 13 de octubre'],
                  ['Día de todos los Santos', 'Lunes, 3 de noviembre'],
                  ['Independencia de Cartagena', 'Martes, 11 de noviembre'],
                  ['Holiday Break', 'Lunes, 22 de diciembre – Domingo, 4 de enero 2026']
                ].map(([holiday, date], index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{holiday}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Korea Holidays */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <Globe className="w-6 h-6 mr-3 text-red-600" />
            Korea Holidays 2025 / Días Feriados en Corea 2025
          </h2>
          <p className="text-sm italic text-gray-600 mb-4">
            Informational purposes on the culture.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-red-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Holiday</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Seollal Holiday', 'Tuesday, January 28 – Thursday, January 30'],
                  ['March 1st Movement Day', 'Saturday, March 1st'],
                  ['Labor Day', 'Thursday, May 1st'],
                  ['Memorial Day', 'Friday, June 6'],
                  ['Constitution Day', 'Thursday, July 17'],
                  ['National Liberation Day of Korea', 'Friday, August 15'],
                  ['Chuseok', 'Sunday, October 5 – Tuesday, October 7'],
                  ['National Foundation Day', 'Friday, October 3'],
                  ['Hangul Day', 'Thursday, October 9'],
                  ['Holiday Break', 'Monday, December 22 – Sunday, January 4 (2026)']
                ].map(([holiday, date], index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{holiday}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Information Card */}
        <motion.div
          className="bg-blue-50 border border-blue-200 rounded-2xl p-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start space-x-3">
            <div className="text-2xl">📅</div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Important Notes
              </h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Holiday dates may vary by local regulations</li>
                <li>• Please coordinate with your local HR team for specific observances</li>
                <li>• Holiday Break applies to all offices globally</li>
                <li>• Contact HR for any questions about holiday policies</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HolidayCalendar2025;