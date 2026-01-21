'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Plus, Edit, Trash2, Save, X, ArrowLeft,
  Link2, ExternalLink
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { SearchBar } from '@/components/ui/SearchBar';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { getAllLinks } from '@/data/links';
import { searchFilter, storage } from '@/lib/utils';

function LinksManagement() {
  const router = useRouter();
  const [links, setLinks] = useState(() => storage.get('itiLinksData', getAllLinks()));
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    titleHindi: '',
    description: '',
    url: '',
    category: 'Resources',
    icon: '🔗',
    official: false,
    state: ''
  });

  const filteredLinks = searchFilter(links, searchQuery, ['title', 'titleHindi', 'description']);

  const handleAdd = () => {
    setEditingLink(null);
    setFormData({
      title: '',
      titleHindi: '',
      description: '',
      url: '',
      category: 'Resources',
      icon: '🔗',
      official: false,
      state: ''
    });
    setShowModal(true);
  };

  const handleEdit = (link) => {
    setEditingLink(link);
    setFormData({
      title: link.title,
      titleHindi: link.titleHindi || '',
      description: link.description,
      url: link.url,
      category: link.category,
      icon: link.icon,
      official: link.official || false,
      state: link.state || ''
    });
    setShowModal(true);
  };

  const handleDelete = (linkId) => {
    if (confirm('Are you sure you want to delete this link?')) {
      const newLinks = links.filter(l => l.id !== linkId);
      setLinks(newLinks);
      storage.set('itiLinksData', newLinks);
      alert('✅ Link deleted and saved locally!');
    }
  };

  const handleSave = () => {
    const linkData = {
      id: editingLink?.id || `link-${Date.now()}`,
      title: formData.title,
      titleHindi: formData.titleHindi,
      description: formData.description,
      url: formData.url,
      category: formData.category,
      icon: formData.icon,
      official: formData.official,
      state: formData.state
    };

    let newLinks;
    if (editingLink) {
      newLinks = links.map(l => l.id === editingLink.id ? linkData : l);
    } else {
      newLinks = [...links, linkData];
    }

    setLinks(newLinks);
    storage.set('itiLinksData', newLinks);
    setShowModal(false);
    alert('✅ Link saved locally!');
  };

  const exportLinks = () => {
    const dataStr = JSON.stringify(links, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'links-export.json';
    link.click();
  };

  const categories = [...new Set(links.map(l => l.category))];

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
            <h1 className="text-3xl font-bold gradient-text mb-2">ITI Links Management</h1>
            <p className="text-white/70">Manage external ITI resources</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={exportLinks}>
              Export JSON
            </Button>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4" />
              Add Link
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="text-center">
            <div className="text-2xl font-bold gradient-text">{links.length}</div>
            <div className="text-sm text-white/70">Total Links</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {links.filter(l => l.official).length}
            </div>
            <div className="text-sm text-white/70">Official</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-blue-400">{categories.length}</div>
            <div className="text-sm text-white/70">Categories</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {links.filter(l => l.state).length}
            </div>
            <div className="text-sm text-white/70">State Specific</div>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchBar
            placeholder="Search links..."
            onSearch={setSearchQuery}
          />
        </div>

        {/* Links Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredLinks.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold">{link.title}</h3>
                        <p className="text-sm text-white/60">{link.titleHindi}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(link)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(link.id)}>
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-white/70 mb-3">{link.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="info">{link.category}</Badge>
                      {link.official && <Badge variant="success">Official</Badge>}
                      {link.state && <Badge variant="default">{link.state}</Badge>}
                    </div>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:underline flex items-center gap-1"
                    >
                      Visit Link <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Add/Edit Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editingLink ? 'Edit Link' : 'Add New Link'}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Title (English) *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="glass-input w-full"
                placeholder="e.g., NCVT MIS Result"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Title (Hindi)</label>
              <input
                type="text"
                value={formData.titleHindi}
                onChange={(e) => setFormData({ ...formData, titleHindi: e.target.value })}
                className="glass-input w-full"
                placeholder="शीर्षक हिंदी में"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="glass-input w-full"
                rows={2}
                placeholder="Brief description"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">URL *</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="glass-input w-full"
                placeholder="https://example.com"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="glass-input w-full"
                >
                  <option value="Results">Results</option>
                  <option value="Certificates">Certificates</option>
                  <option value="Admission">Admission</option>
                  <option value="Syllabus">Syllabus</option>
                  <option value="Jobs">Jobs</option>
                  <option value="Resources">Resources</option>
                  <option value="Official">Official</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Icon (Emoji)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="glass-input w-full"
                  placeholder="🔗"
                  maxLength={2}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">State (Optional)</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="glass-input w-full"
                placeholder="e.g., Uttar Pradesh"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="official"
                checked={formData.official}
                onChange={(e) => setFormData({ ...formData, official: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="official" className="text-sm">Mark as Official Link</label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4" />
                Save Link
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

export default function AdminLinksPage() {
  return (
    <ProtectedRoute>
      <LinksManagement />
    </ProtectedRoute>
  );
}