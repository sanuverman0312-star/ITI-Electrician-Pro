'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Zap, Cable, Gauge, Activity } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import LoadCalculator from '@/components/calculators/LoadCalculator';
import PowerCalculator from '@/components/calculators/PowerCalculator';
import CurrentCalculator from '@/components/calculators/CurrentCalculator';
import MCBCalculator from '@/components/calculators/MCBCalculator';
import WireSizeCalculator from '@/components/calculators/WireSizeCalculator';

export default function CalculatorPage() {
  const calculators = [
    {
      label: 'Load Calculator',
      icon: <Zap className="w-5 h-5" />,
      content: <LoadCalculator />
    },
    {
      label: 'Power Calculator',
      icon: <Activity className="w-5 h-5" />,
      content: <PowerCalculator />
    },
    {
      label: 'Current Calculator',
      icon: <Gauge className="w-5 h-5" />,
      content: <CurrentCalculator />
    },
    {
      label: 'MCB Calculator',
      icon: <Cable className="w-5 h-5" />,
      content: <MCBCalculator />
    },
    {
      label: 'Wire Size Calculator',
      icon: <Cable className="w-5 h-5" />,
      content: <WireSizeCalculator />
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container-custom max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="section-title mb-4">🧮 Electrical Calculators</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Professional electrical calculators with detailed explanations. सभी calculations accurate और easy to understand.
          </p>
        </motion.div>

        {/* Calculator Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs tabs={calculators} />
        </motion.div>
      </div>
    </div>
  );
}