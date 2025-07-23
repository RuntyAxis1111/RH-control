import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  InformationCircleIcon,
  EyeIcon,
  DocumentIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { Equipo } from '../../lib/supabaseClient';

interface DepreciationDetail {
  year: number;
  depreciation: number;
  bookValue: number;
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

const COMPANY_OPTIONS = [
  { label: 'HBL', value: 'HBL' },
  { label: 'AJA', value: 'AJA' },
];

const COMPANY_COLORS = {
  HBL: '#3B82F6',   // Blue
  AJA: '#8B5CF6'    // Purple
};

// Tasas de depreciación y valores residuales por modelo
const DEPRECIATION_RATES = {
  mac_air: 0.14,  // 14% anual
  mac_pro: 0.15,  // 15% anual
  lenovo: 0.18    // 18% anual
};

const RESIDUAL_VALUES = {
  mac_air: 0.30,  // 30% residual
  mac_pro: 0.25,  // 25% residual
  lenovo: 0.10    // 10% residual
};

interface InventoryTableProps {
  equipos: Equipo[];
  isLoading: boolean;
  onUpdate: (serial: string, field: keyof Equipo, value: any) => Promise<void>;
  onCreate: (equipo: Omit<Equipo, 'created_at' | 'updated_at'>) => Promise<void>;
  isUpdating: boolean;
  isCreating: boolean;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  equipos,
  isLoading,
  onUpdate,
  onCreate,
  isUpdating,
  isCreating
}) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Equipo>('serial_number');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [editingCell, setEditingCell] = useState<{ serial: string; field: keyof Equipo } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [showDepreciationModal, setShowDepreciationModal] = useState<string | null>(null);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  const [newEquipo, setNewEquipo] = useState({
    serial_number: '',
    model: 'mac_pro' as const,
    company: 'HBL' as const,
    assigned_to: '',
    insured: false,
    purchase_date: '2024-01-01',
    purchase_cost: 25000,
    depr_rate: 0.15,
    file_url: null
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    const toastElement = document.createElement('div');
    toastElement.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-lg text-white font-medium ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    toastElement.textContent = message;
    document.body.appendChild(toastElement);
    
    setTimeout(() => {
      document.body.removeChild(toastElement);
    }, 3000);
  };

  const handleFileUpload = async (serialNumber: string, file: File) => {
    // Validate file
    if (file.type !== 'application/pdf') {
      showToast('Solo se permiten archivos PDF', 'error');
      return;
    }
    
    if (file.size > 20 * 1024 * 1024) { // 20MB
      showToast('El archivo no puede superar 20MB', 'error');
      return;
    }
    
    setUploadingFiles(prev => new Set(prev).add(serialNumber));
    
    try {
      const path = `${serialNumber}.pdf`;
      
      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('facturas')
        .upload(path, file, { upsert: false });
      
      if (uploadError) {
        if (uploadError.message.includes('already exists')) {
          // If file exists, update it
          const { error: updateError } = await supabase.storage
            .from('facturas')
            .update(path, file);
          
          if (updateError) throw updateError;
        } else {
          throw uploadError;
        }
      }
      
      // Get public URL
      const { data } = supabase.storage
        .from('facturas')
        .getPublicUrl(path);
      
      // Update database with file URL
      await onUpdate(serialNumber, 'file_url', data.publicUrl);
      
      showToast('PDF subido exitosamente ✔️', 'success');
    } catch (error) {
      console.error('Error uploading file:', error);
      showToast('Error al subir el archivo', 'error');
    } finally {
      setUploadingFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(serialNumber);
        return newSet;
      });
    }
  };

  const handleFileInputChange = (serialNumber: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(serialNumber, file);
    }
    // Reset input value to allow uploading the same file again
    event.target.value = '';
  };

  // Calculate depreciation with differentiated rates
  const calculateDepreciation = (purchaseDate: string | null, purchaseCost: number | null, model: string) => {
    if (!purchaseDate || !purchaseCost || purchaseCost <= 0) {
      return {
        yearlyDepr: 0,
        yearsElapsed: 0,
        bookValue: 0,
        residualValue: 0,
        depreciationByYear: [0, 0, 0, 0, 0],
        isFullyDepreciated: false
      };
    }

    const rate = DEPRECIATION_RATES[model as keyof typeof DEPRECIATION_RATES] || 0.20;
    const residualPct = RESIDUAL_VALUES[model as keyof typeof RESIDUAL_VALUES] || 0.10;
    
    const yearlyDepr = purchaseCost * rate;
    const residualValue = purchaseCost * residualPct;
    const yearsElapsed = Math.min(5, dayjs().diff(dayjs(purchaseDate), 'year', true));
    const bookValue = Math.max(residualValue, purchaseCost - yearlyDepr * yearsElapsed);
    const isFullyDepreciated = bookValue <= residualValue;
    
    const depreciationByYear = Array.from({ length: 5 }, (_, i) => {
      const year = i + 1;
      return yearlyDepr; // Misma cifra los 5 años
    });

    return {
      yearlyDepr,
      yearsElapsed,
      bookValue,
      residualValue,
      depreciationByYear,
      isFullyDepreciated
    };
  };

  const getDepreciationDetails = (purchaseDate: string | null, purchaseCost: number | null, model: string): DepreciationDetail[] => {
    if (!purchaseDate || !purchaseCost || purchaseCost <= 0) {
      return Array.from({ length: 5 }, (_, i) => ({
        year: i + 1,
        depreciation: 0,
        bookValue: 0
      }));
    }

    const rate = DEPRECIATION_RATES[model as keyof typeof DEPRECIATION_RATES] || 0.20;
    const residualPct = RESIDUAL_VALUES[model as keyof typeof RESIDUAL_VALUES] || 0.10;
    const yearlyDepr = purchaseCost * rate;
    const residualValue = purchaseCost * residualPct;
    
    return Array.from({ length: 5 }, (_, i) => {
      const year = i + 1;
      const bookValue = Math.max(residualValue, purchaseCost - yearlyDepr * year);
      return {
        year,
        depreciation: yearlyDepr,
        bookValue
      };
    });
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
    if (field === 'purchase_cost') {
      setEditValue(currentValue?.toString() || '0');
    } else {
      setEditValue(currentValue || '');
    }
  };

  const handleCellSave = async () => {
    if (!editingCell) return;
    
    let value: any = editValue;
    if (editingCell.field === 'insured') {
      value = editValue === 'true';
    } else if (editingCell.field === 'purchase_cost') {
      value = parseFloat(editValue) || 0;
      if (value < 0) {
        alert('El costo debe ser mayor a 0');
        return;
      }
    }
    
    await onUpdate(editingCell.serial, editingCell.field, value);
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
    if (!newEquipo.serial_number.trim() || !newEquipo.model || !newEquipo.company || !newEquipo.purchase_date || newEquipo.purchase_cost <= 0) {
      alert('Todos los campos son requeridos y el costo debe ser mayor a 0');
      return;
    }
    
    // Auto-asignar tasa de depreciación según modelo
    const depr_rate = DEPRECIATION_RATES[newEquipo.model];
    
    await onCreate({
      serial_number: newEquipo.serial_number.trim(),
      model: newEquipo.model,
      company: newEquipo.company,
      assigned_to: newEquipo.assigned_to.trim() || null,
      insured: newEquipo.insured,
      purchase_date: newEquipo.purchase_date,
      purchase_cost: newEquipo.purchase_cost,
      depr_rate,
      file_url: null
    });
    
    setShowNewModal(false);
    setNewEquipo({
      serial_number: '',
      model: 'mac_pro',
      company: 'HBL',
      assigned_to: '',
      insured: false,
      purchase_date: '2024-01-01',
      purchase_cost: 25000,
      depr_rate: 0.15,
      file_url: null
    });
  };

  const toggleRowExpansion = (serial: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(serial)) {
      newExpanded.delete(serial);
    } else {
      newExpanded.add(serial);
    }
    setExpandedRows(newExpanded);
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
      } else if (field === 'company') {
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
            {COMPANY_OPTIONS.map(option => (
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
      } else if (field === 'purchase_date') {
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
      } else if (field === 'purchase_cost') {
        return (
          <input
            type="number"
            min="0"
            step="0.01"
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
    
    if (field === 'model') {
      displayValue = MODEL_LABELS[value as keyof typeof MODEL_LABELS];
    } else if (field === 'company') {
      displayValue = (
        <span 
          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
          style={{ backgroundColor: COMPANY_COLORS[value as keyof typeof COMPANY_COLORS] }}
        >
          {value}
        </span>
      );
    } else if (field === 'insured') {
      displayValue = (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Sí' : 'No'}
        </span>
      );
    } else if (field === 'purchase_date') {
      displayValue = value ? dayjs(value as string).format('DD/MM/YYYY') : '-';
    } else if (field === 'purchase_cost') {
      displayValue = value ? `$${(value as number).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '-';
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

  if (isLoading) {
    return (
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
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p style={{ color: theme.textSecondary }}>{sortedEquipos.length} equipos en total</p>
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
      <div className="relative">
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: theme.tableHeaderBg }}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider w-8" style={{ color: theme.textSecondary }}>
                  {/* Expand column */}
                </th>
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
                  onClick={() => handleSort('company')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Empresa</span>
                    {getSortIcon('company')}
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
                  onClick={() => handleSort('purchase_date')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Fecha compra</span>
                    {getSortIcon('purchase_date')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  style={{ color: theme.textSecondary }}
                  onClick={() => handleSort('purchase_cost')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Costo</span>
                    {getSortIcon('purchase_cost')}
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
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                  <div className="flex items-center space-x-1">
                    <span>Valor libro</span>
                    <InformationCircleIcon className="h-4 w-4" title="Valor después de depreciación" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                  Dep. Año 1
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                  Dep. Año 2
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                  Dep. Año 3
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                  Dep. Año 4
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                  Dep. Año 5
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                  Archivo
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: theme.tableBorder }}>
              {sortedEquipos.map((equipo, index) => {
                const depreciation = calculateDepreciation(equipo.purchase_date, equipo.purchase_cost, equipo.model);
                const depreciationDetails = getDepreciationDetails(equipo.purchase_date, equipo.purchase_cost, equipo.model);
                const isExpanded = expandedRows.has(equipo.serial_number);
                
                return (
                  <React.Fragment key={equipo.serial_number}>
                    <motion.tr
                      className="transition-colors hover:bg-gray-50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: theme.textPrimary }}>
                        <button
                          onClick={() => toggleRowExpansion(equipo.serial_number)}
                          className="p-1 rounded hover:bg-gray-100"
                        >
                          {isExpanded ? (
                            <ChevronUpIcon className="h-4 w-4" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4" />
                          )}
                        </button>
                      </td>
                      <td>{renderCell(equipo, 'serial_number')}</td>
                      <td>{renderCell(equipo, 'model')}</td>
                      <td>{renderCell(equipo, 'company')}</td>
                      <td>{renderCell(equipo, 'assigned_to')}</td>
                      <td>{renderCell(equipo, 'purchase_date')}</td>
                      <td>{renderCell(equipo, 'purchase_cost')}</td>
                      <td>{renderCell(equipo, 'insured')}</td>
                      <td className="px-3 py-2 text-sm" style={{ color: theme.textPrimary }}>
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold ${depreciation.bookValue <= depreciation.residualValue ? 'text-orange-600' : 'text-green-600'}`}>
                            ${depreciation.bookValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </span>
                          {depreciation.yearsElapsed > 0 && (
                            <span className="text-xs text-gray-500" title={`Valor después de ${depreciation.yearsElapsed.toFixed(1)} años (residual: $${depreciation.residualValue.toLocaleString()})`}>
                              ({depreciation.yearsElapsed.toFixed(1)} años)
                            </span>
                          )}
                        </div>
                      </td>
                      {/* Depreciation Years 1-5 */}
                      {depreciationDetails.map((detail, idx) => (
                        <td key={idx} className="px-3 py-2 text-sm" style={{ color: theme.textPrimary }}>
                          {detail.depreciation > 0 ? (
                            <span className="text-red-600 font-medium">
                              ${detail.depreciation.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            </span>
                          ) : (
                            <span className="text-gray-400">–</span>
                          )}
                        </td>
                      ))}
                      {/* File Upload/Download */}
                      <td className="px-3 py-2 text-sm">
                        {equipo.file_url ? (
                          <a
                            href={equipo.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center p-2 rounded-lg transition-colors hover:bg-gray-100"
                            title="Abrir PDF"
                          >
                            <DocumentIcon className="h-5 w-5" style={{ color: theme.primaryAccent }} />
                          </a>
                        ) : (
                          <div className="relative">
                            <input
                              type="file"
                              accept="application/pdf"
                              onChange={(e) => handleFileInputChange(equipo.serial_number, e)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              disabled={uploadingFiles.has(equipo.serial_number)}
                            />
                            <button
                              className="inline-flex items-center p-2 rounded-lg transition-colors hover:bg-gray-100 disabled:opacity-50"
                              disabled={uploadingFiles.has(equipo.serial_number)}
                              title="Subir PDF"
                            >
                              {uploadingFiles.has(equipo.serial_number) ? (
                                <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                              ) : (
                                <ArrowUpTrayIcon className="h-5 w-5" style={{ color: theme.textSecondary }} />
                              )}
                            </button>
                          </div>
                        )}
                      </td>
                      {/* Actions */}
                      <td className="px-3 py-2 text-sm">
                        <button
                          onClick={() => setShowDepreciationModal(equipo.serial_number)}
                          className="p-1 rounded hover:bg-gray-100 transition-colors"
                          title="Ver depreciación detallada"
                        >
                          <EyeIcon className="h-4 w-4" style={{ color: theme.primaryAccent }} />
                        </button>
                      </td>
                    </motion.tr>
                    
                    {/* Expanded depreciation details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td colSpan={8} className="px-0 py-0">
                            <div className="border-t" style={{ 
                              backgroundColor: theme.surfaceAlt,
                              borderColor: theme.tableBorder
                            }}>
                              <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                  <h4 className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
                                    Depreciación Detallada ({DEPRECIATION_RATES[equipo.model] * 100}% anual)
                                  </h4>
                                  <div className="text-xs" style={{ color: theme.textSecondary }}>
                                    Valor residual: ${(equipo.purchase_cost || 0) * RESIDUAL_VALUES[equipo.model]}
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                  {Array.from({ length: 5 }, (_, i) => {
                                    const year = i + 1;
                                    const yearDepr = depreciation.depreciationByYear[i];
                                    const bookValueAtYear = Math.max(depreciation.residualValue, (equipo.purchase_cost || 0) - (depreciation.yearlyDepr * year));
                                    const isCurrentYear = year <= Math.ceil(depreciation.yearsElapsed);
                                    
                                    return (
                                      <div 
                                        key={year}
                                        className={`p-3 rounded-lg border ${isCurrentYear ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}
                                      >
                                        <div className="text-xs font-medium text-gray-600 mb-1">Año {year}</div>
                                        <div className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
                                          Depr: ${yearDepr.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                          Valor: ${bookValueAtYear.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                                {depreciation.bookValue <= depreciation.residualValue && (
                                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="text-sm text-red-800">
                                      ⚠️ Equipo ha alcanzado su valor residual
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
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
                    Empresa *
                  </label>
                  <select
                    required
                    value={newEquipo.company}
                    onChange={(e) => {
                      const company = e.target.value as 'HBL' | 'AJA';
                      setNewEquipo(prev => ({ ...prev, company }));
                    }}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: theme.background,
                      borderColor: theme.tableBorder,
                      color: theme.textPrimary
                    }}
                  >
                    {COMPANY_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                    Fecha de Compra *
                  </label>
                  <input
                    type="date"
                    required
                    value={newEquipo.purchase_date}
                    onChange={(e) => setNewEquipo(prev => ({ ...prev, purchase_date: e.target.value }))}
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
                    Costo de Compra *
                  </label>
                  <input
                    type="number"
                    required
                    min="1000"
                    step="0.01"
                    value={newEquipo.purchase_cost}
                    onChange={(e) => {
                      const cost = parseFloat(e.target.value) || 0;
                      setNewEquipo(prev => ({ ...prev, purchase_cost: cost }));
                    }}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: theme.background,
                      borderColor: theme.tableBorder,
                      color: theme.textPrimary
                    }}
                    placeholder="25000.00"
                  />
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
                    onClick={() => {
                      setShowNewModal(false);
                      setNewEquipo({
                        serial_number: '',
                        model: 'mac_pro',
                        company: 'HBL',
                        assigned_to: '',
                        insured: false,
                        purchase_date: '2024-01-01',
                        purchase_cost: 25000,
                        depr_rate: 0.15,
                        file_url: null
                      });
                    }}
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
                    disabled={isCreating || !newEquipo.serial_number.trim() || !newEquipo.company || !newEquipo.purchase_date || newEquipo.purchase_cost < 1000}
                    className="px-4 py-2 rounded-lg text-white transition-colors disabled:opacity-50"
                    style={{ backgroundColor: theme.primaryAccent }}
                  >
                    {isCreating ? 'Creando...' : 'Crear Equipo'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Depreciation Detail Modal */}
      <AnimatePresence>
        {showDepreciationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="fixed inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDepreciationModal(null)}
            />
            
            <motion.div
              className="relative w-full max-w-2xl rounded-lg shadow-xl"
              style={{ 
                backgroundColor: theme.background,
                border: `1px solid ${theme.tableBorder}`
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {(() => {
                const equipo = equipos.find(e => e.serial_number === showDepreciationModal);
                if (!equipo) return null;
                
                const depreciationDetails = getDepreciationDetails(equipo.purchase_date, equipo.purchase_cost, equipo.model);
                const rate = DEPRECIATION_RATES[equipo.model];
                const residualPct = RESIDUAL_VALUES[equipo.model];
                
                return (
                  <>
                    <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: theme.tableBorder }}>
                      <h2 className="text-xl font-semibold" style={{ color: theme.textPrimary }}>
                        Depreciación Detallada - {equipo.serial_number}
                      </h2>
                      <button
                        onClick={() => setShowDepreciationModal(null)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: theme.textSecondary }}
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: theme.surfaceAlt }}>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span style={{ color: theme.textSecondary }}>Modelo:</span>
                            <span className="ml-2 font-medium" style={{ color: theme.textPrimary }}>
                              {MODEL_LABELS[equipo.model]}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: theme.textSecondary }}>Empresa:</span>
                            <span className="ml-2 font-medium" style={{ color: theme.textPrimary }}>
                              {equipo.company}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: theme.textSecondary }}>Fecha de compra:</span>
                            <span className="ml-2 font-medium" style={{ color: theme.textPrimary }}>
                              {equipo.purchase_date ? dayjs(equipo.purchase_date).format('DD/MM/YYYY') : 'No definida'}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: theme.textSecondary }}>Costo original:</span>
                            <span className="ml-2 font-medium" style={{ color: theme.textPrimary }}>
                              ${(equipo.purchase_cost || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: theme.textSecondary }}>Depreciación anual:</span>
                            <span className="ml-2 font-medium" style={{ color: theme.textPrimary }}>
                              ${((equipo.purchase_cost || 0) * rate).toLocaleString('en-US', { minimumFractionDigits: 2 })} ({(rate * 100).toFixed(0)}%)
                            </span>
                          </div>
                          <div>
                            <span style={{ color: theme.textSecondary }}>Valor residual:</span>
                            <span className="ml-2 font-medium" style={{ color: theme.textPrimary }}>
                              ${((equipo.purchase_cost || 0) * residualPct).toLocaleString('en-US', { minimumFractionDigits: 2 })} ({(residualPct * 100).toFixed(0)}%)
                            </span>
                          </div>
                          {equipo.file_url && (
                            <div>
                              <span style={{ color: theme.textSecondary }}>Archivo:</span>
                              <a
                                href={equipo.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-blue-600 hover:text-blue-800 underline"
                              >
                                Ver PDF
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead style={{ backgroundColor: theme.tableHeaderBg }}>
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                                Año
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                                Depreciación
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                                Valor Libro
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y" style={{ borderColor: theme.tableBorder }}>
                            {depreciationDetails.map((detail) => (
                              <tr key={detail.year}>
                                <td className="px-4 py-3 text-sm font-medium" style={{ color: theme.textPrimary }}>
                                  {detail.year}
                                </td>
                                <td className="px-4 py-3 text-sm" style={{ color: theme.textPrimary }}>
                                  {detail.depreciation > 0 ? (
                                    <span className="text-red-600 font-medium">
                                      ${detail.depreciation.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </span>
                                  ) : (
                                    <span className="text-gray-400">–</span>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-sm" style={{ color: theme.textPrimary }}>
                                  {detail.bookValue > 0 ? (
                                    <span className="font-medium">
                                      ${detail.bookValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </span>
                                  ) : (
                                    <span className="text-gray-400">$0.00</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InventoryTable;