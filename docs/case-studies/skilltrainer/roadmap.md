---
project: SkillTrainer
type: roadmap
---

# SkillTrainer — Roadmap

## Near-Term Product Opportunities

These are the highest-value future improvements, roughly prioritized.

---

### 1. Sessions Hub (High)

The Sessions tab is currently a renamed routines list. It should become a true hub combining:
- Active session resume (banner at top)
- Today's scheduled sessions
- Saved routines
- Recent sessions
- Full session history

The tab answers "How do I train right now?" — the current implementation doesn't fully deliver that.

---

### 2. Smarter Home CTA (High)

The Home smart CTA already has a rule hierarchy, but it could be tighter:

1. Resume active session
2. Today's routine
3. Overdue routine
4. Last-used routine
5. Start any routine

The "last-used routine" fallback reduces the decision cost for returning users who don't use the schedule feature.

---

### 3. Remove Weak Home Metrics (Medium)

"Minutes practiced" should not appear if it shows misleading values like 0m after completed sessions (which can happen when exercises use reps-only tracking with no duration). Either suppress this metric or only show it when the value is meaningful.

---

### 4. Routine Reordering (Medium)

Since routines are fundamentally about order, users need a reliable way to reorder exercises. The ▲/▼ controls exist in Routine Builder but may have edge cases with duplicate order values from creation. This needs to be solid before more users rely on it.

---

### 5. Universal Milestone Replacement (Medium)

"100 Reps" excludes duration-only users who never track reps. Replace with something domain-agnostic like "100 Exercises Completed" (100 SessionEntries with `status === 'complete'`). This is consistent with the universal design constraint.

---

### 6. Subject-Level History (Medium)

Subject Detail shows the last 8 sessions inline with a "See All" link to full history. A proper filtered history view per subject would let users track their practice arc for a single skill domain without scrolling through unrelated sessions.

---

### 7. Progress Notification Badge (Low)

A subtle badge on the Progress tab when new milestones or rank changes have occurred since the user last visited. Currently the badge triggers on unseen milestones. Could extend to rank progression.

---

### 8. Active Session Warning (Low)

Warn users before leaving an active session. Currently implemented as a confirm dialog, but the warning should also prevent losing unsaved current-entry progress (metrics entered but not yet submitted via "Next").

---

## Larger Future Opportunities

Intentionally deferred until the core behavior model is validated.

---

### Community Starter Packs / Templates

Users could publish and install Subject / Skill / Exercise / Routine templates. High leverage for cold-start: new users get structured content instantly without building from scratch.

Prerequisite: stable data model, basic user accounts.

---

### Accountability Partners

Users could share progress with another user for motivation. Compatible with the existing streak and rank data.

Prerequisite: accounts, some sharing infrastructure.

---

### Student / Instructor Mode

Instructors could assign routines and approve progression. Distinct use case from self-directed learners. Natural expansion into music instruction, athletic coaching, language tutoring.

Prerequisite: accounts, role model, assignment tracking.

---

### Cloud Sync / Accounts

Useful once users have enough data investment to need cross-device persistence. Currently deferred because localStorage eliminates all friction at the start. The moment a user has weeks of history, the pain of losing data on device switch becomes real.

---

### Advanced Analytics

Trends, weak areas, rescheduled exercises, consistency patterns, progress velocity. Build the visible history first, then surface patterns from it. Not meaningful until users have 4+ weeks of data.

---

### Settings / Preferences

Reset data, manage preferences, view app version, clear milestones. Low priority but eventually needed for any user who wants to start over.

---

## Implementation Rules (from FUNCTIONALITY.md)

- Preserve Subject → Skill → Exercise → Routine → Session model
- Universal metrics only; no domain-specific fields
- No backend/auth until cloud sync is scoped
- localStorage for all new data
- Build in small stages; update FUNCTIONALITY.md after each
