// ============================================================
// THE PROFITS CIRCLE — SHARED JS
// ============================================================

const PC = {
  // --- AUTH ---
  getUser() {
    try { return JSON.parse(sessionStorage.getItem('pc_user') || 'null'); } catch { return null; }
  },
  setUser(u) { sessionStorage.setItem('pc_user', JSON.stringify(u)); },
  clearUser() { sessionStorage.removeItem('pc_user'); },
  isLoggedIn() { return !!this.getUser(); },
  isAdmin() { const u = this.getUser(); return u && u.role === 'admin'; },

  requireAuth(returnUrl) {
    if (!this.isLoggedIn()) {
      sessionStorage.setItem('pc_redirect', returnUrl || window.location.href);
      window.location.href = PC.url('login');
      return false;
    }
    return true;
  },

  // --- URL HELPER (clean URLs for GitHub Pages) ---
  // All internal links use .html but we strip it via the 404 redirect trick
  url(page) {
    if (page === 'home' || page === 'index') return './';
    return './' + page + '.html';
  },

  // --- USER STORE ---
  getUsers() {
    try {
      const raw = localStorage.getItem('pc_users');
      if (raw) return JSON.parse(raw);
    } catch {}
    const defaults = [
      { id: 1, name: 'Admin', email: 'admin@theprofitscircle.com', password: 'admin123', role: 'admin', plan: 'vip', vip: true, status: 'active', joined: '2024-01-01', affiliate: false, referralCode: '', referredBy: '', earnings: 0 },
      { id: 2, name: 'James Collins', email: 'james@example.com', password: 'demo123', role: 'user', plan: 'vip', vip: true, status: 'active', joined: '2024-11-14', affiliate: true, referralCode: 'JAMES22', referredBy: '', earnings: 1200 },
      { id: 3, name: 'Sarah Walsh', email: 'sarah@example.com', password: 'demo123', role: 'user', plan: 'free', vip: false, status: 'active', joined: '2025-01-22', affiliate: false, referralCode: '', referredBy: 'JAMES22', earnings: 0 },
      { id: 4, name: 'Mike Torres', email: 'mike@example.com', password: 'demo123', role: 'user', plan: 'paid', vip: true, status: 'active', joined: '2025-02-01', affiliate: true, referralCode: 'MIKE99', referredBy: '', earnings: 400 },
    ];
    localStorage.setItem('pc_users', JSON.stringify(defaults));
    return defaults;
  },
  saveUsers(users) { localStorage.setItem('pc_users', JSON.stringify(users)); },
  findUser(email) { return this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()); },
  findUserByReferral(code) { return this.getUsers().find(u => u.referralCode && u.referralCode.toUpperCase() === code.toUpperCase()); },

  login(email, password) {
    const u = this.findUser(email);
    if (!u) return { ok: false, msg: 'No account found with that email.' };
    if (u.password !== password) return { ok: false, msg: 'Incorrect password.' };
    if (u.status === 'suspended') return { ok: false, msg: 'Your account has been suspended. Contact support.' };
    this.setUser({ id: u.id, name: u.name, email: u.email, role: u.role, plan: u.plan || 'free', vip: u.vip, affiliate: u.affiliate || false, referralCode: u.referralCode || '' });
    return { ok: true };
  },

  signup(name, email, password, referralCode) {
    const existing = this.findUser(email);
    if (existing) return { ok: false, msg: 'An account with that email already exists.' };
    const users = this.getUsers();
    const newUser = {
      id: Date.now(), name, email, password, role: 'user', plan: 'free', vip: false,
      status: 'active', joined: new Date().toISOString().slice(0,10),
      affiliate: false, referralCode: '', referredBy: referralCode || '', earnings: 0
    };
    users.push(newUser);
    this.saveUsers(users);
    this.setUser({ id: newUser.id, name, email, role: 'user', plan: 'free', vip: false, affiliate: false, referralCode: '' });
    return { ok: true };
  },

  logout() { this.clearUser(); window.location.href = PC.url('home'); },

  // plan helpers
  hasPlan(plan) {
    const u = this.getUser();
    if (!u) return false;
    if (u.role === 'admin') return true;
    if (plan === 'free') return true;
    if (plan === 'paid') return u.plan === 'paid' || u.plan === 'vip';
    if (plan === 'vip') return u.plan === 'vip';
    return false;
  },

  // --- NAV ---
  initNav(activePageId) {
    const user = this.getUser();
    const authBtn = document.getElementById('navAuthBtn');
    const authLabel = document.getElementById('navAuthLabel');
    if (authBtn && authLabel) {
      if (user) {
        authLabel.textContent = user.name.split(' ')[0];
        if (user.role === 'admin') {
          authBtn.setAttribute('href', PC.url('admin'));
          authBtn.title = 'Go to Admin';
        } else {
          authBtn.setAttribute('href', '#');
          authBtn.onclick = (e) => { e.preventDefault(); PC.logout(); };
          authBtn.title = 'Log Out';
        }
      } else {
        authLabel.textContent = 'Log In';
        authBtn.setAttribute('href', PC.url('login'));
      }
    }
    if (activePageId) {
      document.querySelectorAll('.nav-menu a, .mobile-menu a').forEach(a => {
        if (a.dataset.page === activePageId) a.classList.add('active');
      });
    }
    const ham = document.getElementById('hamburger');
    const mob = document.getElementById('mobileMenu');
    if (ham && mob) ham.onclick = () => mob.classList.toggle('open');

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
      if (mob && !mob.contains(e.target) && ham && !ham.contains(e.target)) {
        mob.classList.remove('open');
      }
    });
  },

  // --- TOAST ---
  toast(msg, type = 'default') {
    let t = document.getElementById('siteToast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'siteToast';
      t.className = 'toast';
      t.innerHTML = '<span id="siteToastMsg"></span>';
      document.body.appendChild(t);
    }
    t.className = 'toast ' + type;
    document.getElementById('siteToastMsg').textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 3200);
  },

  // --- MODAL ---
  openModal(id) { document.getElementById(id)?.classList.add('open'); },
  closeModal(id) { document.getElementById(id)?.classList.remove('open'); },

  // --- JOURNAL ---
  getJournal() {
    try { const r = localStorage.getItem('pc_journal'); if(r) return JSON.parse(r); } catch {}
    return []; // No dummy data — users add their own trades
  },
  saveJournal(entries) { localStorage.setItem('pc_journal', JSON.stringify(entries)); },

  // --- SIGNALS ---
  getSignals() {
    try { const r = localStorage.getItem('pc_signals'); if(r) return JSON.parse(r); } catch {}
    return []; // No dummy data — admin adds real signals
  },
  saveSignals(s) { localStorage.setItem('pc_signals', JSON.stringify(s)); },
};
