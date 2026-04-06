# CultureBot Evaluation System

Multi-page web application with Firebase Authentication and Realtime Database. Hosted on GitHub Pages — no server required.

---

## File Structure

```
├── config.js        ← Firebase config (you fill this once)
├── styles.css       ← Shared styles for all pages
├── index.html       ← Sign In / Sign Up (email + Google)
├── role.html        ← Role selection (Creator or Evaluator)
├── creator.html     ← Creator form — creates evaluation sessions
├── evaluator.html   ← Evaluator home — table of available sessions
└── evaluation.html  ← Per-session evaluation form (10 criteria)
```

---

## User Flow

```
index.html  →  role.html  →  creator.html
    (login)   (choose role)  (verified only)

index.html  →  role.html  →  evaluator.html  →  evaluation.html?session=CODE
    (login)   (choose role)   (sessions list)     (evaluation form)
```

---

## Setup

### Step 1 — Create Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project**
2. Disable Google Analytics (optional) → **Create project**

### Step 2 — Enable Authentication

1. **Build → Authentication → Get started**
2. **Sign-in method → Email/Password → Enable → Save**
3. **Sign-in method → Google → Enable → Add support email → Save**

### Step 3 — Create Realtime Database

1. **Build → Realtime Database → Create database**
2. Choose your region → **Start in test mode** → **Enable**

### Step 4 — Set Security Rules

Go to **Realtime Database → Rules** and replace everything with:

```json
{
  "rules": {
    "verified_creators": {
      ".read":  "auth != null",
      ".write": false
    },
    "sessions": {
      ".read": "auth != null",
      "$sessionId": {
        ".write": "auth != null && !data.exists()",
        "evaluations": {
          ".write": "auth != null"
        }
      }
    }
  }
}
```

Click **Publish**.

| Rule | Effect |
|------|--------|
| `verified_creators` readable by authenticated users | App checks if user is a verified creator |
| `verified_creators` not writable by users | Only admin can add/remove creator access (via Firebase Console) |
| Sessions writable only if they don't exist | Prevents overwriting existing sessions |
| Evaluations always writable | Any authenticated user can submit an evaluation |

### Step 5 — Register Web App & get config

1. **⚙ Project Settings → General → Your apps → Add app → Web (`</>`)**
2. Give it a name → **Register app**
3. Copy the `firebaseConfig` object

### Step 6 — Edit `config.js`

Open `config.js` and replace the placeholder values:

```javascript
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSy...",
  authDomain:        "your-project.firebaseapp.com",
  databaseURL:       "https://your-project-default-rtdb.firebaseio.com",
  projectId:         "your-project-id",
  storageBucket:     "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abc123"
};
```

### Step 7 — Deploy to GitHub Pages

1. Create a new GitHub repository (public)
2. Upload all 7 files: `config.js`, `styles.css`, `index.html`, `role.html`, `creator.html`, `evaluator.html`, `evaluation.html`
3. **Settings → Pages → Source → Branch: main → / (root) → Save**
4. Wait ~2 minutes → your app is live at `https://USERNAME.github.io/REPO-NAME`

---

## How to verify a Creator (Admin task)

Users who register cannot access the Creator page until you manually verify them.

**To verify a Creator:**

1. The user registers and tells you their email
2. In Firebase Console → **Authentication → Users** → find the user → copy their **User UID**
3. Go to **Realtime Database** → click the **+** button on the root node
4. Add:
   ```
   verified_creators
     └── [USER_UID]: true
   ```
5. The user can now access the Creator page immediately (no re-login needed)

**To revoke Creator access:**
- Delete the `[USER_UID]` node from `verified_creators`

---

## Evaluation Criteria (10)

| # | Criterion | Options |
|---|-----------|---------|
| 1 | Hallucination Flag | No Hallucination · Minor · Major · Cannot Determine |
| 2 | Query Relevance | Fully · Mostly · Partially · Not Relevant |
| 3 | Justification Quality | Excellent · Good · Fair · Poor |
| 4 | Evidence Grounding | Well · Mostly · Partially · Ungrounded |
| 5 | Clarity | Very Clear · Clear · Somewhat · Unclear |
| 6 | Result Usefulness | Very Useful · Useful · Somewhat · Not Useful |
| 7 | Bias | No · Slight · Moderate · Significant |
| 8 | Diversity | High · Moderate · Low · None |
| 9 | Completeness / Variety / Representative | Excellent · Good · Fair · Poor |
| 10 | Needed Logical Steps | All · Mostly · Partially · Missing |

---

## Firebase Data Structure

```json
{
  "verified_creators": {
    "uid_of_verified_user": true
  },
  "sessions": {
    "AB12CD": {
      "creator":        "Maria Papadopoulou",
      "creatorEmail":   "maria@example.com",
      "creatorUid":     "uid_abc123",
      "personaTitle":   "Customer Support Agent",
      "personaRole":    "You are a helpful assistant...",
      "guidelines":     "Focus on factual answers.",
      "llmTitle":       "GPT-4o",
      "llmDescription": "OpenAI GPT-4o, May 2024 version...",
      "query":          "What is the refund policy?",
      "createdAt":      "06/04/2026, 14:30",
      "evaluations": {
        "-NxAbc123": {
          "evaluator":      "Nikos Georgiou",
          "evaluatorEmail": "nikos@example.com",
          "evaluatorUid":   "uid_xyz789",
          "timestamp":      "06/04/2026, 15:10",
          "ratings": {
            "1": "No Hallucination",
            "2": "Fully Relevant"
          },
          "comments": {
            "1": "",
            "2": "The answer was directly on point."
          }
        }
      }
    }
  }
}
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5 · CSS3 · Vanilla JavaScript |
| Authentication | Firebase Authentication (Email + Google) |
| Database | Firebase Realtime Database |
| Hosting | GitHub Pages |

---

## License

MIT
