# The Profits Circle — Setup Guide

## Multi-Device Login System

User accounts are stored in `users.json` in this repository. Passwords are hashed with **SHA-256** using the browser's built-in Web Crypto API — never stored in plain text.

### How it works
1. When a user logs in, the browser fetches `users.json` from GitHub (using the raw file URL)
2. It hashes the entered password with SHA-256 and compares to the stored hash
3. Session is stored in `sessionStorage` (cleared when browser closes)
4. Logins work on **any device** as long as `users.json` is up to date in the repo

### Initial Setup

**Step 1 — Update the GitHub raw URL in `assets/app.js`:**
```js
USERS_JSON_URL: 'https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/users.json',
```
Replace `YOUR_USERNAME` and `YOUR_REPO` with your actual GitHub details.

**Step 2 — Default admin credentials:**
- Email: `admin@theprofitscircle.com`
- Password: `admin123`

Change this immediately after first login — go to Admin and update the users.json.

### Adding/Managing Users

1. Log in as admin → go to `/admin.html`
2. Add or edit users in the **User Management** section
3. Click **⬇ Download users.json** (Dashboard or Users section)
4. Commit the downloaded `users.json` to your GitHub repo
5. All devices now have the updated user list within seconds

### When a New User Signs Up
New signups save locally AND prompt the admin to sync. After a new signup:
1. The user can log in on that device immediately
2. Admin should go to Admin → Download users.json → Commit to GitHub
3. The new user can then log in on any device

### Password Hashing
All passwords use SHA-256. The default admin password hash (`admin123`):
`240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9`

To generate a hash for a manual entry, open browser console and run:
```js
const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('yourpassword'));
console.log(Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join(''));
```

---

## Affiliate Calculator
- Lot size slider now goes from **0.01 to 5.00** (supports micro lots)
- Commission: **$5 per lot** fixed
- No tiers, no minimums, no caps

## Academy
- **100 Trader lessons** (Beginner / Intermediate / Advanced)
- **100 Affiliate lessons** (Foundation / Growth / Scale)
- 200 lessons total

## Telegram
All Telegram links point to: **https://t.me/tacfxin**
