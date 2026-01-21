'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AlertCircle } from 'lucide-react';

export default function WireSizeCalculator() {
  const [current, setCurrent] = useState('');
  const [distance, setDistance] = useState('');
  const [voltageDrop, setVoltageDrop] = useState('2');
  const [installation, setInstallation] = useState('conduit');
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const wireData = [
    { size: 0.75, capacity: 6, usage: 'Light circuits, bells' },
    { size: 1.0, capacity: 10, usage: 'Lights, small fans' },
    { size: 1.5, capacity: 16, usage: 'Power sockets, fans' },
    { size: 2.5, capacity: 20, usage: 'AC, geysers, heavy appliances' },
    { size: 4.0, capacity: 25, usage: 'Heavy loads, sub-mains' },
    { size: 6.0, capacity: 32, usage: 'Main distribution, large AC' },
    { size: 10.0, capacity: 40, usage: 'Main incoming, heavy distribution' },
    { size: 16.0, capacity: 63, usage: 'Very heavy loads, industrial' },
  ];

  const calculate = () => {
    setError(null);
    const I = parseFloat(current);
    const L = parseFloat(distance);
    const allowedDrop = parseFloat(voltageDrop);

    if (!I || !L || !allowedDrop) {
      setError('⚠️ Please enter all required fields with valid numbers.');
      return;
    }

    // Calculate voltage drop
    // For copper wire: Drop = (2 × L × I × ρ) / A
    // where ρ for copper = 0.0175 Ω·mm²/m
    const voltage = 230; // Assumed single phase
    const maxDropVoltage = (voltage * allowedDrop) / 100;

    // Calculate minimum area required
    // A = (2 × L × I × ρ) / allowedDropVoltage
    const rho = 0.0175; // Copper resistivity
    const minArea = (2 * L * I * rho) / maxDropVoltage;

    // Find recommended wire size
    const recommendedWire = wireData.find(wire => wire.size >= minArea);

    // Also check current capacity
    const wireByCapacity = wireData.find(wire => wire.capacity >= I * 1.25);

    // Take the larger of the two
    const finalWire = wireData.find(wire =>
      wire.size >= Math.max(
        recommendedWire?.size || 0,
        wireByCapacity?.size || 0
      )
    ) || wireData[wireData.length - 1];

    // Calculate actual voltage drop with selected wire
    const actualDrop = (2 * L * I * rho) / finalWire.size;
    const actualDropPercent = (actualDrop / voltage) * 100;

    setResult({
      recommendedSize: finalWire.size,
      currentCapacity: finalWire.capacity,
      usage: finalWire.usage,
      actualDrop: actualDrop.toFixed(2),
      actualDropPercent: actualDropPercent.toFixed(2),
      isAcceptable: actualDropPercent <= allowedDrop
    });
  };

  const reset = () => {
    setCurrent('');
    setDistance('');
    setVoltageDrop('2');
    setInstallation('conduit');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <Card>
        <h3 className="text-xl font-bold mb-4">📝 Enter Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-white/70">
              Load Current (A) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="e.g., 15"
              className="glass-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-white/70">
              Cable Length (meters) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="e.g., 25"
              className="glass-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-white/70">
              Allowed Voltage Drop (%) <span className="text-red-400">*</span>
            </label>
            <select
              value={voltageDrop}
              onChange={(e) => setVoltageDrop(e.target.value)}
              className="glass-input w-full"
            >
              <option value="1">1% (Sensitive equipment)</option>
              <option value="2">2% (Recommended)</option>
              <option value="3">3% (Normal circuits)</option>
              <option value="5">5% (Maximum allowed)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2 text-white/70">
              Installation Method
            </label>
            <select
              value={installation}
              onChange={(e) => setInstallation(e.target.value)}
              className="glass-input w-full"
            >
              <option value="conduit">In Conduit/Casing</option>
              <option value="surface">Surface Mount</option>
              <option value="underground">Underground</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm animate-fade-in">
            {error}
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <Button onClick={calculate} className="flex-1">
            Calculate Wire Size
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>
      </Card>

      {/* Result */}
      {result && (
        <Card className="bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
          <h3 className="text-2xl font-bold mb-4">📏 Recommended Wire Size</h3>

          <div className="p-6 bg-white/10 rounded-xl mb-4 text-center">
            <div className="text-sm text-white/60 mb-2">Wire Size</div>
            <div className="text-6xl font-bold gradient-text">
              {result.recommendedSize}
            </div>
            <div className="text-2xl text-white/80 mt-1">sq.mm</div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-white/60 mb-1">Current Capacity</div>
              <div className="text-2xl font-bold">{result.currentCapacity} A</div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-sm text-white/60 mb-1">Actual Voltage Drop</div>
              <div className="text-2xl font-bold">
                {result.actualDropPercent}%
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl mb-4 ${result.isAcceptable
              ? 'bg-green-500/10 border border-green-500/30'
              : 'bg-red-500/10 border border-red-500/30'
            }`}>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5" />
              <span className="font-semibold">
                {result.isAcceptable ? '✅ Acceptable' : '⚠️ Warning'}
              </span>
            </div>
            <p className="text-sm">
              {result.isAcceptable
                ? 'Voltage drop is within acceptable limits.'
                : 'Voltage drop exceeds recommended limits. Consider using larger wire.'}
            </p>
          </div>

          <div className="p-4 bg-accent/10 border border-accent/30 rounded-xl">
            <div className="font-semibold mb-3">💡 Usage Guide</div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span><strong>{result.recommendedSize} sq.mm</strong> wire is suitable for: {result.usage}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Maximum safe current: <strong>{result.currentCapacity}A</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Use copper wire for better conductivity</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Always use insulated wire suitable for voltage rating</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Wire Size Reference */}
      <Card>
        <h3 className="text-xl font-bold mb-4">📊 Wire Size Reference Chart</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2">Wire Size</th>
                <th className="text-left py-2">Capacity</th>
                <th className="text-left py-2">Common Usage</th>
              </tr>
            </thead>
            <tbody>
              {wireData.map((wire, index) => (
                <tr
                  key={index}
                  className={`border-b border-white/5 ${result && result.recommendedSize === wire.size
                      ? 'bg-accent/20'
                      : ''
                    }`}
                >
                  <td className="py-3 font-semibold">{wire.size} sq.mm</td>
                  <td className="py-3">{wire.capacity}A</td>
                  <td className="py-3 text-white/70">{wire.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Important Notes */}
      <Card className="bg-yellow-500/10 border border-yellow-500/30">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          ⚠️ Important Notes
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>ये calculations copper wire के लिए हैं</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Aluminum wire की capacity 60% होती है copper की तुलना में</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>हमेशा IS 694 standards के according wire का selection करें</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Temperature और installation method भी wire capacity को affect करते हैं</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}