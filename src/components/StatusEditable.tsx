import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

// Color mapping based on PDF reference
const STATUS_COLORS = {
  contract_status: {
    'signature process': '#AB47BC',
    'need to scan': '#4CAF50',
    'Signed & valid': '#1E88E5',
    'working on it': '#FFB74D',
    'Done': '#43A047',
    'Stuck': '#D32F2F',
    'prestacion servicios': '#9C27B0',
    'DocuSigned': '#26C6DA',
    'GlobalDesk': '#1565C0',
    'Baja': '#EC407A',
    'on Legal': '#FFEE58',
    'Contrato Consultor': '#8BC34A',
    'signed temporary': '#7E57C2',
    'N/A': '#9E9E9E',
  },
  offer_letter_status: {
    'accepted': '#0288D1',
    'working on it': '#FFB74D',
    'sent': '#4CAF50',
    'Rejected': '#D32F2F',
    'N/A': '#9E9E9E',
  },
  computer_status: {
    'Requested to IT': '#FFB74D',
    'BUY': '#EC407A',
    'Received + responsive': '#4CAF50',
    'Received': '#0288D1',
    'In stock': '#7E57C2',
    'Stuck': '#9E9E9E',
    'N/A': '#9E9E9E',
  },
  bgc_status: {
    'Requested': '#FFB74D',
    'Done': '#43A047',
    'Stuck': '#D32F2F',
    'Not needed': '#1565C0',
    'N/A': '#9E9E9E',
  },
  psychometrics_status: {
    'Requested': '#FFB74D',
    'Done': '#43A047',
    'Stuck': '#D32F2F',
    'Not needed': '#1565C0',
    'N/A': '#9E9E9E',
  },
  welcome_email_status: {
    'Working on it': '#FFB74D',
    'Done': '#43A047',
    'Stuck': '#D32F2F',
    'N/A': '#9E9E9E',
    'Baja': '#EC407A',
  },
  welcome_kit: {
    'Done': '#43A047',
    'N/A': '#9E9E9E',
  }
};

interface StatusEditableProps {
  column: keyof typeof STATUS_COLORS;
  value: string;
  recordId: string;
  tableName: string;
  onUpdate: (id: string, column: string, value: string) => Promise<void>;
}

const StatusEditable: React.FC<StatusEditableProps> = ({
  column,
  value,
  recordId,
  tableName,
  onUpdate
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = Object.keys(STATUS_COLORS[column] || {});
  const currentValue = value || 'N/A';
  const backgroundColor = STATUS_COLORS[column]?.[currentValue] || '#9E9E9E';
  
  // Determine text color based on background
  const getTextColor = (bgColor: string) => {
    const lightColors = ['#FFEE58', '#FFB74D', '#4CAF50', '#26C6DA', '#8BC34A'];
    return lightColors.includes(bgColor) ? '#000000' : '#FFFFFF';
  };
  
  const textColor = getTextColor(backgroundColor);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionSelect = async (newValue: string) => {
    if (newValue === currentValue) {
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      await onUpdate(recordId, column, newValue);
      setIsOpen(false);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-1"
        style={{ 
          backgroundColor,
          color: textColor,
          focusRingColor: backgroundColor
        }}
      >
        {isLoading ? (
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
            <span>...</span>
          </div>
        ) : (
          <>
            <span>{currentValue}</span>
            <ChevronDownIcon className="ml-1 h-3 w-3" />
          </>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 min-w-[120px] rounded-lg shadow-lg border"
            style={{
              backgroundColor: theme.background,
              borderColor: theme.tableBorder,
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          >
            <div className="py-1">
              {options.map((option) => {
                const optionBgColor = STATUS_COLORS[column]?.[option] || '#9E9E9E';
                const optionTextColor = getTextColor(optionBgColor);
                const isSelected = option === currentValue;
                
                return (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className="w-full text-left px-3 py-2 text-xs transition-colors first:rounded-t-lg last:rounded-b-lg"
                    style={{
                      backgroundColor: isSelected ? theme.surfaceAlt : 'transparent',
                      color: theme.textPrimary
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = theme.surfaceAlt;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <span 
                        className="inline-block w-3 h-3 rounded-full"
                        style={{ backgroundColor: optionBgColor }}
                      />
                      <span>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatusEditable;