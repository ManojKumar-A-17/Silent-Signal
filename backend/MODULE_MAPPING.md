# Backend Module → Frontend Mapping
**Project**: SilentSignal  
**Purpose**: Clear alignment between backend modules and existing frontend features  
**Approach**: Build each module independently, fully complete before moving to next

---

## 🎯 MODULE EXECUTION PHILOSOPHY

✅ **One module at a time**  
✅ **Finish completely before moving forward**  
✅ **Test thoroughly at each stage**  
✅ **No shortcuts that break anonymity**  
✅ **Every module must be production-grade**

---

## MODULE 1 — Authentication & Identity Control
**Backend Focus**: User registration, login, JWT tokens, route protection

### Frontend Components Already Built:
- ✅ **Auth.tsx** (`/auth` page)
  - Email/password input forms
  - Google OAuth button (placeholder)
  - Login/Register toggle
  - Form validation ready (Zod)

- ✅ **App.tsx** 
  - Route protection logic (redirects)
  - `isAuthenticated` state management
  - `handleAuth()` and `handleLogout()` functions

- ✅ **Navbar.tsx**
  - Logout button
  - Conditional rendering based on auth state

### What Backend Module 1 Provides:
```
POST /api/auth/register     → Connects to Register form
POST /api/auth/login        → Connects to Login form  
POST /api/auth/logout       → Connects to Logout button
POST /api/auth/refresh      → Frontend can refresh tokens
POST /api/auth/google       → Connects to Google OAuth button (future)
```

### Integration Points:
1. Replace `setIsAuthenticated(true)` with actual API call
2. Store JWT in localStorage or httpOnly cookie
3. Add axios interceptor for Authorization header
4. Handle token expiry and refresh
5. Replace mock `handleAuth()` with real registration/login

### Success Criteria:
- ✅ User registers → Gets JWT token
- ✅ User logs in → Gets JWT token  
- ✅ Protected routes work → Token verified
- ✅ Token expires → Refresh works or redirect to login
- ✅ Logout → Token invalidated

**📌 Proves**: "We know who you are, but no one else does."

---

## MODULE 2 — Signal Core (Create & Publish)
**Backend Focus**: Create stress signals, store AI metadata, publish with consent

### Frontend Components Already Built:
- ✅ **DropSignal.tsx** (`/drop-signal` page)
  - Large textarea for stress expression
  - Character counter
  - "Analyze My Signal" button
  - Signal state management
  - Navigation to analysis page

- ✅ **Analysis.tsx** (`/analysis` page)
  - Displays AI analysis results
  - Stress type display
  - Intensity visualization
  - Confidence score
  - Consent checkboxes (3 checkboxes)
  - "Publish Anonymously" button
  - "Discard Signal" button

### What Backend Module 2 Provides:
```
POST /api/signals/analyze   → Called by "Analyze My Signal" button
POST /api/signals          → Called by "Publish Anonymously" button
DELETE /api/signals/:id    → Delete own signal (future feature)
```

### Integration Points:
1. **DropSignal.tsx**:
   - `handleAnalyze()` calls `POST /api/signals/analyze`
   - Receives: `{ stressType, stressIntensity, confidence, reflection }`
   - Navigate to Analysis page with real data

2. **Analysis.tsx**:
   - `handlePublish()` calls `POST /api/signals`
   - Sends: `{ content, stressType, stressIntensity, aiConfidence, aiReflection, consents }`
   - Receives: `{ signalId, publishedAt }`
   - Navigate to Feed page

3. **Analysis.tsx**:
   - `handleDiscard()` just navigates away (no API call needed)

### Success Criteria:
- ✅ User types stress → AI analyzes → Results display
- ✅ User gives consent → Signal publishes
- ✅ Signal appears in feed anonymously
- ✅ Owner identity never visible publicly

**📌 Proves**: "Stress can be shared safely."

---

## MODULE 3 — Anonymous Feed & Retrieval
**Backend Focus**: List signals with pagination, filters, anonymity guaranteed

### Frontend Components Already Built:
- ✅ **Home.tsx** (`/` page)
  - Sample signal feed (3 cards)
  - "Explore Signals" button → navigates to Feed

- ✅ **Feed.tsx** (`/feed` page)
  - Filter tabs: All, Academic, Career, Personal
  - Sort dropdown: Recent, Most Supported
  - Signal cards grid
  - Pagination placeholder
  - State management for filters/sorting

- ✅ **SignalCard.tsx** (component)
  - Anonymous header with user icon
  - Signal content display
  - Stress type badge
  - Intensity bar (color-coded)
  - Interaction buttons (like, comment, reshare, bookmark, flag)
  - Timestamp display
  - Counts (likes, comments, reshares)

### What Backend Module 3 Provides:
```
GET /api/signals            → Feed with pagination, filters, sorting
GET /api/signals/:id        → Single signal details
GET /api/signals/my         → User's own signals (private visibility)
```

### Integration Points:
1. **Feed.tsx**:
   - Replace `sampleSignals` with API call to `GET /api/signals`
   - Add query params: `?stressType=Academic&sortBy=recent&cursor=uuid&limit=20`
   - Implement infinite scroll or "Load More" button
   - Handle loading states and errors

2. **SignalCard.tsx**:
   - Receives real signal data from API
   - `isLiked`, `isBookmarked`, `isReshared` flags from backend

3. **Home.tsx**:
   - Replace sample signals with real API call (latest 3 signals)

### Success Criteria:
- ✅ Feed loads with real signals
- ✅ Pagination works smoothly
- ✅ Filters work (Academic, Career, Personal)
- ✅ Sorting works (Recent, Most Supported)
- ✅ No emails, user IDs, or identifiable data visible
- ✅ Every signal shows "Anonymous"

**📌 Proves**: "Anonymity holds at scale."

---

## MODULE 4 — Likes (Silent Support)
**Backend Focus**: Like/unlike signals, count aggregation, private visibility for owners

### Frontend Components Already Built:
- ✅ **SignalCard.tsx**
  - Heart icon button (like)
  - Like count display
  - `handleLike()` function with state toggle
  - `liked` state (red heart when liked)
  - `likes` count state

### What Backend Module 4 Provides:
```
POST /api/signals/:id/like     → Like a signal
DELETE /api/signals/:id/like   → Unlike a signal
GET /api/signals/:id           → Includes isLiked flag + likeCount
GET /api/signals/my            → Private: shows who liked (owner only)
```

### Integration Points:
1. **SignalCard.tsx**:
   - `handleLike()` calls `POST /api/signals/:id/like` if not liked
   - Calls `DELETE /api/signals/:id/like` if already liked
   - Updates local state optimistically
   - Backend returns updated `likeCount`

2. **Feed response includes**:
   - `isLiked: boolean` (for current user)
   - `likeCount: number` (public count)

3. **Private visibility** (future feature):
   - Owner can see list of user IDs who liked (no names/emails)

### Success Criteria:
- ✅ Like toggles correctly
- ✅ Count updates immediately
- ✅ No duplicate likes in database
- ✅ Liker identity never public
- ✅ Owner can privately see who liked (internal IDs only)

**📌 Proves**: "Support without pressure."

---

## MODULE 5 — Comments (Anonymous & Flat)
**Backend Focus**: Flat comment structure, edit window, anonymous display

### Frontend Components Already Built:
- ✅ **SignalCard.tsx**
  - Comment icon button
  - Comment count display
  - `onComment()` handler (placeholder)

- ✅ **Feed.tsx** (can be expanded)
  - Comment input field (to be added)
  - Comment list display (to be added)

### What Backend Module 5 Provides:
```
POST /api/signals/:id/comments    → Add comment
GET /api/signals/:id/comments     → List comments (paginated)
PUT /api/comments/:id             → Edit comment (≤5 min only)
DELETE /api/comments/:id          → Delete own comment
```

### Integration Points:
1. **Add to Feed.tsx or Signal Detail Modal**:
   - Comment input field
   - Comment list with anonymous display
   - Edit button (only for own comments, within 5 min)
   - Delete button (only for own comments)

2. **SignalCard.tsx**:
   - Click comment button → Opens comment section or modal
   - Shows comment count from backend

3. **Comment Display**:
   - Always shows "Anonymous"
   - Timestamp
   - Edit indicator if edited

### Success Criteria:
- ✅ Comments post successfully
- ✅ Comments appear anonymously
- ✅ Edit works within 5 minutes only
- ✅ Delete works for own comments
- ✅ No nested replies
- ✅ No mentions or tags

**📌 Proves**: "Expression without chaos."

---

## MODULE 6 — Reshares (Empathy Amplification)
**Backend Focus**: One reshare per user, context text required, identity hidden

### Frontend Components Already Built:
- ✅ **SignalCard.tsx**
  - Reshare icon button (Share2)
  - Reshare count display
  - `onReshare()` handler (placeholder)

### What Backend Module 6 Provides:
```
POST /api/signals/:id/reshare     → Reshare with context text
DELETE /api/signals/:id/reshare   → Remove reshare
GET /api/signals                  → Includes isReshared flag + reshareCount
```

### Integration Points:
1. **Add Reshare Modal**:
   - Opens when user clicks reshare button
   - Text input for context (min 10 chars, max 500)
   - "Reshare Anonymously" button
   - Cancel button

2. **SignalCard.tsx**:
   - `handleReshare()` calls `POST /api/signals/:id/reshare`
   - Sends: `{ text: "context text" }`
   - Updates local state
   - Show indicator if already reshared

3. **Feed Display**:
   - Reshared signals show original + user's context text
   - Both show as "Anonymous"

### Success Criteria:
- ✅ Reshare works with context text
- ✅ One reshare per user per signal enforced
- ✅ Resharer identity hidden from everyone
- ✅ Count updates correctly
- ✅ No reshare chains

**📌 Proves**: "Shared experience, not virality."

---

## MODULE 7 — Bookmarks (Private Reflection)
**Backend Focus**: Private bookmarks, no public visibility

### Frontend Components Already Built:
- ✅ **SignalCard.tsx**
  - Bookmark icon button
  - `bookmarked` state (filled when bookmarked)
  - `handleBookmark()` function

### What Backend Module 7 Provides:
```
POST /api/signals/:id/bookmark    → Bookmark signal
DELETE /api/signals/:id/bookmark  → Remove bookmark
GET /api/bookmarks                → User's bookmarked signals
GET /api/signals/:id              → Includes isBookmarked flag
```

### Integration Points:
1. **SignalCard.tsx**:
   - `handleBookmark()` calls `POST /api/signals/:id/bookmark`
   - Toggle calls `DELETE` if already bookmarked
   - Updates local state

2. **Add Bookmarks Page** (future):
   - New route: `/bookmarks`
   - Lists user's saved signals
   - Same SignalCard component

3. **Privacy**:
   - No bookmark count shown publicly
   - Only user can see their bookmarks

### Success Criteria:
- ✅ Bookmark toggles correctly
- ✅ User can view bookmarked signals
- ✅ No one else can see bookmarks
- ✅ No public count

**📌 Proves**: "Private reflection space."

---

## MODULE 8 — Flags & Moderation
**Backend Focus**: Report content, auto-hide threshold, preserve anonymity

### Frontend Components Already Built:
- ✅ **SignalCard.tsx**
  - Flag icon button (flag)
  - `onFlag()` handler (placeholder)

### What Backend Module 8 Provides:
```
POST /api/signals/:id/flag        → Flag signal
POST /api/comments/:id/flag       → Flag comment
Admin endpoints (future)          → Review flagged content
```

### Integration Points:
1. **Add Flag Modal**:
   - Opens when user clicks flag button
   - Reason selection: Spam, Abusive, Self-harm
   - Optional description text
   - Submit button

2. **SignalCard.tsx**:
   - `handleFlag()` calls `POST /api/signals/:id/flag`
   - Shows confirmation toast
   - Disables flag button after flagging

3. **Auto-Hide**:
   - Backend hides content after 5 flags
   - Frontend shows "Content hidden" message

### Success Criteria:
- ✅ Flagging works
- ✅ Reporter identity hidden
- ✅ Content auto-hides after threshold
- ✅ Flagged content not shown in feed
- ✅ Admin can review (out of scope for MVP)

**📌 Proves**: "Safety without exposure."

---

## MODULE 9 — AI Stress Analysis
**Backend Focus**: OpenAI integration, prompt engineering, ethical boundaries

### Frontend Components Already Built:
- ✅ **DropSignal.tsx**
  - "Analyze My Signal" button
  - Calls analysis (currently mock)

- ✅ **Analysis.tsx**
  - Displays AI results:
    - Stress type (Academic/Career/Personal)
    - Intensity (0-100 with color bar)
    - Confidence (0-100)
    - Reflection (empathetic sentence)

### What Backend Module 9 Provides:
```
POST /api/signals/analyze    → AI analysis
Input: { content: "stress text" }
Output: { 
  stressType: "Academic",
  stressIntensity: 72,
  confidence: 85,
  reflection: "It sounds like you're carrying a heavy weight..."
}
```

### Integration Points:
1. **DropSignal.tsx**:
   - Replace mock `getReflection()` with API call
   - Call `POST /api/signals/analyze` with signal content
   - Handle loading state (show spinner)
   - Navigate to Analysis page with real results

2. **Backend Implementation**:
   - OpenAI GPT-4 API call
   - System prompt for stress analysis
   - Response parsing (JSON)
   - Caching (identical inputs)
   - Rate limiting (5 per hour per user)

### Success Criteria:
- ✅ AI returns structured JSON
- ✅ Stress type accurate
- ✅ Intensity reasonable (0-100)
- ✅ Reflection empathetic, not advisory
- ✅ No diagnosis or advice
- ✅ Rate limits enforced
- ✅ Caching works for identical inputs

**📌 Proves**: "AI used ethically."

---

## MODULE 10 — Analytics
**Backend Focus**: Aggregate data, trends, privacy-preserving

### Frontend Components Ready:
- ⏳ **Dashboard Page** (not yet built, but designed in spec)
  - Stress type distribution chart
  - Intensity breakdown
  - Day-wise trends graph
  - Top keywords word cloud
  - Stress density metric

### What Backend Module 10 Provides:
```
GET /api/analytics/overview     → Platform-wide analytics
GET /api/analytics/personal     → User's own analytics
```

### Integration Points:
1. **Create Dashboard.tsx** (future):
   - Route: `/dashboard` or `/analytics`
   - Charts using recharts (already installed)
   - Fetch data from API
   - Display aggregated insights

2. **Data Returned**:
   - Stress type distribution (%)
   - Intensity breakdown (Low/Moderate/High %)
   - Day-wise signal counts
   - Avg intensity over time
   - Top keywords with counts

### Success Criteria:
- ✅ Analytics load correctly
- ✅ No raw message content exposed
- ✅ No user-level tracking visible
- ✅ Aggregated data only
- ✅ Charts render properly

**📌 Proves**: "Awareness, not surveillance."

---

## MODULE 11 — Email & Recovery
**Backend Focus**: Email verification, password reset, secure tokens

### Frontend Components Ready:
- ⏳ **Email Verification** (to be added to Auth.tsx)
- ⏳ **Forgot Password** (to be added to Auth.tsx)
- ⏳ **Reset Password Page** (new page needed)

### What Backend Module 11 Provides:
```
POST /api/auth/verify-email      → Verify email with token
POST /api/auth/forgot-password   → Send reset email
POST /api/auth/reset-password    → Reset password with token
```

### Integration Points:
1. **Auth.tsx**:
   - Add "Forgot Password?" link
   - Opens modal or navigates to forgot password page
   - Email input + submit button

2. **Email Verification**:
   - Show message after registration
   - User clicks link in email → navigates to `/verify?token=xxx`
   - Auto-verify and redirect to login

3. **Password Reset**:
   - User enters email → receives reset link
   - Clicks link → navigates to `/reset-password?token=xxx`
   - New password form → submit → redirect to login

### Success Criteria:
- ✅ Email verification works
- ✅ Password reset flow complete
- ✅ Tokens expire properly
- ✅ Secure token generation
- ✅ No information leakage

**📌 Proves**: "Account security and recovery."

---

## MODULE 12 — Production Readiness
**Backend Focus**: Rate limiting, caching, Docker, docs, tests

### What Backend Module 12 Provides:
- Rate limiting middleware (all endpoints)
- Redis caching layer
- Docker Compose setup
- Swagger/OpenAPI docs
- Unit + integration tests (80%+ coverage)
- Security headers (Helmet.js)
- Error logging (Winston/Pino)
- Health check endpoint

### Integration Points:
1. **Frontend**:
   - Handle rate limit errors (429 status)
   - Show user-friendly error messages
   - Retry logic for transient failures

2. **Deployment**:
   - Docker containers for easy deployment
   - Environment variable configuration
   - Production build optimization

3. **Testing**:
   - E2E tests with frontend + backend
   - Load testing for performance
   - Security testing

### Success Criteria:
- ✅ Rate limiting prevents abuse
- ✅ Caching improves performance
- ✅ Docker setup works
- ✅ API docs complete
- ✅ Tests pass with 80%+ coverage
- ✅ Security headers configured
- ✅ Logging captures errors

**📌 Proves**: "Ready for real users."

---

## 🎯 IMPLEMENTATION ORDER

### Phase 1: Foundation (Weeks 1-2)
1. **MODULE 1** → Authentication & Identity Control
2. **MODULE 2** → Signal Core (Create & Publish)
3. **MODULE 3** → Anonymous Feed & Retrieval

**Milestone**: Users can register, create signals, view feed anonymously

---

### Phase 2: Interactions (Weeks 3-4)
4. **MODULE 4** → Likes (Silent Support)
5. **MODULE 5** → Comments (Anonymous & Flat)
6. **MODULE 6** → Reshares (Empathy Amplification)
7. **MODULE 7** → Bookmarks (Private Reflection)

**Milestone**: Full interaction suite working

---

### Phase 3: Intelligence & Safety (Weeks 5-6)
8. **MODULE 9** → AI Stress Analysis (move up priority)
9. **MODULE 8** → Flags & Moderation
10. **MODULE 10** → Analytics

**Milestone**: AI working, platform safe, insights available

---

### Phase 4: Polish & Deploy (Weeks 7-8)
11. **MODULE 11** → Email & Recovery
12. **MODULE 12** → Production Readiness

**Milestone**: Production-ready, deployed, documented

---

## 🔗 FRONTEND-BACKEND CONNECTION SUMMARY

| Frontend Component | Backend Modules | API Endpoints |
|-------------------|-----------------|---------------|
| Auth.tsx | Module 1 | /auth/register, /auth/login |
| DropSignal.tsx | Module 2, 9 | /signals/analyze |
| Analysis.tsx | Module 2 | /signals (POST) |
| Feed.tsx | Module 3 | /signals (GET) |
| SignalCard.tsx | Module 4, 5, 6, 7, 8 | /like, /comments, /reshare, /bookmark, /flag |
| Home.tsx | Module 3 | /signals (GET, limited) |
| About.tsx | Static | No API needed |
| Dashboard (future) | Module 10 | /analytics/overview, /analytics/personal |

---

## ✅ CRITICAL REMINDERS

### For Every Module:
1. ✅ **Finish completely** before starting next
2. ✅ **Test thoroughly** with Postman/Thunder Client
3. ✅ **Document API** in Swagger as you build
4. ✅ **Write tests** (unit + integration)
5. ✅ **Verify anonymity** at every step

### Never Compromise On:
- 🚫 No usernames in public APIs
- 🚫 No emails in public APIs
- 🚫 No sequential IDs (use UUIDs)
- 🚫 No identity correlation possible
- 🚫 No shortcuts that break privacy

### Always Include:
- ✅ Input validation (every endpoint)
- ✅ Error handling (every function)
- ✅ Rate limiting (abuse prevention)
- ✅ Logging (debugging + monitoring)
- ✅ Comments (code documentation)

---

## 📊 PROGRESS TRACKING

As you complete each module, update this checklist:

- [ ] MODULE 1 — Authentication & Identity Control
- [ ] MODULE 2 — Signal Core (Create & Publish)
- [ ] MODULE 3 — Anonymous Feed & Retrieval
- [ ] MODULE 4 — Likes (Silent Support)
- [ ] MODULE 5 — Comments (Anonymous & Flat)
- [ ] MODULE 6 — Reshares (Empathy Amplification)
- [ ] MODULE 7 — Bookmarks (Private Reflection)
- [ ] MODULE 8 — Flags & Moderation
- [ ] MODULE 9 — AI Stress Analysis
- [ ] MODULE 10 — Analytics
- [ ] MODULE 11 — Email & Recovery
- [ ] MODULE 12 — Production Readiness

---

## 🎓 UNDERSTANDING CONFIRMED

✅ **I understand**: Each module is independent and complete  
✅ **I understand**: Frontend is ready and waiting for APIs  
✅ **I understand**: Anonymity is non-negotiable  
✅ **I understand**: No module is rushed or compromised  
✅ **I understand**: Testing happens at every stage  
✅ **I understand**: Documentation is mandatory  

**This mapping ensures**: Every backend module has a clear purpose, connects to existing frontend features, and maintains the privacy-first architecture.

---

**Ready to build**: Backend has 12 clear modules. Frontend is 100% ready. Let's execute module by module. 🚀
