// ============================================
// VIP PAGE — Membership Plans
// ============================================

import { useState } from 'react';
import { Crown, Check, X, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function VIPPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      badge: 'FREE',
      price: 0,
      period: 'forever',
      description: 'Get started with our free signals and basic education.',
      features: [
        { text: 'Basic XAUUSD signals', included: true },
        { text: '8 foundation lessons', included: true },
        { text: 'Economic calendar', included: true },
        { text: 'Trade journal', included: true },
        { text: 'Community access', included: true },
        { text: 'Advanced signals', included: false },
        { text: 'VIP lessons', included: false },
        { text: '1-on-1 mentorship', included: false },
        { text: 'Priority support', included: false },
      ],
      featured: false,
      buttonStyle: 'outline' as const,
      cta: 'Join Free',
    },
    {
      id: 'pro',
      name: 'Pro',
      badge: 'MOST POPULAR',
      price: billingPeriod === 'monthly' ? 49 : 39,
      period: billingPeriod === 'monthly' ? 'month' : 'month (billed yearly)',
      description: 'Perfect for serious traders who want premium signals and education.',
      features: [
        { text: 'All Free features', included: true },
        { text: 'Premium XAUUSD signals', included: true },
        { text: 'All 40+ lessons', included: true },
        { text: 'Advanced strategies', included: true },
        { text: 'Risk management course', included: true },
        { text: 'Weekly market analysis', included: true },
        { text: 'Priority signal delivery', included: true },
        { text: '1-on-1 mentorship', included: false },
        { text: 'Custom trading plan', included: false },
      ],
      featured: true,
      buttonStyle: 'gold' as const,
      cta: 'Get Pro',
    },
    {
      id: 'elite',
      name: 'Elite',
      badge: 'BEST VALUE',
      price: billingPeriod === 'monthly' ? 99 : 79,
      period: billingPeriod === 'monthly' ? 'month' : 'month (billed yearly)',
      description: 'The complete package for professional traders.',
      features: [
        { text: 'All Pro features', included: true },
        { text: 'VIP-only signals', included: true },
        { text: 'Smart Money Concepts', included: true },
        { text: '1-on-1 mentorship', included: true },
        { text: 'Custom trading plan', included: true },
        { text: 'Daily market briefings', included: true },
        { text: 'Private Discord access', included: true },
        { text: 'Direct admin contact', included: true },
        { text: 'Lifetime updates', included: true },
      ],
      featured: false,
      buttonStyle: 'green' as const,
      cta: 'Go Elite',
    },
  ];

  const comparisonFeatures = [
    { name: 'XAUUSD Signals', free: 'Basic', pro: 'Premium', elite: 'VIP-Only' },
    { name: 'Trading Lessons', free: '8', pro: '40+', elite: '40+' },
    { name: 'Signal Delivery', free: 'Standard', pro: 'Priority', elite: 'Instant' },
    { name: 'Economic Calendar', free: '✓', pro: '✓', elite: '✓' },
    { name: 'Trade Journal', free: '✓', pro: '✓', elite: '✓' },
    { name: 'Advanced Strategies', free: '—', pro: '✓', elite: '✓' },
    { name: 'Smart Money Concepts', free: '—', pro: '—', elite: '✓' },
    { name: '1-on-1 Mentorship', free: '—', pro: '—', elite: '✓' },
    { name: 'Custom Trading Plan', free: '—', pro: '—', elite: '✓' },
    { name: 'Private Community', free: '—', pro: '—', elite: '✓' },
    { name: 'Direct Support', free: 'Email', pro: 'Priority', elite: 'Direct' },
    { name: 'Monthly Cost', free: 'FREE', pro: '£49', elite: '£99' },
  ];

  return (
    <div className="page-content">
      {/* Page Hero */}
      <div 
        className="py-16 relative overflow-hidden"
        style={{ 
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,175,55,0.1), transparent)',
          borderBottom: '1px solid var(--gold-border)'
        }}
      >
        <div className="grid-bg opacity-40" />
        <div className="container relative z-10 text-center">
          <div className="section-eyebrow justify-center">
            <Crown className="w-4 h-4" />
            VIP Membership
          </div>
          <h1 className="section-title">
            Choose Your <span className="text-gold">Plan</span>
          </h1>
          <div className="accent-line justify-center">
            <div className="al-diamond" />
          </div>
          <p className="text-white/60 max-w-xl mx-auto">
            Unlock premium signals, advanced education, and exclusive features. 
            Start free, upgrade when ready.
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-gold text-black'
                  : 'bg-transparent text-white/50 border border-white/10'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                billingPeriod === 'yearly'
                  ? 'bg-gold text-black'
                  : 'bg-transparent text-white/50 border border-white/10'
              }`}
            >
              Yearly
              <Badge className="bg-green text-black text-xs">Save 20%</Badge>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-pad">
        <div className="container">
          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`card relative ${plan.featured ? 'border-gold/50 scale-105 z-10' : ''}`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gold text-black">
                      <Star className="w-3 h-3 mr-1" />
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="font-bebas text-2xl tracking-wider mb-1">{plan.name}</div>
                  <div className="text-sm text-white/50 mb-4">{plan.description}</div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-bebas text-5xl text-gold">
                      {plan.price === 0 ? 'FREE' : `£${plan.price}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-sm text-white/50">/{plan.period}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      {feature.included ? (
                        <Check className="w-4 h-4 text-green flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-white/20 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-white/70' : 'text-white/30'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://t.me/theprofitscirclesupport"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full btn ${
                    plan.buttonStyle === 'gold' ? 'btn-gold' :
                    plan.buttonStyle === 'green' ? 'btn-green' :
                    'btn-outline'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          {/* Free VIP CTA */}
          <div 
            className="p-8 rounded-2xl text-center mb-16"
            style={{ 
              background: 'linear-gradient(135deg, rgba(0,229,160,0.1), rgba(0,229,160,0.02))',
              border: '1px solid var(--green-border)'
            }}
          >
            <Crown className="w-12 h-12 mx-auto mb-4 text-green" />
            <h3 className="text-2xl font-bold mb-2">Get FREE VIP Access</h3>
            <p className="text-white/60 mb-6 max-w-md mx-auto">
              No payment. No credit card. Just DM us on Instagram or Telegram and 
              you'll be added to VIP in minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://instagram.com/theprofitscircle"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ig btn-lg"
              >
                DM on Instagram
              </a>
              <a
                href="https://t.me/theprofitscirclesupport"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-tg btn-lg"
              >
                DM on Telegram
              </a>
            </div>
          </div>

          {/* Comparison Table */}
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">Plan Comparison</h2>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="text-center">Free</th>
                    <th className="text-center text-gold">Pro</th>
                    <th className="text-center text-green">Elite</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, i) => (
                    <tr key={i}>
                      <td>{feature.name}</td>
                      <td className="text-center">
                        {feature.free === '✓' ? (
                          <Check className="w-4 h-4 text-green mx-auto" />
                        ) : feature.free === '—' ? (
                          <X className="w-4 h-4 text-white/20 mx-auto" />
                        ) : (
                          <span className="text-sm text-white/70">{feature.free}</span>
                        )}
                      </td>
                      <td className="text-center">
                        {feature.pro === '✓' ? (
                          <Check className="w-4 h-4 text-green mx-auto" />
                        ) : feature.pro === '—' ? (
                          <X className="w-4 h-4 text-white/20 mx-auto" />
                        ) : (
                          <span className="text-sm text-gold">{feature.pro}</span>
                        )}
                      </td>
                      <td className="text-center">
                        {feature.elite === '✓' ? (
                          <Check className="w-4 h-4 text-green mx-auto" />
                        ) : feature.elite === '—' ? (
                          <X className="w-4 h-4 text-white/20 mx-auto" />
                        ) : (
                          <span className="text-sm text-green">{feature.elite}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {[
                {
                  q: 'Can I really get VIP for free?',
                  a: 'Yes! Just DM us on Instagram or Telegram and we\'ll add you to VIP access at no cost.',
                },
                {
                  q: 'How do I upgrade my plan?',
                  a: 'Contact us via Telegram or Instagram and we\'ll help you upgrade to Pro or Elite.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept bank transfer, PayPal, and cryptocurrency for VIP subscriptions.',
                },
                {
                  q: 'Can I cancel anytime?',
                  a: 'Yes, you can cancel your subscription at any time with no penalties.',
                },
              ].map((faq, i) => (
                <div key={i} className="card">
                  <div className="font-bold mb-2">{faq.q}</div>
                  <div className="text-sm text-white/60">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VIPPage;
