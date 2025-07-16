import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabaseClient';
import dayjs from 'dayjs';

interface EditEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: any;
  tableName: string;
  onSuccess: () => void;
}

const HIRING_ENTITIES = [
  '',
  'Aja Podcast',
  'HBL', 
  'HBL Prestacion Servicios',
  'Label 3',
  'DOCEMIL',
  'ECMP',
  'HBL USA'
];

const LOCATIONS = [
  '',
  'Prado Norte',
  'Alvaro Obregón', 
  'US',
  'COL'
];

const CONTRACT_STATUS_OPTIONS = [
  '',
  'Working on it',
  'Signing process',
  'Signed & valid',
  'signature process',
  'need to scan',
  'DocuSigned',
  'GlobalDesk',
  'on Legal',
  'signed temporary',
  'Contrato Consultor',
  'Stuck',
  'Baja',
  'Done'
];

const STATUS_4COL_OPTIONS = ['', 'Done', 'Working on it', 'Stuck', 'N/A'];
const COMPUTER_STATUS_OPTIONS = [
  '',
  'Requested to IT',
  'Received + responsibility letter', 
  'Received',
  'In stock',
  'BUY',
  'N/A',
  'Stuck'
];

const WELCOME_KIT_OPTIONS = ['', 'Done', 'N/A'];
const EMAIL_ACCOUNT_OPTIONS = ['', 'Done', 'Requested', 'N/A'];
const OFFICE_ACCESS_OPTIONS = ['', 'Registered PRADO', 'ROMA', 'N/A'];
const CLARA_OPTIONS = ['', 'Requested', 'Done', 'N/A'];
const COME_BIEN_OPTIONS = ['', 'Done', 'Requested', 'N/A'];
const EMERGENCY_CONTACTS_OPTIONS = ['', 'Done', 'Requested', 'N/A'];
const SGMM_OPTIONS = ['', 'Requested', 'Done', 'N/A'];
const LIFE_INSURANCE_OPTIONS = ['', 'Requested', 'Done', 'N/A'];
const SEGURO_VIAJE_OPTIONS = ['', 'SOLICITAR', 'N/A'];

const CONTRATO_RENUNCIA_OPTIONS = [
  '',
  'signature process',
  'need to scan',
  'signed & valid',
  'Baja',
  'Stuck',
  'Docusigned',
  'GlobalDesk',
  'working on it',
  'on Legal',
  'signed temporary',
  'Contrato Consultor'
];

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
  isOpen,
  onClose,
  employee,
  tableName,
  onSuccess
}) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    work_email: '',
    team: '',
    position: '',
    hiring_entity: '',
    location: '',
    start_date: '',
    contract_status: '',
    offer_letter_status: '',
    computer_status: '',
    bgc_status: '',
    psychometrics_status: '',
    welcome_email_status: '',
    welcome_kit: '',
    email_account_status: '',
    office_access: '',
    clara_status: '',
    come_bien_status: '',
    emergency_contacts_status: '',
    sgmm_status: '',
    life_insurance_status: '',
    seguro_viaje_status: '',
    inicio_seguro_viaje: '',
    due_seguro_viaje_status: '',
    owners: '',
    contract_file_url: '',
    end_date: '',
    contrato_renuncia: ''
  });

  // Pre-cargar datos del empleado cuando se abre el modal
  useEffect(() => {
    if (isOpen && employee) {
      setFormData({
        full_name: employee.full_name || '',
        work_email: employee.work_email || '',
        team: employee.team || '',
        position: employee.position || '',
        hiring_entity: employee.hiring_entity || '',
        location: employee.location || '',
        start_date: employee.start_date || '',
        contract_status: employee.contract_status || '',
        offer_letter_status: employee.offer_letter_status || '',
        computer_status: employee.computer_status || '',
        bgc_status: employee.bgc_status || '',
        psychometrics_status: employee.psychometrics_status || '',
        welcome_email_status: employee.welcome_email_status || '',
        welcome_kit: employee.welcome_kit || '',
        email_account_status: employee.email_account_status || '',
        office_access: employee.office_access || '',
        clara_status: employee.clara_status || '',
        come_bien_status: employee.come_bien_status || '',
        emergency_contacts_status: employee.emergency_contacts_status || '',
        sgmm_status: employee.sgmm_status || '',
        life_insurance_status: employee.life_insurance_status || '',
        seguro_viaje_status: employee.seguro_viaje_status || '',
        inicio_seguro_viaje: employee.inicio_seguro_viaje || '',
        due_seguro_viaje_status: employee.due_seguro_viaje_status || '',
        owners: employee.owners || '',
        contract_file_url: employee.contract_file_url || '',
        end_date: employee.end_date || '',
        contrato_renuncia: employee.contrato_renuncia || ''
      });
    }
  }, [isOpen, employee]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Auto-calculate end_date when start_date changes
      ...(field === 'start_date' && value ? {
        end_date: dayjs(value).add(90, 'days').format('YYYY-MM-DD')
      } : {})
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name.trim()) return;

    setIsLoading(true);
    try {
      // Convert empty date strings to null for Supabase compatibility
      const sanitizeDate = (dateValue: string) => {
        return dateValue && dateValue.trim() !== '' ? dateValue : null;
      };

      const updateData = {
        ...formData,
        start_date: sanitizeDate(formData.start_date),
        end_date: sanitizeDate(formData.end_date),
        inicio_seguro_viaje: sanitizeDate(formData.inicio_seguro_viaje),
        due_seguro_viaje_status: sanitizeDate(formData.due_seguro_viaje_status),
      };

      // Auto-calculate end_date if start_date is provided
      if (updateData.start_date) {
        updateData.end_date = dayjs(updateData.start_date).add(90, 'days').format('YYYY-MM-DD');
      }

      const { error } = await supabase
        .from(tableName)
        .update(updateData)
        .eq('full_name', employee.full_name);

      if (error) throw error;

      onSuccess();
      onClose();
      
      // Toast de éxito
      console.log('Registro actualizado ✔️');
    } catch (error) {
      console.error('Error updating record:', error);
      // Toast de error
      console.log('Hubo un error, intenta de nuevo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  // Bloquear scroll del fondo cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          className="fixed inset-0 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        />
        
        <motion.div
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl"
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
              Editar Empleado: {employee?.full_name}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg transition-colors"
              style={{ color: theme.textSecondary }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.surfaceAlt}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary,
                    focusRingColor: theme.primaryAccent
                  }}
                  placeholder="Ingresa el nombre completo"
                />
              </div>

              {/* Work Email */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Email
                </label>
                <input
                  type="email"
                  value={formData.work_email}
                  onChange={(e) => handleInputChange('work_email', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                  placeholder="email@company.com"
                />
              </div>

              {/* Hiring Entity */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Hiring Entity
                </label>
                <select
                  value={formData.hiring_entity}
                  onChange={(e) => handleInputChange('hiring_entity', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                >
                  <option value="">Seleccionar...</option>
                  {HIRING_ENTITIES.slice(1).map(entity => (
                    <option key={entity} value={entity}>{entity}</option>
                  ))}
                </select>
              </div>

              {/* Team */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Equipo
                </label>
                <input
                  type="text"
                  value={formData.team}
                  onChange={(e) => handleInputChange('team', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                  placeholder="Nombre del equipo"
                />
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Posición
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                  placeholder="Título del puesto"
                />
              </div>

              {/* Contract Status */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Estado del Contrato
                </label>
                <select
                  value={formData.contract_status}
                  onChange={(e) => handleInputChange('contract_status', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                >
                  <option value="">Seleccionar...</option>
                  {CONTRACT_STATUS_OPTIONS.slice(1).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Contrato / Renuncia */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Contrato / Renuncia
                </label>
                <select
                  value={formData.contrato_renuncia}
                  onChange={(e) => handleInputChange('contrato_renuncia', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                >
                  <option value="">Seleccionar...</option>
                  {CONTRATO_RENUNCIA_OPTIONS.slice(1).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Ubicación
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                >
                  <option value="">Seleccionar...</option>
                  {LOCATIONS.slice(1).map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Fecha de Inicio
                </label>
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => handleInputChange('start_date', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                />
              </div>

              {/* Owners */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Owners
                </label>
                <input
                  type="text"
                  value={formData.owners}
                  onChange={(e) => handleInputChange('owners', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                  placeholder="Carla L., Karla S., Laura B., Johan"
                />
              </div>

              {/* Contract File URL */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Contract File URL
                </label>
                <input
                  type="url"
                  value={formData.contract_file_url}
                  onChange={(e) => handleInputChange('contract_file_url', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                  placeholder="https://..."
                />
              </div>

              {/* Resto de campos de status */}
              {[
                { key: 'offer_letter_status', label: 'Offer Letter Status', options: STATUS_4COL_OPTIONS },
                { key: 'computer_status', label: 'Computer Status', options: COMPUTER_STATUS_OPTIONS },
                { key: 'bgc_status', label: 'BGC Status', options: STATUS_4COL_OPTIONS },
                { key: 'psychometrics_status', label: 'Psychometrics Status', options: STATUS_4COL_OPTIONS },
                { key: 'welcome_email_status', label: 'Welcome Email Status', options: STATUS_4COL_OPTIONS },
                { key: 'welcome_kit', label: 'Welcome Kit Status', options: WELCOME_KIT_OPTIONS },
                { key: 'email_account_status', label: 'Email Account Status', options: EMAIL_ACCOUNT_OPTIONS },
                { key: 'office_access', label: 'Office Access', options: OFFICE_ACCESS_OPTIONS },
                { key: 'clara_status', label: 'Clara Status', options: CLARA_OPTIONS },
                { key: 'come_bien_status', label: 'Come-bien Status', options: COME_BIEN_OPTIONS },
                { key: 'emergency_contacts_status', label: 'Emergency Contacts Status', options: EMERGENCY_CONTACTS_OPTIONS },
                { key: 'sgmm_status', label: 'SGMM Status', options: SGMM_OPTIONS },
                { key: 'life_insurance_status', label: 'Life Insurance Status', options: LIFE_INSURANCE_OPTIONS },
                { key: 'seguro_viaje_status', label: 'Seguro Viaje Status', options: SEGURO_VIAJE_OPTIONS }
              ].map(({ key, label, options }) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                    {label}
                  </label>
                  <select
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: theme.background,
                      borderColor: theme.tableBorder,
                      color: theme.textPrimary
                    }}
                  >
                    <option value="">Seleccionar...</option>
                    {options.slice(1).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              ))}

              {/* Fechas adicionales */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Inicio Seguro Viaje
                </label>
                <input
                  type="date"
                  value={formData.inicio_seguro_viaje}
                  onChange={(e) => handleInputChange('inicio_seguro_viaje', e.target.value)}
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
                  Due Seguro Viaje
                </label>
                <input
                  type="date"
                  value={formData.due_seguro_viaje_status}
                  onChange={(e) => handleInputChange('due_seguro_viaje_status', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t" style={{ borderColor: theme.tableBorder }}>
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-lg border transition-colors"
                style={{ 
                  borderColor: theme.tableBorder,
                  color: theme.textSecondary
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.surfaceAlt}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading || !formData.full_name.trim()}
                className="px-4 py-2 rounded-lg text-white transition-colors disabled:opacity-50"
                style={{ backgroundColor: theme.primaryAccent }}
              >
                {isLoading ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EditEmployeeModal;