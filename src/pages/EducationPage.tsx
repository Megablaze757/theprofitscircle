// ============================================
// EDUCATION PAGE — Trading Academy
// ============================================

import { useState, useEffect } from 'react';
import { GraduationCap, Lock, Check, X, ChevronRight, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { lessons, lessonCategories, getLessonsByCategory, getFreeLessons, getVIPLessons } from '@/services/education';
import { getCompletedLessons, markLessonComplete } from '@/services/storage';
import { useToast } from '@/hooks/useToast';
import type { Lesson, LessonCategory } from '@/types';

function EducationPage() {
  const [activeCategory, setActiveCategory] = useState<LessonCategory | 'all'>('all');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setCompletedLessons(getCompletedLessons());
  }, []);

  const displayedLessons = activeCategory === 'all' 
    ? lessons 
    : getLessonsByCategory(activeCategory);

  const handleLessonComplete = (lessonId: number) => {
    markLessonComplete(lessonId);
    setCompletedLessons(getCompletedLessons());
    showToast('Lesson completed! Great job!');
  };

  const handleQuizSubmit = () => {
    if (quizAnswer === null) return;
    setQuizSubmitted(true);
    
    if (selectedLesson?.quiz && quizAnswer === selectedLesson.quiz.correctIndex) {
      handleLessonComplete(selectedLesson.id);
    }
  };

  const openLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setQuizAnswer(null);
    setQuizSubmitted(false);
  };

  const progress = Math.round((completedLessons.length / lessons.length) * 100);
  const freeLessonsCount = getFreeLessons().length;
  const vipLessonsCount = getVIPLessons().length;

  const getDifficultyClass = (difficulty: string) => {
    if (difficulty === 'beginner') return 'bg-green/10 text-green';
    if (difficulty === 'intermediate') return 'bg-gold/10 text-gold';
    return 'bg-red/10 text-red';
  };

  const getQuizOptionClass = (index: number, correctIndex: number) => {
    if (!quizSubmitted) {
      return quizAnswer === index 
        ? 'bg-gold/20 border-gold text-gold' 
        : 'bg-transparent border-white/10 text-white/70 hover:border-white/20';
    }
    
    if (index === correctIndex) {
      return 'bg-green/20 border-green text-green';
    }
    if (quizAnswer === index) {
      return 'bg-red/20 border-red text-red';
    }
    
    return 'bg-transparent border-white/10 text-white/50';
  };

  return (
    <div className="page-content">
      {/* Page Hero */}
      <div 
        className="py-16 relative overflow-hidden"
        style={{ 
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,175,55,0.07), transparent)',
          borderBottom: '1px solid var(--gold-border)'
        }}
      >
        <div className="grid-bg opacity-40" />
        <div className="container relative z-10">
          <div className="section-eyebrow">
            <GraduationCap className="w-4 h-4" />
            Trading Academy
          </div>
          <h1 className="section-title">
            Master <span className="text-gold">Gold Trading</span>
          </h1>
          <div className="accent-line">
            <div className="al-diamond" />
          </div>
          <p className="text-white/60 max-w-xl">
            40+ structured lessons covering technical analysis, psychology, risk management, 
            and advanced gold strategies. Free forever.
          </p>

          {/* Progress Bar */}
          <div className="mt-8 max-w-md">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/50">Your Progress</span>
              <span className="text-gold font-bold">{progress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: progress + '%' }} />
            </div>
            <div className="text-xs text-white/40 mt-2">
              {completedLessons.length} of {lessons.length} lessons completed
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-pad">
        <div className="container">
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card text-center py-4">
              <div className="font-bebas text-2xl text-gold tracking-wider">{lessons.length}+</div>
              <div className="text-[10px] text-white/50 uppercase tracking-wider mt-1">Total Lessons</div>
            </div>
            <div className="card text-center py-4">
              <div className="font-bebas text-2xl text-green tracking-wider">{freeLessonsCount}</div>
              <div className="text-[10px] text-white/50 uppercase tracking-wider mt-1">Free Lessons</div>
            </div>
            <div className="card text-center py-4">
              <div className="font-bebas text-2xl text-gold tracking-wider">{vipLessonsCount}</div>
              <div className="text-[10px] text-white/50 uppercase tracking-wider mt-1">VIP Lessons</div>
            </div>
            <div className="card text-center py-4">
              <div className="font-bebas text-2xl text-blue tracking-wider">100%</div>
              <div className="text-[10px] text-white/50 uppercase tracking-wider mt-1">Completion Rate</div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {lessonCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as LessonCategory | 'all')}
                className={activeCategory === cat.id
                  ? 'px-4 py-2 rounded-full text-sm font-semibold transition-all bg-gold text-black'
                  : 'px-4 py-2 rounded-full text-sm font-semibold transition-all bg-transparent text-white/50 border border-white/10 hover:border-white/20 hover:text-white/70'
                }
              >
                {cat.name}
                <span className="ml-2 text-xs opacity-60">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Lessons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedLessons.map((lesson) => (
              <div 
                key={lesson.id}
                className={completedLessons.includes(lesson.id) ? 'card cursor-pointer group border-green/30' : 'card cursor-pointer group'}
                onClick={() => openLesson(lesson)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                    style={{ 
                      background: lesson.isFree ? 'var(--green-dim)' : 'var(--gold-dim)',
                      border: lesson.isFree ? '1px solid var(--green-border)' : '1px solid var(--gold-border)'
                    }}
                  >
                    {lesson.icon}
                  </div>
                  {completedLessons.includes(lesson.id) ? (
                    <div className="w-6 h-6 rounded-full bg-green/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-green" />
                    </div>
                  ) : !lesson.isFree && (
                    <Lock className="w-4 h-4 text-gold" />
                  )}
                </div>

                <h3 className="font-bold mb-2 group-hover:text-gold transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-white/50 mb-4 line-clamp-2">
                  {lesson.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-white/40">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {lesson.duration}
                    </span>
                    <span className={getDifficultyClass(lesson.difficulty)}>
                      {lesson.difficulty}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-gold transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lesson Modal */}
      {selectedLesson && (
        <div className="modal-overlay open" onClick={() => setSelectedLesson(null)}>
          <div className="modal-box max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl">{selectedLesson.icon}</span>
                  <h3 className="text-xl font-bold">{selectedLesson.title}</h3>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {selectedLesson.duration}
                  </span>
                  <span className={getDifficultyClass(selectedLesson.difficulty)}>
                    {selectedLesson.difficulty}
                  </span>
                  {!selectedLesson.isFree && (
                    <Badge variant="outline" className="border-gold text-gold text-xs">
                      <Lock className="w-3 h-3 mr-1" />
                      VIP
                    </Badge>
                  )}
                </div>
              </div>
              <button onClick={() => setSelectedLesson(null)} className="modal-close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Lesson Content */}
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedLesson.content }}
              />

              {/* Quiz */}
              {selectedLesson.quiz && (
                <div 
                  className="p-4 rounded-xl"
                  style={{ background: 'var(--black2)', border: '1px solid var(--border)' }}
                >
                  <div className="font-bold mb-3">Knowledge Check</div>
                  <div className="text-sm text-white/70 mb-4">{selectedLesson.quiz.question}</div>
                  
                  <div className="space-y-2">
                    {selectedLesson.quiz.options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => !quizSubmitted && setQuizAnswer(i)}
                        disabled={quizSubmitted}
                        className={`w-full p-3 rounded-lg text-left text-sm transition-all border ${getQuizOptionClass(i, selectedLesson.quiz!.correctIndex)}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  {!quizSubmitted ? (
                    <Button 
                      onClick={handleQuizSubmit}
                      disabled={quizAnswer === null}
                      className="w-full btn btn-gold mt-4"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <div className={quizAnswer === selectedLesson.quiz.correctIndex
                      ? 'mt-4 p-3 rounded-lg text-center bg-green/20 text-green'
                      : 'mt-4 p-3 rounded-lg text-center bg-red/20 text-red'
                    }>
                      {quizAnswer === selectedLesson.quiz.correctIndex
                        ? 'Correct! Lesson completed.'
                        : 'Incorrect. Try reviewing the lesson again.'
                      }
                    </div>
                  )}
                </div>
              )}

              {/* Complete Button (if no quiz) */}
              {!selectedLesson.quiz && selectedLesson.isFree && (
                <Button 
                  onClick={() => {
                    handleLessonComplete(selectedLesson.id);
                    setSelectedLesson(null);
                  }}
                  className="w-full btn btn-green"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Mark as Complete
                </Button>
              )}

              {/* VIP CTA for locked lessons */}
              {!selectedLesson.isFree && (
                <div 
                  className="p-4 rounded-xl text-center"
                  style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold-border)' }}
                >
                  <Lock className="w-8 h-8 mx-auto mb-2 text-gold" />
                  <div className="font-bold mb-1">VIP Exclusive Content</div>
                  <div className="text-sm text-white/60 mb-4">
                    This lesson is available exclusively for VIP members.
                  </div>
                  <Button className="btn btn-gold">
                    <Award className="w-4 h-4 mr-2" />
                    Upgrade to VIP
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EducationPage;
