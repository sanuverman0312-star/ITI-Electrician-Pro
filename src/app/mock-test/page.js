'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, Clock, Trophy, TrendingUp, Play } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { questionsData, getQuestionsByYear, getQuestionsByCategory } from '@/data/questions';
import { storage } from '@/lib/utils';

export default function MockTestPage() {
  const [testHistory, setTestHistory] = useState(() => {
    return storage.get('testHistory', []);
  });

  const testSets = [
    {
      id: 'first-year-set-1',
      title: '1st Year - Complete Test',
      year: '1st',
      questions: 25,
      duration: 30,
      difficulty: 'Easy to Medium',
      icon: '📘',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'second-year-set-1',
      title: '2nd Year - Complete Test',
      year: '2nd',
      questions: 25,
      duration: 30,
      difficulty: 'Medium to Hard',
      icon: '📗',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'full-mock-test',
      title: 'Full Mock Exam',
      year: 'Both',
      questions: 50,
      duration: 60,
      difficulty: 'All Levels',
      icon: '📕',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'quick-practice',
      title: 'Quick Practice',
      year: 'Random',
      questions: 10,
      duration: 10,
      difficulty: 'Mixed',
      icon: '⚡',
      color: 'from-yellow-500 to-orange-500'
    },
  ];

  const categories = [...new Set(questionsData.map(q => q.category))];

  const stats = {
    totalTests: testHistory.length,
    avgScore: testHistory.length > 0 
      ? Math.round(testHistory.reduce((sum, t) => sum + t.percentage, 0) / testHistory.length)
      : 0,
    bestScore: testHistory.length > 0
      ? Math.max(...testHistory.map(t => t.percentage))
      : 0,
    totalQuestions: questionsData.length
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="section-title mb-4">📝 Mock Tests</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Practice with 500+ questions. हर question के साथ detailed explanation!
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Questions', value: stats.totalQuestions, icon: FileText, color: 'text-blue-400' },
            { label: 'Tests Taken', value: stats.totalTests, icon: Trophy, color: 'text-yellow-400' },
            { label: 'Average Score', value: `${stats.avgScore}%`, icon: TrendingUp, color: 'text-green-400' },
            { label: 'Best Score', value: `${stats.bestScore}%`, icon: Trophy, color: 'text-purple-400' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center">
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-white/70">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Test Sets */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">🎯 Practice Tests</h2>
          <div className="card-grid">
            {testSets.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${test.color} flex items-center justify-center text-4xl mb-4`}>
                    {test.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{test.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <FileText className="w-4 h-4" />
                      {test.questions} Questions
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Clock className="w-4 h-4" />
                      {test.duration} Minutes
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="info">{test.difficulty}</Badge>
                      <Badge variant="default">{test.year}</Badge>
                    </div>
                  </div>

                  <Button asChild className="w-full">
                    <Link href={`/mock-test/${test.id}`}>
                      <Play className="w-4 h-4" />
                      Start Test
                    </Link>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Category-wise Tests */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">📚 Topic-wise Practice</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => {
              const categoryQuestions = getQuestionsByCategory(category);
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/mock-test/category/${encodeURIComponent(category)}`}>
                    <Card className="group">
                      <h3 className="font-bold mb-2 group-hover:text-accent transition-colors">
                        {category}
                      </h3>
                      <p className="text-sm text-white/60">
                        {categoryQuestions.length} questions available
                      </p>
                      <div className="mt-3 text-accent text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Practice Now →
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Recent Tests */}
        {testHistory.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">📊 Recent Tests</h2>
            <Card>
              <div className="space-y-3">
                {testHistory.slice(0, 5).map((test, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{test.title}</h3>
                      <div className="text-sm text-white/60">
                        {new Date(test.completedAt).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold gradient-text">
                        {test.percentage}%
                      </div>
                      <div className="text-xs text-white/60">
                        {test.correct}/{test.total} correct
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}