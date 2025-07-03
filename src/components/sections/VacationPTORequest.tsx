import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, User, Mail, Clock, MessageSquare, Users, Send, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Toast from '../ui/Toast';

// Validation schema
const vacationRequestSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  status_while_away: z.enum(['OOO', 'WFH', 'Partial-Day', 'Sick', 'Parental-Leave', 'Other'], {
    required_error: 'Please select a status'
  }),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().min(1, 'End date is required'),
  manager_email: z.string().min(1, 'Please select a manager'),
  comments: z.string().optional()
}).refine((data) => {
  const startDate = new Date(data.start_date);
  const endDate = new Date(data.end_date);
  return endDate >= startDate;
}, {
  message: "End date must be after or equal to start date",
  path: ["end_date"]
});

type VacationRequestForm = z.infer<typeof vacationRequestSchema>;

const MANAGERS = [
  { value: 'jh.kah@hybecorp.com', label: 'JH Kah' },
  { value: 'juan.arenas@hybecorp.com', label: 'Juan Arenas' },
  { value: 'jeremy.norkin@hybecorp.com', label: 'Jeremy Norkin' },
  { value: 'david.choi@hybecorp.com', label: 'David Choi' },
  { value: 'suhyun.kwon@hybecorp.com', label: 'Su Hyun Kwon' },
  { value: 'carmen.graterol@hybecorp.com', label: 'Carmen Graterol' },
  { value: 'fernando.grediaga@hybecorp.com', label: 'Fernando Grediaga' },
  { value: 'carla.lechuga@hybecorp.com', label: 'Carla Lechuga' },
  { value: 'santiago.duque@hybecorp.com', label: 'Santiago Duque' },
  { value: 'leticia.iglesias@hybecorp.com', label: 'Leticia Iglesias' }
];

const STATUS_OPTIONS = [
  { value: 'OOO', label: 'Out of Office (Vacation)' },
  { value: 'Sick', label: 'Sick Day' },
  { value: 'Parental-Leave', label: 'Maternity / Paternity Leave' },
  { value: 'WFH', label: 'Work From Home' },
  { value: 'Partial-Day', label: 'Personal Day (Partial)' },
  { value: 'Other', label: 'Other' }
];

const VacationPTORequest: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  } = useForm<VacationRequestForm>({
    resolver: zodResolver(vacationRequestSchema)
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const onSubmit = async (data: VacationRequestForm) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('vacation_requests')
        .insert([{
          full_name: data.full_name,
          email: data.email,
          status_while_away: data.status_while_away,
          start_date: data.start_date,
          end_date: data.end_date,
          manager_email: data.manager_email,
          comments: data.comments || null
        }]);

      if (error) {
        throw error;
      }

      showToast('Request sent successfully! 🎉', 'success');
      reset();
      
      // TODO: Trigger email notification via Edge Function
      // await supabase.functions.invoke('notify_vacation_request', {
      //   body: data
      // });
      
    } catch (error) {
      console.error('Error submitting vacation request:', error);
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

  return (
    <>
      <motion.section
        id="vacation-pto-request"
        className="min-h-screen bg-white py-16 px-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        role="region"
        aria-labelledby="vacation-pto-title"
      >
        <div className="max-w-xl mx-auto">
          {/* Hero Banner */}
          <motion.div
            className="bg-gradient-to-r from-accent to-accent-pink rounded-2xl p-8 mb-8 text-center"
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
              id="vacation-pto-title"
              className="text-3xl font-extrabold text-white mb-2 font-manrope tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Vacation & PTO Request
            </motion.h1>
            <p className="text-white/90 text-lg">
              Submit your time-off request
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <label 
                  htmlFor="full_name" 
                  className="block text-sm font-semibold text-gray-900 mb-2 flex items-center"
                >
                  <User className="w-4 h-4 mr-2 text-accent" />
                  Full Name *
                </label>
                <input
                  {...register('full_name')}
                  type="text"
                  id="full_name"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200 ${
                    errors.full_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                  aria-required="true"
                  aria-invalid={errors.full_name ? 'true' : 'false'}
                />
                {errors.full_name && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.full_name.message}
                  </p>
                )}
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <label 
                  htmlFor="email" 
                  className="block text-sm font-semibold text-gray-900 mb-2 flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2 text-accent" />
                  Email *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200 ${
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

              {/* Status While Away */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <label 
                  htmlFor="status_while_away" 
                  className="block text-sm font-semibold text-gray-900 mb-2 flex items-center"
                >
                  <Clock className="w-4 h-4 mr-2 text-accent" />
                  Status while away *
                </label>
                <select
                  {...register('status_while_away')}
                  id="status_while_away"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200 ${
                    errors.status_while_away ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-required="true"
                  aria-invalid={errors.status_while_away ? 'true' : 'false'}
                >
                  <option value="">Select status...</option>
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.status_while_away && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.status_while_away.message}
                  </p>
                )}
              </motion.div>

              {/* Date Range */}
              <motion.div
                className="grid md:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <div>
                  <label 
                    htmlFor="start_date" 
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Start Date *
                  </label>
                  <input
                    {...register('start_date')}
                    type="date"
                    id="start_date"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200 ${
                      errors.start_date ? 'border-red-500' : 'border-gray-300'
                    }`}
                    aria-required="true"
                    aria-invalid={errors.start_date ? 'true' : 'false'}
                  />
                  {errors.start_date && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.start_date.message}
                    </p>
                  )}
                </div>

                <div>
                  <label 
                    htmlFor="end_date" 
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    End Date *
                  </label>
                  <input
                    {...register('end_date')}
                    type="date"
                    id="end_date"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200 ${
                      errors.end_date ? 'border-red-500' : 'border-gray-300'
                    }`}
                    aria-required="true"
                    aria-invalid={errors.end_date ? 'true' : 'false'}
                  />
                  {errors.end_date && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.end_date.message}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Manager */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <label 
                  htmlFor="manager_email" 
                  className="block text-sm font-semibold text-gray-900 mb-2 flex items-center"
                >
                  <Users className="w-4 h-4 mr-2 text-accent" />
                  Manager *
                </label>
                <select
                  {...register('manager_email')}
                  id="manager_email"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200 ${
                    errors.manager_email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-required="true"
                  aria-invalid={errors.manager_email ? 'true' : 'false'}
                >
                  <option value="">Select your manager...</option>
                  {MANAGERS.map((manager) => (
                    <option key={manager.value} value={manager.value}>
                      {manager.label}
                    </option>
                  ))}
                </select>
                {errors.manager_email && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.manager_email.message}
                  </p>
                )}
              </motion.div>

              {/* Comments */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <label 
                  htmlFor="comments" 
                  className="block text-sm font-semibold text-gray-900 mb-2 flex items-center"
                >
                  <MessageSquare className="w-4 h-4 mr-2 text-accent" />
                  Comments (optional)
                </label>
                <textarea
                  {...register('comments')}
                  id="comments"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors duration-200 resize-none"
                  placeholder="Additional information or special requests..."
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
                      : 'bg-accent hover:bg-accent-pink hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Request
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
              <div className="text-2xl">ℹ️</div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Important Information
                </h3>
                <ul className="text-blue-800 space-y-1 text-sm">
                  <li>• Submit requests at least 2 weeks in advance when possible</li>
                  <li>• Your manager will receive an email notification</li>
                  <li>• You'll receive confirmation once your request is processed</li>
                  <li>• For urgent requests, please contact HR directly</li>
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

export default VacationPTORequest;