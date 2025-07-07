import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, XMarkIcon, CalendarIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';

interface EditableCellProps {
  value: any;
  type: 'text' | 'date' | 'dropdown' | 'multiselect';
  options?: string[];
  onSave: (newValue: any) => Promise<void>;
  placeholder?: string;
  disabled?: boolean;
}

const STATUS_COLORS = {
  // General status colors (Monday Light theme)
  'Done': 'bg-[#00C875] text-white border-[#00C875]',
  'Working on it': 'bg-[#FFCB00] text-black border-[#FFCB00]',
  'Stuck': 'bg-[#E2445C] text-white border-[#E2445C]',
  'N/A': 'bg-[#C4C4C4] text-black border-[#C4C4C4]',
  
  // Contract status
  'Signed & valid': 'bg-[#00C875] text-white border-[#00C875]',
  'Signing process': 'bg-[#FFCB00] text-black border-[#FFCB00]',
  'DocuSigned': 'bg-[#00C875] text-white border-[#00C875]',
  'GlobalDesk': 'bg-[#579BFC] text-white border-[#579BFC]',
  'on Legal': 'bg-[#FFCB00] text-black border-[#FFCB00]',
  'signed temporary': 'bg-[#FFCB00] text-black border-[#FFCB00]',
  'Contrato Consultor': 'bg-[#579BFC] text-white border-[#579BFC]',
  'Baja': 'bg-[#E2445C] text-white border-[#E2445C]',
  
  // Computer status
  'Requested to IT': 'bg-[#579BFC] text-white border-[#579BFC]',
  'Received + responsibility letter': 'bg-[#00C875] text-white border-[#00C875]',
  'Received': 'bg-[#00C875] text-white border-[#00C875]',
  'In stock': 'bg-[#C4C4C4] text-black border-[#C4C4C4]',
  'BUY': 'bg-[#FFCB00] text-black border-[#FFCB00]',
  
  // Hiring entities
  'Aja Podcast': 'bg-[#0073EA] text-white border-[#0073EA]',
  'HBL': 'bg-[#0073EA] text-white border-[#0073EA]',
  'HBL Prestacion Servicios': 'bg-[#579BFC] text-white border-[#579BFC]',
  'Label 3': 'bg-[#FFCB00] text-black border-[#FFCB00]',
  'DOCEMIL': 'bg-[#00C875] text-white border-[#00C875]',
  'ECMP': 'bg-[#E2445C] text-white border-[#E2445C]',
  'HBL USA': 'bg-[#0073EA] text-white border-[#0073EA]',
  
  // Locations
  'Prado Norte': 'bg-[#0073EA] text-white border-[#0073EA]',
  'Alvaro Obregón': 'bg-[#579BFC] text-white border-[#579BFC]',
  'US': 'bg-[#E2445C] text-white border-[#E2445C]',
  'COL': 'bg-[#00C875] text-white border-[#00C875]',
};


const EditableCell: React.FC<EditableCellProps> = ({
  value,
  type,
  options = [],
  onSave,
  placeholder = '',
  disabled = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || '');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditValue(value || '');
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSave = async () => {
    if (editValue === value) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      await onSave(editValue);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1000);
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value || '');
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleDropdownSelect = async (selectedValue: string) => {
    setShowDropdown(false);
    if (selectedValue !== value) {
      setIsLoading(true);
      try {
        await onSave(selectedValue);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1000);
      } catch (error) {
        console.error('Error saving:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderChip = (chipValue: string) => {
    const colorClass = STATUS_COLORS[chipValue as keyof typeof STATUS_COLORS] || 'bg-[#C4C4C4] text-black border-[#C4C4C4]';
    const label = chipValue || 'Pendiente';
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${colorClass}`}>
        {label}
      </span>
    );
  };

  const renderDisplayValue = () => {
    if (type === 'date' && value) {
      return dayjs(value).format('DD/MM/YYYY');
    }
    if (type === 'dropdown') {
      return renderChip(value);
    }
    if (type === 'multiselect' && Array.isArray(value)) {
      return value.length > 0 ? value.join(', ') : 'Sin asignar';
    }
    return value || placeholder || '-';
  };

  if (disabled) {
    return (
      <div className="px-3 py-2 text-white/60 text-sm">
        {renderDisplayValue()}
      </div>
    );
  }

  if (type === 'dropdown') {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          disabled={isLoading}
          className="w-full text-left px-3 py-2 hover:bg-white/5 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-white/20"
        >
          <div className="flex items-center justify-between">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-[#0073EA] rounded-full animate-spin"></div>
                <span className="text-gray-600 text-sm">Guardando...</span>
              </div>
            ) : showSuccess ? (
              <div className="flex items-center space-x-2">
                <CheckIcon className="h-4 w-4 text-[#00C875]" />
                {renderChip(value)}
              </div>
            ) : (
              renderChip(value)
            )}
            <ChevronDownIcon className="h-4 w-4 text-gray-600" />
          </div>
        </button>

        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 mt-1 w-full bg-white border border-[#E2E4E9] rounded-lg shadow-lg max-h-60 overflow-auto"
            >
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleDropdownSelect(option)}
                  className="w-full text-left px-3 py-2 hover:bg-[#F5F6F8] transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  {renderChip(option)}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative">
      {isEditing ? (
        <div className="flex items-center space-x-2">
          {type === 'date' ? (
            <input
              ref={inputRef}
              type="date"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-2 py-1 bg-white border border-[#E2E4E9] rounded text-[#050505] text-sm focus:outline-none focus:ring-2 focus:ring-[#0073EA]"
            />
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1 px-2 py-1 bg-white border border-[#E2E4E9] rounded text-[#050505] text-sm focus:outline-none focus:ring-2 focus:ring-[#0073EA]"
            />
          )}
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="p-1 text-[#00C875] hover:text-[#00A866] transition-colors"
          >
            <CheckIcon className="h-4 w-4" />
          </button>
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="p-1 text-[#E2445C] hover:text-[#D63851] transition-colors"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full text-left px-3 py-2 hover:bg-[#F5F6F8] transition-colors rounded focus:outline-none focus:ring-2 focus:ring-[#0073EA]"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-[#0073EA] rounded-full animate-spin"></div>
              <span className="text-gray-600 text-sm">Guardando...</span>
            </div>
          ) : showSuccess ? (
            <div className="flex items-center space-x-2">
              <CheckIcon className="h-4 w-4 text-[#00C875]" />
              <span className="text-[#050505] text-sm">{renderDisplayValue()}</span>
            </div>
          ) : (
            <span className="text-[#050505] text-sm">{renderDisplayValue()}</span>
          )}
        </button>
      )}
    </div>
  );
};

export default EditableCell;