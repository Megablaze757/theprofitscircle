// ============================================
// THE PROFITS CIRCLE — MAIN APP
// ============================================

import { useState, useEffect } from 'react';
import { 
  Home, 
  Signal, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  HandCoins, 
  Crown,
  Menu,
  X,
  Circle,
  LogOut,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Pages
import HomePage from '@/pages/HomePage';
import SignalsPage from '@/pages/SignalsPage';
import JournalPage from '@/pages/JournalPage';
import CalendarPage from '@/pages/CalendarPage';
import EducationPage from '@/pages/EducationPage';
import AffiliatePage from '@/pages/AffiliatePage';
import VIPPage from '@/pages/VIPPage';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminDashboard from '@/pages/AdminDashboard';

// Services
import { isAdminAuthenticated } from '@/services/storage';

export type Page = 'home' | 'signals' | 'journal' | 'calendar' | 'education' | 'affiliate' | 'vip' | 'admin-login' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(isAdminAuthenticated());
  }, []);

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setCurrentPage('admin');
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setCurrentPage('home');
  };

  const navItems = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'signals' as Page, label: 'Signals', icon: Signal },
    { id: 'journal' as Page, label: 'Journal', icon: BookOpen },
    { id: 'calendar' as Page, label: 'Calendar', icon: Calendar },
    { id: 'education' as Page, label: 'Academy', icon: GraduationCap },
    { id: 'affiliate' as Page, label: 'Affiliate', icon: HandCoins },
    { id: 'vip' as Page, label: 'VIP', icon: Crown },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'signals':
        return <SignalsPage />;
      case 'journal':
        return <JournalPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'education':
        return <EducationPage />;
      case 'affiliate':
        return <AffiliatePage />;
      case 'vip':
        return <VIPPage />;
      case 'admin-login':
        return <AdminLoginPage onLogin={handleAdminLogin} />;
      case 'admin':
        return isAdmin ? <AdminDashboard onLogout={handleAdminLogout} /> : <AdminLoginPage onLogin={handleAdminLogin} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      {!currentPage.startsWith('admin') && (
        <nav className="navbar">
          <div className="nav-logo">
            <span className="nav-brand">
              THE <span>PROFITS</span> CIRCLE
            </span>
          </div>

          <div className="nav-menu">
            {navItems.map(item => (
              <a
                key={item.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(item.id);
                }}
                className={currentPage === item.id ? 'active' : ''}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="nav-right">
            <span className="nav-badge">
              <Circle className="w-1.5 h-1.5" style={{ fill: '#00e5a0' }} />
              Live
            </span>
            <a
              href="https://t.me/theprofitscirclesupport"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
            >
              Join Free
            </a>
            
            {/* Admin Link */}
            {isAdmin ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage('admin')}
                className="text-gold"
              >
                <Shield className="w-4 h-4 mr-1" />
                Admin
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage('admin-login')}
                className="text-muted hover:text-white"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            )}

            <button
              className="nav-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      )}

      {/* Mobile Menu */}
      {!currentPage.startsWith('admin') && (
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <a
              key={item.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(item.id);
                setMobileMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://t.me/theprofitscirclesupport"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-mobile-cta"
          >
            Join Free on Telegram
          </a>
        </div>
      )}

      {/* Main Content */}
      <main className={currentPage.startsWith('admin') ? '' : 'page-content'}>
        {renderPage()}
      </main>

      {/* Footer */}
      {!currentPage.startsWith('admin') && (
        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                <div className="footer-brand">
                  THE <span className="text-gold">PROFITS</span> CIRCLE
                </div>
                <p className="footer-desc">
                  The most complete XAUUSD trading platform. Signals, academy, economic calendar, 
                  trade journal, and affiliate program — all in one.
                </p>
              </div>
              <div>
                <div className="footer-col-title">Platform</div>
                <div className="footer-links">
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>Home</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('signals'); }}>Live Signals</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('journal'); }}>Trade Journal</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('calendar'); }}>Economic Calendar</a>
                </div>
              </div>
              <div>
                <div className="footer-col-title">Learn</div>
                <div className="footer-links">
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('education'); }}>Trading Academy</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('vip'); }}>VIP Plans</a>
                </div>
              </div>
              <div>
                <div className="footer-col-title">Earn</div>
                <div className="footer-links">
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('affiliate'); }}>Affiliate Program</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('vip'); }}>VIP Plans</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <span className="footer-copy">© 2025 The Profits Circle. All rights reserved.</span>
              <div className="footer-legal-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Use</a>
                <a href="#">Risk Disclosure</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
