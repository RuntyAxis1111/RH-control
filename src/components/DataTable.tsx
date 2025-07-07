import React, { useState } from 'react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { useTheme } from '../contexts/ThemeContext';
import { 
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import ReviewChip from './ReviewChip';

interface DataTableProps {
  data: any[];
  columns: { key: string; label: string; render?: (value: any, row: any) => React.ReactNode }[];
  loading?: boolean;
  tableName?: string;
  onUpdate?: () => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, loading = false, tableName, onUpdate }) => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  const filteredData = data.filter(item =>
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
      key: 'review_status',
      label: 'Estado',
      render: (value: any, row: any) => (
        <ReviewChip 
          table={tableName || ''}
          id={row.id}
          status={value}
          onUpdate={onUpdate}
        />
      )
    }
  ];

  if (loading) {
    return (
      <div className="rounded-xl p-8" style={{
        backgroundColor: theme.surfaceAlt,
        border: `1px solid ${theme.tableBorder}`
      }}>
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
      {/* Search */}
      <div className="p-6 border-b" style={{ borderColor: theme.tableBorder }}>
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: theme.textSecondary }} />
          <input
            type="text"
            placeholder="Buscar en la tabla..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent"
            style={{
              backgroundColor: theme.background,
              borderColor: theme.tableBorder,
              color: theme.textPrimary
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead style={{ backgroundColor: theme.tableHeaderBg }}>
            <tr>
              {enhancedColumns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ color: theme.textSecondary }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: theme.tableBorder }}>
            {paginatedData.map((row, index) => (
              <motion.tr
                key={row.id || index}
                className="transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.tableHeaderBg}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {enhancedColumns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: theme.textPrimary }}>
                    {column.render ? column.render(row[column.key], row) : String(row[column.key] || '-')}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t flex items-center justify-between" style={{ borderColor: theme.tableBorder }}>
          <div className="text-sm" style={{ color: theme.textSecondary }}>
            Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredData.length)} de {filteredData.length} resultados
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{
                backgroundColor: theme.surfaceAlt,
                color: theme.textPrimary
              }}
              onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = theme.tableBorder)}
              onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = theme.surfaceAlt)}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <span className="px-4 py-2 text-sm" style={{ color: theme.textPrimary }}>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{
                backgroundColor: theme.surfaceAlt,
                color: theme.textPrimary
              }}
              onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = theme.tableBorder)}
              onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = theme.surfaceAlt)}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DataTable;