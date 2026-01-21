'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Heart, Flame, Zap } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { safetyData } from '@/data/safety';
import { storage } from '@/lib/utils';

export default function SafetyPage() {
  // Load persistent data
  const [ppeItems] = useState(() => storage.get('safetyPPE', safetyData.ppe));
  const [safetyDos] = useState(() => storage.get('safetyDos', safetyData.dosAndDonts.dos));
  const [safetyDonts] = useState(() => storage.get('safetyDonts', safetyData.dosAndDonts.donts));
  const [safetySigns] = useState(() => storage.get('safetySigns', safetyData.safetySigns));

  const tabs = [
    {
      label: '5 Golden Rules',
      icon: <Shield className="w-5 h-5" />,
      content: <GoldenRulesSection />
    },
    {
      label: 'PPE',
      icon: <Shield className="w-5 h-5" />,
      content: <PPESection ppe={ppeItems} />
    },
    {
      label: 'Dos & Don\'ts',
      icon: <AlertTriangle className="w-5 h-5" />,
      content: <DosAndDontsSection dos={safetyDos} donts={safetyDonts} />
    },
    {
      label: 'Emergency',
      icon: <Heart className="w-5 h-5" />,
      content: <EmergencySection />
    },
    {
      label: 'Safety Signs',
      icon: <Zap className="w-5 h-5" />,
      content: <SafetySignsSection signs={safetySigns} />
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="section-title mb-4">⚠️ Electrical Safety</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Safety सबसे पहले! Complete electrical safety guidelines और procedures.
          </p>
        </motion.div>

        {/* Important Warning */}
        <Card className="mb-8 bg-red-500/10 border-red-500/30">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">⚠️ महत्वपूर्ण सूचना</h3>
              <p className="text-sm text-white/80">
                Electrical work बहुत खतरनाक हो सकता है। हमेशा proper safety precautions लें।
                अगर आप trained नहीं हैं तो live electrical equipment पर काम न करें।
                Safety rules को seriously लें - आपकी life इस पर निर्भर करती है!
              </p>
            </div>
          </div>
        </Card>

        {/* Content Tabs */}
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}

// Golden Rules Section
function GoldenRulesSection() {
  return (
    <div className="space-y-6">
      <p className="text-white/70">
        Electrical work करते समय ये 5 Golden Rules हमेशा follow करें। ये rules आपकी जान बचा सकते हैं!
      </p>

      {safetyData.goldenRules.map((rule, index) => (
        <motion.div
          key={rule.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                {rule.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="info">Rule {rule.number}</Badge>
                  <h3 className="text-xl font-bold">{rule.title}</h3>
                </div>
                <p className="text-white/70 mb-4">{rule.titleHindi}</p>
                <p className="text-sm text-white/80 mb-4">{rule.description}</p>

                <div className="space-y-2">
                  <div className="font-semibold text-sm">Steps:</div>
                  {rule.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-accent">•</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

// PPE Section
function PPESection({ ppe }) {
  return (
    <div className="space-y-6">
      <p className="text-white/70">
        Personal Protective Equipment (PPE) आपको electrical hazards से बचाता है। हमेशा complete PPE पहनें।
      </p>

      <div className="card-grid">
        {(ppe || safetyData.ppe).map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <div className="text-5xl mb-4 text-center">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-center">{item.name}</h3>
              <p className="text-sm text-white/70 text-center mb-4">{item.nameHindi}</p>

              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-white/60 mb-1">Purpose:</div>
                  <div className="text-sm">{item.purpose}</div>
                </div>

                {item.features && (
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-xs text-white/60 mb-2">Features:</div>
                    <ul className="space-y-1">
                      {item.features.map((feature, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-accent">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.usage && (
                  <div className="p-3 bg-accent/10 border border-accent/30 rounded-lg">
                    <div className="text-xs text-white/60 mb-1">Usage:</div>
                    <div className="text-sm font-semibold">{item.usage}</div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-yellow-500/10 border-yellow-500/30">
        <h3 className="font-bold mb-3">💡 Important Points</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>सभी PPE ISI marked होने चाहिए</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Damaged या expired PPE कभी use न करें</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Regular inspection और maintenance जरूरी है</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Personal PPE को दूसरों के साथ share न करें</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}

// Dos and Don'ts Section
function DosAndDontsSection({ dos, donts }) {
  const displayDos = dos || safetyData.dosAndDonts.dos;
  const displayDonts = donts || safetyData.dosAndDonts.donts;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Dos */}
      <Card className="bg-green-500/10 border-green-500/30">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-3xl">✅</span>
          DO - ये करें
        </h3>
        <ul className="space-y-3">
          {displayDos.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-2 text-sm"
            >
              <span className="text-green-400 flex-shrink-0">{item.startsWith('✅') ? '✅' : '✅'}</span>
              <span>{item.startsWith('✅') ? item.slice(2).trim() : item}</span>
            </motion.li>
          ))}
        </ul>
      </Card>

      {/* Don'ts */}
      <Card className="bg-red-500/10 border-red-500/30">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-3xl">❌</span>
          DON'T - ये न करें
        </h3>
        <ul className="space-y-3">
          {displayDonts.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-2 text-sm"
            >
              <span className="text-red-400 flex-shrink-0">{item.startsWith('❌') ? '❌' : '❌'}</span>
              <span>{item.startsWith('❌') ? item.slice(2).trim() : item}</span>
            </motion.li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

// Emergency Section
function EmergencySection() {
  const { electricShock, fireSafety } = safetyData.emergencyProcedures;

  return (
    <div className="space-y-8">
      {/* Electric Shock Treatment */}
      <Card className="bg-red-500/10 border-red-500/30">
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Zap className="w-7 h-7 text-yellow-400" />
          {electricShock.title}
        </h3>
        <p className="text-white/70 mb-6">{electricShock.titleHindi}</p>

        <div className="space-y-4">
          {electricShock.steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                {step.step}
              </div>
              <div className="flex-1">
                <h4 className="font-bold mb-1">{step.action}</h4>
                <p className="text-sm text-white/70 mb-2">{step.actionHindi}</p>
                <p className="text-sm text-white/60">{step.details}</p>
                {step.warning && (
                  <div className="mt-2 p-2 bg-red-500/20 rounded text-sm text-red-300">
                    ⚠️ {step.warning}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          <h4 className="font-semibold mb-2">⚠️ ध्यान दें:</h4>
          <ul className="space-y-1 text-sm">
            {electricShock.importantPoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Fire Safety */}
      <Card className="bg-orange-500/10 border-orange-500/30">
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Flame className="w-7 h-7 text-orange-400" />
          {fireSafety.title}
        </h3>
        <p className="text-white/70 mb-6">{fireSafety.titleHindi}</p>

        {/* Class of Fires */}
        <div className="mb-6">
          <h4 className="font-bold mb-3">Fire Classes:</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {fireSafety.classOfFires.map((fire, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${fire.class === 'Class E'
                    ? 'bg-accent/20 border border-accent/50'
                    : 'bg-white/5'
                  }`}
              >
                <Badge variant={fire.class === 'Class E' ? 'warning' : 'default'}>
                  {fire.class}
                </Badge>
                <div className="text-sm font-semibold mt-2">{fire.type}</div>
                <div className="text-xs text-white/60 mt-1">
                  Use: {fire.extinguisher}
                </div>
                {fire.recommended && (
                  <div className="text-xs text-accent mt-1">
                    ✓ {fire.recommended}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-2">
          <h4 className="font-bold">Electrical Fire में क्या करें:</h4>
          {fireSafety.steps.map((step, i) => (
            <div key={i} className="flex items-start gap-2 text-sm p-2 bg-white/5 rounded">
              <span className="text-accent">{i + 1}.</span>
              <span>{step}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-sm">
          🚫 <strong>Never use water on electrical fire!</strong> पानी से बिजली का shock लग सकता है।
        </div>
      </Card>

      {/* Emergency Numbers */}
      <Card className="bg-blue-500/10 border-blue-500/30">
        <h3 className="text-xl font-bold mb-4">📞 Emergency Numbers</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/5 rounded-xl text-center">
            <div className="text-3xl mb-2">🚑</div>
            <div className="text-2xl font-bold gradient-text">108</div>
            <div className="text-sm text-white/70">Ambulance</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl text-center">
            <div className="text-3xl mb-2">🚒</div>
            <div className="text-2xl font-bold gradient-text">101</div>
            <div className="text-sm text-white/70">Fire Brigade</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl text-center">
            <div className="text-3xl mb-2">🚓</div>
            <div className="text-2xl font-bold gradient-text">100</div>
            <div className="text-sm text-white/70">Police</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Safety Signs Section
function SafetySignsSection({ signs }) {
  const displaySigns = signs || safetyData.safetySigns;

  return (
    <div className="space-y-6">
      <p className="text-white/70">
        Safety signs को समझना और follow करना बहुत जरूरी है। ये signs आपको potential hazards के बारे में warn करते हैं।
      </p>

      <div className="card-grid">
        {displaySigns.map((sign, index) => (
          <motion.div
            key={sign.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="text-center h-full">
              <div className="w-20 h-20 mx-auto mb-4 bg-white/5 rounded-xl flex items-center justify-center">
                <div className="text-4xl">{sign.icon || '⚠️'}</div>
              </div>

              <h3 className="font-bold mb-1">{sign.name}</h3>
              <p className="text-sm text-white/60 mb-3">{sign.nameHindi}</p>

              <Badge variant="info" className="mb-3">{sign.type}</Badge>

              <div className="p-3 bg-white/5 rounded-lg text-sm">
                <div className="text-xs text-white/60 mb-1">Color:</div>
                <div>{sign.color || 'Dynamic'}</div>
              </div>

              <div className="mt-3 p-3 bg-accent/10 border border-accent/30 rounded-lg text-sm">
                <div className="text-xs text-white/60 mb-1">Meaning:</div>
                <div className="font-semibold">{sign.meaning}</div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-blue-500/10 border-blue-500/30">
        <h3 className="font-bold mb-3">📚 Sign Types Explanation</h3>
        <div className="space-y-2 text-sm">
          <div className="p-2 bg-white/5 rounded">
            <strong>Warning Signs (Yellow):</strong> Potential hazards की warning
          </div>
          <div className="p-2 bg-white/5 rounded">
            <strong>Prohibition Signs (Red):</strong> कुछ action prohibited है
          </div>
          <div className="p-2 bg-white/5 rounded">
            <strong>Mandatory Signs (Blue):</strong> कुछ action compulsory है
          </div>
          <div className="p-2 bg-white/5 rounded">
            <strong>Safe Condition Signs (Green):</strong> Safety equipment या exit की location
          </div>
        </div>
      </Card>
    </div>
  );
}