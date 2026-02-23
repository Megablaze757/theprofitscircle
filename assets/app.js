// ============================================================
// THE PROFITS CIRCLE — SHARED JS  v5
// Admin-only user creation. Multi-device login via users.json.
// Passwords hashed with SHA-256 (Web Crypto API)
// ============================================================

const PC = {

  // ─── CONFIG ─────────────────────────────────────────────
  USERS_JSON_URL: 'https://raw.githubusercontent.com/theprofitscircle/theprofitscircle.co.uk/main/users.json',

  // ─── HASHING ────────────────────────────────────────────
  async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },

  // ─── SESSION AUTH ───────────────────────────────────────
  getUser() {
    try { return JSON.parse(sessionStorage.getItem('pc_user') || 'null'); } catch { return null; }
  },
  setUser(u) { sessionStorage.setItem('pc_user', JSON.stringify(u)); },
  clearUser() { sessionStorage.removeItem('pc_user'); },
  isLoggedIn() { return !!this.getUser(); },
  isAdmin() { const u = this.getUser(); return u && u.role === 'admin'; },
  isAffiliate() { const u = this.getUser(); return u && (u.affiliate === true || u.role === 'admin'); },

  requireAuth(returnUrl) {
    if (!this.isLoggedIn()) {
      sessionStorage.setItem('pc_redirect', returnUrl || window.location.href);
      window.location.href = '/login';
      return false;
    }
    return true;
  },

  // ─── URL HELPER ─────────────────────────────────────────
  url(page) {
    if (page === 'home' || page === 'index') return '/';
    return '/' + page;
  },

  // ─── REMOTE USER STORE ──────────────────────────────────
  async fetchUsers() {
    try {
      const r = await fetch(this.USERS_JSON_URL + '?cb=' + Date.now(), { cache: 'no-store' });
      if (!r.ok) throw new Error('fetch failed');
      const data = await r.json();
      const users = data.users || [];
      localStorage.setItem('pc_users_cache', JSON.stringify({ users, ts: Date.now() }));
      return users;
    } catch {
      try {
        const cached = localStorage.getItem('pc_users_cache');
        if (cached) return JSON.parse(cached).users || [];
      } catch {}
      return [];
    }
  },

  getUsers() {
    try {
      const cached = localStorage.getItem('pc_users_cache');
      if (cached) return JSON.parse(cached).users || [];
    } catch {}
    return [];
  },

  saveUsers(users) {
    localStorage.setItem('pc_users_cache', JSON.stringify({ users, ts: Date.now() }));
    localStorage.setItem('pc_users_pending', JSON.stringify({ users }));
  },

  // Admin downloads updated users.json to commit to GitHub
  downloadUsersJson() {
    const pendingRaw = localStorage.getItem('pc_users_pending') || localStorage.getItem('pc_users_cache');
    if (!pendingRaw) { this.toast('No user data to export', 'error'); return; }
    const data = JSON.parse(pendingRaw);
    const exportData = { users: data.users || [] };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'users.json';
    a.click();
    this.toast('users.json downloaded — commit to GitHub repo to sync all devices', 'success');
  },

  findUser(email) { return this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()); },
  findUserByReferral(code) { return this.getUsers().find(u => u.referralCode && u.referralCode.toUpperCase() === code.toUpperCase()); },

  // ─── LOGIN ───────────────────────────────────────────────
  async login(email, password) {
    await this.fetchUsers();
    const u = this.findUser(email);
    if (!u) return { ok: false, msg: 'No account found with that email.' };
    const hash = await this.hashPassword(password);
    if (u.passwordHash !== hash) return { ok: false, msg: 'Incorrect password.' };
    if (u.status === 'suspended') return { ok: false, msg: 'Your account has been suspended. Contact support.' };
    this.setUser({ id: u.id, name: u.name, email: u.email, role: u.role, plan: u.plan || 'free', vip: u.vip, affiliate: u.affiliate || false, referralCode: u.referralCode || '' });
    return { ok: true };
  },

  logout() { this.clearUser(); window.location.href = '/'; },

  hasPlan(plan) {
    const u = this.getUser();
    if (!u) return false;
    if (u.role === 'admin') return true;
    if (plan === 'free') return true;
    if (plan === 'paid') return u.plan === 'paid' || u.plan === 'vip';
    if (plan === 'vip') return u.plan === 'vip';
    return false;
  },

  // ─── NAV ────────────────────────────────────────────────
  initNav(activePageId) {
    const user = this.getUser();
    const authBtn = document.getElementById('navAuthBtn');
    const authLabel = document.getElementById('navAuthLabel');
    if (authBtn && authLabel) {
      if (user) {
        authLabel.textContent = user.name.split(' ')[0];
        if (user.role === 'admin') {
          authBtn.setAttribute('href', '/admin');
        } else {
          authBtn.setAttribute('href', '#');
          authBtn.onclick = (e) => { e.preventDefault(); PC.logout(); };
        }
      } else {
        authLabel.textContent = 'Log In';
        authBtn.setAttribute('href', '/login');
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
    document.addEventListener('click', (e) => {
      if (mob && !mob.contains(e.target) && ham && !ham.contains(e.target)) mob.classList.remove('open');
    });
  },

  // ─── TOAST ──────────────────────────────────────────────
  toast(msg, type = 'default') {
    let t = document.getElementById('siteToast');
    if (!t) {
      t = document.createElement('div'); t.id = 'siteToast'; t.className = 'toast';
      t.innerHTML = '<span id="siteToastMsg"></span>'; document.body.appendChild(t);
    }
    t.className = 'toast ' + type;
    document.getElementById('siteToastMsg').textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 3200);
  },

  openModal(id) { document.getElementById(id)?.classList.add('open'); },
  closeModal(id) { document.getElementById(id)?.classList.remove('open'); },

  getJournal() {
    try { const r = localStorage.getItem('pc_journal'); if (r) return JSON.parse(r); } catch {}
    return [];
  },
  saveJournal(entries) { localStorage.setItem('pc_journal', JSON.stringify(entries)); },

  getSignals() {
    try { const r = localStorage.getItem('pc_signals'); if (r) return JSON.parse(r); } catch {}
    return [];
  },
  saveSignals(s) { localStorage.setItem('pc_signals', JSON.stringify(s)); },
};
