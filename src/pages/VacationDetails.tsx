import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
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
}

const VacationDetails: React.FC = () => {
  const queryClient = useQueryClient();

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
    { key: 'status_while_away' as keyof VacationRequest, label: 'Status mientras fuera' },
    { key: 'manager_email' as keyof VacationRequest, label: 'Manager' },
  ];

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-6 py-4 rounded-xl">
          Error al cargar las solicitudes de vacaciones: {(error as Error).message}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-2">
          <CalendarDaysIcon className="h-8 w-8 text-white" />
          <h1 className="text-3xl font-extrabold text-white">
            Solicitudes de Vacaciones
          </h1>
        </div>
        <p className="text-white/70">
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