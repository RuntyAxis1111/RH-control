import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { supabase } from '../lib/supabaseClient';
import DetailedDataTable from '../components/DetailedDataTable';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

interface TravelNotification {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  division: string;
  start_date: string;
  end_date: string;
  destination: string;
  purpose: string;
  additional_expenses_needed: boolean;
  additional_expenses_explanation: string;
  additional_expenses_budget: number;
  emergency_contact: string;
  emergency_contact_phone: string;
  flight_info: string;
  hotel_booking: string;
  review_status: 'unreviewed' | 'in_progress' | 'done';
}

const TravelDetails: React.FC = () => {
  const queryClient = useQueryClient();

  const { data = [], isLoading, error, refetch } = useQuery({
    queryKey: ['travel_notifications'],
    queryFn: async (): Promise<TravelNotification[]> => {
      const { data, error } = await supabase
        .from('travel_notifications')
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
      .channel('travel_notifications_channel')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'travel_notifications' 
      }, () => {
        queryClient.invalidateQueries({ queryKey: ['travel_notifications'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const columns = [
    { 
      key: 'created_at' as keyof TravelNotification, 
      label: 'Fecha',
      render: (value: string) => dayjs(value).format('DD/MM/YYYY HH:mm')
    },
    { key: 'full_name' as keyof TravelNotification, label: 'Nombre' },
    { key: 'email' as keyof TravelNotification, label: 'Email' },
    { key: 'division' as keyof TravelNotification, label: 'División' },
    { 
      key: 'start_date' as keyof TravelNotification, 
      label: 'Inicio viaje',
      render: (value: string) => dayjs(value).format('DD/MM/YYYY')
    },
    { 
      key: 'end_date' as keyof TravelNotification, 
      label: 'Fin',
      render: (value: string) => dayjs(value).format('DD/MM/YYYY')
    },
    { key: 'destination' as keyof TravelNotification, label: 'Destino' },
    { key: 'purpose' as keyof TravelNotification, label: 'Propósito' },
  ];

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-6 py-4 rounded-xl">
          Error al cargar las notificaciones de viaje: {(error as Error).message}
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
          <GlobeAltIcon className="h-8 w-8 text-white" />
          <h1 className="text-3xl font-extrabold text-white">
            Notificaciones de Viaje
          </h1>
        </div>
        <p className="text-white/70">
          {data.length} notificaciones en total
        </p>
      </motion.div>

      <DetailedDataTable 
        rows={data}
        columns={columns}
        loading={isLoading}
        tableName="travel_notifications"
        onUpdate={() => refetch()}
      />
    </div>
  );
};

export default TravelDetails;