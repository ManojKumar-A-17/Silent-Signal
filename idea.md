# MASTER FRONTEND PROMPT – SilentSignal

## Project Identity

Website Name: **SilentSignal** Logo should be adaptive and context-aware for this project.

 Theme: **Premium, rich, and visually attractive UI**. Target Users: Male students (no identity shown anywhere).

SilentSignal is **NOT a social media platform**. It is a **stress signal and awareness system** built around anonymity, reflection, AI analysis, and analytics.

---

## CORE PHILOSOPHY (VERY IMPORTANT)

* SilentSignal supports **controlled anonymity**: users may log in internally, but **no identity is ever revealed publicly**.
* Posting members are anonymous to everyone.
* Interaction features (likes, comments, reshares, bookmarks) exist, but **identity visibility is strictly role-based**.
* Login/signup is used **only for system logic, ownership, and private visibility**, never for public identity.
* Premium, rich, and visually attractive user experience across the entire application

The UI must feel:

* **Premium and rich**
* Visually attractive
* Trustworthy
* Serious
* Ethical
* Non-social-media-like

---

## Global UI Instructions

* The entire application must use a **premium, rich, and visually attractive UI**
* Layout, animations, colors, and visual components should reflect a high-quality, production-grade product
* All posts must appear as **Anonymous** publicly
* Never show usernames, profile pictures, or profile pages

---

## Page-by-Page UI Generation Instructions

### 1. Home Page (Post-Login: Explanation + Anonymous Feed)

**Access Rule:** The Home page is accessible only **after Login / Signup**.

The Home page has two sections:

**A. Project Explanation (Top Section)**

A long, content-heavy explanation describing:

* The problem of silent academic and personal stress among male students
* Why anonymity is critical for honest expression
* Why SilentSignal is not a typical social media platform
* How AI is used for reflection and understanding, not advice or diagnosis
* How anonymity, consent, and ethics are preserved throughout the system

**B. Anonymous Signal Feed (Below Explanation)**

* Display stress signals posted by users
* All posts appear as **Anonymous**
* Support interactions enabled:

  * Like
  * Comment
  * Reshare with text
  * Bookmark

Interaction rules remain unchanged:

* Public never sees identities
* Post owner privately sees who liked and commented
* Resharer identity hidden from everyone

---

### 0. AUTHENTICATION PAGE

### Authentication Methods

* Email-based Login / Signup
* **Continue with Google** option

### Purpose

* Authentication is **mandatory** before accessing any part of the application
* Login / Signup happens **before** Home, Feed, or any other page
* Login is used only for internal ownership, moderation, and private visibility
* Public anonymity is always preserved

Include clear text:
"Authentication is used only for system logic. All stress sharing remains anonymous."

---

### 3. Drop Signal Page

* Centered card layout
* Large, distraction-free text area
* Prompt: "What’s weighing on you right now?"
* No character limit
* Button: **Analyze My Signal**

---

### 4. AI Analysis & Reflection Page

Display AI results clearly:

* Stress type (Academic / Career / Personal)
* Stress intensity (AI-derived, color-coded bar)
* Confidence indicator
* One-line reflection sentence

Tone must be calm and validating.

---

### 5. Consent & Acknowledgement Page

* Checkbox-based consent
* Clear explanations of anonymity and usage
* Buttons:

  * Publish Anonymously
  * Discard Signal

Publishing must be immediate after consent.

---

### 6. Signal Feed Page (Anonymous)

* List of stress signals shown as Anonymous
* Support interactions:

  * Like
  * Comment
  * Reshare with text
  * Bookmark

Rules:

* Public never sees identities
* Post owner privately sees who liked and commented
* Resharer identity hidden from everyone

---

### 7. Dashboard Page (Analytics)

Design a clean analytics dashboard showing:

* Stress type distribution
* Day-wise trends
* Stress intensity breakdown
* Stress density metric
* Keyword-based themes

No raw messages displayed.

---

### 8. About / Ethics Page

Explain:

* Privacy-first design
* Data lifecycle
* Ethical AI boundaries

---

## Interaction Logic Deep Dive (Likes, Comments, Reshares, Flags)

This section defines **exact interaction workflows** so the system feels complete, meaningful, and production‑ready, while preserving anonymity.

---

### Like Flow (Anonymous Signal of Support)

Purpose:

* Likes act as **silent support signals**, not popularity metrics
* They communicate presence and empathy without conversation

Workflow:

1. Any logged‑in user can like an anonymous post
2. Like is recorded internally with:

   * Post ID
   * Liker User ID (private)
   * Timestamp
3. Public View:

   * Shows only the total like count
   * Never shows who liked
4. Post Owner View (Private):

   * Can see a private list of users who liked
   * No profile links, only internal identifiers

Behavior Rules:

* A user can like/unlike a post
* Likes do NOT affect ranking or ordering
* Likes are never highlighted as "most liked"

---

### Comment Flow (Anonymous Expression with Private Visibility)

Purpose:

* Allow supportive or relatable responses
* Avoid discussion threads or debates

Workflow:

1. User submits a comment on an anonymous post
2. Comment is stored with:

   * Post ID
   * Comment text
   * Commenter User ID (private)
   * Timestamp
3. Public View:

   * Comment text only
   * No usernames or identifiers
4. Post Owner View (Private):

   * Can see which internal users commented
   * Comment tone summary may be shown (optional AI)

Behavior Rules:

* Comments are flat (no nested replies)
* No tagging, mentioning, or quoting users
* Comment editing allowed only for a short time window

---

### Reshare Flow (Empathy‑Driven Amplification)

Purpose:

* Allow users to express shared experience
* Convert individual stress into collective awareness

Workflow:

1. User clicks Reshare
2. User adds short contextual text (e.g., "Same situation for me")
3. Reshare is stored with:

   * Original Post ID
   * Reshare text
   * Resharer User ID (private)
   * Timestamp
4. Visibility:

   * Public sees reshared content + text
   * Original post owner does NOT see resharer identity
   * Other users do NOT see resharer identity

Behavior Rules:

* Reshare count is visible
* No reshare chains (single‑level only)
* Reshares contribute to analytics, not feed dominance

---

### Bookmark Flow (Private Reflection Tool)

Purpose:

* Allow users to save posts they relate to
* Support personal reflection, not engagement

Workflow:

1. User bookmarks a post
2. Bookmark is stored privately under user account
3. Visibility:

   * Only the bookmarking user can see it

Behavior Rules:

* Bookmarks are never public
* Bookmark count is not displayed

---

### Flag / Report Flow (Safety & Integrity)

Purpose:

* Prevent misuse while maintaining anonymity

Flag Reasons:

* Spam or irrelevant content
* Harmful or abusive language
* Self‑harm or crisis indicators

Workflow:

1. User flags a post or comment
2. Flag is recorded with:

   * Content ID
   * Flag type
   * Reporting User ID (private)
3. Immediate System Actions:

   * Content is temporarily hidden if flag threshold reached
   * AI re‑evaluation triggered
4. Admin / System Review:

   * Identity of reporter is never shown
   * Identity of content owner remains hidden publicly

---

### Interaction Analytics Contribution

All interactions contribute to analytics:

* Like velocity over time
* Comment frequency
* Reshare context clustering

These metrics feed only into the **Dashboard**, never into public ranking.

---

### Why This Interaction Model Works

* Preserves anonymity fully
* Feels familiar to users
* Avoids social pressure
* Encourages empathy, not performance
* Suitable for real‑world deployment

---

## Final Instruction

SilentSignal is a **system for understanding stress**, not a social network.

Every UI and interaction choice must reinforce:

* Trust
* Reflection
* Anonymity
* Awareness

Do not introduce any feature that contradicts the specification above.
