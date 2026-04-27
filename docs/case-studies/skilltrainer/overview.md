---
project: SkillTrainer
type: overview
---

# SkillTrainer — Product Overview

## Origin

SkillTrainer started as a solution to a personal practice problem: knowing what to practice, how long to practice it, how to avoid defaulting to familiar material, and how to make progress visible. The original trigger was guitar practice. The insight was that the same structural failure — unguided effort without a predefined plan — applies across guitar, sports, coding, language learning, fitness, magic, cooking, and other skill domains.

## Core Thesis

**Tracking is not the same as structure.**

The app is not a habit tracker. It helps users define the structure of practice before the session begins, then execute and record what actually happened.

Most tools log what happened after the session. SkillTrainer asks a different question first: what are you supposed to be practicing? That answer must exist before the session starts. That is what a routine is — not a log, but a plan that runs before you sit down.

## Strategic Constraint

The most important early decision was rejecting domain-specific metrics permanently. The app cannot become "a guitar app," "a basketball app," or "a coding app." Its value is that users bring domain knowledge while the product supplies structure, cadence, accountability, and measurable execution.

Universal metric types only:
- Duration
- Reps
- Sets
- Success / total attempts
- Completion status

## Product Model

**Subject → Skill → Exercise → Routine → Session**

A Routine is the unit of practice. It answers:
- What to practice
- In what order
- With what targets
- On what schedule

Metrics live on the **RoutineEntry**, not the Exercise. The same exercise can serve different purposes in different routines (warmup, technique practice, endurance drill, assessment). Keeping config on the entry keeps the exercise library reusable across contexts.

## Current State

Mobile-first web app using localStorage. No backend, no account required. Includes:

- Onboarding with starter packs
- Scheduling (days of week per routine)
- Session execution with counter-based controls
- Configurable metrics per routine entry
- Progress tracking
- Mastery ranks (Unranked → Bronze → Silver → Gold → Platinum → Diamond)
- Milestones (5 achievements)
- Streaks
- Four-tab IA: **Home · Skills · Sessions · Progress**

## What This Project Demonstrates

- Product architecture thinking
- User segmentation
- Onboarding / activation design
- Retention mechanics
- Universal system design
- Configurable data modeling
- Mobile-first UX
- Prioritization and restraint
- Progression psychology

Especially strong as a PM portfolio project because it shows the **evolution of the product model**, not just feature implementation.

## Platform

- Vanilla JavaScript (no frameworks)
- HTML5 + CSS3
- LocalStorage for data persistence
- Mobile-first, max-width 430px
- Hash-based routing
- Dark theme UI (accent blue: `#4f9eff`)
