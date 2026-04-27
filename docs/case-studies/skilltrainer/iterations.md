---
project: SkillTrainer
type: iterations
---

# SkillTrainer — Major Product Iterations

Six significant pivots shaped the current product. Each represents a real design decision made during build, not planned in advance.

---

## 1. From Domain-Specific Training to Universal Structure

**What changed:** Rejected domain-specific metrics permanently.

The risk was building a guitar app, a basketball app, or a coding app. A domain-specific product would have captured users in one discipline but lost the broader value proposition.

The resolution: universal metric types only (duration, reps, sets, success/total, completion). Users bring domain knowledge. The product supplies structure.

This was one of the most important strategic constraints in the project.

---

## 2. From Skill Cadence to Routine-First Model

**What changed:** The Routine became the core unit of practice, replacing cadence-based session generation.

The initial direction had skills and exercises with scheduling cadence — the system would tell users what to practice based on when they last practiced each thing. During build it became clear this put the system in charge of a decision users want to control.

A Routine answers:
- What to practice
- In what order
- With what targets
- On what schedule

Users define the structure once. The product runs it session after session. This shifted the app away from loose exercise tracking toward structured sessions.

**Tradeoff:** Structure vs. flexibility. The forced setup requirement was a known cost.

---

## 3. Metrics Moved from Exercises to Routine Entries

**What changed:** Metric config no longer lives on the Exercise. It lives on the RoutineEntry.

Early design attached duration, reps, and set config to exercises directly. During the Routine Builder build it became obvious this was wrong: the same exercise means different things in different training contexts.

Examples:
- A scale run tracked by reps in technique practice is different from the same scale run tracked by duration in a warmup.
- An exercise used as a warmup gets different targets than the same exercise used as an endurance assessment.

Moving config to the RoutineEntry keeps the exercise library reusable and lets each routine define how the exercise should be performed in that context.

**Tradeoff:** Reusability vs. simplicity.

---

## 4. From Text Input to Practice-Friendly Controls

**What changed:** Replaced text inputs for reps and sets with large counter buttons.

During session design, text inputs were recognized as poor UX for active practice. A user may be holding a guitar, sweating after drills, or moving between exercises. Opening a keyboard mid-exercise is disruptive.

The −/number/+ counter exists entirely because of how the screen is actually used: one hand on an instrument, tapping a target with the other.

Additional session controls designed for this constraint:
- Large counter buttons sized for thumb taps
- Timer controls
- Status pills
- Successful / Missed buttons for success tracking

Number turns accent blue at target. Status is required before advancing — no default.

**Tradeoff:** Speed vs. precision.

---

## 5. From XP Levels to Mastery Ranks

**What changed:** Replaced a numeric XP / level progression system with named mastery ranks.

The XP system felt too generic and game-like. It rewarded accumulated time rather than the behavior the product actually values: structured follow-through.

New system: **Unranked → Bronze → Silver → Gold → Platinum → Diamond**

Progress is based on completed routines per subject, not estimated time or arbitrary XP. Bronze was intentionally set at 20 completed routines so it feels earned. Milestones provide early encouragement before Bronze, while ranks remain meaningful further out.

Thresholds:
| Rank | Threshold |
|---|---|
| Unranked | 0–19 |
| Bronze | 20 |
| Silver | 50 |
| Gold | 100 |
| Platinum | 250 |
| Diamond | 500 |

**Why this is strong PM thinking:** The system now rewards the specific behavior the product values — not just showing up, but completing structured practice sessions repeatedly.

---

## 6. From Dashboard / Library / Routines to Home / Skills / Sessions / Progress

**What changed:** Renamed and reframed the four-tab navigation to match user intent rather than content categories.

The original tabs organized the app around what was in it. The new tabs organize around what the user is trying to do.

| Tab | Question it answers | Owns |
|---|---|---|
| **Home** | What should I do today? | Daily action, schedule, streak, momentum |
| **Skills** | What am I developing? | Subjects, Skills, Exercises |
| **Sessions** | How do I train right now? | Routines, Routine Builder, Session Start/Active/Complete, History |
| **Progress** | How am I improving? | Ranks, Milestones, Streaks, Weekly stats |

This was an important product maturity step. Progress data no longer needed to be forced into the Home screen. The IA now matches the mental model of someone who already uses the product.
