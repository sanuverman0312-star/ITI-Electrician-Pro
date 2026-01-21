'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Clock, BookOpen, Share2, Bookmark,
  ChevronRight, CheckCircle2
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { allChapters } from '@/data/chapters';
import { shareContent, storage } from '@/lib/utils';
import Link from 'next/link';

export default function ChapterDetailPage({ params }) {
  const router = useRouter();
  const { id } = params;

  // Load chapters from storage or default
  const chapters = storage.get('adminChapters', allChapters);
  const chapter = chapters.find(c => c.id === id);

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="text-center max-w-md">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold mb-2">Chapter Not Found</h2>
          <p className="text-white/70 mb-6">The chapter you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/chapters">
              <ArrowLeft className="w-4 h-4" />
              Back to Chapters
            </Link>
          </Button>
        </Card>
      </div>
    );
  }

  const currentIndex = chapters.findIndex(c => c.id === chapter.id);
  const previousChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  const handleShare = async () => {
    await shareContent(
      chapter.title,
      chapter.description,
      window.location.href
    );
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container-custom max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Chapters
        </Button>

        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
                {chapter.icon}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="default">{chapter.year} Year</Badge>
                  <Badge variant="info">{chapter.category}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  {chapter.title}
                </h1>
                <p className="text-white/70 mb-4">{chapter.description}</p>

                <div className="flex flex-wrap gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {chapter.readingTime} min read
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {chapter.topics.length} topics
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={handleShare} variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <Bookmark className="w-4 h-4" />
                Bookmark
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Topics List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              📋 Topics Covered
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {chapter.topics.map((topic, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{topic}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Chapter Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-8">
            <div
              className="prose prose-invert max-w-none"
              style={{
                whiteSpace: 'pre-wrap',
                lineHeight: '1.8'
              }}
            >
              {chapter.content}
            </div>
          </Card>
        </motion.div>

        {/* Related Topics */}
        {chapter.relatedTopics && chapter.relatedTopics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                🔗 Related Topics
              </h2>
              <div className="flex flex-wrap gap-2">
                {chapter.relatedTopics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors cursor-pointer"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="grid md:grid-cols-2 gap-4">
          {previousChapter && (
            <Link href={`/chapters/${previousChapter.id}`}>
              <Card className="h-full group cursor-pointer">
                <div className="text-xs text-white/50 mb-2">← Previous Chapter</div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{previousChapter.icon}</span>
                  <div>
                    <h3 className="font-semibold group-hover:text-accent transition-colors">
                      {previousChapter.title}
                    </h3>
                    <p className="text-xs text-white/60">{previousChapter.category}</p>
                  </div>
                </div>
              </Card>
            </Link>
          )}

          {nextChapter && (
            <Link href={`/chapters/${nextChapter.id}`} className={!previousChapter ? 'md:col-start-2' : ''}>
              <Card className="h-full group cursor-pointer text-right">
                <div className="text-xs text-white/50 mb-2">Next Chapter →</div>
                <div className="flex items-center gap-3 justify-end">
                  <div>
                    <h3 className="font-semibold group-hover:text-accent transition-colors">
                      {nextChapter.title}
                    </h3>
                    <p className="text-xs text-white/60">{nextChapter.category}</p>
                  </div>
                  <span className="text-2xl">{nextChapter.icon}</span>
                </div>
              </Card>
            </Link>
          )}
        </div>

        {/* Practice Test Link */}
        <Card className="mt-8 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 text-center">
          <h3 className="text-xl font-bold mb-2">📝 Practice What You Learned</h3>
          <p className="text-white/70 mb-4">Test your knowledge with mock tests</p>
          <Button asChild>
            <Link href="/mock-test">
              Start Mock Test
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}