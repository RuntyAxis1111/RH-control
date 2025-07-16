import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { 
  UserPlusIcon, 
  MagnifyingGlassIcon,
  InboxIcon,
  PlusIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabaseClient';
import StatusEditable from '../components/StatusEditable';
import DatePicker from '../components/DatePicker';
import NewCandidateModal from '../components/NewCandidateModal';
import EditEmployeeModal from '../components/EditEmployeeModal';
import dayjs from 'dayjs';

interface HiringRecord {
  full_name: string;
  team: string;
  position: string;
  location: string;
  work_email: string;
  start_date: string;
  contract_status: string;
  offer_letter_status: string;
  computer_status: string;
  bgc_status: string;
  psychometrics_status: string;
  welcome_email_status: string;
  welcome_kit: string;
  start_date: string;
  end_date: string;
  contrato_renuncia: string;
}

const TABS = {
  "New employees – this month": "new_emp_this_month",
  "On boarded": "on_boarded", 
  "Off-boarding": "off_boarding",
  "Hold / rejected / others": "hold_rejected_other"
};

const HiringBoard: React.FC = () => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('New employees – this month');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewCandidateModal, setShowNewCandidateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<HiringRecord | null>(null);

  const { data: records = [], isLoading, error, refetch } = useQuery({
    queryKey: ['hiring', activeTab],
    queryFn: async (): Promise<HiringRecord[]> => {
      const tableName = TABS[activeTab as keyof typeof TABS];
      
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('full_name', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });

  // Mutation for updating records
  const updateMutation = useMutation({
    mutationFn: async ({ full_name, column, value }: { full_name: string; column: string; value: string }) => {
      const tableName = TABS[activeTab as keyof typeof TABS];
      
      let updateData: any = { [column]: value };
      
      // If updating start_date, also calculate and update end_date
      if (column === 'start_date' && value) {
        const endDate = dayjs(value).add(90, 'days').format('YYYY-MM-DD');
        updateData.end_date = endDate;
      }
      
      const { error } = await supabase
        .from(tableName)
        .update(updateData)
        .eq('full_name', full_name);
      
      if (error) throw error;
    },
    onSuccess: () => {
      // Optimistically update the cache
      queryClient.invalidateQueries({ queryKey: ['hiring', activeTab] });
    },
    onError: (error) => {
      console.error('Error updating record:', error);
    }
  });

  // Real-time subscriptions
  useEffect(() => {
    const channels = Object.values(TABS).map(tableName => 
      supabase
        .channel(`${tableName}_channel`)
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: tableName 
        }, () => {
          queryClient.invalidateQueries({ queryKey: ['hiring'] });
        })
        .subscribe()
    );

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  }, [queryClient]);

  const filteredRecords = records.filter(record =>
    record.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.work_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusUpdate = async (id: string, column: string, value: string) => {
    return updateMutation.mutateAsync({ full_name: id, column, value });
  };

  const handleDateUpdate = async (full_name: string, date: string) => {
    return updateMutation.mutateAsync({ full_name, column: 'start_date', value: date });
  };

  const handleEditEmployee = (employee: HiringRecord) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleEditSuccess = () => {
    refetch();
    setShowEditModal(false);
    setSelectedEmployee(null);
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen" style={{ backgroundColor: theme.background }}>
        <div className="px-6 py-4 rounded-xl" style={{ 
          backgroundColor: `${theme.danger}20`,
          border: `1px solid ${theme.danger}30`,
          color: theme.danger
        }}>
          Error al cargar los datos: {(error as Error).message}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto px-4 py-8 min-h-screen" style={{ 
      backgroundColor: theme.background,
      fontFamily: theme.fontFamily
    }}>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <UserPlusIcon className="h-8 w-8" style={{ color: theme.primaryAccent }} />
            <div>
              <h1 className="text-3xl font-bold" style={{ color: theme.textPrimary }}>Hiring Board</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <p style={{ color: theme.textSecondary }}>{filteredRecords.length} registros</p>
              <button
                onClick={() => setShowNewCandidateModal(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: theme.primaryAccent }}
              >
                <PlusIcon className="h-4 w-4" />
                <span>Nuevo empleado</span>
              </button>
            </div>
            
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: theme.textSecondary }} />
              <input
                type="text"
                placeholder="Buscar nombre o email…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: theme.background,
                  border: `1px solid ${theme.tableBorder}`,
                  color: theme.textPrimary
                }}
              />
            </div>
          </div>
        </div>

        {/* Table Tabs */}
        <div className="flex space-x-1 p-1 rounded-lg mb-6" style={{ backgroundColor: theme.tableHeaderBg }}>
          {Object.keys(TABS).map((tabName) => (
            <button
              key={tabName}
              onClick={() => setActiveTab(tabName)}
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
              style={{
                backgroundColor: activeTab === tabName ? theme.background : 'transparent',
                color: activeTab === tabName ? theme.primaryAccent : theme.textSecondary,
                boxShadow: activeTab === tabName ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {tabName}
            </button>
          ))}
        </div>
      </motion.div>

      {isLoading ? (
        <div className="rounded-xl p-8" style={{ 
          backgroundColor: theme.background,
          border: `1px solid ${theme.tableBorder}`
        }}>
          <div className="animate-pulse">
            <div className="h-4 rounded w-1/4 mb-4" style={{ backgroundColor: theme.tableHeaderBg }}></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 rounded" style={{ backgroundColor: theme.tableHeaderBg }}></div>
              ))}
            </div>
          </div>
        </div>
      ) : filteredRecords.length === 0 ? (
        <motion.div
          className="flex flex-col items-center py-16"
          style={{ color: theme.textSecondary }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <InboxIcon className="h-12 w-12 mb-2" />
          <p>No records yet ⚡ Import or add a new one</p>
        </motion.div>
      ) : (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filteredRecords.map((record, index) => (
            <motion.div
              key={record.full_name}
              className="rounded-xl px-6 py-5 shadow-sm border transition-all duration-200 relative group"
              style={{
                backgroundColor: theme.background,
                borderColor: theme.tableBorder
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              style={{
                backgroundColor: theme.background,
                borderColor: theme.tableBorder,
                minHeight: '140px' // Altura mínima fija para evitar saltos
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.surfaceAlt;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.background;
              }}
            >
              {/* Edit Button */}
              <button
                onClick={() => handleEditEmployee(record)}
                className="absolute right-2 top-2 p-1.5 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-80 hover:opacity-100 z-10"
                style={{
                  backgroundColor: theme.surfaceAlt,
                  color: theme.textSecondary,
                  border: `1px solid ${theme.tableBorder}`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.primaryAccent;
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme.surfaceAlt;
                  e.currentTarget.style.color = theme.textSecondary;
                }}
                title="Editar empleado"
              >
                <PencilSquareIcon className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start text-sm mb-4 relative">
                {/* Name and basic info */}
                <div className="lg:col-span-3 relative">
                  <div className="font-semibold text-base mb-1" style={{ color: theme.textPrimary }}>
                    {record.full_name}
                  </div>
                  <div style={{ color: theme.textSecondary }}>
                    {record.team} • {record.position}
                  </div>
                  <div className="text-xs mt-1" style={{ color: theme.textSecondary }}>
                    📍 {record.location}
                  </div>
                  {record.work_email && (
                    <div className="text-xs mt-1" style={{ color: theme.textSecondary }}>
                      ✉️ {record.work_email}
                    </div>
                  )}
                  {record.start_date && (
                    <div className="text-xs mt-1" style={{ color: theme.textSecondary }}>
                      📅 {new Date(record.start_date).toLocaleDateString('es-ES')}
                    </div>
                  )}
                </div>
                
                {/* Status chips */}
                <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3 pb-1 relative">
                  <div className="relative">
                    <div className="text-xs font-medium mb-2" style={{ color: theme.textSecondary }}>CONTRATO</div>
                    <StatusEditable
                      column="contract_status"
                      value={record.contract_status}
                      recordId={record.full_name}
                      tableName={TABS[activeTab as keyof typeof TABS]}
                      onUpdate={handleStatusUpdate}
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="text-xs font-medium mb-2" style={{ color: theme.textSecondary }}>CONTRATO / RENUNCIA</div>
                    <StatusEditable
                      column="contrato_renuncia"
                      value={record.contrato_renuncia}
                      recordId={record.full_name}
                      tableName={TABS[activeTab as keyof typeof TABS]}
                      onUpdate={handleStatusUpdate}
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="text-xs font-medium mb-2" style={{ color: theme.textSecondary }}>OFFER LETTER</div>
                    <StatusEditable
                      column="offer_letter_status"
                      value={record.offer_letter_status}
                      recordId={record.full_name}
                      tableName={TABS[activeTab as keyof typeof TABS]}
                      onUpdate={handleStatusUpdate}
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="text-xs font-medium mb-2" style={{ color: theme.textSecondary }}>COMPUTER</div>
                    <StatusEditable
                      column="computer_status"
                      value={record.computer_status}
                      recordId={record.full_name}
                      tableName={TABS[activeTab as keyof typeof TABS]}
                      onUpdate={handleStatusUpdate}
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="text-xs font-medium mb-2" style={{ color: theme.textSecondary }}>BGC</div>
                    <StatusEditable
                      column="bgc_status"
                      value={record.bgc_status}
                      recordId={record.full_name}
                      tableName={TABS[activeTab as keyof typeof TABS]}
                      onUpdate={handleStatusUpdate}
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="text-xs font-medium mb-2" style={{ color: theme.textSecondary }}>PSICOMÉTRICOS</div>
                    <StatusEditable
                      column="psychometrics_status"
                      value={record.psychometrics_status}
                      recordId={record.full_name}
                      tableName={TABS[activeTab as keyof typeof TABS]}
                      onUpdate={handleStatusUpdate}
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="text-xs font-medium mb-2" style={{ color: theme.textSecondary }}>WELCOME EMAIL</div>
                    <StatusEditable
                      column="welcome_email_status"
                      value={record.welcome_email_status}
                      recordId={record.full_name}
                      tableName={TABS[activeTab as keyof typeof TABS]}
                      onUpdate={handleStatusUpdate}
                    />
                  </div>
                </div>
              </div>
              
              {/* Contract dates section */}
              <div className="border-t pt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm relative" style={{ borderColor: theme.tableBorder }}>
                <div className="flex items-center space-x-2 relative">
                  <span style={{ color: theme.textSecondary }}>📅 Inicio contrato:</span>
                  <DatePicker
                    value={record.start_date}
                    onChange={(date) => handleDateUpdate(record.full_name, date)}
                  />
                </div>
                
                <div className="flex items-center space-x-2 relative">
                  <span style={{ color: theme.textSecondary }}>📅 Fin contrato:</span>
                  <span style={{ color: theme.textPrimary }}>
                    {record.end_date ? dayjs(record.end_date).format('DD/MM/YYYY') : 
                     record.start_date ? dayjs(record.start_date).add(90, 'days').format('DD/MM/YYYY') : 
                     'No definido'}
                  </span>
                  <span className="text-xs" style={{ color: theme.textSecondary }}>(3 meses después)</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      <NewCandidateModal
        isOpen={showNewCandidateModal}
        onClose={() => setShowNewCandidateModal(false)}
        tableName={TABS[activeTab as keyof typeof TABS]}
        onSuccess={() => {
          refetch();
          // Show toast notification
          console.log('Empleado creado exitosamente');
        }}
      />
      
      <EditEmployeeModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee}
        tableName={TABS[activeTab as keyof typeof TABS]}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default HiringBoard;