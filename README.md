# Platform Match 🎯

**Platform Match** is a production-quality MVP web application built for digital marketing agencies, growth strategists, and modern brands. It helps businesses discover which social media platforms best fit their unique business model through a 6-question interactive assessment, a deterministic scoring matrix, ranked recommendations, and actionable 30-day tactical roadmaps.

---

## 🌟 Key Features

1. **Interactive 6-Question Quiz (`/quiz`)**:
   - Single question per screen with smooth, reduced-motion-compatible transitions (powered by Framer Motion).
   - Real-time progress bar and step indicators.
   - Backward and forward navigation with full answer persistence using `sessionStorage`.
   - Accessible keyboard selection (Enter/Space) and visible focus rings.
   - Clean reset trigger to retake the quiz anytime.

2. **Deterministic Server-Side Scoring Engine (`/api/score`)**:
   - Compares all 6 major networks: **LinkedIn**, **Instagram**, **YouTube**, **TikTok**, **Facebook**, and **Pinterest**.
   - Strictly weighted multi-dimensional calculation:
     - **Audience Fit**: 30%
     - **Primary Goal Fit**: 25%
     - **Industry Vertical Fit**: 15%
     - **Content Format Strengths**: 15%
     - **Brand Personality**: 10%
     - **Available Weekly Time**: 5%
   - All component compatibility fit scores range strictly from 0 to 100.
   - Deterministic tie-breaking prioritizing Goal Fit, then Audience Fit, and finally a stable predefined order.
   - Complete runtime validation of input payloads using Zod schemas.

3. **Strategic Results & Playbook (`/results`)**:
   - **Personalized Header**: Tailored to the user's specific industry, audience, and commercial objectives.
   - **#1 Highlighted Platform Card**: Large spotlight card featuring match score, detailed rationale quoting user choices, key alignments, realistic trade-offs/limitations, content format playbook, and suggested posting cadence.
   - **Runner-Up Platform Cards**: Dedicated #2 and #3 cards with score bars and platform rationale.
   - **Complete 6-Platform Ranking Table**: Interactive collapsible breakdown showing exact score contributions across all 6 dimensions.
   - **Recommended 30-Day Strategy**:
     - Primary + Secondary synergy pairing.
     - 3 ready-to-execute content concepts customized to the selected industry and voice.
     - Sustainable posting frequency calibrated to their weekly creation budget.
     - 3-phase tactical roadmap (Days 1–7 Foundations, Days 8–18 Batch Production, Days 19–30 Optimization).
   - Clear indicative estimate disclaimer (zero pseudoscience or guaranteed vanity claims).

4. **Ungated Lead Conversion Modal**:
   - Triggered via the *"Build My Social Strategy"* call to action.
   - Collects Name, Work Email, Company Name, and Primary Marketing Bottleneck.
   - Never gates results behind contact info.
   - Fully architected Supabase integration with graceful demo mode fallback when credentials are not configured.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS & Vanilla CSS Design System
- **Animation**: Framer Motion
- **Icons**: Lucide React + Authentic Social Media Brand SVGs
- **Validation**: Zod
- **Testing**: Vitest (Unit and integration test suite)
- **Database (Optional)**: `@supabase/supabase-js`

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run the Test Suite
```bash
npm test
```
Runs 14 automated unit and integration tests covering scoring formulas, clamping, tie-breaking, schema validation, and session lifecycle.

### 4. Run Production Build
```bash
npm run build
npm start
```

---

## 📐 Scoring Formula & Logic

The scoring engine lives in `src/lib/scoring-matrix.ts` and `src/lib/recommendation-engine.ts`.

For each platform $P$, the raw compatibility score $S_P$ is computed as:

$$S_P = 0.30 \times \text{Audience}_P + 0.25 \times \text{Goal}_P + 0.15 \times \text{Industry}_P + 0.15 \times \text{Content}_P + 0.10 \times \text{Personality}_P + 0.05 \times \text{Time}_P$$

- **Clamping**: Every score is clamped to the range $[0, 100]$.
- **Display**: Rounded to the nearest integer.
- **Tie-Breaking Rule**:
  1. Overall weighted raw score (highest first)
  2. If tied ($|\Delta| < 0.0001$): $\text{Goal}_P$ fit score
  3. If tied: $\text{Audience}_P$ fit score
  4. If tied: Predefined stable priority list (`['linkedin', 'instagram', 'youtube', 'tiktok', 'facebook', 'pinterest']`)

---

## 🗄 Optional Supabase Lead Integration

The core application runs **100% locally without any database required**.

To persist lead capture submissions directly to Supabase:

### 1. Create a `.env.local` File
Add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### 2. Create the `leads` Table in Supabase
Run the following SQL in your Supabase SQL Editor:
```sql
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    challenge TEXT NOT NULL,
    primary_platform TEXT,
    quiz_answers JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow insert via service role or anon policy if desired
CREATE POLICY "Allow insertions" ON public.leads
    FOR INSERT WITH CHECK (true);
```

If Supabase is not configured, submissions automatically log to the server console in **Demo Mode**, displaying an informative status message to the user.

---

## 🧪 Automated Test Suite Summary

Tests are located in `src/tests/`:
- `scoring-engine.test.ts`: Verifies dimensional calculations, 0–100 clamping, weight sums, and distinct persona profiles (B2B SaaS vs. Gen Z Fashion).
- `tie-breaking.test.ts`: Tests exact tie-breaker precedence (Goal Fit > Audience Fit > Predefined stable order).
- `validation.test.ts`: Validates Zod schemas against missing fields, malformed emails, and invalid enum values.
- `session-flow.test.ts`: Tests `sessionStorage` serialization, answer restoration, and retake quiz session clearing.

---

## 📱 Responsive & Accessible Design

- Fully responsive mobile-first layouts tested from 375px (iPhone SE) to 1440px desktop screens.
- WCAG AA compliant contrast ratios and keyboard navigation (`Tab`, `Space`, `Enter`).
- Native `prefers-reduced-motion` detection.
- Graceful session recovery and friendly empty states when accessing `/results` without prior answers.
