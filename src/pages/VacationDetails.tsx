import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabaseClient';
import DetailedDataTable from '../components/DetailedDataTable';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

interface VacationRequest {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  start_date: string;
  end_date: string;
  status_while_away: string;
  manager_email: string;
  comments: string;
  review_status: 'unreviewed' | 'in_progress' | 'done';
  step1_auth_manager?: 'pendiente' | 'aprobado' | 'rechazado' | null;
  step2_auth_rh?: 'pendiente' | 'aprobado' | 'rechazado' | null;
  step3_contract_signature?: 'pendiente' | 'enviado' | 'recibido' | null;
  step4_congratulations_email?: 'pendiente' | 'listo' | null;
}

// Componente para mostrar el progreso del workflow
const WorkflowProgress: React.FC<{ request: VacationRequest }> = ({ request }) => {
  const theme = useTheme();
  
  const steps = [
    { 
      key: 'step1_auth_manager', 
      label: 'Paso 1: AUT MANAGER', 
      value: request.step1_auth_manager || 'pendiente',
      options: ['pendiente', 'aprobado', 'rechazado']
    },
    { 
      key: 'step2_auth_rh', 
      label: 'Paso 2: AUT RH', 
      value: request.step2_auth_rh || 'pendiente',
      options: ['pendiente', 'aprobado', 'rechazado']
    },
    { 
      key: 'step3_contract_signature', 
      label: 'Paso 3: Firma de contrato', 
      value: request.step3_contract_signature || 'pendiente',
      options: ['pendiente', 'enviado', 'recibido']
    },
    { 
      key: 'step4_congratulations_email', 
      label: 'Paso 4: Email Felicitaciones', 
      value: request.step4_congratulations_email || 'pendiente',
      options: ['pendiente', 'listo']
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
    (request.step1_auth_manager || 'pendiente') === 'aprobado' &&
    (request.step2_auth_rh || 'pendiente') === 'aprobado' &&
    (request.step3_contract_signature || 'pendiente') === 'recibido' &&
    (request.step4_congratulations_email || 'pendiente') === 'listo';

  return (
    <div className={`p-4 rounded-lg border-2 ${isWorkflowComplete ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map((step, index) => (
          <div key={step.key} className="text-center">
            <div className="text-xs font-medium mb-2" style={{ color: theme.textSecondary }}>
              {step.label}
            </div>
            <div 
              className="px-3 py-2 rounded-full text-xs font-medium border"
              style={{
                ...getStepColor(step.value),
                borderColor: getStepColor(step.value).backgroundColor
              }}
            >
              {step.value.charAt(0).toUpperCase() + step.value.slice(1)}
            </div>
          </div>
        ))}
      </div>
      {isWorkflowComplete && (
        <div className="mt-3 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white">
            ✅ Workflow Completado
          </span>
        </div>
      )}
    </div>
  );
};
const VacationDetails: React.FC = () => {
  const queryClient = useQueryClient();
  const theme = useTheme();

  const { data = [], isLoading, error, refetch } = useQuery({
    queryKey: ['vacation_requests'],
    queryFn: async (): Promise<VacationRequest[]> => {
      const { data, error } = await supabase
        .from('vacation_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });

  // Real-time subscriptions
  useEffect(() => {
    const channel = supabase
      .channel('vacation_requests_channel')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'vacation_requests' 
      }, () => {
        queryClient.invalidateQueries({ queryKey: ['vacation_requests'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const columns = [
    { 
      key: 'created_at' as keyof VacationRequest, 
      label: 'Fecha',
      render: (value: string) => dayjs(value).format('DD/MM/YYYY HH:mm')
    },
    { key: 'full_name' as keyof VacationRequest, label: 'Nombre' },
    { key: 'email' as keyof VacationRequest, label: 'Email' },
    { 
      key: 'start_date' as keyof VacationRequest, 
      label: 'Inicio',
      render: (value: string) => dayjs(value).format('DD/MM/YYYY')
    },
    { 
      key: 'end_date' as keyof VacationRequest, 
      label: 'Fin',
      render: (value: string) => dayjs(value).format('DD/MM/YYYY')
    },
    { key: 'manager_email' as keyof VacationRequest, label: 'Manager' },
    {
      key: 'workflow_progress' as keyof VacationRequest,
      label: 'Progreso del Workflow',
      render: (value: any, row: VacationRequest) => {
        const steps = [
          { value: row.step1_auth_manager || 'pendiente', label: 'Manager' },
          { value: row.step2_auth_rh || 'pendiente', label: 'RH' },
          { value: row.step3_contract_signature || 'pendiente', label: 'Contrato' },
          { value: row.step4_congratulations_email || 'pendiente', label: 'Email' }
        ];
        
        const completedSteps = steps.filter(s => 
          s.value === 'aprobado' || s.value === 'recibido' || s.value === 'listo'
        );
        
        const hasRejection = steps.some(s => s.value === 'rechazado');
        const totalProgress = steps.reduce((sum, step) => {
          switch (step.value) {
            case 'aprobado':
            case 'recibido':
            case 'listo':
              return sum + 1;
            case 'enviado':
              return sum + 0.5;
            default:
              return sum;
          }
        }, 0);
        
        const isComplete = completedSteps.length === 4;
        const progressPercent = (totalProgress / 4) * 100;
        
        return (
          <div className="min-w-[140px]">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    backgroundColor: hasRejection ? '#E2445C' : isComplete ? '#00C875' : '#0073EA',
                    width: `${progressPercent}%`
                  }}
                />
              </div>
              <span className="text-xs font-bold" style={{ 
                color: hasRejection ? '#E2445C' : isComplete ? '#00C875' : theme.textSecondary 
              }}>
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="text-center">
              <div className={`text-xs font-bold ${
                hasRejection ? 'text-red-600' : 
                isComplete ? 'text-green-600' : 
                'text-blue-600'
              }`}>
                {hasRejection ? '❌ Rechazado' : 
                 isComplete ? '✅ Completo' : 
                 `🔄 ${completedSteps.length}/4`}
              </div>
            </div>
          </div>
        );
      }
    }
  ];

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8" style={{ backgroundColor: theme.background }}>
        <div className="px-6 py-4 rounded-xl" style={{
          backgroundColor: `${theme.danger}20`,
          border: `1px solid ${theme.danger}30`,
          color: theme.danger
        }}>
          Error al cargar las solicitudes de vacaciones: {(error as Error).message}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" style={{ backgroundColor: theme.background }}>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-2">
          <CalendarDaysIcon className="h-8 w-8" style={{ color: theme.primaryAccent }} />
          <h1 className="text-3xl font-extrabold" style={{ color: theme.textPrimary }}>
            Solicitudes de Vacaciones
          </h1>
        </div>
        <p style={{ color: theme.textSecondary }}>
          {data.length} solicitudes en total
        </p>
      </motion.div>

      <DetailedDataTable 
        rows={data}
        columns={columns}
        loading={isLoading}
        tableName="vacation_requests"
        onUpdate={() => refetch()}
      />
    </div>
  );
};

export default VacationDetails;