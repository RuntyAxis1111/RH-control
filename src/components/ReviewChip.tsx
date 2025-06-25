import React from 'react';
import { supabase } from '../lib/supabaseClient';

const COLORS = {
  unreviewed: 'bg-red-500/20 text-red-400 border-red-500/30',
  in_progress: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  done: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const STATUS_TEXT = {
  unreviewed: 'Sin revisar',
  in_progress: 'Pendiente',
  done: 'Hecho',
};

type ReviewStatus = 'unreviewed' | 'in_progress' | 'done';

interface ReviewChipProps {
  table: string;
  id: string;
  status: ReviewStatus | null;
  onUpdate?: () => void;
}

const ReviewChip: React.FC<ReviewChipProps> = ({ table, id, status, onUpdate }) => {
  const currentStatus: ReviewStatus = status || 'unreviewed';
  
  const nextStatus: ReviewStatus = {
    unreviewed: 'in_progress',
    in_progress: 'done',
    done: 'unreviewed'
  }[currentStatus];

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const { error } = await supabase
        .from(table)
        .update({ review_status: nextStatus })
        .eq('id', id);
      
      if (error) {
        console.error('Error updating review status:', error);
        return;
      }
      
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error updating review status:', error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 border hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20 ${COLORS[currentStatus]}`}
      aria-label={`Cambiar estatus (actual: ${STATUS_TEXT[currentStatus]})`}
    >
      {STATUS_TEXT[currentStatus]}
    </button>
  );
};

export default ReviewChip;