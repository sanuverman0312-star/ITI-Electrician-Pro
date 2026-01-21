'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function PowerCalculator() {
  const [mode, setMode] = useState('power'); // power, voltage, current
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [power, setPower] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    let calculatedValue;
    let formula;
    let explanation;

    if (mode === 'power') {
      const v = parseFloat(voltage);
      const i = parseFloat(current);
      if (!v || !i) {
        alert('Please enter valid values');
        return;
      }
      calculatedValue = v * i;
      formula = 'P = V × I';
      explanation = `Power = Voltage × Current\nP = ${v}V × ${i}A = ${calculatedValue}W`;
    } else if (mode === 'voltage') {
      const p = parseFloat(power);
      const i = parseFloat(current);
      if (!p || !i) {
        alert('Please enter valid values');
        return;
      }
      calculatedValue = p / i;
      formula = 'V = P / I';
      explanation = `Voltage = Power / Current\nV = ${p}W / ${i}A = ${calculatedValue}V`;
    } else if (mode === 'current') {
      const p = parseFloat(power);
      const v = parseFloat(voltage);
      if (!p || !v) {
        alert('Please enter valid values');
        return;
      }
      calculatedValue = p / v;
      formula = 'I = P / V';
      explanation = `Current = Power / Voltage\nI = ${p}W / ${v}V = ${calculatedValue}A`;
    }

    setResult({
      value: calculatedValue,
      formula,
      explanation,
      unit: mode === 'power' ? 'W' : mode === 'voltage' ? 'V' : 'A'
    });
  };

  const reset = () => {
    setVoltage('');
    setCurrent('');
    setPower('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <Card>
        <h3 className="text-xl font-bold mb-4">🎯 What do you want to calculate?</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'power', label: 'Power (P)', icon: '💡' },
            { id: 'voltage', label: 'Voltage (V)', icon: '⚡' },
            { id: 'current', label: 'Current (I)', icon: '🔌' },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setMode(option.id);
                reset();
              }}
              className={`p-4 rounded-xl transition-all ${
                mode === option.id
                  ? 'bg-gradient-primary shadow-glow'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="text-3xl mb-2">{option.icon}</div>
              <div className="font-semibold text-sm">{option.label}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Input Fields */}
      <Card>
        <h3 className="text-xl font-bold mb-4">📝 Enter Values</h3>
        <div className="space-y-4">
          {mode !== 'voltage' && (
            <div>
              <label className="block text-sm mb-2 text-white/70">
                Voltage (V) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                placeholder="e.g., 230"
                className="glass-input w-full"
              />
            </div>
          )}

          {mode !== 'current' && (
            <div>
              <label className="block text-sm mb-2 text-white/70">
                Current (A) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                placeholder="e.g., 10"
                className="glass-input w-full"
              />
            </div>
          )}

          {mode !== 'power' && (
            <div>
              <label className="block text-sm mb-2 text-white/70">
                Power (W) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                placeholder="e.g., 2300"
                className="glass-input w-full"
              />
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <Button onClick={calculate} className="flex-1">
            Calculate
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>
      </Card>

      {/* Result */}
      {result && (
        <Card className="bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
          <h3 className="text-2xl font-bold mb-4">✨ Result</h3>
          
          <div className="p-6 bg-white/10 rounded-xl mb-4">
            <div className="text-sm text-white/60 mb-2">
              {mode === 'power' ? 'Power' : mode === 'voltage' ? 'Voltage' : 'Current'}
            </div>
            <div className="text-5xl font-bold gradient-text">
              {result.value.toFixed(2)}
            </div>
            <div className="text-2xl text-white/80 mt-1">{result.unit}</div>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-white/60 mb-1">Formula Used:</div>
              <div className="text-lg font-mono text-accent">{result.formula}</div>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-white/60 mb-2">Calculation:</div>
              <pre className="text-sm whitespace-pre-wrap">{result.explanation}</pre>
            </div>
          </div>
        </Card>
      )}

      {/* Formula Reference */}
      <Card>
        <h3 className="text-xl font-bold mb-4">📚 Formula Reference</h3>
        <div className="space-y-3">
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="font-semibold mb-1">Power Formula:</div>
            <code className="text-accent">P = V × I</code>
            <p className="text-sm text-white/60 mt-1">Power = Voltage × Current</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="font-semibold mb-1">Voltage Formula:</div>
            <code className="text-accent">V = P / I</code>
            <p className="text-sm text-white/60 mt-1">Voltage = Power / Current</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="font-semibold mb-1">Current Formula:</div>
            <code className="text-accent">I = P / V</code>
            <p className="text-sm text-white/60 mt-1">Current = Power / Voltage</p>
          </div>
        </div>
      </Card>
    </div>
  );
}