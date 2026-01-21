'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Tabs({ tabs, defaultTab = 0, className }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <div className={cn('space-y-6', className)}>
      {/* Tab Headers */}
      <div className="flex gap-2 p-1 bg-white/5 rounded-xl overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={cn(
              'relative px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap',
              activeTab === index
                ? 'text-white'
                : 'text-white/50 hover:text-white/80'
            )}
          >
            {activeTab === index && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-primary rounded-lg"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <span>{tab.icon}</span>}
              {tab.label}
            </span>
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {tabs[activeTab]?.content}
      </motion.div>
    </div>
  );
}