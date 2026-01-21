'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from '@/components/ui/SearchBar';
import { allChapters } from '@/data/chapters';
import { searchFilter, storage } from '@/lib/utils';
import Link from 'next/link';

export default function ChaptersPage() {
  const [chapters] = useState(() => storage.get('adminChapters', allChapters));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');

  const filteredChapters = searchFilter(
    selectedYear === 'all'
      ? chapters
      : chapters.filter(c => c.year === selectedYear),
    searchQuery,
    ['title', 'category', 'description']
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="section-title mb-4">📚 ITI Electrician Chapters</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            1st Year और 2nd Year का complete syllabus, diagrams और examples के साथ!
          </p>
        </motion.div>

        {/* Search & Filter */}
        <div className="mb-8 space-y-4">
          <SearchBar
            placeholder="Search chapters (e.g., Ohm's Law, Earthing...)"
            onSearch={setSearchQuery}
          />

          <div className="flex gap-2">
            <button
              onClick={() => setSelectedYear('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedYear === 'all'
                ? 'bg-gradient-primary text-white shadow-glow'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
            >
              All Chapters
            </button>
            <button
              onClick={() => setSelectedYear('1st')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedYear === '1st'
                ? 'bg-gradient-primary text-white shadow-glow'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
            >
              1st Year
            </button>
            <button
              onClick={() => setSelectedYear('2nd')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedYear === '2nd'
                ? 'bg-gradient-primary text-white shadow-glow'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
            >
              2nd Year
            </button>
          </div>
        </div>

        {/* Chapters Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/chapters/${chapter.id}`}>
                <Card className="h-full group hover:border-accent/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">
                      {chapter.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold group-hover:text-accent transition-colors">
                          {chapter.title}
                        </h3>
                        <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                      </div>

                      <p className="text-sm text-white/70 line-clamp-2 mb-4">
                        {chapter.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="default">{chapter.year} Year</Badge>
                        <Badge variant="info">
                          <Clock className="w-3 h-3 mr-1" />
                          {chapter.readingTime} min
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredChapters.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No chapters found</h3>
            <p className="text-white/70">Try adjusting your search or year filter</p>
          </div>
        )}
      </div>
    </div>
  );
}