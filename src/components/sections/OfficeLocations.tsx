import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Wifi, ExternalLink, Building } from 'lucide-react';

const OfficeLocations: React.FC = () => {
  return (
    <motion.section
      id="office-locations"
      className="min-h-screen bg-white py-16 px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      role="region"
      aria-labelledby="office-locations-title"
    >
      <div className="max-w-3xl mx-auto py-12 prose prose-lg max-w-none">
        {/* Hero Banner */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Building className="w-8 h-8 text-white" />
            </div>
          </div>
          <motion.h1 
            id="office-locations-title"
            className="text-4xl font-extrabold text-white mb-2 font-manrope tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Office Locations
          </motion.h1>
        </motion.div>

        {/* Mexico Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 font-manrope flex items-center">
            <span className="text-2xl mr-3">🇲🇽</span>
            Mexico
          </h2>

          {/* PUBLICO Lomas de Chapultepec */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-manrope flex items-center">
              <MapPin className="w-6 h-6 mr-3 text-blue-600" />
              PUBLICO Lomas de Chapultepec
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-lg text-gray-700">
                  <strong>Address:</strong> Prado Norte 225 piso 6, Lomas de Chapultepec, Miguel Hidalgo, 11000 CDMX
                </p>
                <a 
                  href="https://www.google.com.mx/maps/place/PÚBLICO+Lomas+de+Chapultepec/@19.4280454,-99.2096079,17z/data=!3m1!4b1!4m6!3m5!1s0x85d20175da2c9f03:0x569763448a4d9230!8m2!3d19.4280454!4d-99.207033!16s%2Fg%2F11f9vl4jdq?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                >
                  Open in Google Maps
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <Wifi className="w-5 h-5 mr-2 text-blue-600" />
                  Wi-Fi
                </h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Network: <code className="bg-gray-200 px-2 py-1 rounded text-sm">PUBLICO PRADO</code></li>
                  <li>• Password: <code className="bg-gray-200 px-2 py-1 rounded text-sm">PPrado225</code></li>
                </ul>
              </div>
            </div>
          </div>

          {/* PUBLICO Roma Norte */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-manrope flex items-center">
              <MapPin className="w-6 h-6 mr-3 text-green-600" />
              PUBLICO Roma Norte
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-lg text-gray-700">
                  <strong>Address:</strong> Av. Álvaro Obregón 171, Roma Nte., Cuauhtémoc, 06700 CDMX
                </p>
                <a 
                  href="https://www.google.com/maps/place/P%C3%9ABLICO+Roma/@19.4179355,-99.1653219,17z/data=!3m1!4b1!4m6!3m5!1s0x85d1ff6e31c6a433:0xd89384e032811b9a!8m2!3d19.4179305!4d-99.1627416!16s%2Fg%2F11qbrpw4mm?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                >
                  Open in Google Maps
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <Wifi className="w-5 h-5 mr-2 text-green-600" />
                  Wi-Fi
                </h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Network: <code className="bg-gray-200 px-2 py-1 rounded text-sm">PUBLICO ALVARO</code></li>
                  <li>• Password: <code className="bg-gray-200 px-2 py-1 rounded text-sm">PAlvaro171</code></li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Miami Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 font-manrope flex items-center">
            <span className="text-2xl mr-3">🇺🇸</span>
            Miami
          </h2>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg text-gray-700 mb-3">
                  <strong>Address:</strong> 1111 Lincoln Road, Suite 507, Miami Beach, FL 33139
                </p>
                <a 
                  href="https://www.google.com.mx/maps/place/1111+Lincoln+Rd+%23507,+Miami+Beach,+FL+33139,+EE.+UU./@25.7909106,-80.1427799,17z/data=!3m1!4b1!4m6!3m5!1s0x88d9b487ad0db8a3:0x588b8e6b5c567444!8m2!3d25.7909106!4d-80.140205!16s%2Fg%2F11rnfbdwcv?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                >
                  Open in Google Maps
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Los Angeles Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 font-manrope flex items-center">
            <span className="text-2xl mr-3">🇺🇸</span>
            Los Angeles
          </h2>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg text-gray-700 mb-3">
                  <strong>Mailing Address:</strong> 2110 Colorado Ave., Santa Monica, CA 90404
                </p>
                <a 
                  href="https://www.google.com/maps/place/2110+Colorado+Ave,+Santa+Monica,+CA+90404,+USA/@34.0257267,-118.4783506,17z/data=!3m1!4b1!4m6!3m5!1s0x80c2bb374f30fbe9:0xfd5b15b36d604e70!8m2!3d34.0257223!4d-118.4757703!16s%2Fg%2F11b8v4c2p3?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                >
                  Open in Google Maps
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Colombia Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 font-manrope flex items-center">
            <span className="text-2xl mr-3">🇨🇴</span>
            Colombia
          </h2>

          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg text-gray-700 italic">
                  Currently remote / home-office.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Information Card */}
        <motion.div
          className="bg-blue-50 border border-blue-200 rounded-2xl p-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🏢</div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Office Access Information
              </h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Contact your local office manager for building access procedures</li>
                <li>• Wi-Fi credentials are provided for Mexico offices</li>
                <li>• For security and visitor policies, check with HR</li>
                <li>• Emergency contact information is available at each location</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default OfficeLocations;