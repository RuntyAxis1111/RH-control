import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  NewspaperIcon, 
  CalendarDaysIcon, 
  GlobeAltIcon, 
  ComputerDesktopIcon 
} from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Últimas', icon: NewspaperIcon },
    { path: '/feed/vacaciones', label: 'Vacaciones', icon: CalendarDaysIcon },
    { path: '/feed/viajes', label: 'Viajes', icon: GlobeAltIcon },
    { path: '/table/it_equipment_requests', label: 'Equipos TI', icon: ComputerDesktopIcon },
  ];

  return (
    <motion.nav 
      className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <NewspaperIcon className="h-8 w-8 text-white" />
            <span className="text-xl font-extrabold text-white">
              HYBE LATAM Feed
            </span>
          </motion.div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
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