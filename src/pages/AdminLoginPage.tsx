// ============================================
// ADMIN LOGIN PAGE
// ============================================

import { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { setAdminSession } from '@/services/storage';
import { useToast } from '@/hooks/useToast';

interface AdminLoginPageProps {
  onLogin: () => void;
}

function AdminLoginPage({ onLogin }: AdminLoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simple admin authentication (in production, use proper backend auth)
    setTimeout(() => {
      if (email === 'admin@theprofitscircle.com' && password === 'admin123') {
        setAdminSession({
          isAuthenticated: true,
          email,
          loginTime: new Date().toISOString(),
        });
        showToast('Welcome back, Admin!');
        onLogin();
      } else {
        showToast('Invalid credentials', 'error');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--black)' }}>
      {/* Background Effects */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(212,175,55,0.08), transparent)' }}
      />
      <div className="grid-bg opacity-30" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gold/20 border border-gold/30 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-gold" />
          </div>
          <h1 className="font-bebas text-3xl tracking-wider">
            THE <span className="text-gold">PROFITS</span> CIRCLE
          </h1>
          <p className="text-white/50 text-sm">Admin Portal</p>
        </div>

        {/* Login Form */}
        <div 
          className="p-8 rounded-2xl"
          style={{ background: 'var(--black3)', border: '1px solid var(--gold-border)' }}
        >
          <h2 className="text-xl font-bold mb-6 text-center">Admin Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="admin@theprofitscircle.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input pr-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full btn btn-gold btn-lg"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-white/40">
              Default credentials:<br />
              Email: admin@theprofitscircle.com<br />
              Password: admin123
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a href="/" className="text-sm text-white/50 hover:text-gold transition-colors">
            ← Back to main site
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
