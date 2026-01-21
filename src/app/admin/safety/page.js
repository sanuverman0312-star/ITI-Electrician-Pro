'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Plus, Edit, Trash2, Save, X, ArrowLeft, Shield
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Tabs } from '@/components/ui/Tabs';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { safetyData } from '@/data/safety';
import { storage } from '@/lib/utils';

function SafetyManagement() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalType, setModalType] = useState('ppe'); // ppe, sign

  const [ppeItems, setPpeItems] = useState(() => storage.get('safetyPPE', safetyData.ppe));
  const [safetyDos, setSafetyDos] = useState(() => storage.get('safetyDos', safetyData.dosAndDonts.dos));
  const [safetyDonts, setSafetyDonts] = useState(() => storage.get('safetyDonts', safetyData.dosAndDonts.donts));
  const [safetySigns, setSafetySigns] = useState(() => storage.get('safetySigns', safetyData.safetySigns));

  const [formData, setFormData] = useState({
    name: '',
    nameHindi: '',
    purpose: '',
    icon: '⛑️',
    type: 'Warning',
    meaning: ''
  });

  // Persistence
  useEffect(() => {
    storage.set('safetyPPE', ppeItems);
    storage.set('safetyDos', safetyDos);
    storage.set('safetyDonts', safetyDonts);
    storage.set('safetySigns', safetySigns);
  }, [ppeItems, safetyDos, safetyDonts, safetySigns]);

  const handleAddPPE = () => {
    setModalType('ppe');
    setEditingItem(null);
    setFormData({ name: '', nameHindi: '', purpose: '', icon: '⛑️' });
    setShowModal(true);
  };

  const handleEditPPE = (item) => {
    setModalType('ppe');
    setEditingItem(item);
    setFormData({
      name: item.name,
      nameHindi: item.nameHindi,
      purpose: item.purpose,
      icon: item.icon
    });
    setShowModal(true);
  };

  const handleAddSign = () => {
    setModalType('sign');
    setEditingItem(null);
    setFormData({ name: '', nameHindi: '', type: 'Warning', meaning: '', icon: '⚠️' });
    setShowModal(true);
  };

  const handleEditSign = (sign) => {
    setModalType('sign');
    setEditingItem(sign);
    setFormData({
      name: sign.name,
      nameHindi: sign.nameHindi,
      type: sign.type,
      meaning: sign.meaning,
      icon: sign.icon || '⚠️'
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalType === 'ppe') {
      const ppeData = {
        id: editingItem?.id || `ppe-${Date.now()}`,
        ...formData
      };
      if (editingItem) {
        setPpeItems(ppeItems.map(p => p.id === editingItem.id ? ppeData : p));
      } else {
        setPpeItems([...ppeItems, ppeData]);
      }
    } else if (modalType === 'sign') {
      const signData = {
        id: editingItem?.id || `sign-${Date.now()}`,
        ...formData
      };
      if (editingItem) {
        setSafetySigns(safetySigns.map(s => s.id === editingItem.id ? signData : s));
      } else {
        setSafetySigns([...safetySigns, signData]);
      }
    }
    setShowModal(false);
    alert('✅ Changes saved locally!');
  };

  const exportSafetyData = () => {
    const data = {
      ppe: ppeItems,
      dosAndDonts: {
        dos: safetyDos,
        donts: safetyDonts
      },
      safetySigns: safetySigns
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `safety-data-export-${Date.now()}.json`;
    link.click();
  };

  const tabs = [
    {
      label: 'PPE Items',
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Personal Protective Equipment</h3>
            <Button onClick={handleAddPPE}>
              <Plus className="w-4 h-4" />
              Add PPE Item
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {ppeItems.map((item) => (
              <Card key={item.id}>
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{item.icon}</div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleEditPPE(item)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (confirm('Delete this PPE item?')) {
                          setPpeItems(ppeItems.filter(p => p.id !== item.id));
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </Button>
                  </div>
                </div>
                <h4 className="font-bold mb-1">{item.name}</h4>
                <p className="text-sm text-white/60 mb-3">{item.nameHindi}</p>
                <div className="text-sm text-white/80">{item.purpose}</div>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      label: "Do's & Don'ts",
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Dos */}
          <Card className="bg-green-500/10 border-green-500/30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">✅ DO - ये करें</h3>
              <Button
                size="sm"
                onClick={() => {
                  const newDo = prompt("Enter new DO:");
                  if (newDo) {
                    setSafetyDos([...safetyDos, `✅ ${newDo}`]);
                  }
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {safetyDos.map((item, index) => (
                <div key={index} className="flex items-start justify-between p-2 bg-white/5 rounded">
                  <span className="text-sm flex-1">{item}</span>
                  <button
                    onClick={() => setSafetyDos(safetyDos.filter((_, i) => i !== index))}
                    className="text-red-400 hover:text-red-300 ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Don'ts */}
          <Card className="bg-red-500/10 border-red-500/30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">❌ DON'T - ये न करें</h3>
              <Button
                size="sm"
                onClick={() => {
                  const newDont = prompt("Enter new DON'T:");
                  if (newDont) {
                    setSafetyDonts([...safetyDonts, `❌ ${newDont}`]);
                  }
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {safetyDonts.map((item, index) => (
                <div key={index} className="flex items-start justify-between p-2 bg-white/5 rounded">
                  <span className="text-sm flex-1">{item}</span>
                  <button
                    onClick={() => setSafetyDonts(safetyDonts.filter((_, i) => i !== index))}
                    className="text-red-400 hover:text-red-300 ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )
    },
    {
      label: 'Safety Signs',
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Safety Signs & Symbols</h3>
            <Button onClick={handleAddSign}>
              <Plus className="w-4 h-4" />
              Add Sign
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {safetySigns.map((sign) => (
              <Card key={sign.id} className="text-center relative">
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => handleEditSign(sign)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (confirm('Delete this sign?')) {
                        setSafetySigns(safetySigns.filter(s => s.id !== sign.id));
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                </div>
                <div className="text-5xl mb-4 mt-4">{sign.icon || '⚠️'}</div>
                <h4 className="font-bold mb-1">{sign.name}</h4>
                <p className="text-sm text-white/60 mb-2">{sign.nameHindi}</p>
                <Badge variant="info">{sign.type}</Badge>
                <div className="mt-3 text-xs text-white/70 line-clamp-2">{sign.meaning}</div>
              </Card>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button variant="ghost" onClick={() => router.push('/admin/dashboard')} className="mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold gradient-text mb-2">Safety Management</h1>
            <p className="text-white/70">Manage safety tips, PPE, and signs</p>
          </div>
          <Button variant="outline" onClick={exportSafetyData}>
            Export JSON
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <div className="text-2xl font-bold gradient-text">{ppeItems.length}</div>
            <div className="text-sm text-white/70">PPE Items</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold gradient-text">
              {safetyDos.length + safetyDonts.length}
            </div>
            <div className="text-sm text-white/70">Do's & Don'ts</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold gradient-text">{safetySigns.length}</div>
            <div className="text-sm text-white/70">Safety Signs</div>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs tabs={tabs} />

        {/* Add/Edit Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editingItem ? `Edit ${modalType === 'ppe' ? 'PPE' : 'Sign'}` : `Add New ${modalType === 'ppe' ? 'PPE' : 'Sign'}`}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Name (English)</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="glass-input w-full"
                  placeholder="e.g. Safety Helmet"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Name (Hindi)</label>
                <input
                  type="text"
                  value={formData.nameHindi}
                  onChange={(e) => setFormData({ ...formData, nameHindi: e.target.value })}
                  className="glass-input w-full"
                  placeholder="e.g. सुरक्षा हेलमेट"
                />
              </div>
            </div>

            {modalType === 'ppe' ? (
              <div>
                <label className="block text-sm mb-1">Purpose/Description</label>
                <textarea
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="glass-input w-full"
                  rows={3}
                  placeholder="Describe the purpose of this PPE"
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm mb-1">Sign Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="glass-input w-full"
                  >
                    <option value="Warning">Warning</option>
                    <option value="Prohibition">Prohibition</option>
                    <option value="Mandatory">Mandatory</option>
                    <option value="Safe Condition">Safe Condition</option>
                    <option value="Fire Equipment">Fire Equipment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Meaning/Action</label>
                  <textarea
                    value={formData.meaning}
                    onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
                    className="glass-input w-full"
                    rows={2}
                    placeholder="What does this sign mean?"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm mb-1">Icon (Emoji)</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="glass-input w-full text-2xl"
                placeholder="⛑️"
                maxLength={2}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4" />
                Save {modalType === 'ppe' ? 'PPE' : 'Sign'}
              </Button>
              <Button onClick={() => setShowModal(false)} variant="outline">
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default function AdminSafetyPage() {
  return (
    <ProtectedRoute>
      <SafetyManagement />
    </ProtectedRoute>
  );
}