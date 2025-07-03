import React from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Building, User } from 'lucide-react';

const DirectoryHBLTeam: React.FC = () => {
  return (
    <motion.section
      id="directory-hbl-team"
      className="min-h-screen bg-white py-16 px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      role="region"
      aria-labelledby="directory-hbl-team-title"
    >
      <div className="max-w-4xl mx-auto py-12 prose prose-lg max-w-none">
        {/* Breadcrumb */}
        <motion.div
          className="text-sm text-gray-500 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          HR / Directory HBL Team
        </motion.div>

        {/* Hero Banner */}
        <motion.div
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <motion.h1 
            id="directory-hbl-team-title"
            className="text-4xl font-extrabold text-white mb-2 font-manrope tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Directory HBL Team
          </motion.h1>
        </motion.div>

        {/* Email Domain Note */}
        <motion.div
          className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-blue-600 mr-2" />
            <p className="text-lg text-blue-800 italic">
              All emails use <strong>@hybecorp.com</strong> unless another domain is shown.
            </p>
          </div>
        </motion.div>

        {/* LOS ANGELES OFFICE */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <Building className="w-6 h-6 mr-3 text-blue-600" />
            LOS ANGELES OFFICE
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Name</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Position</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Email</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Área</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Isaac Lee', 'Chairman', 'isaac.lee@hybecorp.com', 'HBL US'],
                  ['Jessica Kwon', 'Head of Business Development', 'jkwon@hybecorp.com', 'HBL US'],
                  ['Juan Arenas', 'COO', 'juanse.arenas@hybecorp.com', 'HBL US'],
                  ['Paco Alfaro', 'Head of IT', 'carifaro@page1media.com / paco.alfaro@hybecorp.com', 'HBL US'],
                  ['Myrna Perez', 'Head of Production & Visual Content', 'myrna.perez@hybecorp.com', 'HBL US']
                ].map(([name, position, email, area], index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">{name}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{position}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm">{email}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{area}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* MIAMI OFFICE */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <Building className="w-6 h-6 mr-3 text-orange-600" />
            MIAMI OFFICE
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-orange-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Name</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Position</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Email</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Área</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Jeremy Norkin', 'President Label Services', 'jeremy.norkin@hybecorp.com', 'HBL US'],
                  ['Santiago Duque', 'Head of ZARPAZO', 'santiago.duque@hybecorp.com', 'ZRPZ'],
                  ['Alan Doron', 'Music Coordinator', 'alan.doron@hybecorp.com', 'ZRPZ'],
                  ['Jenesis Alonso', 'Label Manager', 'jenesis.alonso@hybecorp.com', 'HBL US']
                ].map(([name, position, email, area], index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">{name}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{position}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm">{email}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{area}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* HBL MEXICO CITY OFFICE */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <Building className="w-6 h-6 mr-3 text-green-600" />
            HBL MEXICO CITY OFFICE
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-green-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Name</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Position</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Email</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Área</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Jonghyun Kah', 'CEO', 'jkah@hybecorp.com', 'HBL'],
                  ['Sissi Lin', 'Executive Assistant', 'sissi.lin@hybecorp.com', 'HBL'],
                  ['David Choi', 'Chief Financial Officer', 'david.choi.maru@hybecorp.com', 'HBL'],
                  ['Abraham Alcantar', 'Accountant', 'abraham.alcantar@hybecorp.com', 'HBL'],
                  ['Min Lee', 'Accountant', 'min.lee@hybecorp.com', 'HBL'],
                  ['Jorge Alberto Aguilar', 'Treasurer', 'jorge.aguilar@hybecorp.com', 'HBL'],
                  ['Max Figueroa', 'Accountant Intern', 'max.figueroa@hybecorp.com', 'HBL'],
                  ['Carla Lechuga', 'Chief Human Resources Officer', 'carla.lechuga@hybecorp.com', 'HBL'],
                  ['Karla Suarez', 'Human Resources Manager', 'karla.suarez@hybecorp.com', 'HBL'],
                  ['Laura Barbosa', 'Human Resources Manager', 'laura.barbosa@hybecorp.com', 'HBL'],
                  ['Alessandra Quemada', 'Human Resources Intern', 'alessandra.quemada@hybecorp.com', 'HBL'],
                  ['Gabriela Portilla', 'Head of Legal', 'gabriela.portilla@hybecorp.com', 'HBL'],
                  ['Angel Cartela', 'Legal Affairs', 'angel.cartela@hybecorp.com', 'HBL'],
                  ['Jose Morillo', 'Corporate Development Manager', 'jose.morillo@hybecorp.com', 'HBL'],
                  ['Johan Martinez', 'IT Intern', 'johan.martinez@hybecorp.com', 'HBL'],
                  ['Julieta Tamayo', 'Project Manager PALF', 'julieta.tamayo@hybecorp.com', 'HBL'],
                  ['Peter Sykes', 'Master\'s Intern Corp Development', 'peter.sykes@hybecorp.com', 'HBL'],
                  ['Ricardo "Sony" Reyes', 'Label Manager PALF', 'ricardo.reyes@hybecorp.com', 'HBL']
                ].map(([name, position, email, area], index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">{name}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{position}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm">{email}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{area}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* DOCEMIL TEAM MX CITY OFFICE */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <Building className="w-6 h-6 mr-3 text-purple-600" />
            DOCEMIL TEAM MX CITY OFFICE
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-purple-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Name</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Position</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Email</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Área</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Fernando Grediaga', 'General Manager DOCEMIL', 'fernando.grediaga@hybecorp.com', '12MIL'],
                  ['Leticia Iglesias', 'Marketing & Mgmy Director', 'leticia.iglesias@hybecorp.com', '12MIL'],
                  ['Mariel Espinosa', 'PR & CMMS Sr Manager', 'mariel.montini@hybecorp.com', '12MIL'],
                  ['Liliana Ortiz', 'Marketing Coordinator', 'liliana.ortiz@hybecorp.com', '12MIL'],
                  ['Odette Bazan', 'Comms & Marketing Executive', 'odette.bazan@hybecorp.com', '12MIL'],
                  ['Iyali Avalos', 'Management Coordinator', 'iyali.avalos@hybecorp.com', '12MIL'],
                  ['Said Amaya', 'A&R Director', 'said.amaya@hybecorp.com', '12MIL'],
                  ['Veronica Hernandez', 'A&R Coordinator', 'veronica.hernandez@hybecorp.com', '12MIL'],
                  ['Chrisamyl Vidal', 'Talent & Development Specialist', 'chrisamyl.vidal@hybecorp.com', '12MIL'],
                  ['Tomas Davo', 'Head of Management', 'tomas.davo@hybecorp.com', '12MIL'],
                  ['Patricia Leal', 'Assistant / Merch', 'patricia.leal@hybecorp.com', '12MIL'],
                  ['Kim Mina', 'Merch Associate', 'kim.mina@hybecorp.com', '12MIL'],
                  ['Estefania Castillo', 'Music & Merch Intern', 'estefania.castillo@hybecorp.com', '12MIL']
                ].map(([name, position, email, area], index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">{name}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{position}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm">{email}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{area}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* ZRPZ TEAM MX */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <Building className="w-6 h-6 mr-3 text-red-600" />
            ZRPZ TEAM MX
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-red-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Name</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Position</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Email</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Área</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">Steven Sierra</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">Talent Agent</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm">steven.sierra@hybecorp.com</td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">ZRPZ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* COMMUNITIES AND FANDOMS MX OFFICE */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <Building className="w-6 h-6 mr-3 text-indigo-600" />
            COMMUNITIES AND FANDOMS MX OFFICE
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-indigo-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Name</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Position</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Email</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Área</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Carmen Graterol', 'Director of Communities & Fandoms, DSPs', 'carmen.graterol@hybecorp.com', 'COMMS & FANDOMS'],
                  ['Álvaro Céspedes', 'Sr Producer AJA PODCAST', 'alvaro.cespedes@hybecorp.com', 'COMMS & FANDOMS'],
                  ['Gonzalo Messi', 'Post Production AJA Podcast', 'gonzalo.messi@hybecorp.com', 'COMMS & FANDOMS'],
                  ['Iridiana Arcos', 'Líder de Estrategia Digital POP', 'iridiana.arcos@hybecorp.com', 'COMMS & FANDOMS'],
                  ['Esteban Hernandez', 'Jr Project Manager PALF', 'esteban.hernandez@hybecorp.com', 'COMMS & FANDOMS']
                ].map(([name, position, email, area], index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">{name}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{position}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm">{email}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{area}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* ZARPAZO TEAM COLOMBIA OFFICE */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <Building className="w-6 h-6 mr-3 text-yellow-600" />
            ZARPAZO TEAM COLOMBIA OFFICE
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-yellow-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Name</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Position</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Email</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Área</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Camilo Echavarria', 'Management Manager', 'camilo.echavarria@hybecorp.com', 'ZRPZ'],
                  ['Ana Agudelo', 'Digital Marketing Manager', 'ana.agudelo@hybecorp.com', 'ZRPZ'],
                  ['María Jose González', 'Marketing Creative', 'maria.jose.gonzalez@hybecorp.com', 'ZRPZ']
                ].map(([name, position, email, area], index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">{name}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{position}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm">{email}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{area}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <hr className="border-gray-300 my-8" />

        {/* Last Updated */}
        <motion.div
          className="text-center text-gray-500 italic"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <p>Last updated — [add publish date]</p>
        </motion.div>

        {/* Information Card */}
        <motion.div
          className="mt-8 bg-purple-50 border border-purple-200 rounded-2xl p-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start space-x-3">
            <div className="text-2xl">📞</div>
            <div>
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                Contact Information
              </h3>
              <ul className="text-purple-800 space-y-1 text-sm">
                <li>• For directory updates, contact HR team</li>
                <li>• All email addresses use @hybecorp.com domain unless specified</li>
                <li>• For urgent matters, contact your direct supervisor or HR</li>
                <li>• Office-specific contact information available in Office Locations</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DirectoryHBLTeam;