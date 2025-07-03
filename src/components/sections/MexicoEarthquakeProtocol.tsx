import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, MapPin, Users, ArrowDown, Shield } from 'lucide-react';

const MexicoEarthquakeProtocol: React.FC = () => {
  return (
    <motion.section
      id="mx-earthquake-protocol"
      className="min-h-screen bg-white py-16 px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      role="region"
      aria-labelledby="mx-earthquake-title"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          id="mx-earthquake-title"
          className="text-4xl font-extrabold text-gray-900 mb-4 font-manrope tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Evacuation Protocol in case of an Earthquake in Publico Prado Norte – MEXICO OFFICE
        </motion.h1>

        {/* Location Notice */}
        <motion.div
          className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-lg font-semibold text-yellow-800">
            <em>Mexico City only</em>
          </p>
        </motion.div>

        {/* Alert Information */}
        <motion.div
          className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-12"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
            <h2 className="text-xl font-semibold text-red-800">
              Seismic Alert System
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-red-700">
            The seismic alert will sound on the loudspeakers in Mexico City.
          </p>
        </motion.div>

        {/* Instructions Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-manrope">
            Instructions suggested according to civil protection authorities and Publico's team
          </h2>
        </motion.div>

        {/* Floor-by-Floor Instructions */}
        <motion.div
          className="space-y-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {[
            {
              floor: "Basement / Floor -1",
              instruction: "users go up the auditorium stairs and exit through main door to walkway (safety zone).",
              color: "bg-blue-50 border-blue-200"
            },
            {
              floor: "Ground Floor",
              instruction: "exit via main entrance to guardrail (safety zone).",
              color: "bg-green-50 border-green-200"
            },
            {
              floor: "2nd–3rd Floors",
              instruction: "evacuate via left emergency stairs to walkway. If unable within 40 s, retreat to elevators area.",
              color: "bg-yellow-50 border-yellow-200"
            },
            {
              floor: "4th–5th Floors",
              instruction: "retreat to lower-risk zones (elevators). After alert stops and shaking ceases, evacuate via emergency stairs to walkway.",
              color: "bg-orange-50 border-orange-200"
            },
            {
              floor: "6th Floor",
              instruction: "retreat to elevator area or roof if safer; después evacuar descendiendo hasta walkway.",
              color: "bg-red-50 border-red-200"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`rounded-2xl border p-6 ${item.color}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
              viewport={{ once: true }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-gray-900">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 font-manrope">
                    {item.floor}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.instruction}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Important Safety Rules */}
        <motion.div
          className="bg-gray-900 text-white rounded-2xl p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center mb-6">
            <Shield className="w-8 h-8 text-accent mr-3" />
            <h2 className="text-2xl font-bold font-manrope">
              IMPORTANT SAFETY RULES
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-accent">
                During Alert
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• If you cannot exit within 40 s of the alarm, retreat to elevator area.</li>
                <li>• <strong className="text-red-400">Do not use elevators.</strong></li>
                <li>• Stay away from windows/glass.</li>
                <li>• Use stairways only.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-accent">
                Assembly Points
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>Assembly point:</strong> median (marked safest).</li>
                <li>• <strong>Meeting point:</strong> outside the building.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          className="bg-accent/10 border border-accent/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🚨</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Emergency Preparedness
              </h3>
              <p className="text-gray-700">
                Familiarize yourself with these procedures and know your floor's evacuation route. In case of emergency, remain calm and follow the instructions of building safety personnel.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MexicoEarthquakeProtocol;