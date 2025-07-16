import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { createPortal } from 'react-dom';
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
  },
  contrato_renuncia: {
    'signature process': '#F4B400',
    'need to scan': '#0F9D58',
    'signed & valid': '#00C851',
    'Baja': '#FF007F',
    'Stuck': '#D32F2F',
    'Docusigned': '#9E9E9E',
    'GlobalDesk': '#1565C0',
    'working on it': '#F4B400',
    'on Legal': '#9E9E9E',
    'signed temporary': '#9C27B0',
    'Contrato Consultor': '#4CAF50',
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
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const options = Object.keys(STATUS_COLORS[column] || {});
  const currentValue = value || 'N/A';
  const backgroundColor = STATUS_COLORS[column]?.[currentValue] || '#9E9E9E';
  
  // Determine text color based on background
  const getTextColor = (bgColor: string) => {
    const lightColors = ['#FFEE58', '#FFB74D', '#4CAF50', '#26C6DA', '#8BC34A'];
    return lightColors.includes(bgColor) ? '#000000' : '#FFFFFF';
  };
  
  const textColor = getTextColor(backgroundColor);

  // Calculate dropdown position
  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Calculate optimal width based on number of options
      const optimalWidth = Math.min(Math.max(options.length * 120, 300), 600);
      
      // Position horizontally (prefer left alignment, but adjust if it goes off screen)
      let left = rect.left;
      if (left + optimalWidth > viewportWidth - 20) {
        left = viewportWidth - optimalWidth - 20;
      }
      if (left < 20) {
        left = 20;
      }
      
      // Position vertically (prefer below, but go above if not enough space)
      let top = rect.bottom + 8;
      const estimatedHeight = Math.ceil(options.length / 3) * 40 + 20; // Estimate height for 3 columns
      
      if (top + estimatedHeight > viewportHeight - 20) {
        top = rect.top - estimatedHeight - 8;
      }
      
      setDropdownPosition({
        top,
        left,
        width: optimalWidth
      });
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        // Check if click is inside dropdown
        const dropdownElement = document.getElementById(`dropdown-${recordId}-${column}`);
        if (dropdownElement && dropdownElement.contains(event.target as Node)) {
          return;
        }
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, recordId, column]);

  // Update position when opening
  useEffect(() => {
    if (isOpen) {
      updateDropdownPosition();
      // Update position on scroll/resize
      const handleResize = () => updateDropdownPosition();
      window.addEventListener('scroll', handleResize, true);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('scroll', handleResize, true);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isOpen]);

  const handleButtonClick = () => {
    if (!isOpen) {
      updateDropdownPosition();
    }
    setIsOpen(!isOpen);
  };

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

  const DropdownPortal = () => {
    if (!isOpen) return null;

    // Calculate grid columns based on number of options
    const getGridCols = (optionCount: number) => {
      if (optionCount <= 4) return 2;
      if (optionCount <= 9) return 3;
      if (optionCount <= 16) return 4;
      return 5;
    };

    const gridCols = getGridCols(options.length);

    return createPortal(
      <AnimatePresence>
        <motion.div
          id={`dropdown-${recordId}-${column}`}
          initial={{ opacity: 0, scale: 0.95, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -5 }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
          className="fixed z-[99999] rounded-lg border shadow-lg"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#E2E4E9',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            width: dropdownPosition.width,
            maxWidth: '90vw',
          }}
        >
          <div className="p-3">
            <div 
              className="grid gap-2"
              style={{ 
                gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
              }}
            >
              {options.map((option) => {
                const optionBgColor = STATUS_COLORS[column]?.[option] || '#9E9E9E';
                const optionTextColor = getTextColor(optionBgColor);
                const isSelected = option === currentValue;
                
                return (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className="p-2 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[32px] flex items-center justify-center text-center"
                    style={{
                      backgroundColor: optionBgColor,
                      color: optionTextColor,
                      border: isSelected ? '2px solid #0073EA' : '1px solid rgba(0,0,0,0.1)',
                      transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                    }}
                  >
                    <span className="truncate leading-tight">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>,
      document.body
    );
  };

  return (
    <div className="relative z-20">
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        disabled={isLoading}
        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 relative"
        style={{ 
          backgroundColor,
          color: textColor,
          focusRingColor: backgroundColor
        }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.currentTarget.style.opacity = '0.85';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
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

      <DropdownPortal />
    </div>
  );
};

export default StatusEditable;