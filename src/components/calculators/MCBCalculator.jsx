'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function MCBCalculator() {
  const [totalLoad, setTotalLoad] = useState('');
  const [voltage, setVoltage] = useState('230');
  const [safetyFactor, setSafetyFactor] = useState('1.25');
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const mcbRatings = [6, 10, 16, 20, 25, 32, 40, 50, 63];

  const calculate = () => {
    setError(null);
    const load = parseFloat(totalLoad);
    const v = parseFloat(voltage);
    const sf = parseFloat(safetyFactor);

    if (!load || !v || !sf) {
      setError('⚠️ Please enter all required fields with valid numbers.');
      return;
    }

    // Calculate current
    const current = load / v;

    // With safety factor
    const requiredRating = current * sf;

    // Find next standard MCB rating
    const recommendedMCB = mcbRatings.find(rating => rating >= requiredRating) || 63;

    // Calculate wire size
    const wireSize = recommendedMCB <= 6 ? '1.0' :
      recommendedMCB <= 10 ? '1.5' :
        recommendedMCB <= 16 ? '2.5' :
          recommendedMCB <= 25 ? '4.0' :
            recommendedMCB <= 32 ? '6.0' :
              recommendedMCB <= 40 ? '10.0' : '16.0';

    setResult({
      current: current.toFixed(2),
      requiredRating: requiredRating.toFixed(2),
      recommendedMCB,
      wireSize,
      explanation: `Load Current = ${load}W / ${v}V = ${current.toFixed(2)}A\nWith ${sf}× safety factor = ${requiredRating.toFixed(2)}A\nNearest standard MCB = ${recommendedMCB}A`
    });
  };

  const reset = () => {
    setTotalLoad('');
    setVoltage('230');
    setSafetyFactor('1.25');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <Card>
        <h3 className="text-xl font-bold mb-4">📝 Enter Load Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-white/70">
              Total Load (Watts) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              value={totalLoad}
              onChange={(e) => setTotalLoad(e.target.value)}
              placeholder="e.g., 2300"
              className="glass-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-white/70">
              Supply Voltage (V) <span className="text-red-400">*</span>
            </label>
            <select
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              className="glass-input w-full"
            >
              <option value="230">230V (Single Phase)</option>
              <option value="440">440V (Three Phase)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2 text-white/70">
              Safety Factor <span className="text-red-400">*</span>
            </label>
            <select
              value={safetyFactor}
              onChange={(e) => setSafetyFactor(e.target.value)}
              className="glass-input w-full"
            >
              <option value="1.25">1.25× (Recommended)</option>
              <option value="1.5">1.5× (High Safety)</option>
              <option value="1.0">1.0× (No Safety Margin)</option>
            </select>
            <p className="text-xs text-white/50 mt-1">
              Safety factor accounts for surge currents and future expansion
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm animate-fade-in">
            {error}
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <Button onClick={calculate} className="flex-1">
            Calculate MCB
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>
      </Card>

      {/* Result */}
      {result && (
        <Card className="bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
          <h3 className="text-2xl font-bold mb-4">🔌 Recommended MCB</h3>

          <div className="p-6 bg-white/10 rounded-xl mb-4 text-center">
            <div className="text-sm text-white/60 mb-2">MCB Rating</div>
            <div className="text-6xl font-bold gradient-text">
              {result.recommendedMCB}A
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-white/60 mb-1">Load Current</div>
              <div className="text-2xl font-bold">{result.current} A</div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-white/60 mb-1">Required Rating (with safety)</div>
              <div className="text-2xl font-bold">{result.requiredRating} A</div>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-lg mb-4">
            <div className="text-sm text-white/60 mb-2">Calculation:</div>
            <pre className="text-sm whitespace-pre-wrap">{result.explanation}</pre>
          </div>

          <div className="p-4 bg-accent/10 border border-accent/30 rounded-xl">
            <div className="font-semibold mb-3">📋 Installation Guide</div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Use <strong>{result.recommendedMCB}A MCB</strong> for this load</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Minimum wire size: <strong>{result.wireSize} sq.mm</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>MCB Type: <strong>C-Curve</strong> (for general use)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Consider adding <strong>RCCB (30mA)</strong> for safety</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* MCB Types Info */}
      <Card>
        <h3 className="text-xl font-bold mb-4">📚 MCB Types & Selection</h3>
        <div className="space-y-3">
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="info">Type B</Badge>
              <span className="font-semibold">3-5× rated current</span>
            </div>
            <p className="text-sm text-white/70">
              For resistive loads: Lighting, heaters
            </p>
          </div>

          <div className="p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="success">Type C</Badge>
              <span className="font-semibold">5-10× rated current</span>
            </div>
            <p className="text-sm text-white/70">
              For inductive loads: Motors, transformers (Most common)
            </p>
          </div>

          <div className="p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="warning">Type D</Badge>
              <span className="font-semibold">10-20× rated current</span>
            </div>
            <p className="text-sm text-white/70">
              For high inrush loads: Large motors, welding machines
            </p>
          </div>
        </div>
      </Card>

      {/* Standard MCB Ratings */}
      <Card>
        <h3 className="text-xl font-bold mb-4">⚡ Standard MCB Ratings</h3>
        <div className="flex flex-wrap gap-2">
          {mcbRatings.map(rating => (
            <div
              key={rating}
              className={`px-4 py-2 rounded-lg font-semibold ${result && result.recommendedMCB === rating
                  ? 'bg-gradient-primary shadow-glow'
                  : 'bg-white/5'
                }`}
            >
              {rating}A
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}