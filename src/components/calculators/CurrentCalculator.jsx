'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function CurrentCalculator() {
  const [phaseType, setPhaseType] = useState('single'); // single, three
  const [power, setPower] = useState('');
  const [voltage, setVoltage] = useState('230');
  const [powerFactor, setPowerFactor] = useState('0.8');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const p = parseFloat(power);
    const v = parseFloat(voltage);
    const pf = parseFloat(powerFactor);

    if (!p || !v || (phaseType === 'three' && !pf)) {
      alert('Please enter valid values');
      return;
    }

    let current;
    let formula;
    let explanation;

    if (phaseType === 'single') {
      current = p / v;
      formula = 'I = P / V';
      explanation = `Single Phase Current\nI = ${p}W / ${v}V = ${current.toFixed(2)}A`;
    } else {
      current = p / (Math.sqrt(3) * v * pf);
      formula = 'I = P / (√3 × V × PF)';
      explanation = `Three Phase Current\nI = ${p}W / (1.732 × ${v}V × ${pf})\nI = ${p} / ${(Math.sqrt(3) * v * pf).toFixed(2)}\nI = ${current.toFixed(2)}A`;
    }

    // MCB Recommendation
    const mcbRating = current <= 6 ? '10A' :
                      current <= 10 ? '16A' :
                      current <= 16 ? '20A' :
                      current <= 25 ? '32A' :
                      current <= 40 ? '40A' : '63A';

    // Wire Size Recommendation
    const wireSize = current <= 6 ? '1.0 sq.mm' :
                     current <= 10 ? '1.5 sq.mm' :
                     current <= 16 ? '2.5 sq.mm' :
                     current <= 25 ? '4.0 sq.mm' :
                     current <= 32 ? '6.0 sq.mm' : '10.0 sq.mm';

    setResult({
      current,
      formula,
      explanation,
      mcbRating,
      wireSize
    });
  };

  const reset = () => {
    setPower('');
    setVoltage(phaseType === 'single' ? '230' : '440');
    setPowerFactor('0.8');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Phase Type Selection */}
      <Card>
        <h3 className="text-xl font-bold mb-4">🔌 Select Phase Type</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setPhaseType('single');
              setVoltage('230');
              reset();
            }}
            className={`p-4 rounded-xl transition-all ${
              phaseType === 'single'
                ? 'bg-gradient-primary shadow-glow'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="text-3xl mb-2">1️⃣</div>
            <div className="font-semibold">Single Phase</div>
            <div className="text-xs text-white/60 mt-1">230V</div>
          </button>

          <button
            onClick={() => {
              setPhaseType('three');
              setVoltage('440');
              reset();
            }}
            className={`p-4 rounded-xl transition-all ${
              phaseType === 'three'
                ? 'bg-gradient-primary shadow-glow'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="text-3xl mb-2">3️⃣</div>
            <div className="font-semibold">Three Phase</div>
            <div className="text-xs text-white/60 mt-1">440V</div>
          </button>
        </div>
      </Card>

      {/* Input Fields */}
      <Card>
        <h3 className="text-xl font-bold mb-4">📝 Enter Values</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-white/70">
              Load Power (W or kW) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              placeholder="e.g., 2300 or 2.3"
              className="glass-input w-full"
            />
            <p className="text-xs text-white/50 mt-1">
              Enter in Watts (W) or kilowatts (kW)
            </p>
          </div>

          <div>
            <label className="block text-sm mb-2 text-white/70">
              Voltage (V) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              placeholder={phaseType === 'single' ? '230' : '440'}
              className="glass-input w-full"
            />
          </div>

          {phaseType === 'three' && (
            <div>
              <label className="block text-sm mb-2 text-white/70">
                Power Factor (PF) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={powerFactor}
                onChange={(e) => setPowerFactor(e.target.value)}
                placeholder="0.8"
                step="0.1"
                min="0"
                max="1"
                className="glass-input w-full"
              />
              <p className="text-xs text-white/50 mt-1">
                Typical values: Resistive load = 1.0, Inductive load = 0.7-0.9
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <Button onClick={calculate} className="flex-1">
            Calculate Current
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>
      </Card>

      {/* Result */}
      {result && (
        <Card className="bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
          <h3 className="text-2xl font-bold mb-4">⚡ Result</h3>
          
          <div className="p-6 bg-white/10 rounded-xl mb-4">
            <div className="text-sm text-white/60 mb-2">Current Required</div>
            <div className="text-5xl font-bold gradient-text">
              {result.current.toFixed(2)}
            </div>
            <div className="text-2xl text-white/80 mt-1">Amperes (A)</div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-white/60 mb-1">Formula Used:</div>
              <div className="text-lg font-mono text-accent">{result.formula}</div>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-white/60 mb-2">Calculation:</div>
              <pre className="text-sm whitespace-pre-wrap">{result.explanation}</pre>
            </div>
          </div>

          <div className="p-4 bg-accent/10 border border-accent/30 rounded-xl">
            <div className="font-semibold mb-3">💡 Recommendations</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                <span>Recommended MCB:</span>
                <span className="font-bold text-accent">{result.mcbRating}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                <span>Minimum Wire Size:</span>
                <span className="font-bold text-accent">{result.wireSize}</span>
              </div>
              <div className="p-2 bg-white/5 rounded text-white/70">
                ⚠️ Always add 25% safety margin for actual installation
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}