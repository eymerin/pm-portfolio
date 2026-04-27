---
project: SkillTrainer
type: data-model
---

# SkillTrainer — Data Model

Full hierarchy: **Subject → Skill → Exercise → Routine → Session**

---

## Entities

### Subject
Broad area of skill development (e.g., "Guitar", "Basketball").
```
{ id, name, description }
```

### Skill
Specific competency within a Subject (e.g., "Fingerpicking" under "Guitar").
```
{ id, subjectId, name, description }
```

### Exercise
Concrete practice activity under a Skill (e.g., "Travis Picking Pattern").
```
{ id, skillId, name, description }
```
Exercises do not own their metrics. Metrics are configured per routine entry.

### Routine
Set of exercises grouped for a practice session. Can be scheduled to specific days.
```
{ id, name, description, scheduledDays: number[] }
```
`scheduledDays`: 0=Sun, 1=Mon, ..., 6=Sat

### RoutineEntry
Links an Exercise to a Routine with its tracking configuration.
```
{
  id, routineId, exerciseId, order,
  metrics: {
    duration?:  { targetSeconds, mode: 'countdown' | 'countup' },
    reps?:      { targetReps },
    sets?:      { targetSets },
    success?:   { mode: 'fixedAttempts' | 'fixedSuccesses', target }
  },
  allowedStatuses: ['complete', 'partial'?, 'rescheduled'?]
}
```

**Key design decision:** Metrics live here, not on Exercise. The same exercise can be configured differently in different routines. This is what makes the exercise library reusable across contexts.

### Session
A practice session instance for a Routine.
```
{ id, routineId, startedAt: timestamp, completedAt: timestamp | null }
```

### SessionEntry
Records actual execution of a RoutineEntry within a Session.
```
{
  id, sessionId, routineEntryId, exerciseId, order, status,
  actual: { durationSeconds?, reps?, sets?, successfulAttempts?, totalAttempts? },
  notes?
}
```

---

## localStorage Keys

| Key | Contents |
|---|---|
| `skilltrainer_data` | All app data |
| `skilltrainer_milestones` | `{ unlocked: string[], seen: string[] }` |
| `skilltrainer_onboarding_done` | Onboarding completion flag |

---

## Mastery Rank System

Progress is per Subject, based on completed sessions that include that subject's exercises.

| Rank | Icon | Color | Threshold |
|---|---|---|---|
| Unranked | ○ | `#888` | 0–19 routines |
| Bronze | ✪ | `#cd7f32` | 20 |
| Silver | ✪ | `#a8a9ad` | 50 |
| Gold | ✪ | `#ffd700` | 100 |
| Platinum | ✪ | `#a8edff` | 250 |
| Diamond | ✦ | `#ffffff` | 500 |

Functions: `getSubjectRoutineCount(subjectId)`, `getSubjectRankProgress(subjectId)` → `{ count, rank, next, nextThreshold, progressPct }`

---

## Milestone System

| ID | Label | Condition |
|---|---|---|
| `first_session` | First Session | 1 completed session |
| `sessions_5` | 5 Sessions | 5 completed sessions |
| `sessions_10` | 10 Sessions | 10 completed sessions |
| `exercises_100` | 100 Exercises | 100 session entries with `status === 'complete'` |
| `routine_5x` | Routine ×5 | Any routine completed ≥5 times |

Shown on Session Complete (unseen only, marked seen after display) and Progress screen (all).

---

## Session Mechanics

### Timer
- **Countdown:** Starts at `targetSeconds`, counts down. At 0: auto-pauses. If sets configured: auto-increments sets, resets timer.
- **Countup:** Starts at 0, counts up past target (accent color when over). User controls stop.

### Counter
- **Reps alone:** Increment/decrement, highlights at target.
- **Sets alone:** Increment/decrement.
- **Reps + Sets:** Completing reps auto-increments sets, resets reps.
- **Duration + Sets:** Timer completion auto-increments sets, resets timer.

### Success Tracking
- **Fixed Attempts:** X attempts, track successes. "Successful" increments both; "Missed" increments total only.
- **Fixed Successes:** Need X successes. Same buttons, different display emphasis.

### Status
Required before advancing. No default. Options: Complete / Partial / Rescheduled. Allowed statuses configured per RoutineEntry.

---

## Streak & Weekly Summary

**Streak:** Consecutive days (completedAt timestamps) ending today or yesterday.

**Weekly summary:** `getWeeklySummary()` → `{ sessionsCount, totalReps, totalDurSec, topSubject }`

Used by Home hero chip row (rank proximity, avg session time).
