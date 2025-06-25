import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import { 
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import ReviewChip from './ReviewChip';

type Column<T> = { 
  key: keyof T; 
  label: string; 
  render?: (value: any, row: T) => React.ReactNode;
};

interface DetailedDataTableProps<T> {
  rows: T[];
  columns: Column<T>[];
  loading?: boolean;
  tableName: string;
  onUpdate?: () => void;
}

function DetailedDataTable<T extends { id: string; [key: string]: any }>({ 
  rows, 
  columns, 
  loading = false, 
  tableName, 
  onUpdate 
}: DetailedDataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const itemsPerPage = 10;

  const filteredData = rows.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Enhanced columns with review status
  const enhancedColumns = [
    ...columns,
    {
      key: 'review_status' as keyof T,
      label: 'Estado',
      render: (value: any, row: T) => (
        <ReviewChip 
          table={tableName}
          id={row.id}
          status={value}
          onUpdate={onUpdate}
        />
      )
    }
  ];

  const handleRowClick = (rowId: string) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, rowId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRowClick(rowId);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-inner shadow-white/5">
        <div className="animate-pulse">
          <div className="h-4 bg-white/20 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-white/10 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-inner shadow-white/5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      role="table"
      aria-label={`Tabla de ${tableName}`}
    >
      {/* Search */}
      <div className="p-6 border-b border-white/10">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
          <input
            type="text"
            placeholder="Buscar en la tabla..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white/80 uppercase tracking-wider w-8">
                {/* Expand column */}
              </th>
              {enhancedColumns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-6 py-4 text-left text-xs font-semibold text-white/80 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {paginatedData.map((row, index) => (
              <React.Fragment key={row.id}>
                <motion.tr
                  className="hover:bg-white/5 transition-colors cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  onClick={() => handleRowClick(row.id)}
                  onKeyDown={(e) => handleKeyDown(e, row.id)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={expandedRow === row.id}
                  aria-label={`Expandir detalles de fila ${index + 1}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/90">
                    {expandedRow === row.id ? (
                      <ChevronUpIcon className="h-4 w-4" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4" />
                    )}
                  </td>
                  {enhancedColumns.map((column) => (
                    <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap text-sm text-white/90">
                      {column.render ? column.render(row[column.key], row) : String(row[column.key] || '-')}
                    </td>
                  ))}
                </motion.tr>
                
                {/* Expanded Row Details */}
                <AnimatePresence>
                  {expandedRow === row.id && (
                    <motion.tr
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td colSpan={enhancedColumns.length + 1} className="px-0 py-0">
                        <div className="bg-white/5 border-t border-white/10">
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-lg font-semibold text-white">Detalles completos</h3>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedRow(null);
                                }}
                                className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                                aria-label="Cerrar detalles"
                              >
                                <XMarkIcon className="h-5 w-5 text-white/60" />
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {Object.entries(row).map(([key, value]) => {
                                if (key === 'id') return null;
                                
                                let displayValue = String(value || '-');
                                let displayKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                                
                                // Format dates
                                if (key.includes('date') || key === 'created_at') {
                                  displayValue = value ? dayjs(value as string).format('DD/MM/YYYY HH:mm') : '-';
                                }
                                
                                // Format booleans
                                if (typeof value === 'boolean') {
                                  displayValue = value ? 'Sí' : 'No';
                                }
                                
                                return (
                                  <div key={key} className="bg-white/5 rounded-lg p-3">
                                    <dt className="text-xs font-medium text-white/60 uppercase tracking-wider mb-1">
                                      {displayKey}
                                    </dt>
                                    <dd className="text-sm text-white/90 break-words">
                                      {key === 'review_status' ? (
                                        <ReviewChip 
                                          table={tableName}
                                          id={row.id}
                                          status={value as any}
                                          onUpdate={onUpdate}
                                        />
                                      ) : (
                                        displayValue
                                      )}
                                    </dd>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-sm text-white/60">
            Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredData.length)} de {filteredData.length} resultados
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/10 text-white/80 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <span className="px-4 py-2 text-sm text-white/80">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/10 text-white/80 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default DetailedDataTable;