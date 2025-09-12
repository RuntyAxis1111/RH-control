import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabaseClient';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface WorkflowStepEditorProps {
  requestId: string;
  currentSteps: {
    step1_auth_manager: 'pendiente' | 'aprobado' | 'rechazado';
    step2_auth_rh: 'pendiente' | 'aprobado' | 'rechazado';
    step3_contract_signature: 'pendiente' | 'enviado' | 'recibido';
    step4_congratulations_email: 'pendiente' | 'listo';
  };
  onUpdate?: () => void;
}

const WorkflowStepEditor: React.FC<WorkflowStepEditorProps> = ({
  requestId,
  currentSteps,
  onUpdate
}) => {
  const theme = useTheme();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const steps = [
    { 
      key: 'step1_auth_manager', 
      label: 'Paso 1: AUT MANAGER', 
      value: currentSteps.step1_auth_manager,
      options: [
        { value: 'pendiente', label: 'Pendiente' },
        { value: 'aprobado', label: 'Aprobado' },
        { value: 'rechazado', label: 'Rechazado' }
      ]
    },
    { 
      key: 'step2_auth_rh', 
      label: 'Paso 2: AUT RH', 
      value: currentSteps.step2_auth_rh,
      options: [
        { value: 'pendiente', label: 'Pendiente' },
        { value: 'aprobado', label: 'Aprobado' },
        { value: 'rechazado', label: 'Rechazado' }
      ]
    },
    { 
      key: 'step3_contract_signature', 
      label: 'Paso 3: Firma de contrato', 
      value: currentSteps.step3_contract_signature,
      options: [
        { value: 'pendiente', label: 'Pendiente' },
        { value: 'enviado', label: 'Enviado' },
        { value: 'recibido', label: 'Recibido' }
      ]
    },
    { 
      key: 'step4_congratulations_email', 
      label: 'Paso 4: Email Felicitaciones', 
      value: currentSteps.step4_congratulations_email,
      options: [
        { value: 'pendiente', label: 'Pendiente' },
        { value: 'listo', label: 'Listo' }
      ]
    }
  ];

  const getStepColor = (value: string) => {
    switch (value) {
      case 'aprobado':
      case 'recibido':
      case 'listo':
        return { backgroundColor: theme.success, color: '#FFFFFF' };
      case 'rechazado':
        return { backgroundColor: theme.danger, color: '#FFFFFF' };
      case 'enviado':
        return { backgroundColor: theme.warning, color: '#000000' };
      default:
        return { backgroundColor: theme.grey, color: '#000000' };
    }
  };

  const isWorkflowComplete = 
    currentSteps.step1_auth_manager === 'aprobado' &&
    currentSteps.step2_auth_rh === 'aprobado' &&
    currentSteps.step3_contract_signature === 'recibido' &&
    currentSteps.step4_congratulations_email === 'listo';

  const handleStepUpdate = async (stepKey: string, newValue: string) => {
    setIsUpdating(stepKey);
    
    try {
      const { error } = await supabase
        .from('vacation_requests')
        .update({ [stepKey]: newValue })
        .eq('id', requestId);
      
      if (error) throw error;
      
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error updating workflow step:', error);
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
      isWorkflowComplete 
        ? 'border-green-500 bg-green-50' 
        : 'border-gray-200 bg-gray-50'
    }`}>
      {/* Workflow Complete Banner */}
      {isWorkflowComplete && (
        <motion.div
          className="mb-4 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-500 text-white">
            <CheckIcon className="h-4 w-4 mr-2" />
            ✅ Workflow Completado
          </span>
        </motion.div>
      )}

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.key}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="text-xs font-medium mb-2" style={{ color: theme.textSecondary }}>
              {step.label}
            </div>
            
            <select
              value={step.value}
              onChange={(e) => handleStepUpdate(step.key, e.target.value)}
              disabled={isUpdating === step.key}
              className="w-full px-3 py-2 rounded-lg border text-xs font-medium focus:outline-none focus:ring-2 transition-all"
              style={{
                ...getStepColor(step.value),
                borderColor: getStepColor(step.value).backgroundColor,
                focusRingColor: theme.primaryAccent
              }}
            >
              {step.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            {isUpdating === step.key && (
              <div className="mt-1 text-xs" style={{ color: theme.textSecondary }}>
                Guardando...
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs mb-1" style={{ color: theme.textSecondary }}>
          <span>Progreso del workflow</span>
          <span>{Math.round((steps.filter(s => s.value !== 'pendiente').length / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="h-2 rounded-full transition-all duration-500"
            style={{ 
              backgroundColor: isWorkflowComplete ? theme.success : theme.primaryAccent,
              width: `${(steps.filter(s => s.value !== 'pendiente').length / steps.length) * 100}%`
            }}
            initial={{ width: 0 }}
            animate={{ width: `${(steps.filter(s => s.value !== 'pendiente').length / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkflowStepEditor;