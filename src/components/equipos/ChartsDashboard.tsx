import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import { supabase } from '../../lib/supabaseClient';
import { 
  ChartBarIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import dayjs from 'dayjs';

interface MonthlyData {
  month: string;
  qty: number;
  total_spend: number;
  formatted_month: string;
}

interface ModelData {
  model: string;
  qty: number;
  label: string;
}

const MODEL_COLORS = {
  mac_air: '#3B82F6',   // Blue
  mac_pro: '#10B981',   // Green  
  lenovo: '#F59E0B'     // Orange
};

const MODEL_LABELS = {
  mac_air: 'Mac Air',
  mac_pro: 'Mac Pro',
  lenovo: 'Lenovo'
};

const ChartsDashboard: React.FC = () => {
  const theme = useTheme();
  const [dateRange, setDateRange] = useState<'12m' | '24m' | 'all'>('all');
  const [companyFilter, setCompanyFilter] = useState<'all' | 'HBL' | 'AJA'>('all');

  const { data: chartData = [], isLoading, error } = useQuery({
    queryKey: ['equipos_charts', dateRange, companyFilter],
    queryFn: async (): Promise<MonthlyData[]> => {
      let dateFilter = '';
      
      if (dateRange === '12m') {
        dateFilter = `and purchase_date >= '${dayjs().subtract(12, 'months').format('YYYY-MM-DD')}'`;
      } else if (dateRange === '24m') {
        dateFilter = `and purchase_date >= '${dayjs().subtract(24, 'months').format('YYYY-MM-DD')}'`;
      }

      let companyFilterClause = '';
      if (companyFilter !== 'all') {
        companyFilterClause = `and company = '${companyFilter}'`;
      }

      const { data, error } = await supabase.rpc('get_monthly_equipment_stats', {
        date_filter: dateFilter + ' ' + companyFilterClause
      });

      if (error) {
        // Fallback to manual query if RPC doesn't exist
        const query = supabase
          .from('equipos_ti')
          .select('purchase_date, purchase_cost')
          .not('purchase_date', 'is', null)
          .not('purchase_cost', 'is', null);

        if (dateRange === '12m') {
          query.gte('purchase_date', dayjs().subtract(12, 'months').format('YYYY-MM-DD'));
        } else if (dateRange === '24m') {
          query.gte('purchase_date', dayjs().subtract(24, 'months').format('YYYY-MM-DD'));
        }
        
        if (companyFilter !== 'all') {
          query.eq('company', companyFilter);
        }

        const { data: rawData, error: queryError } = await query.order('purchase_date');
        
        if (queryError) throw queryError;

        // Group by month manually
        const monthlyStats: { [key: string]: { qty: number; total_spend: number } } = {};
        
        rawData?.forEach(item => {
          const month = dayjs(item.purchase_date).format('YYYY-MM');
          if (!monthlyStats[month]) {
            monthlyStats[month] = { qty: 0, total_spend: 0 };
          }
          monthlyStats[month].qty += 1;
          monthlyStats[month].total_spend += item.purchase_cost || 0;
        });

        return Object.entries(monthlyStats)
          .map(([month, stats]) => ({
            month,
            qty: stats.qty,
            total_spend: stats.total_spend,
            formatted_month: dayjs(month).format('MMM YYYY')
          }))
          .sort((a, b) => a.month.localeCompare(b.month));
      }

      return (data || []).map((item: any) => ({
        ...item,
        formatted_month: dayjs(item.month).format('MMM YYYY')
      }));
    },
    refetchInterval: 30000,
  });

  const { data: modelData = [], isLoading: isLoadingModels } = useQuery({
    queryKey: ['equipos_by_model', companyFilter],
    queryFn: async (): Promise<ModelData[]> => {
      let query = supabase
        .from('equipos_ti')
        .select('model');
        
      if (companyFilter !== 'all') {
        query = query.eq('company', companyFilter);
      }
      
      const { data, error } = await query.order('model');
      
      if (error) throw error;

      // Group by model
      const modelCounts: { [key: string]: number } = {};
      data?.forEach(item => {
        modelCounts[item.model] = (modelCounts[item.model] || 0) + 1;
      });

      return Object.entries(modelCounts)
        .map(([model, qty]) => ({
          model,
          qty,
          label: MODEL_LABELS[model as keyof typeof MODEL_LABELS] || model
        }))
        .sort((a, b) => b.qty - a.qty);
    },
    refetchInterval: 30000,
  });

  const downloadCSV = async () => {
    try {
      // Get all equipment data for full inventory export
      const { data: equipos, error } = await supabase
        .from('equipos_ti')
        .select('serial_number, model, company, assigned_to, insured, purchase_date, purchase_cost, file_url')
        .order('serial_number');
      
      if (error) throw error;
      if (!equipos || equipos.length === 0) return;

      // Create CSV content with proper headers and data formatting
      const csvContent = [
        ['serial_number', 'model', 'company', 'assigned_to', 'insured', 'purchase_date', 'purchase_cost', 'file_url'],
        ...equipos.map(item => [
          item.serial_number || '',
          MODEL_LABELS[item.model as keyof typeof MODEL_LABELS] || item.model,
          item.company || '',
          item.assigned_to || '',
          item.insured ? 'true' : 'false',
          item.purchase_date || '',
          item.purchase_cost?.toString() || '',
          item.file_url || ''
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `equipos_ti_full_${dayjs().format('YYYY-MM-DD')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };

  const totalEquipment = chartData.reduce((sum, item) => sum + item.qty, 0);
  const totalSpend = chartData.reduce((sum, item) => sum + item.total_spend, 0);
  const avgMonthlySpend = chartData.length > 0 ? totalSpend / chartData.length : 0;
  const totalByModel = modelData.reduce((sum, item) => sum + item.qty, 0);

  if (error) {
    return (
      <div className="p-8">
        <div className="px-6 py-4 rounded-xl" style={{
          backgroundColor: `${theme.danger}20`,
          border: `1px solid ${theme.danger}30`,
          color: theme.danger
        }}>
          Error al cargar las gráficas: {(error as Error).message}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: theme.textPrimary }}>
            Análisis de Equipos TI
          </h2>
          <p style={{ color: theme.textSecondary }}>
            Estadísticas de compras y gastos por período
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Date Range Selector */}
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" style={{ color: theme.textSecondary }} />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: theme.background,
                borderColor: theme.tableBorder,
                color: theme.textPrimary
              }}
            >
              <option value="all">Todo el período</option>
              <option value="12m">Últimos 12 meses</option>
              <option value="24m">Últimos 24 meses</option>
            </select>
          </div>

          {/* Company Filter */}
          <div className="flex items-center space-x-2">
            <ComputerDesktopIcon className="h-5 w-5" style={{ color: theme.textSecondary }} />
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value as any)}
              className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: theme.background,
                borderColor: theme.tableBorder,
                color: theme.textPrimary
              }}
            >
              <option value="all">Todas las empresas</option>
              <option value="HBL">HBL</option>
              <option value="AJA">AJA</option>
            </select>
          </div>

          {/* Download CSV */}
          <button
            onClick={downloadCSV}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors"
            style={{
              borderColor: theme.tableBorder,
              color: theme.textPrimary
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.surfaceAlt)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            <span>Descargar CSV</span>
          </button>
        </div>
      </div>

      {/* Model Distribution Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Equipment by Model */}
        <motion.div
          className="p-6 rounded-xl"
          style={{
            backgroundColor: theme.background,
            border: `1px solid ${theme.tableBorder}`
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: theme.textPrimary }}>
            Equipos por Modelo
          </h3>
          {isLoadingModels ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-pulse">
                <div className="h-4 rounded w-32 mb-4" style={{ backgroundColor: theme.tableBorder }}></div>
                <div className="h-48 rounded" style={{ backgroundColor: theme.surfaceAlt }}></div>
              </div>
            </div>
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={modelData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.tableBorder} />
                  <XAxis 
                    dataKey="label" 
                    stroke={theme.textSecondary}
                    fontSize={12}
                  />
                  <YAxis stroke={theme.textSecondary} fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme.background,
                      border: `1px solid ${theme.tableBorder}`,
                      borderRadius: '8px',
                      color: theme.textPrimary
                    }}
                    formatter={(value: number) => [value, 'Equipos']}
                  />
                  <Bar 
                    dataKey="qty" 
                    radius={[4, 4, 0, 0]}
                  >
                    {modelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={MODEL_COLORS[entry.model as keyof typeof MODEL_COLORS]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>

        {/* Pie Chart - Model Distribution */}
        <motion.div
          className="p-6 rounded-xl"
          style={{
            backgroundColor: theme.background,
            border: `1px solid ${theme.tableBorder}`
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: theme.textPrimary }}>
            Distribución (%) por Modelo
          </h3>
          {isLoadingModels ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-pulse">
                <div className="h-4 rounded w-32 mb-4" style={{ backgroundColor: theme.tableBorder }}></div>
                <div className="h-48 w-48 rounded-full mx-auto" style={{ backgroundColor: theme.surfaceAlt }}></div>
              </div>
            </div>
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={modelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="qty"
                    nameKey="label"
                  >
                    {modelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={MODEL_COLORS[entry.model as keyof typeof MODEL_COLORS]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme.background,
                      border: `1px solid ${theme.tableBorder}`,
                      borderRadius: '8px',
                      color: theme.textPrimary
                    }}
                    formatter={(value: number, name: string) => {
                      const percentage = totalByModel > 0 ? ((value / totalByModel) * 100).toFixed(1) : '0';
                      return [`${value} equipos (${percentage}%)`, name];
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value: string, entry: any) => {
                      const modelEntry = modelData.find(m => m.label === value);
                      const modelKey = modelEntry?.model;
                      return <span style={{ color: MODEL_COLORS[modelKey as keyof typeof MODEL_COLORS] }}>{value}</span>;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="p-6 rounded-xl"
          style={{
            backgroundColor: theme.background,
            border: `1px solid ${theme.tableBorder}`
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${theme.primaryAccent}20` }}>
              <ChartBarIcon className="h-6 w-6" style={{ color: theme.primaryAccent }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: theme.textSecondary }}>Total Equipos</p>
              <p className="text-2xl font-bold" style={{ color: theme.textPrimary }}>
                {totalByModel || totalEquipment}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="p-6 rounded-xl"
          style={{
            backgroundColor: theme.background,
            border: `1px solid ${theme.tableBorder}`
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${theme.info}20` }}>
              <ComputerDesktopIcon className="h-6 w-6" style={{ color: theme.info }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: theme.textSecondary }}>Por Modelo</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {modelData.map((model) => (
                  <span 
                    key={model.model}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: MODEL_COLORS[model.model as keyof typeof MODEL_COLORS] }}
                  >
                    {model.qty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="p-6 rounded-xl"
          style={{
            backgroundColor: theme.background,
            border: `1px solid ${theme.tableBorder}`
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${theme.success}20` }}>
              <ChartBarIcon className="h-6 w-6" style={{ color: theme.success }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: theme.textSecondary }}>Gasto Total</p>
              <p className="text-2xl font-bold" style={{ color: theme.textPrimary }}>
                ${totalSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="p-6 rounded-xl"
          style={{
            backgroundColor: theme.background,
            border: `1px solid ${theme.tableBorder}`
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${theme.warning}20` }}>
              <ChartBarIcon className="h-6 w-6" style={{ color: theme.warning }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: theme.textSecondary }}>Promedio Mensual</p>
              <p className="text-2xl font-bold" style={{ color: theme.textPrimary }}>
                ${avgMonthlySpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map(i => (
            <div key={i} className="p-6 rounded-xl animate-pulse" style={{
              backgroundColor: theme.background,
              border: `1px solid ${theme.tableBorder}`
            }}>
              <div className="h-4 rounded w-1/3 mb-4" style={{ backgroundColor: theme.tableBorder }}></div>
              <div className="h-64 rounded" style={{ backgroundColor: theme.surfaceAlt }}></div>
            </div>
          ))}
        </div>
      ) : chartData.length === 0 ? (
        <motion.div
          className="text-center py-12 rounded-xl"
          style={{
            backgroundColor: theme.background,
            border: `1px solid ${theme.tableBorder}`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ChartBarIcon className="h-12 w-12 mx-auto mb-4" style={{ color: theme.textSecondary }} />
          <p className="text-lg" style={{ color: theme.textPrimary }}>No hay datos para mostrar</p>
          <p className="text-sm mt-2" style={{ color: theme.textSecondary }}>
            Agrega equipos con fecha y costo de compra para ver las gráficas
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart - Equipment Purchases by Month */}
          <motion.div
            className="p-6 rounded-xl"
            style={{
              backgroundColor: theme.background,
              border: `1px solid ${theme.tableBorder}`
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.textPrimary }}>
              Equipos Comprados por Mes
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.tableBorder} />
                  <XAxis 
                    dataKey="formatted_month" 
                    stroke={theme.textSecondary}
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis stroke={theme.textSecondary} fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme.background,
                      border: `1px solid ${theme.tableBorder}`,
                      borderRadius: '8px',
                      color: theme.textPrimary
                    }}
                    formatter={(value: number) => [value, 'Equipos']}
                  />
                  <Bar 
                    dataKey="qty" 
                    fill={theme.primaryAccent}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Line Chart - Monthly Spending */}
          <motion.div
            className="p-6 rounded-xl"
            style={{
              backgroundColor: theme.background,
              border: `1px solid ${theme.tableBorder}`
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.textPrimary }}>
              Gasto Mensual en Equipos
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.tableBorder} />
                  <XAxis 
                    dataKey="formatted_month" 
                    stroke={theme.textSecondary}
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    stroke={theme.textSecondary} 
                    fontSize={12}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme.background,
                      border: `1px solid ${theme.tableBorder}`,
                      borderRadius: '8px',
                      color: theme.textPrimary
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 'Gasto']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="total_spend" 
                    stroke={theme.success}
                    strokeWidth={3}
                    dot={{ fill: theme.success, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: theme.success, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ChartsDashboard;