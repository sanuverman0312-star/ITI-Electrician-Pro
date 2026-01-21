'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Plus, Edit, Trash2, Save, X, ArrowLeft,
  BookOpen, Download
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from '@/components/ui/SearchBar';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { allChapters } from '@/data/chapters';
import { searchFilter, storage } from '@/lib/utils';

function ChaptersManagement() {
  const router = useRouter();
  const [chapters, setChapters] = useState(() => storage.get('adminChapters', allChapters));
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingChapter, setEditingChapter] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Trade Theory',
    year: '1st',
    icon: '⚡',
    description: '',
    topics: '',
    content: ''
  });

  const filteredChapters = searchFilter(chapters, searchQuery, ['title', 'category', 'description']);

  const handleAdd = () => {
    setEditingChapter(null);
    setFormData({
      title: '',
      category: 'Trade Theory',
      year: '1st',
      icon: '⚡',
      description: '',
      topics: '',
      content: ''
    });
    setShowModal(true);
  };

  const handleEdit = (chapter) => {
    setEditingChapter(chapter);
    setFormData({
      title: chapter.title || '',
      category: chapter.category || 'Trade Theory',
      year: chapter.year || '1st',
      icon: chapter.icon || '⚡',
      description: chapter.description || '',
      topics: Array.isArray(chapter.topics) ? chapter.topics.join('\n') : '',
      content: chapter.content || ''
    });
    setShowModal(true);
  };

  const handleDelete = (chapterId) => {
    if (confirm('Are you sure you want to delete this chapter?')) {
      const newChapters = chapters.filter(c => c.id !== chapterId);
      setChapters(newChapters);
      storage.set('adminChapters', newChapters);
      alert('✅ Chapter deleted and saved locally!');
    }
  };

  const handleSave = (e) => {
    e?.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      alert('❌ Please enter chapter title');
      return;
    }
    if (!formData.category.trim()) {
      alert('❌ Please enter category');
      return;
    }
    if (!formData.description.trim()) {
      alert('❌ Please enter description');
      return;
    }
    if (!formData.topics.trim()) {
      alert('❌ Please enter at least one topic');
      return;
    }
    if (!formData.content.trim()) {
      alert('❌ Please enter chapter content');
      return;
    }

    // Process topics
    const topicsArray = formData.topics
      .split('\n')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    if (topicsArray.length === 0) {
      alert('❌ Please enter at least one valid topic');
      return;
    }

    // Create chapter data
    const chapterData = {
      id: editingChapter?.id || `ch-${Date.now()}`,
      title: formData.title.trim(),
      category: formData.category.trim(),
      year: formData.year,
      icon: formData.icon || '⚡',
      description: formData.description.trim(),
      topics: topicsArray,
      content: formData.content.trim(),
      readingTime: Math.max(1, Math.ceil(formData.content.split(' ').length / 200)),
      relatedTopics: []
    };

    let newChapters;
    // Update or add
    if (editingChapter) {
      newChapters = chapters.map(c => c.id === editingChapter.id ? chapterData : c);
      setChapters(newChapters);
      alert('✅ Chapter updated successfully!');
    } else {
      newChapters = [chapterData, ...chapters];
      setChapters(newChapters);
      alert('✅ Chapter added successfully!');
    }

    storage.set('adminChapters', newChapters);

    // Close modal and reset
    setShowModal(false);
    setFormData({
      title: '',
      category: 'Trade Theory',
      year: '1st',
      icon: '⚡',
      description: '',
      topics: '',
      content: ''
    });
  };

  const exportChapters = () => {
    try {
      const dataStr = JSON.stringify(chapters, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `chapters-export-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
      alert('✅ Chapters exported successfully!');
    } catch (error) {
      alert('❌ Error exporting chapters: ' + error.message);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => router.push('/admin/dashboard')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold gradient-text mb-2">Chapters Management</h1>
            <p className="text-white/70">Add, edit, or delete chapters</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={exportChapters}>
              <Download className="w-4 h-4" />
              Export JSON
            </Button>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4" />
              Add Chapter
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchBar
            placeholder="Search chapters..."
            onSearch={setSearchQuery}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="text-center">
            <div className="text-2xl font-bold gradient-text">{chapters.length}</div>
            <div className="text-sm text-white/70">Total Chapters</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold gradient-text">
              {chapters.filter(c => c.year === '1st').length}
            </div>
            <div className="text-sm text-white/70">1st Year</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold gradient-text">
              {chapters.filter(c => c.year === '2nd').length}
            </div>
            <div className="text-sm text-white/70">2nd Year</div>
          </Card>
        </div>

        {/* Chapters List */}
        <div className="space-y-4">
          {filteredChapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                    {chapter.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold">{chapter.title}</h3>
                        <p className="text-sm text-white/60">{chapter.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(chapter)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(chapter.id)}>
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="default">{chapter.year} Year</Badge>
                      <Badge variant="info">{chapter.category}</Badge>
                      <Badge variant="success">{chapter.topics?.length || 0} Topics</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {filteredChapters.length === 0 && (
            <Card className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2">No chapters found</h3>
              <p className="text-white/70">Try adjusting your search or add a new chapter</p>
            </Card>
          )}
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10 sticky top-0 bg-dark-light z-10 p-6">
                <h2 className="text-2xl font-bold gradient-text">
                  {editingChapter ? 'Edit Chapter' : 'Add New Chapter'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <form onSubmit={handleSave} className="space-y-4 px-6 pb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 font-semibold">
                      Chapter Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="glass-input w-full"
                      placeholder="e.g., Ohm's Law"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 font-semibold">
                      Category <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="glass-input w-full"
                      required
                    >
                      <option value="Trade Theory">Trade Theory</option>
                      <option value="Workshop Calculation">Workshop Calculation</option>
                      <option value="Electrical Machines">Electrical Machines</option>
                      <option value="Basic Electricity">Basic Electricity</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 font-semibold">
                      Year <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      className="glass-input w-full"
                      required
                    >
                      <option value="1st">1st Year</option>
                      <option value="2nd">2nd Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 font-semibold">
                      Icon (Emoji) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) => handleInputChange('icon', e.target.value)}
                      className="glass-input w-full text-2xl"
                      placeholder="⚡"
                      maxLength={2}
                    />
                    <p className="text-xs text-white/50 mt-1">
                      Use emoji: ⚡ 🔌 ⚙️ 📐 💡 etc.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 font-semibold">
                    Description (Hindi) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="glass-input w-full"
                    placeholder="Brief description in Hindi"
                    required
                  />
                  <p className="text-xs text-white/50 mt-1">
                    Example: बिजली के मूल सिद्धांत और concepts
                  </p>
                </div>

                <div>
                  <label className="block text-sm mb-2 font-semibold">
                    Topics (One per line) <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={formData.topics}
                    onChange={(e) => handleInputChange('topics', e.target.value)}
                    className="glass-input w-full font-mono text-sm"
                    rows={6}
                    placeholder="Topic 1&#10;Topic 2&#10;Topic 3&#10;Topic 4"
                    required
                  />
                  <p className="text-xs text-white/50 mt-1">
                    Enter each topic on a new line
                  </p>
                </div>

                <div>
                  <label className="block text-sm mb-2 font-semibold">
                    Content <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    className="glass-input w-full font-mono text-sm"
                    rows={12}
                    placeholder="Enter chapter content here...&#10;&#10;You can use markdown formatting:&#10;# Heading&#10;## Sub-heading&#10;**Bold text**&#10;- Bullet point"
                    required
                  />
                  <p className="text-xs text-white/50 mt-1">
                    Markdown supported. Minimum 50 words recommended.
                  </p>
                </div>

                <div className="flex gap-3 pt-4 sticky bottom-0 bg-dark-light pb-2">
                  <Button type="submit" className="flex-1">
                    <Save className="w-4 h-4" />
                    {editingChapter ? 'Update Chapter' : 'Add Chapter'}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setShowModal(false)}
                    variant="outline"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminChaptersPage() {
  return (
    <ProtectedRoute>
      <ChaptersManagement />
    </ProtectedRoute>
  );
}