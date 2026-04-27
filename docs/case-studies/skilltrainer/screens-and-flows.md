---
project: SkillTrainer
type: screens-and-flows
---

# SkillTrainer — Screens and User Flows

## Navigation Structure

Four-tab bottom nav on primary screens: **Home · Skills · Sessions · Progress**

Hidden during sessions, history, detail views, and onboarding.

| Tab | Question answered | Owns |
|---|---|---|
| **Home** | What should I do today? | Daily action, schedule, streak, momentum |
| **Skills** | What am I developing? | Subjects, Skills, Exercises — create/edit/detail |
| **Sessions** | How do I train right now? | Routines, Routine Builder, Session Start/Active/Complete, History |
| **Progress** | How am I improving? | Ranks, Milestones, Streaks, Weekly stats |

---

## All Screens

### Home (`#home`)

**1. Hero Momentum Card** — rule-based, evaluated in order:

| Condition | Headline | Style |
|---|---|---|
| Zero sessions ever | Start Training | Neutral surface |
| 1 session this week | Momentum Started | Active glow |
| 2+ sessions, < 75% completion | Building Momentum | Active glow |
| 2+ sessions, ≥ 75% completion | Strong Week | Active glow |
| 3+ sessions, 100% completion | Locked In | Active glow |
| Has history, last session ≤ 2 days ago, nothing this week | Back to It | Neutral surface |
| Has history, last session > 2 days ago | Ready to Restart | Neutral surface |

**2. Chip Row** (max 2, priority-ordered):
1. Rank proximity — ≤15 sessions from next rank ("6 to Bronze in Guitar")
2. Active subjects this week
3. Last session recency
4. Avg session time

**3. Week Day Strip** — Sun–Sat. Today highlighted with accent.

**4. Selected Day's Schedule** — Context-aware buttons:
- Today: Start / Resume / Completed
- Past day (not completed): Catch Up
- Future day: Display only

**5. Smart CTA** (first match wins):
1. Resume in-progress session → "Resume Session · [Name]"
2. Today's scheduled routine (not completed) → "Start Today's Routine · [Name]"
3. Overdue routine (scheduled earlier this week) → "Catch Up · [Name]"
4. Fallback (any routine exists) → "Start a Session"

**6. Setup Checklist** — shown only when app setup is incomplete.

**7. Recent Activity** — last 3 sessions with View All link.

---

### Skills / Library (`#library`)

Segmented control: **Subjects | Skills | Exercises**

- **Subjects:** All subjects with skill count. Tap → Subject Detail. Inline edit, delete (cascades). "+ Get a Starter Pack" at bottom.
- **Skills:** Grouped by subject. Exercise count per skill. Tap → Skill Detail.
- **Exercises:** Grouped by Subject / Skill label. Inline edit, delete.

---

### Subject Detail (`#subject/:id`)

- Subject name with rank badge (icon + label + progress bar + "X / Y to [Next]")
- Description, inline edit
- Skills list
- Practice History: up to 8 sessions, "See All" → `#history`

---

### Skill Detail (`#skill/:id`)

- Skill name, description, subject breadcrumb
- Exercises list

---

### Exercise Detail (`#exercise/:id`)

- Name and description fields, delete toggle
- Metrics are NOT set here — configured per routine entry in Routine Builder

---

### Sessions (`#routines`)

- Active session banner (session within 2 days, no completedAt) — accent border, Resume button
- Today's scheduled sessions with Start / Resume / Done
- "Start a Session" primary button
- Saved Routines section with edit/delete
- Recent Sessions: last 3 with View All History link

---

### Routine Builder (`#routine-builder/:id`)

- Routine info card with Edit button
- Exercise entries: name, skill, metric tags, ▲/▼ reorder, ✎ edit, ✕ remove
- "+ Add Exercise" button
- Edit metrics via bottom sheet: Duration, Reps, Sets, Success tracking, Allowed Statuses

---

### Session Start (`#session-start`)

Today's routines first, then all others. Exercise count and preview per card. Select routine → Begin Session.

---

### Session Active (`#session-active/:sessionId`)

- Per entry: exercise name, skill, description, metric blocks, status pills, optional notes, Next/Finish
- Metric blocks: Duration (timer), Reps (counter), Sets (counter), Reps+Sets (combined), Success tracking
- Navigation away triggers "Leave Session?" warning

---

### Session Complete (`#session-complete/:sessionId`)

- Summary card: routine name, date, exercise count
- Reward strip: rank icon + label + subject name / streak count
- Milestone unlock cards (unseen only, marked seen after display)
- Exercise list: status badges, actual metrics, notes
- "Back to Home" / "View History"

---

### History (`#history`)

All sessions, reverse chronological. Back returns to source (`#home` or `#routines`).

---

### Session Detail (`#session-detail/:sessionId`)

Routine name, date, completion status, full exercise list with status badges, metrics, notes.

---

### Progress (`#progress`)

**State A — Zero completed sessions:**
- "Start Your Progress" CTA
- Mastery Preview — subjects at Unranked, flat bar, "0 / 20 to Bronze"
- Upcoming Milestones — all 5 locked

**State B — Has completed sessions:**
- Snapshot Strip — Total Sessions · Day Streak · This Week
- Mastery Ranks — all subjects, icon + rank label, progress bar
- Milestones — all 5 (unlocked = full opacity gold ◆, locked = dimmed ◇)
- Recent Wins — best rank, last milestone, best streak (≥3 days), best week (≥4 sessions)

---

## Key User Flows

### Onboarding — Starter Pack Path
1. First open → onboarding overlay (Welcome)
2. "Get Started" → Category picker (Guitar / Basketball / Coding / Language / Fitness / Other)
3. Tap category → "Use a Starter Pack" → preview → Install
4. Success → "Set Practice Schedule" or "Skip to Home"
5. Schedule → set days → Set / Set & Start / Skip to Home

### Onboarding — Build from Scratch
1. Welcome → Category picker → "Start from Scratch"
2. Name Subject → Name Skill → Name Exercise + duration → Name Routine
3. Success → Set schedule or Skip to Home

### Run a Session
1. Home smart CTA or Sessions → "Start a Session" → Session Start
2. Select routine → "Begin Session"
3. Session Active: metrics → status (required) → notes → "Next"
4. "Finish" → Session Complete → reward strip + milestone unlocks

### Resume an In-Progress Session
1. Home smart CTA shows "Resume Session" — or Sessions hub shows active banner
2. Tap → Session Active at next unrecorded entry

### Build a Routine
1. Sessions → "+ New" → name, description, days → Save → Routine Builder
2. "+ Add Exercise" → picker → metric config → "Add to Routine"
3. Reorder with ▲/▼

### Delete Anything
Navigate to item → pencil → Delete → confirm. Subject cascades to skills + exercises. Skill cascades to exercises. Routine removes entries.

---

## Onboarding Screens

| Screen ID | Title | Purpose |
|---|---|---|
| ob-s1 | Welcome | Get Started or I already have data |
| ob-s2 | Category Picker | 2×3 tile grid |
| ob-s3 | Setup Path | Starter Pack vs. Start from Scratch |
| ob-s4a | Pack Preview | Subject, skills, exercises, routines preview |
| ob-s4a-success | Pack Installed | Installed routine names, schedule or skip |
| ob-s4b | Name Subject | Custom subject name input |
| ob-c1 | Add First Skill | Input + suggestion chips per category |
| ob-c2 | Create First Exercise | Input + duration target (3m / 5m / 10m / 15m / None) |
| ob-c3 | Create First Routine | Pre-filled input, exercise preview |
| ob-c4 | Custom Success | Schedule or "Skip to Home" |
| ob-s5 | Schedule | Preset chips + manual day toggles |

---

## Starter Packs

### Guitar
Skills: Fingerpicking, Scales, Chord Transitions, Timing
Exercises (8): Travis Picking Pattern (7m), Alternating Bass Line (5m), C Major Scale (5m), Pentatonic Scale (5m), G to C (5m), Am to F (5m), Metronome Drill (7m), Tap to Beat (5m)
Routines: Morning Warm-Up, Technique Builder

### Basketball
Skills: Shooting, Ball Handling, Conditioning
Exercises (9): Free Throws (7m), Mid-Range Pull-Up (5m), Three Pointers (7m), Stationary Dribble (5m), Figure 8 (5m), Speed Dribble (7m), Defensive Slides (5m), Suicide Sprints (7m), Jump Rope (5m)
Routines: Shooting Clinic, Ball Handling Drill

### Coding
Skills: Data Structures, Algorithms, Problem Solving
Exercises (9): Array Problems (10m), Linked List Practice (10m), Hash Map Drills (7m), Sorting Review (7m), Binary Search (7m), Recursion Practice (10m), LeetCode Easy (10m), Timed Problem Set (10m), Code Review (7m)
Routines: Daily Practice, Interview Prep

### Language
Skills: Vocabulary, Grammar, Speaking
Exercises (9): Flashcard Review (7m), Word Association (5m), New Words List (5m), Sentence Structure (7m), Tense Practice (5m), Correction Drills (5m), Pronunciation Drill (7m), Shadowing Exercise (7m), Free Conversation (10m)
Routines: Daily Study, Intensive Review

### Fitness
Skills: Strength, Cardio, Flexibility
Exercises (9): Push-Ups (5m), Squats (5m), Plank Hold (5m), Jump Rope (5m), High Knees (5m), Burpees (7m), Hip Flexor Stretch (5m), Hamstring Stretch (5m), Shoulder Mobility (5m)
Routines: Morning Routine, Full Body Workout
