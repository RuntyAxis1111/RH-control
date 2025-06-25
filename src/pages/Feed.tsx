import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { supabase, FeedItem, VacationRequest, TravelNotification, ItEquipmentRequest } from '../lib/supabaseClient';
import FeedCard from '../components/FeedCard';
import { BellIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';

const Feed: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: feed = [], isLoading, error, refetch } = useQuery({
    queryKey: ['feed'],
    queryFn: async (): Promise<FeedItem[]> => {
      const [vacationRes, travelRes, itRes] = await Promise.all([
        supabase.from('vacation_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('travel_notifications').select('*').order('created_at', { ascending: false }),
        supabase.from('it_equipment_requests').select('*').order('created_at', { ascending: false })
      ]);

      if (vacationRes.error) throw vacationRes.error;
      if (travelRes.error) throw travelRes.error;
      if (itRes.error) throw itRes.error;

      const vacationItems: FeedItem[] = (vacationRes.data as VacationRequest[]).map(item => ({
        id: item.id,
        created_at: item.created_at,
        full_name: item.full_name,
        email: item.email,
        type: 'Vacaciones' as const,
        summary: `${item.full_name} ha solicitado vacaciones con estado: ${item.status_while_away}`,
        details: {
          status_while_away: item.status_while_away
        },
        review_status: item.review_status,
        table: 'vacation_requests'
      }));

      const travelItems: FeedItem[] = (travelRes.data as TravelNotification[]).map(item => ({
        id: item.id,
        created_at: item.created_at,
        full_name: item.full_name,
        email: item.email,
        type: 'Viaje' as const,
        summary: `${item.full_name} viajará a ${item.destination} desde ${dayjs(item.start_date).format('DD/MM')} hasta ${dayjs(item.end_date).format('DD/MM')}`,
        details: {
          division: item.division,
          destination: item.destination,
          start_date: dayjs(item.start_date).format('DD/MM/YYYY'),
          end_date: dayjs(item.end_date).format('DD/MM/YYYY')
        },
        review_status: item.review_status,
        table: 'travel_notifications'
      }));

      const itItems: FeedItem[] = (itRes.data as ItEquipmentRequest[]).map(item => ({
        id: item.id,
        created_at: item.created_at,
        requester: item.requester,
        email: item.email,
        type: 'Equipo TI' as const,
        summary: `${item.requester} ha solicitado equipo: ${item.equipment}`,
        details: {
          equipment: item.equipment
        },
        review_status: item.review_status,
        table: 'it_equipment_requests'
      }));

      const allItems = [...vacationItems, ...travelItems, ...itItems];
      
      return allItems
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 50);
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Real-time subscriptions
  useEffect(() => {
    const channel = supabase
      .channel('*')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vacation_requests' }, () => {
        queryClient.invalidateQueries({ queryKey: ['feed'] });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'travel_notifications' }, () => {
        queryClient.invalidateQueries({ queryKey: ['feed'] });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'it_equipment_requests' }, () => {
        queryClient.invalidateQueries({ queryKey: ['feed'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-6 py-4 rounded-xl">
          Error al cargar el feed: {(error as Error).message}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-2">
          <BellIcon className="h-8 w-8 text-white" />
          <h1 className="text-3xl font-extrabold text-white">
            Últimas actualizaciones
          </h1>
        </div>
        <p className="text-white/70">
          Mantente al día con todas las novedades del equipo
        </p>
      </motion.div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 animate-pulse shadow-inner shadow-white/5">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-white/20 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-white/10 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-white/20 rounded-full w-20"></div>
              </div>
              <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
              <div className="h-4 bg-white/10 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : feed.length === 0 ? (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-inner shadow-white/5">
            <BellIcon className="h-12 w-12 text-white/60 mx-auto mb-4" />
            <p className="text-white/80 text-lg">No hay actualizaciones recientes</p>
            <p className="text-white/60 text-sm mt-2">Las nuevas notificaciones aparecerán aquí</p>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {feed.map((item, index) => (
            <FeedCard key={item.id} item={item} index={index} onUpdate={() => refetch()} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;