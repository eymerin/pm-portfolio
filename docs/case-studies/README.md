---
type: index
---

# Case Study Documentation

Detailed product data for each case study. These files are the source of truth for implementing and updating the portfolio case study pages.

## Structure

Each case study has its own folder with these files:

| File | Contents |
|---|---|
| `overview.md` | Product thesis, origin, strategic constraints, current state |
| `iterations.md` | Major product pivots during build — what changed and why |
| `data-model.md` | Full data model, persistence, system mechanics |
| `screens-and-flows.md` | Navigation IA, every screen, key user flows |
| `roadmap.md` | Near-term and larger future opportunities |
| `case-study-narrative.md` | Case study angle, strongest PM decisions, gaps vs. live page |

## Case Studies

### SkillTrainer (`skilltrainer/`)
Universal structured practice system. Mobile-first web app using localStorage.
Live page: `/projects/skilltrainer`

### FreshPrep (`freshprep/`)
Meal prep execution system. Shipped as an Android app.
Live page: `/projects/freshprep`
Documentation: placeholder, to be filled.

## Usage

When updating a case study page, read the relevant markdown files first. The `case-study-narrative.md` file for each project specifically tracks gaps between the current live page and the actual product state.
