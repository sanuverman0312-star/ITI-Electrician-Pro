'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Plus, Edit, Trash2, Save, X, ArrowLeft,
  FileText, Download, Upload, Filter
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { SearchBar } from '@/components/ui/SearchBar';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { questionsData } from '@/data/questions';
import { searchFilter, storage } from '@/lib/utils';

function QuestionsManagement() {
  const router = useRouter();
  const [questions, setQuestions] = useState(() => storage.get('questionsData', questionsData));
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    questionEnglish: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 'A',
    explanation: '',
    category: '',
    difficulty: 'easy',
    year: '1st',
    relatedTopic: ''
  });

  const categories = [...new Set(questions.map(q => q.category))];

  let filteredQuestions = searchFilter(questions, searchQuery, ['question', 'questionEnglish', 'category']);

  if (filterCategory !== 'all') {
    filteredQuestions = filteredQuestions.filter(q => q.category === filterCategory);
  }

  if (filterDifficulty !== 'all') {
    filteredQuestions = filteredQuestions.filter(q => q.difficulty === filterDifficulty);
  }

  const handleAdd = () => {
    setEditingQuestion(null);
    setFormData({
      question: '',
      questionEnglish: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 'A',
      explanation: '',
      category: '',
      difficulty: 'easy',
      year: '1st',
      relatedTopic: ''
    });
    setShowModal(true);
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setFormData({
      question: question.question,
      questionEnglish: question.questionEnglish || '',
      optionA: question.options[0].substring(3),
      optionB: question.options[1].substring(3),
      optionC: question.options[2].substring(3),
      optionD: question.options[3].substring(3),
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      category: question.category,
      difficulty: question.difficulty,
      year: question.year,
      relatedTopic: question.relatedTopic || ''
    });
    setShowModal(true);
  };

  const handleDelete = (questionId) => {
    if (confirm('Are you sure you want to delete this question?')) {
      const newQuestions = questions.filter(q => q.id !== questionId);
      setQuestions(newQuestions);
      storage.set('questionsData', newQuestions);
      alert('✅ Question deleted and saved locally!');
    }
  };

  const handleSave = () => {
    const questionData = {
      id: editingQuestion?.id || `q-${Date.now()}`,
      question: formData.question,
      questionEnglish: formData.questionEnglish,
      options: [
        `A. ${formData.optionA}`,
        `B. ${formData.optionB}`,
        `C. ${formData.optionC}`,
        `D. ${formData.optionD}`
      ],
      correctAnswer: formData.correctAnswer,
      explanation: formData.explanation,
      category: formData.category,
      difficulty: formData.difficulty,
      year: formData.year,
      relatedTopic: formData.relatedTopic
    };

    let newQuestions;
    if (editingQuestion) {
      newQuestions = questions.map(q => q.id === editingQuestion.id ? questionData : q);
    } else {
      newQuestions = [...questions, questionData];
    }

    setQuestions(newQuestions);
    storage.set('questionsData', newQuestions);
    setShowModal(false);
    alert('✅ Question saved locally!');
  };

  const exportQuestions = () => {
    const dataStr = JSON.stringify(questions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'questions-export.json';
    link.click();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedQuestions = JSON.parse(e.target.result);
          setQuestions([...questions, ...importedQuestions]);
          alert(`${importedQuestions.length} questions imported successfully!`);
        } catch (error) {
          alert('Error importing file. Please check JSON format.');
        }
      };
      reader.readAsText(file);
    }
  };

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
            <h1 className="text-3xl font-bold gradient-text mb-2">Questions Management</h1>
            <p className="text-white/70">Manage your question bank</p>
          </div>
          <div className="flex gap-3">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
              <Button variant="outline">
                <Upload className="w-4 h-4" />
                Import JSON
              </Button>
            </label>
            <Button variant="outline" onClick={exportQuestions}>
              <Download className="w-4 h-4" />
              Export JSON
            </Button>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4" />
              Add Question
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="text-center">
            <div className="text-2xl font-bold gradient-text">{questions.length}</div>
            <div className="text-sm text-white/70">Total Questions</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {questions.filter(q => q.difficulty === 'easy').length}
            </div>
            <div className="text-sm text-white/70">Easy</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {questions.filter(q => q.difficulty === 'medium').length}
            </div>
            <div className="text-sm text-white/70">Medium</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-red-400">
              {questions.filter(q => q.difficulty === 'hard').length}
            </div>
            <div className="text-sm text-white/70">Hard</div>
          </Card>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 space-y-4">
          <SearchBar
            placeholder="Search questions..."
            onSearch={setSearchQuery}
          />

          <div className="flex gap-3 flex-wrap">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="glass-input"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="glass-input"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <Badge variant="info">
              Showing {filteredQuestions.length} questions
            </Badge>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="default">Q{index + 1}</Badge>
                      <Badge variant={
                        question.difficulty === 'easy' ? 'success' :
                          question.difficulty === 'medium' ? 'warning' : 'danger'
                      }>
                        {question.difficulty}
                      </Badge>
                      <Badge variant="info">{question.category}</Badge>
                      <Badge variant="default">{question.year}</Badge>
                    </div>
                    <h3 className="font-bold mb-2">{question.question}</h3>
                    {question.questionEnglish && (
                      <p className="text-sm text-white/60 mb-3">{question.questionEnglish}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(question)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(question.id)}>
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-2 mb-3">
                  {question.options.map((option, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded text-sm ${option.charAt(0) === question.correctAnswer
                        ? 'bg-green-500/20 border border-green-500/50'
                        : 'bg-white/5'
                        }`}
                    >
                      {option}
                      {option.charAt(0) === question.correctAnswer && ' ✓'}
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-white/5 rounded-lg text-sm">
                  <div className="text-white/60 mb-1">Explanation:</div>
                  <div className="text-white/80 whitespace-pre-wrap line-clamp-2">
                    {question.explanation}
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
          title={editingQuestion ? 'Edit Question' : 'Add New Question'}
          size="xl"
        >
          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            <div>
              <label className="block text-sm mb-2">Question (Hindi) *</label>
              <textarea
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="glass-input w-full"
                rows={2}
                placeholder="प्रश्न हिंदी में लिखें..."
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Question (English)</label>
              <textarea
                value={formData.questionEnglish}
                onChange={(e) => setFormData({ ...formData, questionEnglish: e.target.value })}
                className="glass-input w-full"
                rows={2}
                placeholder="Question in English (optional)..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Option A *</label>
                <input
                  type="text"
                  value={formData.optionA}
                  onChange={(e) => setFormData({ ...formData, optionA: e.target.value })}
                  className="glass-input w-full"
                  placeholder="First option"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Option B *</label>
                <input
                  type="text"
                  value={formData.optionB}
                  onChange={(e) => setFormData({ ...formData, optionB: e.target.value })}
                  className="glass-input w-full"
                  placeholder="Second option"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Option C *</label>
                <input
                  type="text"
                  value={formData.optionC}
                  onChange={(e) => setFormData({ ...formData, optionC: e.target.value })}
                  className="glass-input w-full"
                  placeholder="Third option"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Option D *</label>
                <input
                  type="text"
                  value={formData.optionD}
                  onChange={(e) => setFormData({ ...formData, optionD: e.target.value })}
                  className="glass-input w-full"
                  placeholder="Fourth option"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm mb-2">Correct Answer *</label>
                <select
                  value={formData.correctAnswer}
                  onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                  className="glass-input w-full"
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Difficulty *</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  className="glass-input w-full"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Year *</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="glass-input w-full"
                >
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Category *</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="glass-input w-full"
                  placeholder="e.g., Basic Electricity"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Related Topic</label>
              <input
                type="text"
                value={formData.relatedTopic}
                onChange={(e) => setFormData({ ...formData, relatedTopic: e.target.value })}
                className="glass-input w-full"
                placeholder="e.g., Ohm's Law"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Explanation *</label>
              <textarea
                value={formData.explanation}
                onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                className="glass-input w-full"
                rows={4}
                placeholder="Detailed explanation in Hindi/English..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4" />
                Save Question
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

export default function AdminQuestionsPage() {
  return (
    <ProtectedRoute>
      <QuestionsManagement />
    </ProtectedRoute>
  );
}