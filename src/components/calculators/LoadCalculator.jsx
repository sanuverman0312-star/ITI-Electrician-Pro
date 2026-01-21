'use client';
import { useState } from 'react';
import { Plus, Minus, Trash2, Copy, Share2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';

export default function LoadCalculator() {
  const [appliances, setAppliances] = useState([
    { name: 'LED Bulb', watt: 10, quantity: 0 },
    { name: 'CFL', watt: 15, quantity: 0 },
    { name: 'Tube Light', watt: 40, quantity: 0 },
    { name: 'Fan', watt: 75, quantity: 0 },
    { name: 'AC (1 Ton)', watt: 1000, quantity: 0 },
    { name: 'AC (1.5 Ton)', watt: 1500, quantity: 0 },
    { name: 'Refrigerator', watt: 150, quantity: 0 },
    { name: 'TV (LED)', watt: 100, quantity: 0 },
    { name: 'Washing Machine', watt: 500, quantity: 0 },
    { name: 'Water Heater', watt: 2000, quantity: 0 },
  ]);

  const [customAppliances, setCustomAppliances] = useState([]);
  const [customName, setCustomName] = useState('');
  const [customWatt, setCustomWatt] = useState('');
  const [runningHours, setRunningHours] = useState(8);
  const [unitRate, setUnitRate] = useState(6);

  const updateQuantity = (index, delta, isCustom = false) => {
    if (isCustom) {
      const updated = [...customAppliances];
      updated[index].quantity = Math.max(0, updated[index].quantity + delta);
      setCustomAppliances(updated);
    } else {
      const updated = [...appliances];
      updated[index].quantity = Math.max(0, updated[index].quantity + delta);
      setAppliances(updated);
    }
  };

  const addCustomAppliance = () => {
    if (customName && customWatt && parseFloat(customWatt) > 0) {
      setCustomAppliances([
        ...customAppliances,
        { name: customName, watt: parseFloat(customWatt), quantity: 1 }
      ]);
      setCustomName('');
      setCustomWatt('');
    }
  };

  const removeCustomAppliance = (index) => {
    setCustomAppliances(customAppliances.filter((_, i) => i !== index));
  };

  const allAppliances = [...appliances, ...customAppliances];
  const totalLoad = allAppliances.reduce(
    (sum, app) => sum + (app.watt * app.quantity), 
    0
  );
  const totalLoadKW = totalLoad / 1000;
  const current = totalLoad / 230; // Single phase 230V
  const dailyUnits = (totalLoad * runningHours) / 1000;
  const monthlyUnits = dailyUnits * 30;
  const monthlyCost = monthlyUnits * unitRate;

  // MCB recommendation
  const recommendedMCB = current <= 6 ? '10A' :
                        current <= 10 ? '16A' :
                        current <= 16 ? '20A' :
                        current <= 25 ? '32A' :
                        current <= 40 ? '40A' : '63A';

  const hasLoad = totalLoad > 0;

  const handleCopy = () => {
    const text = `Total Load: ${totalLoad}W (${totalLoadKW.toFixed(2)}kW)\nCurrent: ${current.toFixed(2)}A\nDaily Units: ${dailyUnits.toFixed(2)} kWh\nMonthly Cost: ${formatCurrency(monthlyCost)}`;
    navigator.clipboard.writeText(text);
    alert('Result copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Appliances List */}
      <Card>
        <h3 className="text-xl font-bold mb-4">⚡ Select Appliances</h3>
        <div className="space-y-3">
          {appliances.map((appliance, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
            >
              <div className="flex-1">
                <div className="font-semibold text-sm">{appliance.name}</div>
                <div className="text-xs text-white/60">{appliance.watt}W each</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(index, -1)}
                  className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  disabled={appliance.quantity === 0}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-bold">
                  {appliance.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(index, 1)}
                  className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Custom Appliances */}
      <Card>
        <h3 className="text-xl font-bold mb-4">➕ Add Custom Appliance</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Appliance Name"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            className="glass-input w-full"
          />
          <input
            type="number"
            placeholder="Power (Watts)"
            value={customWatt}
            onChange={(e) => setCustomWatt(e.target.value)}
            className="glass-input w-full"
          />
          <Button onClick={addCustomAppliance} className="w-full">
            <Plus className="w-4 h-4" />
            Add Appliance
          </Button>
        </div>

        {customAppliances.length > 0 && (
          <div className="mt-4 space-y-2">
            {customAppliances.map((appliance, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div className="flex-1">
                  <div className="font-semibold text-sm">{appliance.name}</div>
                  <div className="text-xs text-white/60">{appliance.watt}W each</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(index, -1, true)}
                    className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold">
                    {appliance.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(index, 1, true)}
                    className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeCustomAppliance(index)}
                    className="w-8 h-8 flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Settings */}
      <Card>
        <h3 className="text-xl font-bold mb-4">⚙️ Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Running Hours per Day</label>
            <input
              type="number"
              value={runningHours}
              onChange={(e) => setRunningHours(parseFloat(e.target.value) || 0)}
              className="glass-input w-full"
              min="0"
              max="24"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Unit Rate (₹/kWh)</label>
            <input
              type="number"
              value={unitRate}
              onChange={(e) => setUnitRate(parseFloat(e.target.value) || 0)}
              className="glass-input w-full"
              min="0"
              step="0.5"
            />
          </div>
        </div>
      </Card>

      {/* Results */}
      {hasLoad && (
        <Card className="bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">⚡ Results</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/10 rounded-xl">
              <div className="text-sm text-white/60 mb-1">Total Load</div>
              <div className="text-3xl font-bold gradient-text">
                {totalLoad}W
              </div>
              <div className="text-lg text-white/80">
                {totalLoadKW.toFixed(2)} kW
              </div>
            </div>

            <div className="p-4 bg-white/10 rounded-xl">
              <div className="text-sm text-white/60 mb-1">Current Required</div>
              <div className="text-3xl font-bold gradient-text">
                {current.toFixed(2)}A
              </div>
              <div className="text-sm text-white/80">
                at 230V single phase
              </div>
            </div>

            <div className="p-4 bg-white/10 rounded-xl">
              <div className="text-sm text-white/60 mb-1">Daily Consumption</div>
              <div className="text-3xl font-bold gradient-text">
                {dailyUnits.toFixed(2)}
              </div>
              <div className="text-sm text-white/80">kWh (Units)</div>
            </div>

            <div className="p-4 bg-white/10 rounded-xl">
              <div className="text-sm text-white/60 mb-1">Monthly Cost</div>
              <div className="text-3xl font-bold gradient-text">
                {formatCurrency(monthlyCost)}
              </div>
              <div className="text-sm text-white/80">
                ({monthlyUnits.toFixed(0)} units × ₹{unitRate})
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-accent/10 border border-accent/30 rounded-xl">
            <div className="font-semibold mb-2">💡 Recommendations</div>
            <ul className="space-y-2 text-sm">
              <li>✓ Recommended MCB Size: <span className="font-bold text-accent">{recommendedMCB}</span></li>
              <li>✓ Minimum Wire Size: <span className="font-bold">
                {current <= 6 ? '1.0 sq.mm' :
                 current <= 10 ? '1.5 sq.mm' :
                 current <= 16 ? '2.5 sq.mm' :
                 current <= 25 ? '4.0 sq.mm' : '6.0 sq.mm'}
              </span></li>
              <li>✓ Consider installing an RCCB for safety (30mA recommended)</li>
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
}