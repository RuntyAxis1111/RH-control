import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabaseClient';
import DataTable from '../components/DataTable';
import { 
  CalendarDaysIcon, 
  GlobeAltIcon, 
  ComputerDesktopIcon,
  TableCellsIcon
} from '@heroicons/react/24/outline';

const TableView: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const theme = useTheme();

  const tableConfig = {
    vacation_requests: {
      title: 'Solicitudes de Vacaciones',
      icon: CalendarDaysIcon,
      columns: [
        { key: 'full_name', label: 'Nombre Completo' },
        { key: 'email', label: 'Email' },
        { key: 'status_while_away', label: 'Estado durante ausencia' },
        { 
          key: 'created_at', 
          label: 'Fecha de solicitud',
          render: (value: string) => dayjs(value).format('DD/MM/YYYY HH:mm')
        }
      ]
    },
    travel_notifications: {
      title: 'Notificaciones de Viaje',
      icon: GlobeAltIcon,
      columns: [
        { key: 'full_name', label: 'Nombre Completo' },
        { key: 'email', label: 'Email' },
        { key: 'division', label: 'División' },
        { key: 'destination', label: 'Destino' },
        { 
          key: 'start_date', 
          label: 'Fecha de ida',
          render: (value: string) => dayjs(value).format('DD/MM/YYYY')
        },
        { 
          key: 'end_date', 
          label: 'Fecha de vuelta',
          render: (value: string) => dayjs(value).format('DD/MM/YYYY')
        },
        { 
          key: 'created_at', 
          label: 'Fecha de notificación',
          render: (value: string) => dayjs(value).format('DD/MM/YYYY HH:mm')
        }
      ]
    },
    it_equipment_requests: {
      title: 'Solicitudes de Equipo TI',
      icon: ComputerDesktopIcon,
      columns: [
        { key: 'requester', label: 'Solicitante' },
        { key: 'email', label: 'Email' },
        { key: 'equipment', label: 'Equipo solicitado' },
        { 
          key: 'created_at', 
          label: 'Fecha de solicitud',
          render: (value: string) => dayjs(value).format('DD/MM/YYYY HH:mm')
        }
      ]
    }
  };

  const config = name ? tableConfig[name as keyof typeof tableConfig] : null;

  const { data = [], isLoading, error, refetch } = useQuery({
    queryKey: ['table', name],
    queryFn: async () => {
      if (!name) return [];
      const { data, error } = await supabase
        .from(name)
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!name && !!config,
    refetchInterval: 30000,
  });

  if (!config) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8" style={{ backgroundColor: theme.background }}>
        <div className="px-6 py-4 rounded-xl" style={{
          backgroundColor: `${theme.danger}20`,
          border: `1px solid ${theme.danger}30`,
          color: theme.danger
        }}>
          Tabla no encontrada: {name}
        </div>
      </div>
    );
  }

  const Icon = config.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" style={{ backgroundColor: theme.background }}>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-2">
          <Icon className="h-8 w-8" style={{ color: theme.primaryAccent }} />
          <h1 className="text-3xl font-extrabold" style={{ color: theme.textPrimary }}>
            {config.title}
          </h1>
        </div>
        <p style={{ color: theme.textSecondary }}>
          {data.length} registros en total
        </p>
      </motion.div>

      {error ? (
        <div className="px-6 py-4 rounded-xl" style={{
          backgroundColor: `${theme.danger}20`,
          border: `1px solid ${theme.danger}30`,
          color: theme.danger
        }}>
          Error al cargar los datos: {(error as Error).message}
        </div>
      ) : (
        <DataTable 
          data={data} 
          columns={config.columns}
          loading={isLoading}
          tableName={name}
          onUpdate={() => refetch()}
        />
      )}
    </div>
  );
};

export default TableView;