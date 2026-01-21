'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function Card({ 
  children, 
  className, 
  hover = true,
  onClick,
  ...props 
}) {
  const Component = onClick ? motion.button : motion.div;
  
  return (
    <Component
      className={cn(
        'glass-card p-6',
        hover && 'cursor-pointer',
        onClick && 'w-full text-left',
        className
      )}
      whileHover={hover ? { y: -5 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
}