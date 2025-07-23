import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { supabase, Equipo } from '../lib/supabaseClient';
import InventoryTable from '../components/equipos/InventoryTable';
import ChartsDashboard from '../components/equipos/ChartsDashboard';

const LaptopInventory: React.FC = () => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<'inventory' | 'charts'>('inventory');

  const { data: equipos = [], isLoading, error, refetch } = useQuery({
    queryKey: ['equipos_ti'],
    queryFn: async (): Promise<Equipo[]> => {
      const { data, error } = await supabase
        .from('equipos_ti')
        .select('*')
        .order('serial_number', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });

  // Real-time subscriptions
  useEffect(() => {
    const channel = supabase
      .channel('equipos_ti_channel')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'equipos_ti' 
      }, () => {
        queryClient.invalidateQueries({ queryKey: ['equipos_ti'] });
        queryClient.invalidateQueries({ queryKey: ['equipos_charts'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ serial_number, field, value }: { serial_number: string; field: keyof Equipo; value: any }) => {
      // Convert empty date strings to null for Supabase compatibility
      if ((field === 'purchase_date') && value === '') {
        value = null;
      }
      
      const { error } = await supabase
        .from('equipos_ti')
        .update({ [field]: value })
        .eq('serial_number', serial_number);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipos_ti'] });
      queryClient.invalidateQueries({ queryKey: ['equipos_charts'] });
      showToast('Guardado ✔️', 'success');
    },
    onError: (error) => {
      console.error('Error updating equipment:', error);
      showToast('Error al guardar', 'error');
    }
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (equipo: Omit<Equipo, 'created_at' | 'updated_at'>) => {
      const { error } = await supabase
        .from('equipos_ti')
        .insert([equipo]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipos_ti'] });
      queryClient.invalidateQueries({ queryKey: ['equipos_charts'] });
      showToast('Equipo creado ✔️', 'success');
    },
    onError: (error: any) => {
      console.error('Error creating equipment:', error);
      if (error.code === '23505') {
        showToast('El número de serie ya existe', 'error');
      } else {
        showToast('Error al crear equipo', 'error');
      }
    }
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    // Simple toast implementation
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  const handleUpdate = async (serial: string, field: keyof Equipo, value: any) => {
    return updateMutation.mutateAsync({ serial_number: serial, field, value });
  };

  const handleCreate = async (equipo: Omit<Equipo, 'created_at' | 'updated_at'>) => {
    return createMutation.mutateAsync(equipo);
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen" style={{ backgroundColor: theme.background }}>
        <div className="px-6 py-4 rounded-xl" style={{
          backgroundColor: `${theme.danger}20`,
          border: `1px solid ${theme.danger}30`,
          color: theme.danger
        }}>
          Error al cargar el inventario: {(error as Error).message}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen" style={{ backgroundColor: theme.background }}>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <ComputerDesktopIcon className="h-8 w-8" style={{ color: theme.primaryAccent }} />
          <div>
            <h1 className="text-3xl font-extrabold" style={{ color: theme.textPrimary }}>
              Equipos TI
            </h1>
            <p style={{ color: theme.textSecondary }}>
              Gestión completa de inventario y análisis financiero
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 p-1 rounded-lg mb-6" style={{ backgroundColor: theme.tableHeaderBg }}>
          <button
            onClick={() => setActiveTab('inventory')}
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            style={{
              backgroundColor: activeTab === 'inventory' ? theme.background : 'transparent',
              color: activeTab === 'inventory' ? theme.primaryAccent : theme.textSecondary,
              boxShadow: activeTab === 'inventory' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Inventario
          </button>
          <button
            onClick={() => setActiveTab('charts')}
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            style={{
              backgroundColor: activeTab === 'charts' ? theme.background : 'transparent',
              color: activeTab === 'charts' ? theme.primaryAccent : theme.textSecondary,
              boxShadow: activeTab === 'charts' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Gráficas
          </button>
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'inventory' ? (
          <InventoryTable
            equipos={equipos}
            isLoading={isLoading}
            onUpdate={handleUpdate}
            onCreate={handleCreate}
            isUpdating={updateMutation.isPending}
            isCreating={createMutation.isPending}
          />
        ) : (
          <ChartsDashboard />
        )}
      </motion.div>
    </div>
  );
};

export default LaptopInventory;