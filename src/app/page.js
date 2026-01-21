'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen, Calculator, FileText, Shield, Link2,
  TrendingUp, Award, Clock, Search
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/ui/SearchBar';
import { Badge } from '@/components/ui/Badge';
import { allChapters } from '@/data/chapters';
import { questionsData } from '@/data/questions';
import { safetyData } from '@/data/safety';
import { getAllLinks } from '@/data/links';
import { storage } from '@/lib/utils';
import { useEffect } from 'react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dynamicStats, setDynamicStats] = useState({
    chapters: '50+',
    questions: '500+',
    calculators: '10',
    safety: '50+'
  });

  useEffect(() => {
    // Load from storage with fallback to data
    const chapters = storage.get('adminChapters', allChapters);
    const questions = storage.get('questionsData', questionsData);
    const ppe = storage.get('safetyPPE', safetyData.ppe);
    const dos = storage.get('safetyDos', safetyData.dosAndDonts.dos);
    const donts = storage.get('safetyDonts', safetyData.dosAndDonts.donts);
    const signs = storage.get('safetySigns', safetyData.safetySigns);

    setDynamicStats({
      chapters: chapters.length.toString(),
      questions: questions.length.toString(),
      calculators: '10', // Static for now as we don't have admin for calculators
      safety: (safetyData.goldenRules.length + ppe.length + dos.length + donts.length + signs.length).toString()
    });
  }, []);

  const stats = [
    { label: 'Chapters', value: dynamicStats.chapters, icon: BookOpen, color: 'text-blue-400' },
    { label: 'Mock Tests', value: dynamicStats.questions, icon: FileText, color: 'text-green-400' },
    { label: 'Calculators', value: dynamicStats.calculators, icon: Calculator, color: 'text-yellow-400' },
    { label: 'Safety Tips', value: dynamicStats.safety, icon: Shield, color: 'text-red-400' },
  ];

  const features = [
    {
      title: '📚 Comprehensive Chapters',
      description: 'Complete syllabus for 1st & 2nd year with diagrams and examples',
      href: '/chapters',
      icon: '📚',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      title: '🧮 Smart Calculators',
      description: '10+ electrical calculators with detailed explanations',
      href: '/calculator',
      icon: '🧮',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: '📝 Mock Tests',
      description: '500+ questions with answers and explanations',
      href: '/mock-test',
      icon: '📝',
      gradient: 'from-pink-500 to-red-500'
    },
    {
      title: '⚠️ Safety First',
      description: 'Complete electrical safety guidelines with visuals',
      href: '/safety',
      icon: '⚠️',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      title: '🔗 ITI Resources',
      description: 'Direct links to results, certificates, and official portals',
      href: '/iti-links',
      icon: '🔗',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      title: 'ℹ️ About & Support',
      description: 'Learn about the app and get help',
      href: '/about',
      icon: 'ℹ️',
      gradient: 'from-cyan-500 to-blue-500'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-secondary-500/20" />

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6 max-w-4xl mx-auto"
          >
            <Badge variant="info" className="text-sm">
              🎓 Complete ITI Electrician Learning Platform
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="gradient-text">ITI Electrician Pro</span>
            </h1>

            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              आपकी सफलता का सबसे अच्छा साथी। Complete chapters, mock tests, calculators और safety tips - सब एक जगह!
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SearchBar
                placeholder="Search chapters, tests, calculators..."
                onSearch={setSearchQuery}
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/chapters">
                  <BookOpen className="w-5 h-5" />
                  Start Learning
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/mock-test">
                  <FileText className="w-5 h-5" />
                  Take Mock Test
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-3xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-4">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">
            🎯 Everything You Need to Excel
          </h2>

          <div className="card-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={feature.href}>
                  <Card className="h-full">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-3xl mb-4`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-white/70 text-sm mb-4">{feature.description}</p>
                    <div className="text-accent text-sm font-semibold flex items-center gap-2">
                      Explore <span>→</span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-12 px-4">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">
            🚀 Quick Access
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Latest Chapters */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-accent" />
                  Recent Chapters
                </h3>
                <Link href="/chapters" className="text-sm text-accent hover:underline">
                  View All →
                </Link>
              </div>
              <div className="space-y-3">
                {allChapters.slice(0, 5).map((chapter) => (
                  <Link
                    key={chapter.id}
                    href={`/chapters/${chapter.id}`}
                    className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{chapter.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{chapter.title}</h4>
                        <p className="text-xs text-white/60">{chapter.description}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="default">{chapter.year} Year</Badge>
                          <Badge variant="info">
                            <Clock className="w-3 h-3 mr-1" />
                            {chapter.readingTime} min
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Popular Calculators */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-accent" />
                  Popular Calculators
                </h3>
                <Link href="/calculator" className="text-sm text-accent hover:underline">
                  View All →
                </Link>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Load Calculator', icon: '⚡', desc: 'Calculate total electrical load' },
                  { name: 'MCB Calculator', icon: '🔌', desc: 'Find correct MCB rating' },
                  { name: 'Wire Size Calculator', icon: '📏', desc: 'Calculate wire size needed' },
                  { name: 'Power Calculator', icon: '💡', desc: 'Calculate power consumption' },
                  { name: 'Voltage Drop Calculator', icon: '📉', desc: 'Calculate voltage drop' },
                ].map((calc, index) => (
                  <Link
                    key={index}
                    href={`/calculator#${calc.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{calc.icon}</span>
                      <div>
                        <h4 className="font-semibold text-sm">{calc.name}</h4>
                        <p className="text-xs text-white/60">{calc.desc}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 px-4 bg-white/5">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">
            ⭐ Why Choose ITI Electrician Pro?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🆓',
                title: 'Completely Free',
                description: 'No hidden charges, no subscriptions. सब कुछ बिल्कुल मुफ्त!'
              },
              {
                icon: '📱',
                title: 'Mobile Friendly',
                description: 'Works perfectly on mobile, tablet और desktop - कहीं भी, कभी भी'
              },
              {
                icon: '🔒',
                title: 'No Login Required',
                description: 'बिना registration के instant access - privacy first!'
              },
              {
                icon: '📚',
                title: 'Complete Content',
                description: '1st & 2nd year का complete syllabus with examples'
              },
              {
                icon: '✅',
                title: 'Detailed Explanations',
                description: 'हर question और calculator में detailed explanation'
              },
              {
                icon: '🔄',
                title: 'Regular Updates',
                description: 'नए questions, chapters और features regularly add होते रहते हैं'
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container-custom">
          <Card className="text-center max-w-3xl mx-auto bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Learning? 🚀
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              अपनी ITI Electrician की तैयारी को आज ही शुरू करें। सब कुछ बिल्कुल मुफ्त!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/chapters">
                  <BookOpen className="w-5 h-5" />
                  Browse Chapters
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/mock-test">
                  <FileText className="w-5 h-5" />
                  Start Mock Test
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}