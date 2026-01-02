# SilentSignal Backend — Module-by-Module Guide

This document explains **how the SilentSignal backend is built, module by module**.  
It is meant to clarify **what each module does, why it exists, and how to work on it**, before writing code.

This is a **process and understanding document**, not an implementation guide.

---

## 🧠 Core Working Principle

> **One module at a time. Fully completed. Then move forward.**

A module is considered **DONE** only when:
- It works end-to-end
- It is secure
- It preserves anonymity
- It is testable
- It can be safely consumed by the frontend

No half-finished modules.

---

## 🔹 MODULE 0 — Backend Foundation

### What this module is
The **skeleton** of the backend.  
No business logic lives here.

### Responsibilities
- Server setup (Express + TypeScript)
- Environment variable handling
- Database connection
- Prisma ORM initialization
- Global error handling
- Logging setup
- Health check endpoint (`/health`)

### Why this module exists
If the foundation is weak:
- Bugs multiply
- Security issues appear
- Debugging becomes painful

### Definition of Done
- Server starts successfully
- PostgreSQL connects
- Prisma migrations run
- `/health` returns a success response

> This module proves: **“The backend is alive.”**

---

## 🔹 MODULE 1 — Authentication & Identity Control

### What this module is
Manages **internal user identity**, without exposing it publicly.

### Responsibilities
- User registration (email + password)
- Password hashing (bcrypt)
- Login
- JWT access tokens (short-lived)
- Refresh tokens (long-lived)
- Logout
- Authentication middleware
- Role handling (user/admin)

### What it must NEVER do
- Never expose email publicly
- Never expose user IDs in public endpoints
- Never create public profiles

### Definition of Done
- User can register
- User can login
- Protected routes require authentication
- Tokens expire and refresh correctly

> This module proves: **“The system knows who you are, but no one else does.”**

---

## 🔹 MODULE 2 — Signal Core (Create & Publish)

### What this module is
The **heart of SilentSignal** — stress expression.

### Responsibilities
- Create stress signals
- Store signal content
- Handle consent before publishing
- Publish signals anonymously
- Allow owner to delete their signal
- Soft deletes only

### Rules Enforced
- Only the owner can delete
- Consent required before publish
- Identity never exposed

### Definition of Done
- User can create a signal
- Signal appears in feed anonymously
- Owner can delete their own signal

> This module proves: **“Stress can be shared safely.”**

---

## 🔹 MODULE 3 — Anonymous Feed & Retrieval

### What this module is
Read-only access to stress signals.

### Responsibilities
- List signals (feed)
- Cursor-based pagination
- Filter by stress type
- Fetch single signal

### What it must guarantee
- No emails
- No user IDs
- No correlation data
- No popularity-based ranking

### Definition of Done
- Feed loads correctly
- Pagination works
- Filters work
- Anonymity is preserved

> This module proves: **“Anonymity holds at scale.”**

---

## 🔹 MODULE 4 — Likes (Silent Support)

### What this module is
Likes represent **silent empathy**, not popularity.

### Responsibilities
- Like a signal
- Unlike a signal
- Maintain like count
- Prevent duplicate likes

### Visibility Rules
- Public: count only
- Signal owner: internal user IDs only
- No one else sees identities

### Definition of Done
- Like/unlike works
- Counts update correctly
- No identity leaks

> This module proves: **“Support without social pressure.”**

---

## 🔹 MODULE 5 — Comments (Anonymous & Flat)

### What this module is
Allows supportive responses without debates.

### Responsibilities
- Add comment
- Edit comment (within 5 minutes)
- Delete comment
- List comments (paginated)

### Rules Enforced
- Flat structure (no replies)
- No mentions or tagging
- Anonymous display only

### Definition of Done
- Comments appear anonymously
- Edit window enforced
- Delete works correctly

> This module proves: **“Expression without chaos.”**

---

## 🔹 MODULE 6 — Reshares (Empathy Amplification)

### What this module is
Resharing means **“this resonates with me”**, not virality.

### Responsibilities
- Reshare a signal with context text
- One reshare per user per signal
- Remove reshare
- Count reshares

### Strict Rules
- No reshare chains
- Resharer identity hidden from everyone

### Definition of Done
- Reshares appear correctly
- Counts update
- Identity remains hidden

> This module proves: **“Shared experience, not reach.”**

---

## 🔹 MODULE 7 — Bookmarks (Private Reflection)

### What this module is
Personal saving for private reflection.

### Responsibilities
- Bookmark a signal
- Remove bookmark
- List bookmarks

### Visibility Rules
- Only the bookmarking user can see them
- No public bookmark counts

### Definition of Done
- User can save signals privately
- No one else can see bookmarks

> This module proves: **“Private reflection space.”**

---

## 🔹 MODULE 8 — Flags & Moderation

### What this module is
Safety system without breaking anonymity.

### Responsibilities
- Flag signals
- Flag comments
- Track flag counts
- Auto-hide content after threshold

### Rules Enforced
- Reporter identity hidden
- Content auto-hidden after 5 flags
- Admin review later

### Definition of Done
- Flagging works
- Auto-hide triggers correctly
- Anonymity preserved

> This module proves: **“Safety without exposure.”**

---

## 🔹 MODULE 9 — AI Stress Analysis

### What this module is
AI used for **understanding**, not advice.

### Responsibilities
- Analyze stress text
- Classify stress type
- Score stress intensity
- Generate empathetic reflection

### Strict Constraints
- No advice
- No diagnosis
- No instructions

### Definition of Done
- AI returns valid structured JSON
- Matches frontend expectations
- Rate limits applied

> This module proves: **“AI used ethically.”**

---

## 🔹 MODULE 10 — Analytics

### What this module is
Shows **patterns**, not individuals.

### Responsibilities
- Stress type distribution
- Stress intensity breakdown
- Day-wise trends
- Keyword themes (aggregated)

### What it must avoid
- Raw messages
- User-level tracking
- Identity correlation

### Definition of Done
- Dashboard data loads
- Privacy preserved

> This module proves: **“Awareness, not surveillance.”**

---

## 🔹 MODULE 11 — Email & Account Recovery

### What this module is
Account trust and recovery.

### Responsibilities
- Email verification
- Forgot password
- Password reset

### Definition of Done
- Secure email flows
- Expiring tokens
- No information leaks

---

## 🔹 MODULE 12 — Production Readiness

### What this module is
Makes the backend **deployable and safe**.

### Responsibilities
- Rate limiting
- Redis caching
- Docker setup
- Swagger/OpenAPI docs
- Automated tests (80%+)
- Security headers

### Definition of Done
- Backend is production-ready
- Secure and documented
- Deployable via Docker

---

## 🧠 Final Reminder

- Each module has **one responsibility**
- Each module must be **fully complete**
- Anonymity is never compromised
- Security is never optional

When all modules are complete, SilentSignal is **ready for real users**.
