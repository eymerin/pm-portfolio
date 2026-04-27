---
project: SkillTrainer
type: case-study-narrative
---

# SkillTrainer — Case Study Narrative

## The Story

The strongest case study story is not "I built a practice tracker."

It is:

> I identified that self-directed learners often practice without improving because their effort lacks structure. I designed a universal system that separates skill architecture from session execution, then iterated the product model around routines, configurable metrics, onboarding, and mastery-based progress.

The product demonstrates what changed during the build — not just what got shipped.

---

## The Strongest PM Decisions to Highlight

These are the decisions that show product thinking, not just feature delivery:

### 1. Rejecting domain-specific metrics

The constraint is the product. By refusing to add guitar-specific, basketball-specific, or coding-specific fields, the system stays universal. Users bring domain knowledge. The product supplies structure. This is an intentional strategic bet — not a limitation of scope.

### 2. Making Routine the core execution model

Sessions were initially going to auto-generate from per-skill cadence data. Building revealed that this puts the system in charge of a decision users want to own. The pivot to user-defined, reusable routines is what makes the product feel like a practice system rather than a scheduler.

### 3. Metric config on the RoutineEntry, not the Exercise

The same exercise serves different purposes in different routines. Attaching config to the exercise would have made the library rigid and forced duplicates. Moving it to the entry is what makes the exercise library genuinely reusable — a subtle but consequential architectural decision.

### 4. Replacing levels with mastery ranks

XP/levels reward accumulation. Mastery ranks reward structured follow-through. Bronze at 20 completed routines is intentionally high — it should feel earned. This is a product values decision: the system rewards the behavior the product is actually trying to build.

### 5. Separating Home, Skills, Sessions, and Progress

The original tabs organized content. The new tabs organize user intent. "What should I do today?" is a different question than "What am I developing?" or "How am I improving?" The IA change made the progression of a user's day legible in the app structure.

### 6. Deferring social, coach, and cloud features

Community packs, accountability partners, instructor mode, and cloud sync are all deferred until the core behavior model is validated. This is the right sequence: prove that the solo self-directed user can get value first, then add social and institutional layers on top of a validated core.

---

## Sections on the Current Case Study Page

For reference, the current live case study at `/projects/skilltrainer` covers:

| Section | ID | What it covers |
|---|---|---|
| Hero | — | Tagline, 4 stat boxes, jump-to-demos link |
| Problem | `#problem` | 4 failure modes + existing tools gap table |
| Market | `#market` | 3 market gaps + target user profile + why users return |
| Insight | `#insight` | Core thesis + 3 strategic implications |
| Demos | `#demos` | 4 interactive demos with problem/decision framing |
| Decisions | `#decisions` | 7 key product decisions with tradeoffs |
| Scope | `#scope` | Shipped features, cut features, 3 changes during build |
| Metrics | `#metrics` | 4 metric categories + monetization paths |
| What's Next | `#next` | 3 V2 priorities + 3 lessons learned |
| Demonstrates | — | 12 PM competency tags |
| CTA | — | Email contact |

---

## Gaps Between Case Study Page and Current Product State

The case study page was written before several major features shipped. These sections are out of date or incomplete:

**Scope section:** "What changed during build" lists only 3 items, but 6 major iterations occurred. Iterations 4–6 (practice-friendly controls, mastery ranks replacing XP, IA renaming) are not represented.

**What's Next section:** The three V2 priorities listed (session history, scheduling intelligence, analytics) are partially implemented or superseded. The current actual roadmap is documented in `roadmap.md`.

**Decisions section:** The 7 decisions listed don't include the mastery rank system (one of the strongest PM decisions in the project) or the IA renaming decision.

**Stats in hero:** "4 Metric types" is accurate. "3 Model pivots" understates — there were 6 iterations. This could be updated.

---

## Demo Components in the Portfolio

Located in `components/demos/`:

| Component | What it demonstrates |
|---|---|
| `SkillRoutineDemo.tsx` | Building a routine — metric config on entry, not exercise |
| `SkillDashboardDemo.tsx` | Routine-driven session start, week strip |
| `SkillSessionDemo.tsx` | Counter-based exercise tracking |
| `SkillProgressDemo.tsx` | Session complete summary, per-exercise status |

A fifth demo showing mastery ranks or the Home hero card's rule-based states would strengthen the case study.
