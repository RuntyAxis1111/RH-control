import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { 
  NewspaperIcon, 
  CalendarDaysIcon, 
  GlobeAltIcon, 
  ComputerDesktopIcon,
  UserPlusIcon,
  CalculatorIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();

  const navItems = [
    { path: '/', label: 'Últimas', icon: NewspaperIcon },
    { path: '/feed/viajes', label: 'Viajes', icon: GlobeAltIcon },
    { path: '/feed/vacaciones', label: 'Vacaciones solicitudes', icon: CalendarDaysIcon },
    { path: '/vacaciones/registro', label: 'Vacaciones registro', icon: ClipboardDocumentListIcon },
    { path: '/equipos-ti/inventario', label: 'Equipos TI', icon: ComputerDesktopIcon },
    { path: 'https://calculadora.hybelatinamerica.com/', label: 'Calculadora', icon: CalculatorIcon, external: true },
    { path: '/hr/hiring', label: 'Hiring', icon: UserPlusIcon },
  ];

  return (
    <motion.nav 
      className="sticky top-0 z-50"
      style={{ 
        backgroundColor: theme.background,
        borderBottom: `1px solid ${theme.tableBorder}`
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            style={{ color: theme.textPrimary }}
          >
            <NewspaperIcon className="h-8 w-8" style={{ color: theme.primaryAccent }} />
            <span className="text-xl font-extrabold">
              HYBE LATAM Feed
            </span>
          </motion.div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = !item.external && location.pathname === item.path;
              
              if (item.external) {
                return (
                  <a 
                    key={item.path} 
                    href={item.path}
                    target="_self"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                  >
                    <motion.div
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2"
                      style={{
                        backgroundColor: 'transparent',
                        color: theme.textSecondary
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme.surfaceAlt;
                        e.currentTarget.style.color = theme.textPrimary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = theme.textSecondary;
                      }}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </motion.div>
                  </a>
                );
              }
              
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2"
                    style={{
                      backgroundColor: isActive ? theme.primaryAccent : 'transparent',
                      color: isActive ? '#FFFFFF' : theme.textSecondary
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = theme.surfaceAlt;
                        e.currentTarget.style.color = theme.textPrimary;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = theme.textSecondary;
                      }
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;