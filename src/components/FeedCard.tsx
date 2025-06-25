import React from 'react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
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
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Vacaciones':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Viaje':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Equipo TI':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
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
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group shadow-inner shadow-white/5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg group-hover:bg-white/20 transition-colors">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <UserIcon className="h-4 w-4 text-white/60" />
              <span className="text-white font-semibold">{displayName}</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <EnvelopeIcon className="h-3 w-3 text-white/60" />
              <span className="text-white/60 text-sm">{item.email}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeColor(item.type)}`}>
              {item.type}
            </span>
            <ReviewChip 
              table={item.table}
              id={item.id}
              status={item.review_status}
              onUpdate={onUpdate}
            />
          </div>
          <span className="text-white/60 text-xs">
            {dayjs(item.created_at).fromNow()}
          </span>
        </div>
      </div>
      
      <div className="text-white/90 text-sm leading-relaxed">
        {item.summary}
      </div>
      
      {Object.keys(item.details).length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {Object.entries(item.details).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-white/60 capitalize">{key.replace('_', ' ')}:</span>
                <span className="text-white/90 font-medium">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FeedCard;