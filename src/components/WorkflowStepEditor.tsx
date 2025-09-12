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
        return { backgroundColor: '#00C875', color: '#FFFFFF', borderColor: '#00C875' };
      case 'rechazado':
        return { backgroundColor: '#E2445C', color: '#FFFFFF', borderColor: '#E2445C' };
      case 'enviado':
        return { backgroundColor: '#FFCB00', color: '#000000', borderColor: '#FFCB00' };
      default:
        return { backgroundColor: '#C4C4C4', color: '#000000', borderColor: '#C4C4C4' };
    }
  };

  // Lógica mejorada para calcular progreso
  const getStepProgress = (value: string) => {
    switch (value) {
      case 'aprobado':
      case 'recibido':
      case 'listo':
        return 1; // Completado
      case 'enviado':
        return 0.5; // Parcialmente completado
      case 'rechazado':
        return 0; // Rechazado cuenta como 0
      default:
        return 0; // Pendiente
    }
  };

  const totalProgress = steps.reduce((sum, step) => sum + getStepProgress(step.value), 0);
  const progressPercent = (totalProgress / steps.length) * 100;
  
  // Determinar si hay algún rechazo
  const hasRejection = steps.some(step => step.value === 'rechazado');
  
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
    <div className="p-6 rounded-xl border transition-all duration-300" style={{
      backgroundColor: theme.surfaceAlt,
      borderColor: isWorkflowComplete ? '#00C875' : hasRejection ? '#E2445C' : theme.tableBorder
    }}>
      {/* Workflow Complete Banner */}
      {isWorkflowComplete && (
        <motion.div
          className="mb-4 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white" style={{ backgroundColor: '#00C875' }}>
            <CheckIcon className="h-4 w-4 mr-2" />
            ✅ Workflow Completado
          </span>
        </motion.div>
      )}

      {/* Rejection Banner */}
      {hasRejection && !isWorkflowComplete && (
        <motion.div
          className="mb-4 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white" style={{ backgroundColor: '#E2445C' }}>
            <XMarkIcon className="h-4 w-4 mr-2" />
            ❌ Solicitud Rechazada
          </span>
        </motion.div>
      )}

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.key}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: theme.textSecondary }}>
              {step.label}
            </div>
            
            <select
              value={step.value}
              onChange={(e) => handleStepUpdate(step.key, e.target.value)}
              disabled={isUpdating === step.key}
              className="w-full px-3 py-2 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 transition-all border-2"
              style={{
                ...getStepColor(step.value),
                focusRingColor: theme.primaryAccent,
                boxShadow: step.value === 'aprobado' || step.value === 'recibido' || step.value === 'listo' 
                  ? '0 0 0 3px rgba(0, 200, 117, 0.2)' 
                  : step.value === 'rechazado' 
                  ? '0 0 0 3px rgba(226, 68, 92, 0.2)' 
                  : 'none'
              }}
            >
              {step.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            {isUpdating === step.key && (
              <div className="mt-2 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-sm font-medium mb-2" style={{ color: theme.textSecondary }}>
          <span>Progreso del workflow</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-3 rounded-full transition-all duration-700 ease-out"
            style={{ 
              backgroundColor: hasRejection ? '#E2445C' : isWorkflowComplete ? '#00C875' : '#0073EA',
              width: `${progressPercent}%`
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </div>
        
        {/* Progress Text */}
        <div className="mt-2 text-center">
          <span className={`text-sm font-bold ${
            hasRejection ? 'text-red-600' : 
            isWorkflowComplete ? 'text-green-600' : 
            'text-blue-600'
          }`}>
            {hasRejection ? '❌ Rechazado' : 
             isWorkflowComplete ? '✅ Completado' : 
             `🔄 En progreso (${Math.round(progressPercent)}%)`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WorkflowStepEditor;