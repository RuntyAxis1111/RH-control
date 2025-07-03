import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Wrench, 
  User, 
  Mail, 
  Monitor, 
  MessageSquare, 
  Send, 
  Loader2,
  CheckCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Toast from '../ui/Toast';

// Validation schema
const equipmentRequestSchema = z.object({
  requester: z.string().min(1, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  equipment: z.enum(['Laptop', 'Monitor', 'Keyboard', 'Mouse', 'Headset', 'Dock', 'Cable', 'Adapter', 'Other'], {
    required_error: 'Please select equipment type'
  }),
  notes: z.string().optional()
});

type EquipmentRequestForm = z.infer<typeof equipmentRequestSchema>;

const EQUIPMENT_OPTIONS = [
  { value: 'Laptop', label: 'Laptop' },
  { value: 'Monitor', label: 'Monitor' },
  { value: 'Keyboard', label: 'Keyboard' },
  { value: 'Mouse', label: 'Mouse' },
  { value: 'Headset', label: 'Headset' },
  { value: 'Dock', label: 'Dock' },
  { value: 'Cable', label: 'Cable' },
  { value: 'Adapter', label: 'Adapter' },
  { value: 'Other', label: 'Other' }
];

const ITEquipmentRequest: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<EquipmentRequestForm>({
    resolver: zodResolver(equipmentRequestSchema)
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const onSubmit = async (data: EquipmentRequestForm) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('it_equipment_requests')
        .insert([{
          requester: data.requester,
          email: data.email,
          equipment: data.equipment,
          notes: data.notes || null
        }]);

      if (error) {
        throw error;
      }

      setIsSuccess(true);
      showToast('Equipment request submitted successfully! 🎉', 'success');
      reset();
      
    } catch (error) {
      console.error('Error submitting equipment request:', error);
      showToast(
        error instanceof Error 
          ? `Error: ${error.message}` 
          : 'Failed to submit request. Please try again.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.section
        id="it-equipment-request"
        className="min-h-screen bg-white py-16 px-8 flex items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        role="region"
        aria-labelledby="success-title"
      >
        <div className="max-w-md mx-auto text-center">
          <motion.div
            className="bg-green-50 border border-green-200 rounded-2xl p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h1 id="success-title" className="text-2xl font-bold text-green-800 mb-4">
              Request Submitted Successfully!
            </h1>
            <p className="text-green-700 mb-6">
              Your IT equipment request has been received. The IT team will review your request and get back to you soon.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              Submit Another Request
            </button>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <>
      <motion.section
        id="it-equipment-request"
        className="min-h-screen bg-white py-16 px-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        role="region"
        aria-labelledby="equipment-request-title"
      >
        <div className="max-w-xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            className="text-sm text-gray-500 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            IT / Forms / Request Equipment
          </motion.div>

          {/* Hero Banner */}
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <Wrench className="w-8 h-8 text-white" />
              </div>
            </div>
            <motion.h1 
              id="equipment-request-title"
              className="text-3xl font-extrabold text-white mb-2 font-manrope tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
            >
              IT Equipment & Accessories Request
            </motion.h1>
          </motion.div>

          {/* Description */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-600 leading-relaxed">
              Si tienes alguna necesidad sobre equipo o algún comentario de mejora, 
              por favor llena el siguiente formulario.
            </p>
            <p className="text-sm text-red-600 font-medium mt-2">
              (Último día: Viernes 5 de Diciembre)
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <label 
                  htmlFor="requester" 
                  className="block text-sm font-semibold text-gray-900 mb-2 flex items-center"
                >
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  Nombre completo *
                </label>
                <input
                  {...register('requester')}
                  type="text"
                  id="requester"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    errors.requester ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                  aria-required="true"
                  aria-invalid={errors.requester ? 'true' : 'false'}
                />
                {errors.requester && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.requester.message}
                  </p>
                )}
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <label 
                  htmlFor="email" 
                  className="block text-sm font-semibold text-gray-900 mb-2 flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2 text-blue-600" />
                  Correo *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.email@hybecorp.com"
                  aria-required="true"
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </motion.div>

              {/* Equipment Type */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <label 
                  htmlFor="equipment" 
                  className="block text-sm font-semibold text-gray-900 mb-2 flex items-center"
                >
                  <Monitor className="w-4 h-4 mr-2 text-blue-600" />
                  ¿Qué equipo necesitas? *
                </label>
                <select
                  {...register('equipment')}
                  id="equipment"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    errors.equipment ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-required="true"
                  aria-invalid={errors.equipment ? 'true' : 'false'}
                >
                  <option value="">Select equipment...</option>
                  {EQUIPMENT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.equipment && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.equipment.message}
                  </p>
                )}
              </motion.div>

              {/* Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <label 
                  htmlFor="notes" 
                  className="block text-sm font-semibold text-gray-900 mb-2 flex items-center"
                >
                  <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
                  Comentarios / Notas (opcional)
                </label>
                <textarea
                  {...register('notes')}
                  id="notes"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                  placeholder="Additional details about your equipment request..."
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center px-6 py-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-indigo-600 hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
                  aria-disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Enviando solicitud...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Enviar solicitud
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </motion.div>

          {/* Information Card */}
          <motion.div
            className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl">💡</div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Important Information
                </h3>
                <ul className="text-blue-800 space-y-1 text-sm">
                  <li>• Requests will be reviewed by the IT team</li>
                  <li>• You'll receive confirmation once your request is processed</li>
                  <li>• For urgent IT issues, contact the IT team directly</li>
                  <li>• Equipment availability may vary based on budget and inventory</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
};

export default ITEquipmentRequest;