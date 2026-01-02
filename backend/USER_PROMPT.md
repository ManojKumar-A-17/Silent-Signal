# SILENTSIGNAL BACKEND - COMPREHENSIVE REQUIREMENTS

## PROJECT OVERVIEW

Build a production-ready REST API backend for **SilentSignal**, an anonymous stress awareness platform for male students. The system allows users to:
1. Share stress signals anonymously
2. Get AI-powered stress analysis (type, intensity, reflection)
3. Interact with signals (like, comment, reshare, bookmark)
4. View analytics dashboards
5. Maintain complete public anonymity while supporting private visibility for post owners

## CORE PHILOSOPHY

### Privacy Architecture (CRITICAL)
- **Public Anonymity**: All posts, comments, and reshares appear as "Anonymous" to everyone
- **Private Visibility**: Post owners can privately see who liked/commented (internal user IDs only, no profiles)
- **Controlled Identity**: Authentication is used ONLY for ownership, moderation, and private visibility
- **No Social Network Features**: No profiles, no follower counts, no leaderboards, no public user pages
- **Data Minimization**: Collect only what's necessary for system operation

### Security Requirements
- All passwords hashed with bcrypt (cost 12+)
- JWT access tokens (15min) + refresh tokens (7 days)
- Rate limiting on all endpoints
- Input validation and sanitization
- CORS with frontend whitelist
- SQL injection prevention (parameterized queries)
- XSS protection
- CSRF tokens for state-changing operations

## TECHNOLOGY STACK

**Recommended**: Choose one based on preference
- **Option A**: Node.js + Express + TypeScript + PostgreSQL + Prisma ORM
- **Option B**: Python + FastAPI + PostgreSQL + SQLAlchemy + Alembic

**Required Services**:
- PostgreSQL 15+ (primary database)
- Redis 7+ (caching, sessions, rate limiting)
- OpenAI API (stress analysis) OR local LLM (Ollama)
- Google OAuth 2.0 (authentication)

**Additional Tools**:
- Winston/Pino (logging)
- Jest/Pytest (testing)
- Docker + Docker Compose (containerization)
- Swagger/OpenAPI (API documentation)

## DATABASE SCHEMA

### Tables Required

#### 1. users
```sql
id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
email VARCHAR(255) UNIQUE NOT NULL
password_hash VARCHAR(255) NOT NULL -- bcrypt hashed
google_id VARCHAR(255) UNIQUE -- for OAuth
is_email_verified BOOLEAN DEFAULT FALSE
email_verification_token VARCHAR(255)
password_reset_token VARCHAR(255)
password_reset_expires TIMESTAMP
last_login TIMESTAMP
is_active BOOLEAN DEFAULT TRUE
role VARCHAR(50) DEFAULT 'user' -- user, moderator, admin
created_at TIMESTAMP DEFAULT NOW()
updated_at TIMESTAMP DEFAULT NOW()
deleted_at TIMESTAMP -- soft delete

INDEXES:
- email (unique)
- google_id (unique, partial where not null)
- is_active
```

#### 2. signals (stress posts)
```sql
id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
content TEXT NOT NULL -- the stress signal text
stress_type VARCHAR(50) NOT NULL -- Academic, Career, Personal
stress_intensity INTEGER NOT NULL CHECK (stress_intensity BETWEEN 0 AND 100)
ai_confidence INTEGER -- 0-100, AI confidence score
ai_reflection TEXT -- AI-generated reflection sentence
is_published BOOLEAN DEFAULT FALSE -- consent given to publish
is_flagged BOOLEAN DEFAULT FALSE
flag_count INTEGER DEFAULT 0
view_count INTEGER DEFAULT 0
created_at TIMESTAMP DEFAULT NOW()
updated_at TIMESTAMP DEFAULT NOW()
deleted_at TIMESTAMP -- soft delete

INDEXES:
- user_id
- stress_type
- created_at (DESC)
- is_published, is_flagged
- stress_intensity
```

#### 3. likes
```sql
id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
signal_id UUID NOT NULL REFERENCES signals(id) ON DELETE CASCADE
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
created_at TIMESTAMP DEFAULT NOW()

UNIQUE CONSTRAINT (signal_id, user_id) -- prevent duplicate likes
INDEXES:
- signal_id
- user_id
- created_at
```

#### 4. comments
```sql
id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
signal_id UUID NOT NULL REFERENCES signals(id) ON DELETE CASCADE
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
content TEXT NOT NULL
is_edited BOOLEAN DEFAULT FALSE
edited_at TIMESTAMP
is_flagged BOOLEAN DEFAULT FALSE
created_at TIMESTAMP DEFAULT NOW()
deleted_at TIMESTAMP -- soft delete

INDEXES:
- signal_id, created_at
- user_id
```

#### 5. reshares
```sql
id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
original_signal_id UUID NOT NULL REFERENCES signals(id) ON DELETE CASCADE
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
reshare_text TEXT -- user's contextual addition
created_at TIMESTAMP DEFAULT NOW()

UNIQUE CONSTRAINT (original_signal_id, user_id) -- one reshare per user per signal
INDEXES:
- original_signal_id
- user_id
- created_at (DESC)
```

#### 6. bookmarks
```sql
id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
signal_id UUID NOT NULL REFERENCES signals(id) ON DELETE CASCADE
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
created_at TIMESTAMP DEFAULT NOW()

UNIQUE CONSTRAINT (signal_id, user_id)
INDEXES:
- user_id, created_at (DESC)
- signal_id
```

#### 7. flags (reports)
```sql
id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
signal_id UUID REFERENCES signals(id) ON DELETE CASCADE
comment_id UUID REFERENCES comments(id) ON DELETE CASCADE
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE -- reporter
flag_type VARCHAR(50) NOT NULL -- spam, abusive, self_harm
description TEXT
status VARCHAR(50) DEFAULT 'pending' -- pending, reviewed, resolved, dismissed
reviewed_by UUID REFERENCES users(id)
reviewed_at TIMESTAMP
created_at TIMESTAMP DEFAULT NOW()

CHECK (signal_id IS NOT NULL OR comment_id IS NOT NULL)
INDEXES:
- status, created_at
- signal_id
- comment_id
- user_id
```

#### 8. refresh_tokens
```sql
id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
token_hash VARCHAR(255) NOT NULL -- bcrypt hashed refresh token
expires_at TIMESTAMP NOT NULL
is_revoked BOOLEAN DEFAULT FALSE
created_at TIMESTAMP DEFAULT NOW()

INDEXES:
- user_id
- token_hash
- expires_at
```

## API ENDPOINTS

### Authentication (`/api/auth`)

#### POST /api/auth/register
Register with email and password
```json
Request:
{
  "email": "user@example.com",
  "password": "SecurePass123!" // min 8 chars, 1 upper, 1 lower, 1 number
}

Response (201):
{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "data": {
    "userId": "uuid",
    "email": "user@example.com"
  }
}
```

#### POST /api/auth/verify-email
```json
Request:
{
  "token": "verification_token_from_email"
}

Response (200):
{
  "success": true,
  "message": "Email verified successfully"
}
```

#### POST /api/auth/login
```json
Request:
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response (200):
{
  "success": true,
  "data": {
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "isVerified": true
    }
  }
}
```

#### POST /api/auth/google
Google OAuth callback
```json
Request:
{
  "googleToken": "google_oauth_token"
}

Response (200): Same as /login
```

#### POST /api/auth/refresh
```json
Request:
{
  "refreshToken": "refresh_token"
}

Response (200):
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_token"
  }
}
```

#### POST /api/auth/logout
Requires: Bearer token
```json
Response (200):
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### POST /api/auth/forgot-password
```json
Request:
{
  "email": "user@example.com"
}

Response (200):
{
  "success": true,
  "message": "Password reset email sent"
}
```

#### POST /api/auth/reset-password
```json
Request:
{
  "token": "reset_token_from_email",
  "newPassword": "NewSecurePass123!"
}

Response (200):
{
  "success": true,
  "message": "Password reset successful"
}
```

### Signals (`/api/signals`)

#### POST /api/signals/analyze
Analyze stress text with AI (before publishing)
Requires: Bearer token
```json
Request:
{
  "content": "I'm overwhelmed with assignments and finals are next week..."
}

Response (200):
{
  "success": true,
  "data": {
    "stressType": "Academic", // Academic | Career | Personal
    "stressIntensity": 72, // 0-100
    "confidence": 85, // 0-100
    "reflection": "It sounds like you're carrying a heavy weight right now..."
  }
}
```

#### POST /api/signals
Create and publish signal
Requires: Bearer token
```json
Request:
{
  "content": "I'm overwhelmed with assignments...",
  "stressType": "Academic",
  "stressIntensity": 72,
  "aiConfidence": 85,
  "aiReflection": "It sounds like...",
  "consents": {
    "anonymous": true,
    "aggregate": true,
    "understand": true
  }
}

Response (201):
{
  "success": true,
  "message": "Signal published anonymously",
  "data": {
    "signalId": "uuid",
    "publishedAt": "2026-01-02T00:00:00Z"
  }
}
```

#### GET /api/signals
Get anonymous feed (paginated)
Requires: Bearer token
```json
Query Params:
?cursor=uuid&limit=20&stressType=Academic&sortBy=recent

Response (200):
{
  "success": true,
  "data": {
    "signals": [
      {
        "id": "uuid",
        "content": "Signal content...",
        "stressType": "Academic",
        "stressIntensity": 72,
        "timestamp": "2 hours ago",
        "likeCount": 24,
        "commentCount": 5,
        "reshareCount": 3,
        "isLiked": false, // for current user
        "isBookmarked": false,
        "isReshared": false
      }
    ],
    "nextCursor": "uuid",
    "hasMore": true
  }
}
```

#### GET /api/signals/:id
Get single signal with details
Requires: Bearer token
```json
Response (200):
{
  "success": true,
  "data": {
    "id": "uuid",
    "content": "Signal content...",
    "stressType": "Academic",
    "stressIntensity": 72,
    "aiReflection": "It sounds like...",
    "timestamp": "2 hours ago",
    "likeCount": 24,
    "commentCount": 5,
    "reshareCount": 3,
    "isLiked": false,
    "isBookmarked": false,
    "isReshared": false,
    "comments": [
      {
        "id": "uuid",
        "content": "I feel the same way...",
        "timestamp": "1 hour ago"
      }
    ]
  }
}
```

#### GET /api/signals/my
Get user's own signals (with private visibility)
Requires: Bearer token
```json
Response (200):
{
  "success": true,
  "data": {
    "signals": [
      {
        "id": "uuid",
        "content": "My signal...",
        "stressType": "Academic",
        "stressIntensity": 72,
        "likeCount": 24,
        "commentCount": 5,
        "timestamp": "2024-01-02T00:00:00Z",
        "likers": [ // PRIVATE: only visible to signal owner
          {"userId": "uuid", "likedAt": "2024-01-02T01:00:00Z"}
        ],
        "commenters": [ // PRIVATE: only visible to signal owner
          {"userId": "uuid", "content": "...", "commentedAt": "..."}
        ]
      }
    ]
  }
}
```

#### DELETE /api/signals/:id
Delete own signal
Requires: Bearer token
```json
Response (200):
{
  "success": true,
  "message": "Signal deleted successfully"
}
```

### Interactions

#### POST /api/signals/:id/like
Like a signal
Requires: Bearer token
```json
Response (200):
{
  "success": true,
  "data": {
    "isLiked": true,
    "likeCount": 25
  }
}
```

#### DELETE /api/signals/:id/like
Unlike a signal
Requires: Bearer token
```json
Response (200):
{
  "success": true,
  "data": {
    "isLiked": false,
    "likeCount": 24
  }
}
```

#### POST /api/signals/:id/comments
Add comment to signal
Requires: Bearer token
```json
Request:
{
  "content": "I feel the same way..."
}

Response (201):
{
  "success": true,
  "data": {
    "commentId": "uuid",
    "content": "I feel the same way...",
    "timestamp": "2026-01-02T00:00:00Z"
  }
}
```

#### GET /api/signals/:id/comments
Get comments for a signal (paginated)
Requires: Bearer token
```json
Query Params: ?cursor=uuid&limit=20

Response (200):
{
  "success": true,
  "data": {
    "comments": [
      {
        "id": "uuid",
        "content": "I feel the same...",
        "timestamp": "1 hour ago",
        "isEdited": false
      }
    ],
    "nextCursor": "uuid",
    "hasMore": false
  }
}
```

#### PUT /api/comments/:id
Edit own comment (within 5 minutes)
Requires: Bearer token
```json
Request:
{
  "content": "Updated comment..."
}

Response (200):
{
  "success": true,
  "data": {
    "commentId": "uuid",
    "content": "Updated comment...",
    "isEdited": true
  }
}
```

#### DELETE /api/comments/:id
Delete own comment
Requires: Bearer token

#### POST /api/signals/:id/reshare
Reshare a signal with context
Requires: Bearer token
```json
Request:
{
  "text": "Same situation for me during my finals week"
}

Response (201):
{
  "success": true,
  "data": {
    "reshareId": "uuid",
    "originalSignalId": "uuid"
  }
}
```

#### DELETE /api/signals/:id/reshare
Remove reshare
Requires: Bearer token

#### POST /api/signals/:id/bookmark
Bookmark a signal (private)
Requires: Bearer token
```json
Response (200):
{
  "success": true,
  "data": {
    "isBookmarked": true
  }
}
```

#### DELETE /api/signals/:id/bookmark
Remove bookmark
Requires: Bearer token

#### GET /api/bookmarks
Get user's bookmarked signals
Requires: Bearer token
```json
Query Params: ?cursor=uuid&limit=20

Response (200):
{
  "success": true,
  "data": {
    "bookmarks": [
      {
        "signal": { /* signal object */ },
        "bookmarkedAt": "2026-01-02T00:00:00Z"
      }
    ],
    "nextCursor": "uuid",
    "hasMore": true
  }
}
```

#### POST /api/signals/:id/flag
Flag/report a signal
Requires: Bearer token
```json
Request:
{
  "type": "spam", // spam | abusive | self_harm
  "description": "Optional additional context"
}

Response (200):
{
  "success": true,
  "message": "Report submitted. Thank you for helping keep the community safe."
}
```

#### POST /api/comments/:id/flag
Flag/report a comment
Requires: Bearer token

### Analytics (`/api/analytics`)

#### GET /api/analytics/overview
Get dashboard analytics
Requires: Bearer token
```json
Response (200):
{
  "success": true,
  "data": {
    "stressTypeDistribution": {
      "Academic": 45,
      "Career": 30,
      "Personal": 25
    },
    "stressIntensityBreakdown": {
      "Low": 20,
      "Moderate": 50,
      "High": 30
    },
    "dayWiseTrends": [
      {
        "date": "2026-01-01",
        "signalCount": 156,
        "avgIntensity": 62
      }
    ],
    "stressDensityMetric": 68, // 0-100 scale
    "topKeywords": [
      {"keyword": "exam", "count": 89},
      {"keyword": "deadline", "count": 67}
    ],
    "totalSignals": 1234,
    "activeUsers": 567
  }
}
```

#### GET /api/analytics/personal
Get user's personal analytics
Requires: Bearer token
```json
Response (200):
{
  "success": true,
  "data": {
    "mySignalsCount": 12,
    "myStressTypeDistribution": {
      "Academic": 60,
      "Career": 20,
      "Personal": 20
    },
    "avgStressIntensity": 65,
    "mostCommonStressType": "Academic",
    "stressOverTime": [
      {
        "date": "2026-01-01",
        "intensity": 72
      }
    ]
  }
}
```

## AI INTEGRATION

### Stress Analysis Service

Implement a service that:
1. Takes stress text as input
2. Calls OpenAI API or local LLM (Ollama with Llama 3)
3. Returns structured analysis

**Prompt Template**:
```
You are a stress analysis system for an anonymous student support platform. Analyze the following text and provide:

1. Stress Type: Classify as "Academic", "Career", or "Personal"
   - Academic: Studies, exams, assignments, grades, academic pressure
   - Career: Job search, internships, career decisions, work-related stress
   - Personal: Relationships, family, health, identity, social issues

2. Stress Intensity: Rate from 0-100
   - 0-33: Low intensity (mild concern, manageable)
   - 34-66: Moderate intensity (significant stress, affecting daily life)
   - 67-100: High intensity (severe stress, overwhelming)

3. Confidence: Your confidence in this analysis (0-100)

4. Reflection: A single empathetic, validating sentence (max 150 characters)
   - Do NOT give advice, solutions, or diagnoses
   - Do NOT minimize or dismiss the stress
   - Do be empathetic, validating, and supportive
   - Acknowledge the difficulty and validate feelings

Text to analyze:
"""
{user_input}
"""

Respond ONLY with JSON:
{
  "stressType": "Academic|Career|Personal",
  "stressIntensity": 0-100,
  "confidence": 0-100,
  "reflection": "empathetic sentence"
}
```

**Implementation**:
```typescript
// Example with OpenAI
async function analyzeStress(content: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: STRESS_ANALYSIS_SYSTEM_PROMPT },
      { role: "user", content: content }
    ],
    temperature: 0.3,
    response_format: { type: "json_object" }
  });
  
  return JSON.parse(response.choices[0].message.content);
}
```

**Rate Limiting**: Max 5 analyses per user per hour

**Caching**: Cache identical inputs (hash content → cache result for 24h)

## MIDDLEWARE REQUIREMENTS

### 1. Authentication Middleware
- Verify JWT token from Authorization header
- Attach user to request object
- Handle expired tokens gracefully

### 2. Rate Limiting
```typescript
const rateLimits = {
  '/api/auth/login': '5 requests per 15 minutes',
  '/api/auth/register': '3 requests per hour',
  '/api/signals/analyze': '5 requests per hour per user',
  '/api/signals': '20 requests per hour per user (POST)',
  '/api/comments': '50 requests per hour per user (POST)',
  'global': '100 requests per 15 minutes per IP'
};
```

### 3. Input Validation
- Use Zod (TypeScript) or Pydantic (Python) for schema validation
- Validate all request bodies, params, and query strings
- Sanitize HTML/script tags from text content
- Limit text lengths (content: 5000 chars, comments: 1000 chars)

### 4. Error Handling
- Catch all errors with global error handler
- Log errors with correlation IDs
- Never expose stack traces in production
- Return consistent error format

### 5. CORS
- Whitelist frontend URL(s)
- Allow credentials (cookies)
- Restrict methods to necessary ones

### 6. Security Headers (Helmet.js)
- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security

## BUSINESS LOGIC RULES

### Anonymity Rules
1. Never return usernames or emails in public endpoints
2. User IDs in private visibility must NOT be linkable to profiles
3. All public-facing data shows "Anonymous"
4. Post owners can see WHO interacted (user IDs) but not user profiles

### Interaction Rules
1. **Likes**: Users can like/unlike. No double likes.
2. **Comments**: Flat structure (no nested replies). Edit within 5 minutes only.
3. **Reshares**: One reshare per user per signal. Must include contextual text (min 10 chars).
4. **Bookmarks**: Private only. No visibility to anyone else.
5. **Flags**: Auto-hide content after 5 flags pending review.

### Content Moderation
1. Auto-flag content with self-harm keywords → immediate admin notification
2. Flag threshold: 5 flags = auto-hide + manual review
3. Flagged content visible only to poster and admins
4. Admin dashboard for flag review (out of scope for MVP, but design for it)

### Data Retention
1. Soft delete for all user deletions (keep data 30 days)
2. Hard delete after 30 days
3. Allow users to delete their own signals and comments
4. Retain analytics in aggregated form (no individual data)

## TESTING REQUIREMENTS

### Unit Tests
- All service functions
- Authentication logic
- AI analysis parsing
- Rate limiting logic
- Input validation schemas

### Integration Tests
- All API endpoints
- Authentication flow (register → verify → login)
- Signal creation flow (analyze → consent → publish)
- Interaction flows (like → unlike, comment → edit → delete)

### Test Coverage
- Minimum 80% code coverage
- Test error cases and edge cases
- Test rate limiting
- Test authentication/authorization

### Test Data
- Use factories (faker.js or Faker Python)
- Seed test database with realistic data
- Test with different user roles

## DEPLOYMENT

### Docker Setup
Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: silentsignal
      POSTGRES_USER: dbuser
      POSTGRES_PASSWORD: dbpass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  backend:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://dbuser:dbpass@postgres:5432/silentsignal
      REDIS_URL: redis://redis:6379
      JWT_SECRET: ${JWT_SECRET}
      OPENAI_API_KEY: ${OPENAI_API_KEY}
    depends_on:
      - postgres
      - redis

volumes:
  postgres_data:
```

### Environment Variables
```env
# Server
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:8080

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/silentsignal

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# OpenAI
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4-turbo-preview

# Email (for verification/password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
EMAIL_FROM=noreply@silentsignal.app

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
BCRYPT_ROUNDS=12
COOKIE_SECRET=your-cookie-secret-change-this
```

## PROJECT STRUCTURE

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   └── env.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── rateLimiter.ts
│   │   ├── validator.ts
│   │   └── errorHandler.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── signals.routes.ts
│   │   ├── analytics.routes.ts
│   │   └── index.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── signals.controller.ts
│   │   └── analytics.controller.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── signals.service.ts
│   │   ├── ai.service.ts
│   │   ├── email.service.ts
│   │   └── analytics.service.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Signal.ts
│   │   ├── Like.ts
│   │   ├── Comment.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── password.ts
│   │   ├── logger.ts
│   │   └── errors.ts
│   ├── types/
│   │   └── index.ts
│   └── app.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env.example
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```

## IMPLEMENTATION PRIORITIES

### Phase 1: Foundation (MVP)
1. Database setup + migrations
2. User authentication (email + password)
3. JWT + refresh tokens
4. Basic signal creation (without AI)
5. Feed endpoint (list signals)
6. Like/unlike functionality

### Phase 2: Core Features
7. AI stress analysis integration
8. Comment functionality
9. Reshare functionality
10. Bookmark functionality
11. Flag/report system
12. Google OAuth

### Phase 3: Analytics & Polish
13. Analytics dashboard endpoints
14. Personal analytics
15. Email verification
16. Password reset
17. Rate limiting refinement
18. Performance optimization (caching)

### Phase 4: Production Readiness
19. Comprehensive testing (80%+ coverage)
20. API documentation (Swagger)
21. Docker containerization
22. Logging & monitoring
23. Security audit
24. Load testing

## SUCCESS CRITERIA

- ✅ All API endpoints functional and documented
- ✅ Authentication secure with JWT + refresh tokens
- ✅ Complete anonymity maintained in public endpoints
- ✅ AI analysis accurate and empathetic
- ✅ Database optimized with proper indexes
- ✅ Rate limiting prevents abuse
- ✅ 80%+ test coverage
- ✅ Docker setup for easy deployment
- ✅ All sensitive data encrypted/hashed
- ✅ CORS + security headers configured
- ✅ Error handling comprehensive
- ✅ Pagination working on all list endpoints

## ADDITIONAL NOTES

1. **Email Service**: Implement email verification and password reset emails with attractive HTML templates
2. **Logging**: Use structured logging with correlation IDs for request tracing
3. **Monitoring**: Consider Sentry for error tracking (future)
4. **Analytics**: Design analytics to be privacy-preserving (no individual tracking beyond what's necessary)
5. **Scalability**: Design for horizontal scaling (stateless API, Redis for sessions)
6. **Documentation**: Maintain comprehensive API docs with Swagger/OpenAPI

## QUESTIONS TO CLARIFY BEFORE STARTING

1. Preferred tech stack: Node.js/Express or Python/FastAPI?
2. OpenAI API available or should use local LLM (Ollama)?
3. Email service preference: SendGrid, AWS SES, or SMTP?
4. Hosting target: AWS, DigitalOcean, Railway, Render?
5. Budget constraints for AI API calls?
6. Expected user scale for initial launch?

---

**Ready to build? Start with Phase 1 and work systematically through each feature. Prioritize security, privacy, and testing at every step.**
