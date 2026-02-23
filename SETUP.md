# The Profits Circle — Setup Guide v5

## Admin Login
- **Email:** admin@theprofitscircle.co.uk
- **Password:** TPC@Admin2024

⚠️ Change this immediately after first login via Admin → Users → edit admin account, then download & commit users.json.

---

## User Creation (Admin Only)
Self-signup is disabled. Only the admin can create user accounts.

**To add a user:**
1. Log in as admin → go to `/admin`
2. Click **Users → Add User**
3. Fill in name, email, password, role, plan, and affiliate status
4. Click **Create User**
5. Click **⬇ Download users.json** → commit to GitHub repo

---

## Multi-Device Login (GitHub users.json)

User accounts are stored in `users.json` in this repository. Passwords are hashed with **SHA-256**.

**Step 1 — Update the GitHub raw URL in `assets/app.js` line 12:**
```js
USERS_JSON_URL: 'https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/users.json',
```

**Step 2 — After any user changes:**
Admin → Dashboard → **⬇ Download users.json** → commit the file to GitHub.

Users can then log in from any device within ~30 seconds of the commit.

---

## Affiliate Track Access
The Affiliate Academy (100 lessons) is only visible to users with `affiliate: true` in users.json.
Set this when creating users in the admin panel via the "Make Affiliate?" toggle.

---

## Live Prices
All live prices (XAUUSD, EUR/USD, GBP/USD) use **api.gold-api.com** — free, no API key, CORS enabled.
Refreshed every 30 seconds automatically.

---

## Telegram
All contact links → **https://t.me/tacfxin**

## Domain
**https://theprofitscircle.co.uk** — CNAME file included.
