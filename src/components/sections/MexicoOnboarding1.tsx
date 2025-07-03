import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Laptop, MapPin, Heart, Shield, Phone, CreditCard } from 'lucide-react';

const MexicoOnboarding1: React.FC = () => {
  return (
    <motion.section
      id="mx-onboarding1"
      className="min-h-screen bg-white py-16 px-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      role="region"
      aria-labelledby="mx-onboarding1-title"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          id="mx-onboarding1-title"
          className="text-5xl font-extrabold text-gray-900 mb-8 font-manrope tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          On Boarding Mexico 1
        </motion.h1>

        {/* Welcome Message */}
        <motion.div
          className="bg-[#F5F8FF] border-l-2 border-[#00B0FF] rounded-2xl p-6 mb-12"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-xl font-semibold text-gray-900 mb-4">
            ¡Bienvenido a HYBE Latin America!
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Estamos muy contentos de tenerte en el equipo.... abajo algunos puntos importantes para tu ingreso:
          </p>
        </motion.div>

        {/* Contract Signing */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <FileText className="w-6 h-6 mr-3 text-accent" />
            Firma de contrato
          </h2>
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-lg leading-relaxed mb-4 text-gray-700">
              Tu primer día de trabajo realizaremos la firma del contrato laboral en las instalaciones de HYBE.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Como menciona la Ley Federal del Trabajo en México, inicialmente se firma un "periodo de prueba" por 3 meses y después se firma el contrato definitivo.
            </p>
          </div>
        </motion.div>

        {/* Equipment and Email */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <Laptop className="w-6 h-6 mr-3 text-accent" />
            Equipo de cómputo, correo corporativo y firma electrónica
          </h2>
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-lg leading-relaxed mb-4 text-gray-700">
              El primer día de trabajo se te hará entrega de:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-lg text-gray-700">
              <li>Tu equipo de cómputo</li>
              <li>Tu dirección de correo corporativo personalizada</li>
            </ul>
          </div>
        </motion.div>

        {/* Work Location and Schedule */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <MapPin className="w-6 h-6 mr-3 text-accent" />
            Lugar y horarios de trabajo
          </h2>
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-lg leading-relaxed mb-6 text-gray-700">
              Trabajamos bajo un esquema híbrido:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-manrope">
                  EQUIPO MÚSICA
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Lunes, Martes y Miércoles en las oficinas ubicadas en <strong>Av. Álvaro Obregón 171, Colonia Roma</strong>.</li>
                  <li>• Jueves y Viernes desde casa cumpliendo los mismos horarios laborales.</li>
                  <li>• Días y horarios flexibles de acuerdo a las necesidades del área.</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-manrope">
                  EQUIPO PODCAST y HBL
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Lunes, Martes y Miércoles en <strong>Av. Prado Norte 225 piso 6, Lomas de Chapultepec, 11000 CDMX</strong>.</li>
                  <li>• Jueves y Viernes desde casa.</li>
                  <li>• Flexibilidad según necesidades.</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Offices */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope">
            Oficinas
          </h2>
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-lg leading-relaxed mb-4 text-gray-700">
              Las oficinas corporativas se encuentran hospedadas en un coworking muy cómodo con acceso a salas de juntas casi ilimitado…
            </p>
            <ol className="list-decimal ml-6 space-y-2 text-lg text-gray-700 mb-6">
              <li>Descarga la app <strong>PUBLI.CO</strong></li>
              <li>Recibirás usuario/contraseña desde <em>tech@publi.co</em>.</li>
              <li>Breve capacitación de uso.</li>
            </ol>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Phone className="w-5 h-5 mr-2 text-accent" />
                <span className="font-semibold text-gray-900">Contactos</span>
              </div>
              <p className="text-gray-700">Teléfono Front Desk Prado Norte: <strong>+52 55 4172 1260</strong></p>
              <p className="text-gray-700">Teléfono Front Desk Álvaro Obregón: <strong>+52 55 4172 1260</strong> (WhatsApp)</p>
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <Heart className="w-6 h-6 mr-3 text-accent" />
            Beneficios
          </h2>
          
          <div className="space-y-6">
            {/* Food Service */}
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-manrope">
                Servicio de alimentos
              </h3>
              <p className="text-lg leading-relaxed mb-2 text-gray-700">
                Registro con proveedor <strong>Come Bien</strong> (pedido mínimo un día antes).
              </p>
              <p className="text-gray-600">
                Terraza piso 4, comedor piso -1, terraza piso 6.
              </p>
            </div>

            {/* Office Snacks */}
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-manrope">
                Snacks en oficina
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Snacks disponibles; sugerencias bienvenidas.
              </p>
            </div>

            {/* Medical Insurance */}
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-manrope">
                SGMM
              </h3>
              <ul className="space-y-2 text-lg text-gray-700">
                <li>• Seguro de Gastos Médicos Mayores <strong>Atlas</strong></li>
                <li>• Póliza grupal AJA PODCAST: <em>Q00-3-3-000774522</em></li>
                <li>• Póliza grupal HYBE LATAM: <em>Q00-3-3-000774515</em></li>
                <li>• Suma asegurada 55 000 UMAS, deducible 3 UMAS, coaseguro 10 % (tope $25 000).</li>
              </ul>
            </div>

            {/* Life Insurance */}
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-manrope">
                Seguro de vida
              </h3>
              <ul className="space-y-2 text-lg text-gray-700">
                <li>• Aseguradora <strong>Thona</strong> – Póliza grupal <em>46053-02</em></li>
                <li>• Suma asegurada <strong>$4 500 000 MXN</strong></li>
                <li>• Asistencias: dental, visual, gastos funerarios.</li>
              </ul>
            </div>

            {/* Transportation Support */}
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-manrope flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-accent" />
                Apoyo de transporte
              </h3>
              <ul className="space-y-2 text-lg text-gray-700">
                <li>• <strong>$1 200 MXN</strong> mensuales vía tarjeta <strong>CLARA</strong> (no acumulable).</li>
                <li>• Instrucciones llegarán al correo corporativo.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* IMSS and Benefits */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope">
            IMSS, Prima Vacacional y Vacaciones
          </h2>
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-lg leading-relaxed mb-2 text-gray-700">
              Según Ley Federal del Trabajo.
            </p>
            <p className="text-sm text-gray-600 italic">
              *Prestaciones superiores pueden modificarse sin previo aviso.
            </p>
          </div>
        </motion.div>

        {/* Emergency Numbers */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-manrope flex items-center">
            <Shield className="w-6 h-6 mr-3 text-accent" />
            Números de emergencia
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• <strong>SGMM Atlas</strong>: 55 9177 5000 – póliza Q00-3-3-000774515</li>
              <li>• <strong>Vida Thona</strong>: 55 4433 8900 – póliza 46053-02</li>
              <li>• <strong>Ambulancias</strong>: 55 9177 5000 (un evento/año, &lt; 80 km)</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MexicoOnboarding1;