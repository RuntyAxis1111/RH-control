import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabaseClient';
import dayjs from 'dayjs';

interface NewCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
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

const OWNERS_OPTIONS = [
  'Carla L.',
  'Karla S.',
  'Laura B.',
  'Johan'
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

const NewCandidateModal: React.FC<NewCandidateModalProps> = ({
  isOpen,
  onClose,
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
    contract_status: 'Working on it',
    offer_letter_status: 'N/A',
    computer_status: 'Requested to IT',
    bgc_status: 'N/A',
    psychometrics_status: 'N/A',
    welcome_email_status: 'N/A',
    welcome_kit: 'N/A',
    email_account_status: 'N/A',
    office_access: 'N/A',
    clara_status: 'N/A',
    come_bien_status: 'N/A',
    emergency_contacts_status: 'N/A',
    sgmm_status: 'N/A',
    life_insurance_status: 'N/A',
    seguro_viaje_status: 'N/A',
    inicio_seguro_viaje: '',
    due_seguro_viaje_status: '',
    owners: '',
    contract_file_url: '',
    end_date: '',
    contrato_renuncia: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Auto-calculate expiry_date when start_date changes
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
      const submitData = {
        ...formData,
        end_date: formData.start_date ? 
          dayjs(formData.start_date).add(90, 'days').format('YYYY-MM-DD') : null
      };

      const { error } = await supabase
        .from(tableName)
        .insert([submitData]);

      if (error) throw error;

      onSuccess();
      onClose();
      setFormData({
        full_name: '',
        work_email: '',
        team: '',
        position: '',
        hiring_entity: '',
        location: '',
        start_date: '',
        contract_status: 'Working on it',
        offer_letter_status: 'N/A',
        computer_status: 'Requested to IT',
        bgc_status: 'N/A',
        psychometrics_status: 'N/A',
        welcome_email_status: 'N/A',
        welcome_kit: 'N/A',
        email_account_status: 'N/A',
        office_access: 'N/A',
        clara_status: 'N/A',
        come_bien_status: 'N/A',
        emergency_contacts_status: 'N/A',
        sgmm_status: 'N/A',
        life_insurance_status: 'N/A',
        seguro_viaje_status: 'N/A',
        inicio_seguro_viaje: '',
        due_seguro_viaje_status: '',
        owners: '',
        contract_file_url: '',
        end_date: '',
        contrato_renuncia: ''
      });
    } catch (error) {
      console.error('Error creating record:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          className="fixed inset-0 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
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
              Nuevo Candidato
            </h2>
            <button
              onClick={onClose}
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
                  Fecha de Inicio *
                </label>
                <input
                  type="date"
                  required
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

              {/* Offer Letter Status */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Offer Letter Status
                </label>
                <select
                  value={formData.offer_letter_status}
                  onChange={(e) => handleInputChange('offer_letter_status', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                >
                  <option value="">Seleccionar...</option>
                  {STATUS_4COL_OPTIONS.slice(1).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Computer Status */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Computer Status
                </label>
                <select
                  value={formData.computer_status}
                  onChange={(e) => handleInputChange('computer_status', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                >
                  <option value="">Seleccionar...</option>
                  {COMPUTER_STATUS_OPTIONS.slice(1).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* BGC Status */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  BGC Status
                </label>
                <select
                  value={formData.bgc_status}
                  onChange={(e) => handleInputChange('bgc_status', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                >
                  <option value="">Seleccionar...</option>
                  {STATUS_4COL_OPTIONS.slice(1).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Psychometrics Status */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Psychometrics Status
                </label>
                <select
                  value={formData.psychometrics_status}
                  onChange={(e) => handleInputChange('psychometrics_status', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                >
                  <option value="">Seleccionar...</option>
                  {STATUS_4COL_OPTIONS.slice(1).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Welcome Email Status */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Welcome Email Status
                </label>
                <select
                  value={formData.welcome_email_status}
                  onChange={(e) => handleInputChange('welcome_email_status', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                >
                  <option value="">Seleccionar...</option>
                  {STATUS_4COL_OPTIONS.slice(1).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Welcome Kit Status */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Welcome Kit Status
                </label>
                <select
                  value={formData.welcome_kit}
                  onChange={(e) => handleInputChange('welcome_kit', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                >
                  <option value="">Seleccionar...</option>
                  {WELCOME_KIT_OPTIONS.slice(1).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Email Account Status */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Email Account Status
                </label>
                <select
                  value={formData.email_account_status}
                  onChange={(e) => handleInputChange('email_account_status', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                >
                  <option value="">Seleccionar...</option>
                  {EMAIL_ACCOUNT_OPTIONS.slice(1).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Office Access */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Office Access
                </label>
                <select
                  value={formData.office_access}
                  onChange={(e) => handleInputChange('office_access', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                >
                  <option value="">Seleccionar...</option>
                  {OFFICE_ACCESS_OPTIONS.slice(1).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Clara Status */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Clara Status
                </label>
                <select
                  value={formData.clara_status}
                  onChange={(e) => handleInputChange('clara_status', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                >
                  <option value="">Seleccionar...</option>
                  {CLARA_OPTIONS.slice(1).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Come-bien Status */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Come-bien Status
                </label>
                <select
                  value={formData.come_bien_status}
                  onChange={(e) => handleInputChange('come_bien_status', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                >
                  <option value="">Seleccionar...</option>
                  {COME_BIEN_OPTIONS.slice(1).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Emergency Contacts Status */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Emergency Contacts Status
                </label>
                <select
                  value={formData.emergency_contacts_status}
                  onChange={(e) => handleInputChange('emergency_contacts_status', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                >
                  <option value="">Seleccionar...</option>
                  {EMERGENCY_CONTACTS_OPTIONS.slice(1).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* SGMM Status */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  SGMM Status
                </label>
                <select
                  value={formData.sgmm_status}
                  onChange={(e) => handleInputChange('sgmm_status', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                >
                  <option value="">Seleccionar...</option>
                  {SGMM_OPTIONS.slice(1).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Life Insurance Status */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Life Insurance Status
                </label>
                <select
                  value={formData.life_insurance_status}
                  onChange={(e) => handleInputChange('life_insurance_status', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                >
                  <option value="">Seleccionar...</option>
                  {LIFE_INSURANCE_OPTIONS.slice(1).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Seguro Viaje Status */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                  Seguro Viaje Status
                </label>
                <select
                  value={formData.seguro_viaje_status}
                  onChange={(e) => handleInputChange('seguro_viaje_status', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: theme.background,
                    borderColor: theme.tableBorder,
                    color: theme.textPrimary
                  }}
                >
                  <option value="">Seleccionar...</option>
                  {SEGURO_VIAJE_OPTIONS.slice(1).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Inicio Seguro Viaje */}
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

              {/* Due Seguro Viaje */}
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
                onClick={onClose}
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
                {isLoading ? 'Guardando...' : 'Crear Candidato'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NewCandidateModal;