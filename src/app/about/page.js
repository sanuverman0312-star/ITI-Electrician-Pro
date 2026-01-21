'use client';
import { motion } from 'framer-motion';
import { 
  BookOpen, Calculator, FileText, Shield, 
  Award, Users, Zap, Heart 
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function AboutPage() {
  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Comprehensive Chapters',
      description: 'Complete syllabus coverage for 1st and 2nd year with detailed explanations'
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: '10+ Calculators',
      description: 'Professional electrical calculators with step-by-step solutions'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: '500+ Questions',
      description: 'Mock tests with detailed explanations for every question'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Safety First',
      description: 'Complete safety guidelines and emergency procedures'
    },
  ];

  const tradeInfo = [
    { label: 'Duration', value: '2 Years (4 Semesters)', icon: '⏱️' },
    { label: 'Certification', value: 'NCVT/SCVT', icon: '🎓' },
    { label: 'Trade Code', value: 'Electrician (ITI)', icon: '🔧' },
    { label: 'Job Opportunities', value: 'Government & Private', icon: '💼' },
  ];

  const careerPaths = [
    'Government sector (Railways, Electricity Boards)',
    'Private sector (Manufacturing, Construction)',
    'Self-employment (Electrical Contractor)',
    'Supervisor positions after experience',
    'Further education (Diploma, Degree)',
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
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="section-title mb-4">About ITI Electrician Pro</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            आपकी ITI Electrician की पढ़ाई का सबसे अच्छा companion
          </p>
        </motion.div>

        {/* Mission */}
        <Card className="mb-8 text-center bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
          <h2 className="text-2xl font-bold mb-4">🎯 Our Mission</h2>
          <p className="text-lg text-white/80">
            To empower every ITI Electrician student with accessible, quality education and practical knowledge 
            that helps them build a successful career.
          </p>
        </Card>

        {/* What We Offer */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">📚 What We Offer</h2>
          <div className="card-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/70">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* About Electrician Trade */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-6">👨‍🔧 About Electrician Trade</h2>
          
          <p className="text-white/80 mb-6">
            Electrician trade ITI की सबसे popular और demanding trades में से एक है। 
            यह 2 साल का course है जो electrical installations, maintenance, और operations की complete training provide करता है।
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {tradeInfo.map((info, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{info.icon}</span>
                  <div>
                    <div className="text-sm text-white/60">{info.label}</div>
                    <div className="font-semibold">{info.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-accent/10 border border-accent/30 rounded-xl">
            <h3 className="font-semibold mb-3">Training Areas:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Electrical installations (Residential & Industrial)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Maintenance of electrical equipment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Industrial and residential wiring</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Electrical machine operations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Safety procedures and practices</span>
              </li>
            </ul>
          </div>
        </Card>

        {/* Career Opportunities */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-4">💼 Career Opportunities</h2>
          <p className="text-white/70 mb-4">
            ITI Electrician के बाद आपके पास कई career options हैं:
          </p>
          <div className="space-y-2">
            {careerPaths.map((path, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <Award className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm">{path}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Why Choose Us */}
        <Card className="mb-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
          <h2 className="text-2xl font-bold mb-6">⭐ Why Choose ITI Electrician Pro?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '🆓', text: 'Completely Free - कोई hidden charges नहीं' },
              { icon: '📱', text: 'Mobile Friendly - कहीं भी, कभी भी' },
              { icon: '🔒', text: 'No Login Required - instant access' },
              { icon: '📚', text: 'Complete Content - full syllabus coverage' },
              { icon: '✅', text: 'Detailed Explanations - हर topic समझाया गया है' },
              { icon: '🔄', text: 'Regular Updates - नए content जुड़ते रहते हैं' },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Vision */}
        <Card className="text-center">
          <h2 className="text-2xl font-bold mb-4">🎯 Our Vision</h2>
          <p className="text-lg text-white/80 mb-4">
            हमारा vision है हर ITI Electrician student को accessible, quality education provide करना 
            जो उन्हें successful career बनाने में मदद करे।
          </p>
          <p className="text-white/70">
            हम continuously काम कर रहे हैं इस platform को बेहतर बनाने के लिए और नए features जोड़ने के लिए।
          </p>
        </Card>

        {/* Footer Message */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-primary">
            <p className="text-lg mb-2">Made with <Heart className="w-5 h-5 inline text-red-400" /> by</p>
            <p className="text-3xl font-bold">Shashank</p>
            <p className="text-sm mt-2 text-white/80">Version 1.0.0</p>
          </Card>
        </div>
      </div>
    </div>
  );
}