import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { 
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
  PencilSquareIcon,
  CheckIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabaseClient';
import dayjs from 'dayjs';

interface VacationRecord {
  id: string;
  employee_name: string;
  imss_enrolled: string | null;
  contract_signed: string | null;
  vacations_remaining: number;
  auth_rh: 'pending' | 'approved' | 'rejected';
  auth_manager: 'pending' | 'approved' | 'rejected';
  periods_taken: string[] | null;
  created_at: string;
  updated_at: string;
}

const AUTH_OPTIONS = [
  { label: 'Pending', value: 'pending', color: '#FFCB00' },
  { label: 'Approved', value: 'approved', color: '#00C875' },
  { label: 'Rejected', value: 'rejected', color: '#E2445C' },
];

const VacationRegistry: React.FC = () => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof VacationRecord>('employee_name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [editingCell, setEditingCell] = useState<{ id: string; field: keyof VacationRecord } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    employee_name: '',
    imss_enrolled: '',
    contract_signed: '',
    vacations_remaining: 15,
    auth_rh: 'pending' as const,
    auth_manager: 'pending' as const,
    periods_taken: [] as string[]
  });

  const { data: records = [], isLoading, error, refetch } = useQuery({
    queryKey: ['vacaciones_registro'],
    queryFn: async (): Promise<VacationRecord[]> => {
      const { data, error } = await supabase
        .from('vacaciones_registro')
        .select('*')
        .order('employee_name', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });

  // Real-time subscriptions
  useEffect(() => {
    const channel = supabase
      .channel('vacaciones_registro_channel')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'vacaciones_registro' 
      }, () => {
        queryClient.invalidateQueries({ queryKey: ['vacaciones_registro'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, field, value }: { id: string; field: keyof VacationRecord; value: any }) => {
      const { error } = await supabase
        .from('vacaciones_registro')
        .update({ [field]: value })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacaciones_registro'] });
      showToast('Guardado ✔️', 'success');
    },
    onError: (error) => {
      console.error('Error updating record:', error);
      showToast('Error al guardar', 'error');
    }
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (record: Omit<VacationRecord, 'id' | 'created_at' | 'updated_at'>) => {
      const { error } = await supabase
        .from('vacaciones_registro')
        .insert([{
          ...record,
          imss_enrolled: record.imss_enrolled || null,
          contract_signed: record.contract_signed || null,
          periods_taken: record.periods_taken.length > 0 ? record.periods_taken : null
        }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacaciones_registro'] });
      setShowNewModal(false);
      setNewRecord({
        employee_name: '',
        imss_enrolled: '',
        contract_signed: '',
        vacations_remaining: 15,
        auth_rh: 'pending',
        auth_manager: 'pending',
        periods_taken: []
      });
      showToast('Empleado creado ✔️', 'success');
    },
    onError: (error: any) => {
      console.error('Error creating record:', error);
      showToast('Error al crear empleado', 'error');
    }
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  const filteredRecords = records.filter(record =>
    record.employee_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    const aValue = a[sortField] || '';
    const bValue = b[sortField] || '';
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSort = (field: keyof VacationRecord) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleCellClick = (id: string, field: keyof VacationRecord, currentValue: any) => {
    if (field === 'id' || field === 'created_at' || field === 'updated_at') return;
    
    setEditingCell({ id, field });
    if (field === 'periods_taken') {
      setEditValue(Array.isArray(currentValue) ? currentValue.join(', ') : '');
    } else {
      setEditValue(currentValue || '');
    }
  };

  const handleCellSave = async () => {
    if (!editingCell) return;
    
    let value: any = editValue;
    
    // Convert empty strings to null for date fields
    if ((editingCell.field === 'imss_enrolled' || editingCell.field === 'contract_signed') && editValue === '') {
      value = null;
    } else if (editingCell.field === 'vacations_remaining') {
      value = parseInt(editValue) || 0;
      if (value < 0) {
        showToast('El saldo no puede ser negativo', 'error');
        return;
      }
    } else if (editingCell.field === 'periods_taken') {
      value = editValue.split(',').map(p => p.trim()).filter(p => p.length > 0);
    }
    
    await updateMutation.mutateAsync({
      id: editingCell.id,
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

  const handleCreateRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecord.employee_name.trim()) return;
    
    await createMutation.mutateAsync(newRecord);
  };

  const renderAuthChip = (value: string) => {
    const option = AUTH_OPTIONS.find(opt => opt.value === value);
    if (!option) return value;
    
    return (
      <span 
        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-white"
        style={{ backgroundColor: option.color }}
      >
        {option.label}
      </span>
    );
  };

  const renderCell = (record: VacationRecord, field: keyof VacationRecord) => {
    const isEditing = editingCell?.id === record.id && editingCell?.field === field;
    const value = record[field];
    
    if (isEditing) {
      if (field === 'auth_rh' || field === 'auth_manager') {
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
            {AUTH_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      } else if (field === 'imss_enrolled' || field === 'contract_signed') {
        return (
          <input
            type="date"
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
      } else if (field === 'vacations_remaining') {
        return (
          <input
            type="number"
            min="0"
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
    
    if (field === 'auth_rh' || field === 'auth_manager') {
      displayValue = renderAuthChip(value as string);
    } else if (field === 'imss_enrolled' || field === 'contract_signed') {
      displayValue = value ? dayjs(value as string).format('DD/MM/YYYY') : '-';
    } else if (field === 'periods_taken') {
      const periods = Array.isArray(value) ? value : [];
      displayValue = periods.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {periods.map((period, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {period}
            </span>
          ))}
        </div>
      ) : '-';
    } else if (field === 'vacations_remaining') {
      displayValue = (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{value}</span>
          <span className="text-xs text-gray-500">días</span>
        </div>
      );
    }

    const isClickable = !['id', 'created_at', 'updated_at'].includes(field);
    const needsDoubleClick = field === 'vacations_remaining';
    
    return (
      <div
        className={`px-3 py-2 text-sm ${isClickable ? 'cursor-pointer hover:bg-gray-50' : ''}`}
        onClick={() => isClickable && !needsDoubleClick && handleCellClick(record.id, field, value)}
        onDoubleClick={() => isClickable && needsDoubleClick && handleCellClick(record.id, field, value)}
        style={{ color: theme.textPrimary }}
        title={needsDoubleClick ? 'Doble clic para editar' : ''}
      >
        {displayValue}
      </div>
    );
  };

  const getSortIcon = (field: keyof VacationRecord) => {
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
          Error al cargar el registro de vacaciones: {(error as Error).message}
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
            <ClipboardDocumentListIcon className="h-8 w-8" style={{ color: theme.primaryAccent }} />
            <div>
              <h1 className="text-3xl font-extrabold" style={{ color: theme.textPrimary }}>
                Registro de Vacaciones
              </h1>
              <p style={{ color: theme.textSecondary }}>
                {sortedRecords.length} empleados registrados
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: theme.primaryAccent }}
          >
            <PlusIcon className="h-4 w-4" />
            <span>Nuevo empleado</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: theme.textSecondary }} />
          <input
            type="text"
            placeholder="Buscar por nombre de empleado..."
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
                    onClick={() => handleSort('employee_name')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Nombre</span>
                      {getSortIcon('employee_name')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    style={{ color: theme.textSecondary }}
                    onClick={() => handleSort('imss_enrolled')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Fecha alta IMSS</span>
                      {getSortIcon('imss_enrolled')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    style={{ color: theme.textSecondary }}
                    onClick={() => handleSort('contract_signed')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Firma contrato</span>
                      {getSortIcon('contract_signed')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    style={{ color: theme.textSecondary }}
                    onClick={() => handleSort('vacations_remaining')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Vacaciones disp.</span>
                      {getSortIcon('vacations_remaining')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    style={{ color: theme.textSecondary }}
                    onClick={() => handleSort('auth_rh')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Aut. RH</span>
                      {getSortIcon('auth_rh')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    style={{ color: theme.textSecondary }}
                    onClick={() => handleSort('auth_manager')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Aut. Manager</span>
                      {getSortIcon('auth_manager')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ color: theme.textSecondary }}
                  >
                    Periodos tomados
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: theme.tableBorder }}>
                {sortedRecords.map((record, index) => (
                  <motion.tr
                    key={record.id}
                    className="transition-colors hover:bg-gray-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <td>{renderCell(record, 'employee_name')}</td>
                    <td>{renderCell(record, 'imss_enrolled')}</td>
                    <td>{renderCell(record, 'contract_signed')}</td>
                    <td>{renderCell(record, 'vacations_remaining')}</td>
                    <td>{renderCell(record, 'auth_rh')}</td>
                    <td>{renderCell(record, 'auth_manager')}</td>
                    <td>{renderCell(record, 'periods_taken')}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* New Employee Modal */}
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
                  Nuevo Empleado
                </h2>
                <button
                  onClick={() => setShowNewModal(false)}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: theme.textSecondary }}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreateRecord} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                    Nombre del Empleado *
                  </label>
                  <input
                    type="text"
                    required
                    value={newRecord.employee_name}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, employee_name: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: theme.background,
                      borderColor: theme.tableBorder,
                      color: theme.textPrimary
                    }}
                    placeholder="Nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                    Fecha Alta IMSS
                  </label>
                  <input
                    type="date"
                    value={newRecord.imss_enrolled}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, imss_enrolled: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: theme.background,
                      borderColor: theme.tableBorder,
                      color: theme.textPrimary
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                    Firma de Contrato
                  </label>
                  <input
                    type="date"
                    value={newRecord.contract_signed}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, contract_signed: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: theme.background,
                      borderColor: theme.tableBorder,
                      color: theme.textPrimary
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                    Días de Vacaciones Disponibles
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newRecord.vacations_remaining}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, vacations_remaining: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: theme.background,
                      borderColor: theme.tableBorder,
                      color: theme.textPrimary
                    }}
                  />
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
                    disabled={createMutation.isPending || !newRecord.employee_name.trim()}
                    className="px-4 py-2 rounded-lg text-white transition-colors disabled:opacity-50"
                    style={{ backgroundColor: theme.primaryAccent }}
                  >
                    {createMutation.isPending ? 'Creando...' : 'Crear Empleado'}
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

export default VacationRegistry;