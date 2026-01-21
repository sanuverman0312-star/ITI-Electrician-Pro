'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Search, Filter } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SearchBar } from '@/components/ui/SearchBar';
import { Badge } from '@/components/ui/Badge';
import { getAllLinks } from '@/data/links';
import { searchFilter, storage } from '@/lib/utils';

export default function ITILinksPage() {
  const [links] = useState(() => storage.get('itiLinksData', getAllLinks()));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Links', count: links.length },
    { id: 'results', label: 'Results', count: links.filter(l => l.category === 'results').length },
    { id: 'certificates', label: 'Certificates', count: links.filter(l => l.category === 'certificates').length },
    { id: 'admission', label: 'Admission', count: links.filter(l => l.category === 'admission').length },
    { id: 'syllabus', label: 'Syllabus', count: links.filter(l => l.category === 'syllabus').length },
    { id: 'jobs', label: 'Jobs', count: links.filter(l => l.category === 'jobs').length },
    { id: 'resources', label: 'Resources', count: links.filter(l => l.category === 'resources').length },
    { id: 'official', label: 'Official', count: links.filter(l => l.category === 'official').length },
  ];
  const filteredLinks = searchFilter(
    selectedCategory === 'all'
      ? links
      : links.filter(l => l.category === selectedCategory),
    searchQuery,
    ['title', 'titleHindi', 'description']
  );

  const handleLinkClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
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
          <h1 className="section-title mb-4">🔗 ITI Resources & Links</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            सभी important ITI links एक जगह - Results, Certificates, Admission, Jobs और बहुत कुछ!
          </p>
        </motion.div>

        {/* Search & Filter */}
        <div className="mb-8 space-y-4">
          <SearchBar
            placeholder="Search for results, certificates, admission..."
            onSearch={setSearchQuery}
          />

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${selectedCategory === category.id
                  ? 'bg-gradient-primary text-white shadow-glow'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
              >
                {category.label}
                <span className="ml-2 text-xs opacity-70">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <Card className="mb-8 bg-yellow-500/10 border-yellow-500/30">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div className="text-sm">
              <strong>Disclaimer:</strong> ये सभी external links हैं। हम इन websites की content के लिए responsible नहीं हैं।
              सभी links official sources से लिए गए हैं।
            </div>
          </div>
        </Card>

        {/* Links Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredLinks.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className="h-full group cursor-pointer"
                onClick={() => handleLinkClick(link.url)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold group-hover:text-accent transition-colors">
                          {link.title}
                        </h3>
                        <p className="text-sm text-white/60">{link.titleHindi}</p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-accent transition-colors" />
                    </div>

                    <p className="text-sm text-white/70 mb-3">{link.description}</p>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="info">{link.category}</Badge>
                      {link.official && <Badge variant="success">Official</Badge>}
                      {link.state && <Badge variant="default">{link.state}</Badge>}
                      {link.downloadable && <Badge variant="warning">Downloadable</Badge>}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredLinks.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No links found</h3>
            <p className="text-white/70">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
    </div>
  );
}