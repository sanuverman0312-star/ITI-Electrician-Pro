'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BookOpen, FileText, Shield, Link2, Users,
  TrendingUp, Calculator, LogOut, Edit, Download
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { logoutAdmin } from '@/lib/adminConfig';
import { allChapters } from '@/data/chapters';
import { questionsData } from '@/data/questions';
import { safetyData } from '@/data/safety';
import { getAllLinks } from '@/data/links';
import { storage } from '@/lib/utils';
import Link from 'next/link';

function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    chapters: 0,
    questions: 0,
    safetyTips: 0,
    links: 0,
    visits: 0,
    activeUsers: 0
  });

  useEffect(() => {
    // Load from storage
    const persistentChapters = storage.get('adminChapters', allChapters);
    const persistentQuestions = storage.get('questionsData', questionsData);
    const persistentLinks = storage.get('itiLinksData', getAllLinks());
    const ppe = storage.get('safetyPPE', safetyData.ppe);
    const dos = storage.get('safetyDos', safetyData.dosAndDonts.dos);
    const donts = storage.get('safetyDonts', safetyData.dosAndDonts.donts);
    const signs = storage.get('safetySigns', safetyData.safetySigns);

    // Calculate stats
    const safetyCount =
      safetyData.goldenRules.length +
      ppe.length +
      signs.length +
      dos.length +
      donts.length;

    setStats({
      chapters: persistentChapters.length,
      questions: persistentQuestions.length,
      safetyTips: safetyCount,
      links: persistentLinks.length,
      visits: parseInt(localStorage.getItem('totalVisits') || '0'),
      activeUsers: parseInt(localStorage.getItem('activeUsers') || '0')
    });
  }, []);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logoutAdmin();
      router.push('/admin/login');
    }
  };

  const statCards = [
    {
      label: 'Total Chapters',
      value: stats.chapters,
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      link: '/admin/chapters'
    },
    {
      label: 'Total Questions',
      value: stats.questions,
      icon: FileText,
      color: 'from-purple-500 to-pink-500',
      link: '/admin/questions'
    },
    {
      label: 'Safety Tips',
      value: stats.safetyTips,
      icon: Shield,
      color: 'from-yellow-500 to-orange-500',
      link: '/admin/safety'
    },
    {
      label: 'ITI Links',
      value: stats.links,
      icon: Link2,
      color: 'from-green-500 to-emerald-500',
      link: '/admin/links'
    },
    {
      label: 'Total Visits',
      value: stats.visits,
      icon: TrendingUp,
      color: 'from-red-500 to-rose-500',
      link: '#'
    },
    {
      label: 'Active Users',
      value: stats.activeUsers,
      icon: Users,
      color: 'from-indigo-500 to-purple-500',
      link: '#'
    },
  ];

  const quickActions = [
    { label: 'Add Chapter', icon: BookOpen, link: '/admin/chapters?action=add' },
    { label: 'Add Question', icon: FileText, link: '/admin/questions?action=add' },
    { label: 'Add Safety Tip', icon: Shield, link: '/admin/safety?action=add' },
    { label: 'Add ITI Link', icon: Link2, link: '/admin/links?action=add' },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container-custom max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Admin Dashboard</h1>
            <p className="text-white/70">Manage your ITI Electrician Pro content</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.push('/')}>
              View Site
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={stat.link}>
                <Card className="text-center group cursor-pointer">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/70">{stat.label}</div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <h2 className="text-xl font-bold mb-4">⚡ Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.link}>
                <button className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all group">
                  <action.icon className="w-6 h-6 mx-auto mb-2 text-accent group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-semibold">{action.label}</div>
                </button>
              </Link>
            ))}
          </div>
        </Card>

        {/* Content Management */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Chapters */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                Chapters
              </h3>
              <Link href="/admin/chapters">
                <Button size="sm">
                  <Edit className="w-4 h-4" />
                  Manage
                </Button>
              </Link>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm p-2 bg-white/5 rounded">
                <span>1st Year Chapters:</span>
                <span className="font-bold">{allChapters.filter(c => c.year === '1st').length}</span>
              </div>
              <div className="flex justify-between text-sm p-2 bg-white/5 rounded">
                <span>2nd Year Chapters:</span>
                <span className="font-bold">{allChapters.filter(c => c.year === '2nd').length}</span>
              </div>
            </div>
          </Card>

          {/* Questions */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                Questions
              </h3>
              <Link href="/admin/questions">
                <Button size="sm">
                  <Edit className="w-4 h-4" />
                  Manage
                </Button>
              </Link>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm p-2 bg-white/5 rounded">
                <span>Easy:</span>
                <span className="font-bold">{questionsData.filter(q => q.difficulty === 'easy').length}</span>
              </div>
              <div className="flex justify-between text-sm p-2 bg-white/5 rounded">
                <span>Medium:</span>
                <span className="font-bold">{questionsData.filter(q => q.difficulty === 'medium').length}</span>
              </div>
              <div className="flex justify-between text-sm p-2 bg-white/5 rounded">
                <span>Hard:</span>
                <span className="font-bold">{questionsData.filter(q => q.difficulty === 'hard').length}</span>
              </div>
            </div>
          </Card>

          {/* Safety */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                Safety Content
              </h3>
              <Link href="/admin/safety">
                <Button size="sm">
                  <Edit className="w-4 h-4" />
                  Manage
                </Button>
              </Link>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm p-2 bg-white/5 rounded">
                <span>Golden Rules:</span>
                <span className="font-bold">{safetyData.goldenRules.length}</span>
              </div>
              <div className="flex justify-between text-sm p-2 bg-white/5 rounded">
                <span>PPE Items:</span>
                <span className="font-bold">{safetyData.ppe.length}</span>
              </div>
              <div className="flex justify-between text-sm p-2 bg-white/5 rounded">
                <span>Safety Signs:</span>
                <span className="font-bold">{safetyData.safetySigns.length}</span>
              </div>
            </div>
          </Card>

          {/* Links */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Link2 className="w-5 h-5 text-accent" />
                ITI Links
              </h3>
              <Link href="/admin/links">
                <Button size="sm">
                  <Edit className="w-4 h-4" />
                  Manage
                </Button>
              </Link>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-white/5 rounded">
                <span>Total Links:</span>
                <span className="font-bold">{stats.links}</span>
              </div>
              <div className="flex justify-between p-2 bg-white/5 rounded">
                <span>Official Links:</span>
                <span className="font-bold">{getAllLinks().filter(l => l.official).length}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Export Data */}
        <Card className="mt-8 bg-accent/10 border-accent/30">
          <h3 className="text-xl font-bold mb-4">💾 Backup & Export</h3>
          <p className="text-sm text-white/70 mb-4">
            Download JSON files ka backup लें। इन files को edit करके फिर से upload कर सकते हैं।
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
              Export Chapters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
              Export Questions
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
              Export Safety Data
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
              Export Links
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  );
}