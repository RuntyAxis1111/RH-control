import React from 'react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useTheme } from '../contexts/ThemeContext';
import { 
  CalendarDaysIcon, 
  GlobeAltIcon, 
  ComputerDesktopIcon,
  UserIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { FeedItem } from '../lib/supabaseClient';
import ReviewChip from './ReviewChip';

dayjs.extend(relativeTime);

interface FeedCardProps {
  item: FeedItem;
  index: number;
  onUpdate?: () => void;
}

const FeedCard: React.FC<FeedCardProps> = ({ item, index, onUpdate }) => {
  const theme = useTheme();
  
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Vacaciones':
        return { backgroundColor: `${theme.success}20`, color: theme.success, borderColor: `${theme.success}30` };
      case 'Viaje':
        return { backgroundColor: `${theme.info}20`, color: theme.info, borderColor: `${theme.info}30` };
      case 'Equipo TI':
        return { backgroundColor: `${theme.primaryAccent}20`, color: theme.primaryAccent, borderColor: `${theme.primaryAccent}30` };
      default:
        return { backgroundColor: `${theme.grey}20`, color: theme.grey, borderColor: `${theme.grey}30` };
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'Vacaciones':
        return CalendarDaysIcon;
      case 'Viaje':
        return GlobeAltIcon;
      case 'Equipo TI':
        return ComputerDesktopIcon;
      default:
        return UserIcon;
    }
  };

  const Icon = getIcon(item.type);
  const displayName = item.full_name || item.requester || 'Usuario';

  return (
    <motion.div
      className="rounded-xl p-6 transition-all duration-300 group"
      style={{
        backgroundColor: theme.surfaceAlt,
        border: `1px solid ${theme.tableBorder}`
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.background}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.surfaceAlt}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg transition-colors" style={{ backgroundColor: theme.tableBorder }}>
            <Icon className="h-5 w-5" style={{ color: theme.primaryAccent }} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <UserIcon className="h-4 w-4" style={{ color: theme.textSecondary }} />
              <span className="font-semibold" style={{ color: theme.textPrimary }}>{displayName}</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <EnvelopeIcon className="h-3 w-3" style={{ color: theme.textSecondary }} />
              <span className="text-sm" style={{ color: theme.textSecondary }}>{item.email}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="flex items-center space-x-2">
            <span 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
              style={getBadgeColor(item.type)}
            >
              {item.type}
            </span>
            <ReviewChip 
              table={item.table}
              id={item.id}
              status={item.review_status}
              onUpdate={onUpdate}
            />
          </div>
          <span className="text-xs" style={{ color: theme.textSecondary }}>
            {dayjs(item.created_at).fromNow()}
          </span>
        </div>
      </div>
      
      <div className="text-sm leading-relaxed" style={{ color: theme.textPrimary }}>
        {item.summary}
      </div>
      
      {Object.keys(item.details).length > 0 && (
        <div className="mt-4 pt-4 border-t" style={{ borderColor: theme.tableBorder }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {Object.entries(item.details).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="capitalize" style={{ color: theme.textSecondary }}>{key.replace('_', ' ')}:</span>
                <span className="font-medium" style={{ color: theme.textPrimary }}>{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FeedCard;