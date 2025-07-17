import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { 
  ComputerDesktopIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
  CheckIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabaseClient';

interface Equipo {
  serial_number: string;
  model: 'mac_pro' | 'mac_air' | 'lenovo';
  assigned_to: string | null;
  insured: boolean;
  created_at: string;
  updated_at: string;
}

const MODEL_OPTIONS = [
  { label: 'Mac Pro', value: 'mac_pro' },
  { label: 'Mac Air', value: 'mac_air' },
  { label: 'Lenovo', value: 'lenovo' },
];

const MODEL_LABELS = {
  mac_pro: 'Mac Pro',
  mac_air: 'Mac Air',
  lenovo: 'Lenovo'
};

const LaptopInventory: React.FC = () => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Equipo>('serial_number');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [editingCell, setEditingCell] = useState<{ serial: string; field: keyof Equipo } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [newEquipo, setNewEquipo] = useState({
    serial_number: '',
    model: 'mac_pro' as const,
    assigned_to: '',
    insured: false
  });

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
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ serial_number, field, value }: { serial_number: string; field: keyof Equipo; value: any }) => {
      const { error } = await supabase
        .from('equipos_ti')
        .update({ [field]: value })
        .eq('serial_number', serial_number);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipos_ti'] });
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
      setShowNewModal(false);
      setNewEquipo({
        serial_number: '',
        model: 'mac_pro',
        assigned_to: '',
        insured: false
      });
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

  const filteredEquipos = equipos.filter(equipo =>
    equipo.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    MODEL_LABELS[equipo.model].toLowerCase().includes(searchTerm.toLowerCase()) ||
    (equipo.assigned_to && equipo.assigned_to.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedEquipos = [...filteredEquipos].sort((a, b) => {
    const aValue = a[sortField] || '';
    const bValue = b[sortField] || '';
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSort = (field: keyof Equipo) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleCellClick = (serial: string, field: keyof Equipo, currentValue: any) => {
    if (field === 'serial_number') return; // Read-only for existing items
    
    setEditingCell({ serial, field });
    setEditValue(currentValue || '');
  };

  const handleCellSave = async () => {
    if (!editingCell) return;
    
    let value: any = editValue;
    if (editingCell.field === 'insured') {
      value = editValue === 'true';
    }
    
    await updateMutation.mutateAsync({
      serial_number: editingCell.serial,
      field: editingCell.field,
      value
    });
    
    setEditingCell(null);
  };

  const handleCellCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCellSave();
    } else if (e.key === 'Escape') {
      handleCellCancel();
    }
  };

  const handleCreateEquipo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEquipo.serial_number.trim() || !newEquipo.model) return;
    
    await createMutation.mutateAsync({
      serial_number: newEquipo.serial_number.trim(),
      model: newEquipo.model,
      assigned_to: newEquipo.assigned_to.trim() || null,
      insured: newEquipo.insured
    });
  };

  const renderCell = (equipo: Equipo, field: keyof Equipo) => {
    const isEditing = editingCell?.serial === equipo.serial_number && editingCell?.field === field;
    const value = equipo[field];
    
    if (isEditing) {
      if (field === 'model') {
        return (
          <select
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleCellSave}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2"
            style={{
              backgroundColor: theme.background,
              borderColor: theme.primaryAccent,
              color: theme.textPrimary
            }}
          >
            {MODEL_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      } else if (field === 'insured') {
        return (
          <select
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleCellSave}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2"
            style={{
              backgroundColor: theme.background,
              borderColor: theme.primaryAccent,
              color: theme.textPrimary
            }}
          >
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        );
      } else {
        return (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleCellSave}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2"
            style={{
              backgroundColor: theme.background,
              borderColor: theme.primaryAccent,
              color: theme.textPrimary
            }}
          />
        );
      }
    }

    // Display value
    let displayValue: React.ReactNode = value || '-';
    
    if (field === 'model') {
      displayValue = MODEL_LABELS[value as keyof typeof MODEL_LABELS];
    } else if (field === 'insured') {
      displayValue = (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Sí' : 'No'}
        </span>
      );
    }

    const isClickable = field !== 'serial_number';
    
    return (
      <div
        className={`px-3 py-2 text-sm ${isClickable ? 'cursor-pointer hover:bg-gray-50' : ''}`}
        onClick={() => isClickable && handleCellClick(equipo.serial_number, field, value)}
        style={{ color: theme.textPrimary }}
      >
        {displayValue}
      </div>
    );
  };

  const getSortIcon = (field: keyof Equipo) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUpIcon className="h-4 w-4" /> : 
      <ChevronDownIcon className="h-4 w-4" />;
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8" style={{ backgroundColor: theme.background }}>
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
    <div className="max-w-7xl mx-auto px-4 py-8" style={{ backgroundColor: theme.background }}>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <ComputerDesktopIcon className="h-8 w-8" style={{ color: theme.primaryAccent }} />
            <div>
              <h1 className="text-3xl font-extrabold" style={{ color: theme.textPrimary }}>
                Inventario de Equipos TI
              </h1>
              <p style={{ color: theme.textSecondary }}>
                {sortedEquipos.length} equipos en total
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: theme.primaryAccent }}
          >
            <PlusIcon className="h-4 w-4" />
            <span>Nuevo equipo</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: theme.textSecondary }} />
          <input
            type="text"
            placeholder="Buscar por serie, modelo o asignado..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent"
            style={{
              backgroundColor: theme.background,
              borderColor: theme.tableBorder,
              color: theme.textPrimary
            }}
          />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        className="rounded-xl overflow-hidden"
        style={{
          backgroundColor: theme.background,
          border: `1px solid ${theme.tableBorder}`
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isLoading ? (
          <div className="p-8">
            <div className="animate-pulse">
              <div className="h-4 rounded w-1/4 mb-4" style={{ backgroundColor: theme.tableBorder }}></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 rounded" style={{ backgroundColor: theme.surfaceAlt }}></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: theme.tableHeaderBg }}>
                <tr>
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    style={{ color: theme.textSecondary }}
                    onClick={() => handleSort('serial_number')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Número de serie</span>
                      {getSortIcon('serial_number')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    style={{ color: theme.textSecondary }}
                    onClick={() => handleSort('model')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Modelo</span>
                      {getSortIcon('model')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    style={{ color: theme.textSecondary }}
                    onClick={() => handleSort('assigned_to')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Asignado a</span>
                      {getSortIcon('assigned_to')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    style={{ color: theme.textSecondary }}
                    onClick={() => handleSort('insured')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>¿Asegurado?</span>
                      {getSortIcon('insured')}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: theme.tableBorder }}>
                {sortedEquipos.map((equipo, index) => (
                  <motion.tr
                    key={equipo.serial_number}
                    className="transition-colors hover:bg-gray-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <td>{renderCell(equipo, 'serial_number')}</td>
                    <td>{renderCell(equipo, 'model')}</td>
                    <td>{renderCell(equipo, 'assigned_to')}</td>
                    <td>{renderCell(equipo, 'insured')}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* New Equipment Modal */}
      <AnimatePresence>
        {showNewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="fixed inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNewModal(false)}
            />
            
            <motion.div
              className="relative w-full max-w-md rounded-lg shadow-xl"
              style={{ 
                backgroundColor: theme.background,
                border: `1px solid ${theme.tableBorder}`
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: theme.tableBorder }}>
                <h2 className="text-xl font-semibold" style={{ color: theme.textPrimary }}>
                  Nuevo Equipo
                </h2>
                <button
                  onClick={() => setShowNewModal(false)}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: theme.textSecondary }}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreateEquipo} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                    Número de Serie *
                  </label>
                  <input
                    type="text"
                    required
                    value={newEquipo.serial_number}
                    onChange={(e) => setNewEquipo(prev => ({ ...prev, serial_number: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: theme.background,
                      borderColor: theme.tableBorder,
                      color: theme.textPrimary
                    }}
                    placeholder="Ej: ABC123456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                    Modelo *
                  </label>
                  <select
                    required
                    value={newEquipo.model}
                    onChange={(e) => setNewEquipo(prev => ({ ...prev, model: e.target.value as any }))}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: theme.background,
                      borderColor: theme.tableBorder,
                      color: theme.textPrimary
                    }}
                  >
                    {MODEL_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                    Asignado a
                  </label>
                  <input
                    type="text"
                    value={newEquipo.assigned_to}
                    onChange={(e) => setNewEquipo(prev => ({ ...prev, assigned_to: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: theme.background,
                      borderColor: theme.tableBorder,
                      color: theme.textPrimary
                    }}
                    placeholder="Nombre del empleado"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newEquipo.insured}
                      onChange={(e) => setNewEquipo(prev => ({ ...prev, insured: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm font-medium" style={{ color: theme.textPrimary }}>
                      ¿Asegurado?
                    </span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewModal(false)}
                    className="px-4 py-2 rounded-lg border transition-colors"
                    style={{ 
                      borderColor: theme.tableBorder,
                      color: theme.textSecondary
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={createMutation.isPending || !newEquipo.serial_number.trim()}
                    className="px-4 py-2 rounded-lg text-white transition-colors disabled:opacity-50"
                    style={{ backgroundColor: theme.primaryAccent }}
                  >
                    {createMutation.isPending ? 'Creando...' : 'Crear Equipo'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LaptopInventory;