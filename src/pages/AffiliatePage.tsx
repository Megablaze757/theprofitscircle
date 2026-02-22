// ============================================
// AFFILIATE PAGE — Enhanced Program
// ============================================

import { useState } from 'react';
import { HandCoins, TrendingUp, Users, DollarSign, Target, Gift, Zap, Copy, Check, ChevronRight, Play, BookOpen, Video, FileText, BarChart3, Award, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { affiliateLessons } from '@/services/education';
import { useToast } from '@/hooks/useToast';

function AffiliatePage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'resources'>('overview');
  const { showToast } = useToast();

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://theprofitscircle.com/ref/YOURCODE');
    setCopied(true);
    showToast('Referral link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const tiers = [
    {
      name: 'Starter',
      range: '1-9 Referrals',
      commission: 40,
      features: [
        '40% recurring commission',
        'Real-time dashboard',
        'Marketing materials',
        'Monthly payouts',
        'Email support',
      ],
      featured: false,
    },
    {
      name: 'Pro',
      range: '10-24 Referrals',
      commission: 45,
      features: [
        '45% recurring commission',
        'Priority support',
        'Exclusive content',
        'Weekly strategy calls',
        'Custom landing pages',
      ],
      featured: true,
    },
    {
      name: 'Elite',
      range: '25+ Referrals',
      commission: 50,
      features: [
        '50% recurring commission',
        '1-on-1 mentorship',
        'VIP signal access',
        'Co-marketing opportunities',
        'Direct admin contact',
      ],
      featured: false,
    },
  ];

  const resources = [
    {
      icon: FileText,
      title: 'Marketing Kit',
      description: 'Pre-made banners, graphics, and ad copy for social media promotion.',
      color: 'blue',
    },
    {
      icon: Video,
      title: 'Video Templates',
      description: 'Ready-to-use video scripts and templates for TikTok, Instagram, and YouTube.',
      color: 'red',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track clicks, conversions, and earnings in real-time.',
      color: 'green',
    },
    {
      icon: BookOpen,
      title: 'Training Guide',
      description: 'Complete guide to affiliate marketing in the trading niche.',
      color: 'gold',
    },
    {
      icon: Users,
      title: 'Community Access',
      description: 'Join our private affiliate community for tips and support.',
      color: 'purple',
    },
    {
      icon: Award,
      title: 'Bonus Rewards',
      description: 'Earn bonuses for hitting referral milestones.',
      color: 'gold',
    },
  ];

  const stats = [
    { value: '40-50%', label: 'Commission', icon: TrendingUp },
    { value: '£2,400', label: 'Avg Monthly', icon: DollarSign },
    { value: '100+', label: 'Affiliates', icon: Users },
    { value: 'Lifetime', label: 'Earnings', icon: Gift },
  ];

  return (
    <div className="page-content">
      {/* Page Hero */}
      <div 
        className="py-16 relative overflow-hidden"
        style={{ 
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,229,160,0.07), transparent)',
          borderBottom: '1px solid var(--green-border)'
        }}
      >
        <div className="grid-bg opacity-40" />
        <div className="container relative z-10">
          <div className="section-eyebrow">
            <HandCoins className="w-4 h-4" />
            Affiliate Program
          </div>
          <h1 className="section-title">
            Earn <span className="text-green">40-50%</span> Commission
          </h1>
          <div className="accent-line">
            <div className="al-diamond" />
          </div>
          <p className="text-white/60 max-w-xl">
            Turn your trading journey into passive income. Refer others and earn 
            recurring commission on every VIP signup. Real-time dashboard, monthly payouts.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-8">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="font-bebas text-3xl tracking-wider text-green">{stat.value}</div>
                <div className="text-xs text-white/50 font-semibold tracking-wide uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-pad">
        <div className="container">
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            {(['overview', 'lessons', 'resources'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-green text-black'
                    : 'bg-transparent text-white/50 border border-white/10 hover:border-white/20 hover:text-white/70'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* How It Works */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      step: '1',
                      title: 'Get Your Link',
                      description: 'Sign up and receive your unique referral link. Share it anywhere.',
                      icon: Target,
                    },
                    {
                      step: '2',
                      title: 'Share & Promote',
                      description: 'Post on social media, YouTube, or share with your trading circle.',
                      icon: Users,
                    },
                    {
                      step: '3',
                      title: 'Earn Commissions',
                      description: 'Get paid 40-50% of every VIP subscription. Monthly payouts.',
                      icon: DollarSign,
                    },
                  ].map((item, i) => (
                    <div key={i} className="card text-center">
                      <div className="w-12 h-12 rounded-full bg-green/20 flex items-center justify-center mx-auto mb-4">
                        <item.icon className="w-6 h-6 text-green" />
                      </div>
                      <div className="text-4xl font-bebas text-green/30 mb-2">{item.step}</div>
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-white/50">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commission Tiers */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Commission Tiers</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {tiers.map((tier, i) => (
                    <div 
                      key={i} 
                      className={`card relative ${tier.featured ? 'border-green/50' : ''}`}
                    >
                      {tier.featured && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <Badge className="bg-green text-black">
                            <Zap className="w-3 h-3 mr-1" />
                            Most Popular
                          </Badge>
                        </div>
                      )}
                      <div className="text-center mb-6">
                        <div className="font-bebas text-2xl tracking-wider mb-1">{tier.name}</div>
                        <div className="text-sm text-white/50">{tier.range}</div>
                      </div>
                      <div className="text-center mb-6">
                        <div className="font-bebas text-5xl text-green">{tier.commission}%</div>
                        <div className="text-xs text-white/50">Commission</div>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {tier.features.map((feature, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-white/70">
                            <Check className="w-4 h-4 text-green flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className={`w-full ${tier.featured ? 'btn btn-green' : 'btn btn-outline'}`}>
                        Get Started
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Earnings Calculator */}
              <div 
                className="card mb-12"
                style={{ background: 'var(--black2)', border: '1px solid var(--green-border)' }}
              >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Earnings Calculator</h3>
                    <p className="text-white/60 mb-6">
                      See how much you could earn with our affiliate program. 
                      Commissions are recurring — you earn every month your referrals stay subscribed.
                    </p>
                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-sm text-white/50">10 referrals at £49/mo</span>
                        <span className="text-sm font-mono text-green">£196/mo</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-sm text-white/50">25 referrals at £49/mo</span>
                        <span className="text-sm font-mono text-green">£612/mo</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-sm text-white/50">50 referrals at £49/mo</span>
                        <span className="text-sm font-mono text-green">£1,225/mo</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-sm text-white/50">100 referrals at £49/mo</span>
                        <span className="text-sm font-mono text-green">£2,450/mo</span>
                      </div>
                    </div>
                  </div>
                  <div 
                    className="p-6 rounded-xl text-center"
                    style={{ background: 'var(--black3)', border: '1px solid var(--border)' }}
                  >
                    <div className="text-sm text-white/50 mb-2">Annual Potential</div>
                    <div className="font-bebas text-5xl text-green mb-2">£29,400</div>
                    <div className="text-sm text-white/50 mb-6">at 100 referrals</div>
                    <Button className="btn btn-green btn-lg w-full">
                      <HandCoins className="w-5 h-5 mr-2" />
                      Join Affiliate Program
                    </Button>
                  </div>
                </div>
              </div>

              {/* Get Started CTA */}
              <div 
                className="p-8 rounded-2xl text-center"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(0,229,160,0.1), rgba(0,229,160,0.02))',
                  border: '1px solid var(--green-border)'
                }}
              >
                <HandCoins className="w-12 h-12 mx-auto mb-4 text-green" />
                <h3 className="text-2xl font-bold mb-2">Ready to Start Earning?</h3>
                <p className="text-white/60 mb-6 max-w-md mx-auto">
                  Join our affiliate program today and start earning 40-50% commission 
                  on every VIP signup. It's free to join.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://t.me/theprofitscirclesupport"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-green btn-lg"
                  >
                    Join on Telegram
                  </a>
                  <Button 
                    variant="outline" 
                    className="btn btn-outline border-green/30 text-green"
                    onClick={() => setActiveTab('lessons')}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Training
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Lessons Tab */}
          {activeTab === 'lessons' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Affiliate Training</h2>
                <p className="text-white/60">
                  Learn how to maximize your affiliate earnings with our comprehensive training program.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {affiliateLessons.map((lesson, i) => (
                  <div key={i} className="card">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-green/20 flex items-center justify-center flex-shrink-0">
                        <Play className="w-5 h-5 text-green" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold">{lesson.title}</h3>
                          <span className="text-xs text-white/50">{lesson.duration}</span>
                        </div>
                        <p className="text-sm text-white/50">{lesson.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-xl text-center" style={{ background: 'var(--black2)', border: '1px solid var(--border)' }}>
                <Crown className="w-8 h-8 mx-auto mb-3 text-gold" />
                <h3 className="font-bold mb-2">Want More Advanced Training?</h3>
                <p className="text-sm text-white/60 mb-4">
                  Pro and Elite affiliates get access to exclusive advanced training modules.
                </p>
                <Button className="btn btn-gold">
                  <Award className="w-4 h-4 mr-2" />
                  Upgrade Your Tier
                </Button>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Marketing Resources</h2>
                <p className="text-white/60">
                  Everything you need to promote The Profits Circle effectively.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resources.map((resource, i) => (
                  <div key={i} className="card group cursor-pointer">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ 
                        background: resource.color === 'green' ? 'var(--green-dim)' :
                                   resource.color === 'gold' ? 'var(--gold-dim)' :
                                   resource.color === 'blue' ? 'var(--blue-dim)' :
                                   resource.color === 'red' ? 'rgba(255,71,87,0.1)' :
                                   'rgba(139,92,246,0.1)',
                        border: `1px solid ${
                          resource.color === 'green' ? 'var(--green-border)' :
                          resource.color === 'gold' ? 'var(--gold-border)' :
                          resource.color === 'blue' ? 'rgba(77,159,255,0.25)' :
                          resource.color === 'red' ? 'var(--red-border)' :
                          'rgba(139,92,246,0.25)'
                        }`
                      }}
                    >
                      <resource.icon className="w-5 h-5" style={{ 
                        color: resource.color === 'green' ? 'var(--green)' :
                               resource.color === 'gold' ? 'var(--gold)' :
                               resource.color === 'blue' ? 'var(--blue)' :
                               resource.color === 'red' ? 'var(--red)' :
                               '#8b5cf6'
                      }} />
                    </div>
                    <h3 className="font-bold mb-2 group-hover:text-green transition-colors">{resource.title}</h3>
                    <p className="text-sm text-white/50">{resource.description}</p>
                    <div className="mt-4 flex items-center text-sm text-green">
                      <span>Access Resource</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Referral Link */}
              <div 
                className="mt-8 p-6 rounded-xl"
                style={{ background: 'var(--black2)', border: '1px solid var(--border)' }}
              >
                <h3 className="font-bold mb-4">Your Referral Link</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value="https://theprofitscircle.com/ref/YOURCODE"
                    readOnly
                    className="form-input flex-1"
                  />
                  <Button 
                    onClick={handleCopyLink}
                    className={`btn ${copied ? 'btn-green' : 'btn-outline'}`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-white/40 mt-2">
                  Share this link anywhere. When someone signs up through it, you'll earn commission.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default AffiliatePage;
