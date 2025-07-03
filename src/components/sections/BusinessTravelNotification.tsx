import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, watch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Plane, 
  User, 
  Mail, 
  Building, 
  Calendar, 
  MapPin, 
  FileText, 
  DollarSign, 
  Phone, 
  Send, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Toast from '../ui/Toast';

// Validation schema
const travelNotificationSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  division: z.enum(['AJA PODCAST', 'DOCEMIL', 'HBL', 'ZARPAZO'], {
    required_error: 'Please select a division'
  }),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().min(1, 'End date is required'),
  destination: z.string().min(1, 'Destination is required'),
  purpose: z.string().min(1, 'Purpose of travel is required'),
  need_extra_expenses: z.enum(['yes', 'no'], {
    required_error: 'Please specify if you need additional expenses'
  }),
  extra_expenses_reason: z.string().optional(),
  extra_expenses_budget_usd: z.string().optional(),
  emergency_contact: z.string().optional(),
  emergency_phone: z.string().optional(),
  flight_info: z.string().optional(),
  hotel_info: z.string().optional()
}).refine((data) => {
  const startDate = new Date(data.start_date);
  const endDate = new Date(data.end_date);
  return endDate >= startDate;
}, {
  message: "End date must be after or equal to start date",
  path: ["end_date"]
}).refine((data) => {
  if (data.need_extra_expenses === 'yes') {
    return data.extra_expenses_reason && data.extra_expenses_reason.trim().length > 0;
  }
  return true;
}, {
  message: "Please explain the additional expenses",
  path: ["extra_expenses_reason"]
}).refine((data) => {
  if (data.need_extra_expenses === 'yes') {
    return data.extra_expenses_budget_usd && parseFloat(data.extra_expenses_budget_usd) > 0;
  }
  return true;
}, {
  message: "Please provide a budget amount",
  path: ["extra_expenses_budget_usd"]
});

type TravelNotificationForm = z.infer<typeof travelNotificationSchema>;

const DIVISION_OPTIONS = [
  { value: 'AJA PODCAST', label: 'AJA PODCAST' },
  { value: 'DOCEMIL', label: 'DOCEMIL' },
  { value: 'HBL', label: 'HBL' },
  { value: 'ZARPAZO', label: 'ZARPAZO' }
];

const BusinessTravelNotification: React.FC = () => {
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
    reset,
    watch
  } = useForm<TravelNotificationForm>({
    resolver: zodResolver(travelNotificationSchema)
  });

  const needExtraExpenses = watch('need_extra_expenses');

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const onSubmit = async (data: TravelNotificationForm) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('travel_notifications')
        .insert([{
          full_name: data.full_name,
          email: data.email,
          division: data.division,
          start_date: data.start_date,
          end_date: data.end_date,
          destination: data.destination,
          purpose: data.purpose,
          need_extra_expenses: data.need_extra_expenses === 'yes',
          extra_expenses_reason: data.need_extra_expenses === 'yes' ? data.extra_expenses_reason : null,
          extra_expenses_budget_usd: data.need_extra_expenses === 'yes' ? Number(data.extra_expenses_budget_usd) : null,
          emergency_contact: data.emergency_contact || null,
          emergency_phone: data.emergency_phone || null,
          flight_info: data.flight_info || null,
          hotel_info: data.hotel_info || null
        }]);

      if (error) {
        throw error;
      }

      showToast('Travel notification sent successfully! ✅', 'success');
      reset();
      
      // TODO: Trigger email notification via Edge Function
      // await supabase.functions.invoke('notify-travel', {
      //   body: data
      // });
      
    } catch (error) {
      console.error('Error submitting travel notification:', error);
      showToast(
        error instanceof Error 
          ? `Error: ${error.message}` 
          : 'Failed to submit notification. Please try again.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.section
        id="business-travel-notification"
        className="min-h-screen bg-white py-16 px-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        role="region"
        aria-labelledby="business-travel-title"
      >
        <div className="max-w-xl mx-auto">
          {/* Hero Banner */}
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <Plane className="w-8 h-8 text-white" />
              </div>
            </div>
            <motion.h1 
              id="business-travel-title"
              className="text-3xl font-extrabold text-white mb-2 font-manrope tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Business Travel Notification
            </motion.h1>
            <p className="text-white/90 text-lg">
              Submit your travel notification form
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
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  Full Name *
                </label>
                <input
                  {...register('full_name')}
                  type="text"
                  id="full_name"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
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
                  <Mail className="w-4 h-4 mr-2 text-blue-600" />
                  Email *
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

              {/* Division */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <label 
                  htmlFor="division" 
                  className="block text-sm font-semibold text-gray-900 mb-2 flex items-center"
                >
                  <Building className="w-4 h-4 mr-2 text-blue-600" />
                  Division *
                </label>
                <select
                  {...register('division')}
                  id="division"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    errors.division ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-required="true"
                  aria-invalid={errors.division ? 'true' : 'false'}
                >
                  <option value="">Select division...</option>
                  {DIVISION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.division && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.division.message}
                  </p>
                )}
              </motion.div>

              {/* Travel Dates */}
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
                    className="block text-sm font-semibold text-gray-900 mb-2 flex items-center"
                  >
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    Start Date *
                  </label>
                  <input
                    {...register('start_date')}
                    type="date"
                    id="start_date"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
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

              {/* Destination */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <label 
                  htmlFor="destination" 
                  className="block text-sm font-semibold text-gray-900 mb-2 flex items-center"
                >
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  Destination *
                </label>
                <input
                  {...register('destination')}
                  type="text"
                  id="destination"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    errors.destination ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="City, Country"
                  aria-required="true"
                  aria-invalid={errors.destination ? 'true' : 'false'}
                />
                {errors.destination && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.destination.message}
                  </p>
                )}
              </motion.div>

              {/* Purpose */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <label 
                  htmlFor="purpose" 
                  className="block text-sm font-semibold text-gray-900 mb-2 flex items-center"
                >
                  <FileText className="w-4 h-4 mr-2 text-blue-600" />
                  Purpose of the Travel *
                </label>
                <textarea
                  {...register('purpose')}
                  id="purpose"
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none ${
                    errors.purpose ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe the purpose of your business travel..."
                  aria-required="true"
                  aria-invalid={errors.purpose ? 'true' : 'false'}
                />
                {errors.purpose && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.purpose.message}
                  </p>
                )}
              </motion.div>

              {/* Need Additional Expenses */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <label 
                  htmlFor="need_extra_expenses" 
                  className="block text-sm font-semibold text-gray-900 mb-2 flex items-center"
                >
                  <DollarSign className="w-4 h-4 mr-2 text-blue-600" />
                  Need additional expenses? *
                </label>
                <select
                  {...register('need_extra_expenses')}
                  id="need_extra_expenses"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    errors.need_extra_expenses ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-required="true"
                  aria-invalid={errors.need_extra_expenses ? 'true' : 'false'}
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.need_extra_expenses && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.need_extra_expenses.message}
                  </p>
                )}
              </motion.div>

              {/* Conditional Additional Expenses Fields */}
              {needExtraExpenses === 'yes' && (
                <motion.div
                  className="space-y-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-2 text-yellow-800">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Additional Expenses Information</span>
                  </div>

                  {/* Explain Additional Expenses */}
                  <div>
                    <label 
                      htmlFor="extra_expenses_reason" 
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Explain additional expenses *
                    </label>
                    <textarea
                      {...register('extra_expenses_reason')}
                      id="extra_expenses_reason"
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none ${
                        errors.extra_expenses_reason ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Explain why additional expenses are needed..."
                      aria-required={needExtraExpenses === 'yes'}
                      aria-invalid={errors.extra_expenses_reason ? 'true' : 'false'}
                    />
                    {errors.extra_expenses_reason && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {errors.extra_expenses_reason.message}
                      </p>
                    )}
                  </div>

                  {/* Budget */}
                  <div>
                    <label 
                      htmlFor="extra_expenses_budget_usd" 
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Additional expenses budget (USD) *
                    </label>
                    <input
                      {...register('extra_expenses_budget_usd')}
                      type="number"
                      id="extra_expenses_budget_usd"
                      min="0"
                      step="0.01"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                        errors.extra_expenses_budget_usd ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="0.00"
                      aria-required={needExtraExpenses === 'yes'}
                      aria-invalid={errors.extra_expenses_budget_usd ? 'true' : 'false'}
                    />
                    {errors.extra_expenses_budget_usd && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {errors.extra_expenses_budget_usd.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Emergency Contact */}
              <motion.div
                className="grid md:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.1 }}
                viewport={{ once: true }}
              >
                <div>
                  <label 
                    htmlFor="emergency_contact" 
                    className="block text-sm font-semibold text-gray-900 mb-2 flex items-center"
                  >
                    <User className="w-4 h-4 mr-2 text-blue-600" />
                    Emergency Contact & Relationship
                  </label>
                  <input
                    {...register('emergency_contact')}
                    type="text"
                    id="emergency_contact"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Name and relationship"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="emergency_phone" 
                    className="block text-sm font-semibold text-gray-900 mb-2 flex items-center"
                  >
                    <Phone className="w-4 h-4 mr-2 text-blue-600" />
                    Emergency Contact Phone
                  </label>
                  <input
                    {...register('emergency_phone')}
                    type="tel"
                    id="emergency_phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </motion.div>

              {/* Flight and Hotel Information */}
              <motion.div
                className="grid md:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.2 }}
                viewport={{ once: true }}
              >
                <div>
                  <label 
                    htmlFor="flight_info" 
                    className="block text-sm font-semibold text-gray-900 mb-2 flex items-center"
                  >
                    <Plane className="w-4 h-4 mr-2 text-blue-600" />
                    Flight information
                  </label>
                  <input
                    {...register('flight_info')}
                    type="text"
                    id="flight_info"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Flight details, confirmation numbers"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="hotel_info" 
                    className="block text-sm font-semibold text-gray-900 mb-2 flex items-center"
                  >
                    <Building className="w-4 h-4 mr-2 text-blue-600" />
                    Hotel booking information
                  </label>
                  <input
                    {...register('hotel_info')}
                    type="text"
                    id="hotel_info"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Hotel name, confirmation numbers"
                  />
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.3 }}
                viewport={{ once: true }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center px-6 py-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-purple-600 hover:shadow-lg transform hover:-translate-y-0.5'
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
                      Submit Notification
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
            transition={{ duration: 0.4, delay: 1.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl">ℹ️</div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Important Information
                </h3>
                <ul className="text-blue-800 space-y-1 text-sm">
                  <li>• Submit notifications as early as possible for best prices</li>
                  <li>• All travel must be pre-authorized by your responsible leader</li>
                  <li>• Notifications within policy guidelines are automatically approved</li>
                  <li>• Submit expense claims within 14 days after travel</li>
                  <li>• For questions, contact the Finance team</li>
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

export default BusinessTravelNotification;