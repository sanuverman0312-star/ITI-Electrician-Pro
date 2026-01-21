'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ProgressBar({ 
  value = 0, 
  max = 100, 
  className,
  showLabel = true,
  color = 'primary'
}) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colors = {
    primary: 'bg-gradient-primary',
    success: 'bg-gradient-success',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
  };
  
  return (
    <div className={cn('space-y-2', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Progress</span>
          <span className="font-semibold">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn('h-full rounded-full', colors[color])}
        />
      </div>
    </div>
  );
}