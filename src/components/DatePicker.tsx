import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { CalendarIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';
import dayjs from 'dayjs';

interface DatePickerProps {
  value: string | null;
  onChange: (date: string) => Promise<void>;
  placeholder?: string;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Seleccionar fecha',
  disabled = false
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTempValue(value || '');
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setTempValue(value || '');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value]);

  const handleSave = async () => {
    if (tempValue === value) {
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      await onChange(tempValue);
      setIsOpen(false);
    } catch (error) {
      console.error('Error saving date:', error);
      setTempValue(value || '');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTempValue(value || '');
    setIsOpen(false);
  };

  const displayValue = value ? dayjs(value).format('DD/MM/YYYY') : placeholder;

  if (disabled) {
    return (
      <div className="flex items-center space-x-2 text-sm" style={{ color: theme.textSecondary }}>
        <CalendarIcon className="h-4 w-4" />
        <span>{displayValue}</span>
      </div>
    );
  }

  return (
    <div className="relative z-10" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
        style={{
          backgroundColor: theme.background,
          borderColor: theme.tableBorder,
          color: theme.textPrimary
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = theme.surfaceAlt;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = theme.background;
        }}
      >
        <CalendarIcon className="h-4 w-4" style={{ color: theme.textSecondary }} />
        <span>{isLoading ? 'Guardando...' : displayValue}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {createPortal(
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="fixed z-[99999] p-4 rounded-lg border shadow-lg"
                style={{
                  backgroundColor: theme.background,
                  borderColor: theme.tableBorder,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  left: Math.min(
                    containerRef.current?.getBoundingClientRect().left || 0,
                    window.innerWidth - 300
                  ),
                  top: Math.min(
                    (containerRef.current?.getBoundingClientRect().bottom || 0) + 8,
                    window.innerHeight - 200
                  ),
                  minWidth: '280px',
                  maxWidth: '300px'
                }}
              >
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: theme.textSecondary }}>
                      Seleccionar fecha
                    </label>
                    <input
                      ref={inputRef}
                      type="date"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{
                        backgroundColor: theme.background,
                        borderColor: theme.tableBorder,
                        color: theme.textPrimary
                      }}
                      autoFocus
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleCancel}
                      disabled={isLoading}
                      className="px-3 py-1.5 text-xs rounded-lg border transition-colors"
                      style={{
                        borderColor: theme.tableBorder,
                        color: theme.textSecondary,
                        backgroundColor: theme.background
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme.surfaceAlt;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = theme.background;
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isLoading || !tempValue}
                      className="px-3 py-1.5 text-xs rounded-lg text-white transition-colors disabled:opacity-50"
                      style={{ backgroundColor: theme.primaryAccent }}
                    >
                      {isLoading ? 'Guardando...' : 'Guardar'}
                    </button>
                  </div>
                </div>
              </motion.div>,
              document.body
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DatePicker;