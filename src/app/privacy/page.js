'use client';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Cookie, Users } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function PrivacyPage() {
  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Information We Collect',
      content: `
        <h3>✅ Information We DO Collect:</h3>
        <ul>
          <li><strong>Device Information</strong> (Non-Personal)
            <ul>
              <li>Device type and model</li>
              <li>Operating system version</li>
              <li>App version</li>
              <li>Language preference</li>
            </ul>
          </li>
          <li><strong>Usage Analytics</strong> (Anonymous)
            <ul>
              <li>Pages visited</li>
              <li>Time spent on app</li>
              <li>Features used</li>
              <li>Test scores (stored locally only)</li>
            </ul>
          </li>
          <li><strong>Crash Reports</strong> (Automatic)
            <ul>
              <li>To improve app stability</li>
              <li>No personal data included</li>
            </ul>
          </li>
        </ul>

        <h3>❌ Information We DON'T Collect:</h3>
        <ul>
          <li>❌ Personal names or email addresses</li>
          <li>❌ Phone numbers</li>
          <li>❌ Location data</li>
          <li>❌ Photos or media files</li>
          <li>❌ Contact lists</li>
          <li>❌ Any personally identifiable information (PII)</li>
        </ul>
      `
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'How We Use Information',
      content: `
        <p>हम collect किया गया data केवल निम्नलिखित purposes के लिए use करते हैं:</p>
        <ul>
          <li>Improve app performance और user experience</li>
          <li>Fix bugs और crashes</li>
          <li>Understand feature usage patterns</li>
          <li>Enhance content और features</li>
        </ul>
        <p><strong>Important:</strong> हम आपका data कभी भी third parties को नहीं बेचते।</p>
      `
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Data Storage',
      content: `
        <ul>
          <li>All study progress is stored <strong>locally on your device only</strong></li>
          <li>Test results और bookmarks आपके device के local storage में save होते हैं</li>
          <li>हम कोई user data अपने servers पर store नहीं करते</li>
          <li>आप कभी भी app data को device settings से clear कर सकते हैं</li>
        </ul>
      `
    },
    {
      icon: <Cookie className="w-6 h-6" />,
      title: 'Third-Party Services',
      content: `
        <p>हम निम्नलिखित third-party services use कर सकते हैं:</p>
        <ol>
          <li><strong>Firebase Analytics</strong> (Google)
            <ul>
              <li>Anonymous usage statistics के लिए</li>
              <li>Privacy Policy: <a href="https://firebase.google.com/support/privacy" target="_blank" class="text-accent hover:underline">firebase.google.com/support/privacy</a></li>
            </ul>
          </li>
          <li><strong>Google AdMob</strong> (Future - Advertisements के लिए)
            <ul>
              <li>Privacy Policy: <a href="https://support.google.com/admob/answer/6128543" target="_blank" class="text-accent hover:underline">AdMob Privacy</a></li>
            </ul>
          </li>
        </ol>
      `
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="section-title mb-4">Privacy Policy</h1>
          <p className="text-white/70">
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Introduction */}
        <Card className="mb-8 bg-blue-500/10 border-blue-500/30">
          <h2 className="text-xl font-bold mb-3">Introduction</h2>
          <p className="text-white/80">
            Welcome to ITI Electrician Pro ("we," "our," or "us").
            हम आपकी privacy को respect करते हैं और आपके personal data को protect करने के लिए committed हैं।
            यह Privacy Policy बताता है कि हम कैसे data collect, use, और protect करते हैं।
          </p>
        </Card>

        {/* Main Sections */}
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>
              <div
                className="privacy-content prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </Card>
          </motion.div>
        ))}

        {/* Additional Sections */}
        <Card className="mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Children's Privacy
          </h2>
          <p className="text-white/80">
            यह app 13 साल से कम उम्र के बच्चों से knowingly information collect नहीं करता।
            Content ITI students (typically 15+ years) के लिए designed है।
          </p>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
          <p className="text-white/80 mb-3">आपके पास निम्नलिखित rights हैं:</p>
          <ul className="space-y-2 text-white/80">
            <li className="flex items-start gap-2">
              <span className="text-accent">•</span>
              <span>App को बिना personal information provide किए use करने का right</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">•</span>
              <span>Device settings से app data को कभी भी clear करने का right</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">•</span>
              <span>Data usage के बारे में information request करने का right</span>
            </li>
          </ul>
        </Card>

        <Card className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
          <p className="text-white/80">
            हम समय-समय पर इस Privacy Policy को update कर सकते हैं।
            सभी changes इस page पर updated revision date के साथ post किए जाएंगे।
            हम recommend करते हैं कि आप regularly इस policy को review करें।
          </p>
        </Card>

        {/* Contact */}
        <Card className="bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-white/80 mb-4">
            अगर आपके इस Privacy Policy के बारे में कोई questions हैं, तो please contact करें:
          </p>
          <div className="space-y-2 text-white/80">
            <div className="flex items-center gap-2">
              <span className="text-accent">📧</span>
              <span>Email: privacy@itielectricianpro.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">🌐</span>
              <span>Website: www.itielectricianpro.com</span>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-white/60">
          <p>Made with ❤️ by <span className="font-bold text-accent">Shashank</span></p>
          <p className="mt-2">ITI Electrician Pro - Version 1.0.0</p>
        </div>
      </div>

      <style jsx global>{`
        .privacy-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 1.5rem 0 1rem 0;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .privacy-content ul {
          list-style: none;
          padding-left: 0;
          margin: 1rem 0;
        }
        
        .privacy-content ul li {
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .privacy-content ul li::before {
          content: "•";
          position: absolute;
          left: 0.5rem;
          color: #00d9ff;
        }
        
        .privacy-content ul ul {
          margin-left: 1rem;
          margin-top: 0.5rem;
        }
        
        .privacy-content ol {
          padding-left: 1.5rem;
          margin: 1rem 0;
        }
        
        .privacy-content ol li {
          padding: 0.5rem 0;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .privacy-content strong {
          color: rgba(255, 255, 255, 0.95);
          font-weight: 600;
        }
        
        .privacy-content p {
          margin: 1rem 0;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}