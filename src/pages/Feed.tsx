import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { supabase, FeedItem, VacationRequest, TravelNotification, ItEquipmentRequest } from '../lib/supabaseClient';
import FeedCard from '../components/FeedCard';
import { BellIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';

const Feed: React.FC = () => {
  const queryClient = useQueryClient();
  const theme = useTheme();

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
      <div className="max-w-4xl mx-auto px-4 py-8" style={{ backgroundColor: theme.background }}>
        <div className="px-6 py-4 rounded-xl" style={{
          backgroundColor: `${theme.danger}20`,
          border: `1px solid ${theme.danger}30`,
          color: theme.danger
        }}>
          Error al cargar el feed: {(error as Error).message}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" style={{ backgroundColor: theme.background }}>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-2">
          <BellIcon className="h-8 w-8" style={{ color: theme.primaryAccent }} />
          <h1 className="text-3xl font-extrabold" style={{ color: theme.textPrimary }}>
            Últimas actualizaciones
          </h1>
        </div>
        <p style={{ color: theme.textSecondary }}>
          Mantente al día con todas las novedades del equipo
        </p>
      </motion.div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-xl p-6 animate-pulse" style={{
              backgroundColor: theme.surfaceAlt,
              border: `1px solid ${theme.tableBorder}`
            }}>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: theme.tableBorder }}></div>
                <div className="flex-1">
                  <div className="h-4 rounded w-1/3 mb-2" style={{ backgroundColor: theme.tableBorder }}></div>
                  <div className="h-3 rounded w-1/2" style={{ backgroundColor: theme.surfaceAlt }}></div>
                </div>
                <div className="h-6 rounded-full w-20" style={{ backgroundColor: theme.tableBorder }}></div>
              </div>
              <div className="h-4 rounded w-full mb-2" style={{ backgroundColor: theme.surfaceAlt }}></div>
              <div className="h-4 rounded w-2/3" style={{ backgroundColor: theme.surfaceAlt }}></div>
            </div>
          ))}
        </div>
      ) : feed.length === 0 ? (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="rounded-xl p-8" style={{
            backgroundColor: theme.surfaceAlt,
            border: `1px solid ${theme.tableBorder}`
          }}>
            <BellIcon className="h-12 w-12 mx-auto mb-4" style={{ color: theme.textSecondary }} />
            <p className="text-lg" style={{ color: theme.textPrimary }}>No hay actualizaciones recientes</p>
            <p className="text-sm mt-2" style={{ color: theme.textSecondary }}>Las nuevas notificaciones aparecerán aquí</p>
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