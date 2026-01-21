'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, Flag, ChevronLeft, ChevronRight,
  CheckCircle2, XCircle, Play, Pause, AlertCircle
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { questionsData, getRandomQuestions } from '@/data/questions';
import { storage, shuffleArray, calculatePercentage } from '@/lib/utils';

export default function TestPage({ params }) {
  const router = useRouter();
  const { testId } = params;
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes default
  const [isPaused, setIsPaused] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [testResult, setTestResult] = useState(null);

  // Get test questions based on testId
  const getTestQuestions = (allQs) => {
    if (testId === 'quick-practice') {
      return shuffleArray(allQs).slice(0, 10);
    } else if (testId === 'first-year-set-1') {
      return shuffleArray(allQs.filter(q => q.year === '1st')).slice(0, 25);
    } else if (testId === 'second-year-set-1') {
      return shuffleArray(allQs.filter(q => q.year === '2nd')).slice(0, 25);
    } else if (testId === 'full-mock-test') {
      return shuffleArray(allQs).slice(0, 50);
    }

    return shuffleArray(allQs).slice(0, 25);
  };

  const [questions] = useState(() => {
    const allQs = storage.get('questionsData', questionsData);
    return getTestQuestions(allQs);
  });

  // Timer
  useEffect(() => {
    if (!testStarted || isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const toggleMarkForReview = () => {
    const newMarked = new Set(markedForReview);
    if (newMarked.has(currentQuestion)) {
      newMarked.delete(currentQuestion);
    } else {
      newMarked.add(currentQuestion);
    }
    setMarkedForReview(newMarked);
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const handleSubmit = () => {
    const timeTaken = 1800 - timeLeft;
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    questions.forEach((q, index) => {
      if (!answers[index]) {
        unanswered++;
      } else if (answers[index] === q.correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const percentage = calculatePercentage(correct, questions.length);

    const result = {
      title: getTestTitle(),
      total: questions.length,
      correct,
      wrong,
      unanswered,
      percentage,
      timeTaken,
      completedAt: new Date().toISOString(),
      questions: questions.map((q, i) => ({
        ...q,
        userAnswer: answers[i] || null,
        isCorrect: answers[i] === q.correctAnswer
      }))
    };

    // Save to history
    const history = storage.get('testHistory', []);
    history.unshift(result);
    storage.set('testHistory', history.slice(0, 10)); // Keep last 10 tests

    setTestResult(result);
    setShowSubmitModal(false);
  };

  const getTestTitle = () => {
    const titles = {
      'quick-practice': 'Quick Practice',
      'first-year-set-1': '1st Year Complete Test',
      'second-year-set-1': '2nd Year Complete Test',
      'full-mock-test': 'Full Mock Exam'
    };
    return titles[testId] || 'Practice Test';
  };

  // Start Screen
  if (!testStarted && !testResult) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-2xl w-full text-center">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-3xl font-bold mb-4">{getTestTitle()}</h1>

          <div className="grid md:grid-cols-3 gap-4 my-8">
            <div className="p-4 bg-white/5 rounded-xl">
              <div className="text-2xl font-bold gradient-text">{questions.length}</div>
              <div className="text-sm text-white/70">Questions</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <div className="text-2xl font-bold gradient-text">{formatTime(timeLeft)}</div>
              <div className="text-sm text-white/70">Duration</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <div className="text-2xl font-bold gradient-text">1</div>
              <div className="text-sm text-white/70">Mark Each</div>
            </div>
          </div>

          <div className="text-left bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Instructions:
            </h3>
            <ul className="space-y-1 text-sm text-white/80">
              <li>• सभी questions attempt करने की कोशिश करें</li>
              <li>• कोई negative marking नहीं है</li>
              <li>• Test submit करने से पहले review कर सकते हैं</li>
              <li>• Timer खत्म होने पर test auto-submit हो जाएगा</li>
            </ul>
          </div>

          <Button onClick={() => setTestStarted(true)} size="lg" className="w-full">
            <Play className="w-5 h-5" />
            Start Test
          </Button>
        </Card>
      </div>
    );
  }

  // Result Screen
  if (testResult) {
    const passPercentage = 60;
    const isPassed = testResult.percentage >= passPercentage;

    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container-custom max-w-4xl">
          <Card className="text-center mb-8">
            <div className="text-6xl mb-4">{isPassed ? '🎉' : '📚'}</div>
            <h1 className="text-3xl font-bold mb-2">
              {isPassed ? 'Congratulations!' : 'Keep Practicing!'}
            </h1>
            <p className="text-white/70">
              {isPassed
                ? 'आपने test pass कर लिया है!'
                : 'थोड़ी और मेहनत करें, आप जरूर pass करेंगे!'}
            </p>
          </Card>

          {/* Score Card */}
          <Card className="mb-8 bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
            <div className="text-center mb-6">
              <div className="text-6xl font-bold gradient-text mb-2">
                {testResult.percentage}%
              </div>
              <div className="text-xl text-white/80">
                {testResult.correct} out of {testResult.total} correct
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <div className="text-2xl font-bold text-green-400">{testResult.correct}</div>
                <div className="text-sm text-white/70">Correct</div>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <div className="text-2xl font-bold text-red-400">{testResult.wrong}</div>
                <div className="text-sm text-white/70">Wrong</div>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                <div className="text-2xl font-bold text-yellow-400">{testResult.unanswered}</div>
                <div className="text-sm text-white/70">Unanswered</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white/5 rounded-xl">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Time Taken:</span>
                <span className="font-semibold">{formatTime(testResult.timeTaken)}</span>
              </div>
            </div>
          </Card>

          {/* Review Answers */}
          <Card>
            <h2 className="text-2xl font-bold mb-6">📋 Review Answers</h2>
            <div className="space-y-6">
              {testResult.questions.map((q, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border ${q.isCorrect
                    ? 'bg-green-500/5 border-green-500/30'
                    : q.userAnswer
                      ? 'bg-red-500/5 border-red-500/30'
                      : 'bg-yellow-500/5 border-yellow-500/30'
                    }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0">
                      {q.isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                      ) : q.userAnswer ? (
                        <XCircle className="w-6 h-6 text-red-400" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-yellow-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold mb-2">
                        Q{index + 1}. {q.question}
                      </div>

                      <div className="space-y-2 mb-3">
                        {q.options.map((option, i) => {
                          const optionLetter = option.charAt(0);
                          const isCorrect = optionLetter === q.correctAnswer;
                          const isUserAnswer = optionLetter === q.userAnswer;

                          return (
                            <div
                              key={i}
                              className={`p-2 rounded text-sm ${isCorrect
                                ? 'bg-green-500/20 border border-green-500/50'
                                : isUserAnswer
                                  ? 'bg-red-500/20 border border-red-500/50'
                                  : 'bg-white/5'
                                }`}
                            >
                              {option}
                              {isCorrect && ' ✓'}
                              {isUserAnswer && !isCorrect && ' ✗'}
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-sm font-semibold mb-1 text-accent">
                          Explanation:
                        </div>
                        <div className="text-sm text-white/80 whitespace-pre-wrap">
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Button onClick={() => router.push('/mock-test')} className="flex-1">
              Back to Tests
            </Button>
            <Button onClick={() => window.location.reload()} variant="outline" className="flex-1">
              Retry Test
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Test Interface
  const question = questions[currentQuestion];
  const answered = Object.keys(answers).length;
  const progress = (answered / questions.length) * 100;

  return (
    <div className="min-h-screen py-4 px-4">
      <div className="container-custom max-w-5xl">
        {/* Top Bar */}
        <Card className="mb-4 sticky top-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <div className="text-white/60">Question</div>
                <div className="font-bold">{currentQuestion + 1}/{questions.length}</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-sm">
                <div className="text-white/60">Answered</div>
                <div className="font-bold">{answered}/{questions.length}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
              </button>
              <div className="flex items-center gap-2 text-lg font-bold">
                <Clock className="w-5 h-5 text-accent" />
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-primary"
            />
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Question Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="mb-4">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="info">{question.category}</Badge>
                    <button
                      onClick={toggleMarkForReview}
                      className={`flex items-center gap-2 text-sm ${markedForReview.has(currentQuestion)
                        ? 'text-yellow-400'
                        : 'text-white/60 hover:text-white'
                        }`}
                    >
                      <Flag className="w-4 h-4" />
                      {markedForReview.has(currentQuestion) ? 'Marked' : 'Mark for Review'}
                    </button>
                  </div>

                  <h2 className="text-xl font-bold mb-6">
                    Q{currentQuestion + 1}. {question.question}
                  </h2>

                  <div className="space-y-3">
                    {question.options.map((option, index) => {
                      const optionLetter = option.charAt(0);
                      const isSelected = answers[currentQuestion] === optionLetter;

                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswer(optionLetter)}
                          className={`w-full text-left p-4 rounded-xl transition-all ${isSelected
                            ? 'bg-gradient-primary shadow-glow'
                            : 'bg-white/5 hover:bg-white/10'
                            }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </Card>

                {/* Navigation */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => goToQuestion(currentQuestion - 1)}
                    disabled={currentQuestion === 0}
                    variant="outline"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  {currentQuestion === questions.length - 1 ? (
                    <Button
                      onClick={() => setShowSubmitModal(true)}
                      className="flex-1"
                    >
                      Submit Test
                    </Button>
                  ) : (
                    <Button
                      onClick={() => goToQuestion(currentQuestion + 1)}
                      className="flex-1"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <h3 className="font-bold mb-4">Question Navigator</h3>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {questions.map((_, index) => {
                  const isAnswered = answers[index];
                  const isMarked = markedForReview.has(index);
                  const isCurrent = index === currentQuestion;

                  return (
                    <button
                      key={index}
                      onClick={() => goToQuestion(index)}
                      className={`aspect-square rounded-lg text-sm font-semibold transition-all ${isCurrent
                        ? 'bg-gradient-primary shadow-glow'
                        : isAnswered
                          ? 'bg-green-500/20 border border-green-500/50'
                          : isMarked
                            ? 'bg-yellow-500/20 border border-yellow-500/50'
                            : 'bg-white/5 hover:bg-white/10'
                        }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500/20 border border-green-500/50 rounded" />
                  <span>Answered ({answered})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-yellow-500/20 border border-yellow-500/50 rounded" />
                  <span>Marked ({markedForReview.size})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white/5 rounded" />
                  <span>Not Answered ({questions.length - answered})</span>
                </div>
              </div>

              <Button
                onClick={() => setShowSubmitModal(true)}
                variant="outline"
                className="w-full mt-4"
              >
                Submit Test
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Submit Test?"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{answered}</div>
              <div className="text-xs text-white/70">Answered</div>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">{markedForReview.size}</div>
              <div className="text-xs text-white/70">Marked</div>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg">
              <div className="text-2xl font-bold text-red-400">{questions.length - answered}</div>
              <div className="text-xs text-white/70">Not Answered</div>
            </div>
          </div>

          {questions.length - answered > 0 && (
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-sm">
              ⚠️ आपने {questions.length - answered} questions नहीं किए हैं। क्या आप sure हैं?
            </div>
          )}

          <div className="flex gap-3">
            <Button onClick={() => setShowSubmitModal(false)} variant="outline" className="flex-1">
              Continue Test
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Submit Now
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}