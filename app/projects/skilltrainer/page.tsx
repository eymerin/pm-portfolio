import type { Metadata } from "next";
import Link from "next/link";
import SkillRoutineDemo from "@/components/demos/SkillRoutineDemo";
import SkillDashboardDemo from "@/components/demos/SkillDashboardDemo";
import SkillOnboardingDemo from "@/components/demos/SkillOnboardingDemo";
import SkillProgressDemo from "@/components/demos/SkillProgressDemo";

export const metadata: Metadata = {
  title: "MakePerfect Case Study | Garrett Young",
  description: "A PM case study: MakePerfect, a universal structured practice system for self-directed learners.",
};

/* ── Primitives ─────────────────────────────────────────────── */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-skill-brand font-semibold uppercase tracking-widest mb-2">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold text-skill-text mb-5 leading-snug">{children}</h2>;
}

function Divider() {
  return <div className="border-t border-skill-raised/40 my-16" />;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-skill-surface border border-skill-raised/40 rounded-xl p-5 ${className}`}>
      {children}
    </div>
  );
}

function DemoSection({
  subtitle, title, problem, insight, children,
}: {
  subtitle?: string; title: string; problem: string; insight: string; children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="lg:sticky lg:top-24">
        {subtitle && (
          <p className="text-xs text-skill-brand font-semibold uppercase tracking-widest mb-2">{subtitle}</p>
        )}
        <h3 className="text-lg font-bold text-skill-text mb-5">{title}</h3>
        <div className="space-y-4">
          <div className="border-l-2 border-skill-raised/80 pl-4">
            <p className="text-xs text-skill-dim uppercase tracking-wider font-medium mb-1">The problem</p>
            <p className="text-sm text-skill-muted/80 leading-relaxed">{problem}</p>
          </div>
          <div className="border-l-2 border-skill-brand pl-4">
            <p className="text-xs text-skill-dim uppercase tracking-wider font-medium mb-1">The decision</p>
            <p className="text-sm text-skill-muted/80 leading-relaxed">{insight}</p>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

/* ── Nav ────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { href: "#problem",   label: "Problem"    },
  { href: "#market",    label: "Market"     },
  { href: "#insight",   label: "Insight"    },
  { href: "#demos",     label: "Demos"      },
  { href: "#decisions", label: "Decisions"  },
  { href: "#scope",     label: "Scope"      },
  { href: "#metrics",   label: "Metrics"    },
  { href: "#next",      label: "What's Next"},
];

/* ── Page ───────────────────────────────────────────────────── */

export default function SkillTrainerCaseStudy() {
  return (
    <div className="bg-skill-bg min-h-screen">

      {/* Sticky nav */}
      <nav className="sticky top-14 z-40 bg-skill-bg/90 backdrop-blur border-b border-skill-raised/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-skill-muted/50 hover:text-skill-muted whitespace-nowrap px-3 py-1.5 rounded-full hover:bg-skill-surface transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <article className="max-w-5xl mx-auto px-6 py-14">

        {/* ── HERO ── */}
        <div className="mb-16">
          <Link href="/projects" className="text-xs text-skill-muted/40 hover:text-skill-muted/70 transition-colors">
            Back to projects
          </Link>

          <div className="mt-8 mb-10">
            <p className="text-xs text-skill-brand font-semibold uppercase tracking-widest mb-4">PM Case Study</p>

            <div className="flex items-center gap-3 mb-4">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" strokeLinecap="round" className="flex-shrink-0">
                <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="1.5" className="text-skill-brand opacity-40" />
                <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1.5" className="text-skill-brand opacity-70" />
                <circle cx="20" cy="20" r="3" fill="currentColor" className="text-skill-brand" />
              </svg>
              <h1 className="text-5xl font-bold text-skill-text tracking-tight">MakePerfect</h1>
            </div>

            <p className="text-xl text-skill-muted/80 max-w-2xl leading-relaxed mb-3">
              A universal structured practice system for people who already show up — but still aren&apos;t improving.
            </p>
            <p className="text-sm text-skill-muted/40 max-w-xl">
              Built solo. Working browser prototype with Android build available. Designed to work across any skill.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { n: "6",  label: "Major product iterations",      sub: "from original concept to what shipped" },
              { n: "7",  label: "Features cut from scope",       sub: "each with documented rationale"        },
              { n: "0",  label: "Accounts required",             sub: "loads and works immediately"           },
              { n: "4",  label: "Tabs built around user intent", sub: "Home · Skills · Sessions · Progress"   },
            ].map(s => (
              <div key={s.label} className="bg-skill-surface border border-skill-raised/40 rounded-xl p-4">
                <p className="text-3xl font-bold text-skill-text">{s.n}</p>
                <p className="text-xs font-semibold text-skill-muted/80 mt-1">{s.label}</p>
                <p className="text-xs text-skill-muted/35 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>

          <a
            href="#demos"
            className="inline-flex items-center gap-2 text-sm text-skill-brand border border-skill-brand/30 px-4 py-2 rounded-full hover:bg-skill-brand/10 transition-colors font-medium"
          >
            Jump to interactive demos
          </a>
        </div>

        <Divider />

        {/* ── PROBLEM ── */}
        <section id="problem" className="mb-16">
          <Label>The Problem</Label>
          <SectionHeading>Practice happens. Improvement often doesn&apos;t.</SectionHeading>

          <p className="text-skill-muted/60 leading-relaxed mb-2 max-w-2xl">
            The failure mode isn&apos;t missing sessions. It&apos;s what happens inside them. No plan means decisions get made under pressure. Familiar exercises win. The ones that matter get deferred.
          </p>
          <p className="text-skill-muted/40 text-sm mb-8 max-w-xl italic">
            Effort without structure produces effort without progress.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {[
              {
                title: "Practice drift",
                body: "Without a predefined plan, users work on what feels comfortable. The exercises that drive real improvement are the ones hardest to start — so they get dropped.",
              },
              {
                title: "Unclear structure",
                body: "Most learners can't answer what to practice first, how long to spend, or what a complete session actually looks like.",
              },
              {
                title: "No record of what happened",
                body: "A full session and one where they bailed on three exercises look identical. Without exercise-level status, sessions are just a block of time with no usable signal.",
              },
              {
                title: "Invisible inconsistency",
                body: "Without tracking planned versus actual, patterns of drift are invisible until the habit is already gone.",
              },
            ].map(item => (
              <Card key={item.title}>
                <h4 className="text-sm font-semibold text-skill-text mb-1.5">{item.title}</h4>
                <p className="text-sm text-skill-muted/60 leading-relaxed">{item.body}</p>
              </Card>
            ))}
          </div>

          <div className="bg-skill-surface border border-skill-raised/40 rounded-xl overflow-hidden">
            <div className="px-4 py-2.5 bg-skill-raised/60">
              <p className="text-xs font-semibold text-skill-muted/60 uppercase tracking-wider">Why existing tools don&apos;t solve this</p>
            </div>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-skill-raised/20">
                {[
                  ["Habit trackers (Streaks, Loop)", "Track attendance, not quality. A 5-minute warmup and a 45-minute session look identical."],
                  ["Domain-specific apps",            "Built for one discipline. Multi-skill users need a separate app for each."],
                  ["Timers and journals",             "Measure time spent, not progression. Blank canvases require users to design structure themselves."],
                  ["Notion, spreadsheets",            "Flexible, but users must build and maintain the system. Most abandon it by week two."],
                ].map(([tool, gap]) => (
                  <tr key={tool}>
                    <td className="px-4 py-3 font-medium text-skill-muted/80 w-56 shrink-0 align-top">{tool}</td>
                    <td className="px-4 py-3 text-skill-muted/50">{gap}</td>
                  </tr>
                ))}
                <tr className="bg-skill-brand/5">
                  <td className="px-4 py-3 font-semibold text-skill-brand w-56 shrink-0 align-top">MakePerfect</td>
                  <td className="px-4 py-3 text-skill-muted/70">Reusable structured progression across any skill. Define the routine once; the product runs it session after session.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <Divider />

        {/* ── MARKET ── */}
        <section id="market" className="mb-16">
          <Label>The Opportunity</Label>
          <SectionHeading>A real market gap no existing tool owns.</SectionHeading>

          <p className="text-skill-muted/60 leading-relaxed mb-8 max-w-2xl">
            Millions of adults practice skills seriously outside formal instruction. Most already have consistency. What they lack is structure that transfers across disciplines.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                title: "Habit trackers measure attendance, not quality",
                body: "The serious practitioner already has consistency. They need quality and progression — neither of which attendance data captures.",
              },
              {
                title: "Domain apps fragment multi-skill users",
                body: "A guitarist who also trains athletically or studies a language needs a separate system for each. No unified practice infrastructure exists.",
              },
              {
                title: "DIY systems impose setup tax",
                body: "Notion and spreadsheets can work, but users spend more time managing the system than training. Most abandon it by week two.",
              },
            ].map(item => (
              <Card key={item.title}>
                <h4 className="text-sm font-semibold text-skill-text mb-2">{item.title}</h4>
                <p className="text-sm text-skill-muted/60 leading-relaxed">{item.body}</p>
              </Card>
            ))}
          </div>

          {/* Target user */}
          <div className="bg-skill-raised/70 rounded-2xl px-7 py-8 mb-8 border border-skill-brand/20">
            <p className="text-xs text-skill-muted/40 uppercase tracking-widest font-medium mb-3">Initial target user</p>
            <h3 className="text-lg font-bold text-skill-text mb-3">
              Self-directed adult learners who already practice, but lack a system.
            </h3>
            <p className="text-sm text-skill-muted/70 max-w-xl leading-relaxed mb-5">
              Not beginners who need instruction. Not professionals with coaches. Someone who shows up consistently and has noticed that unstructured effort isn&apos;t translating into improvement.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Already motivated",  detail: "They practice without external accountability. Acquisition isn't the problem." },
                { label: "Pain is real",        detail: "They can feel that sessions aren't improving. The problem is visible to them." },
                { label: "Reachable",           detail: "Active in music, fitness, and language communities where self-improvement culture is strong." },
              ].map(item => (
                <div key={item.label} className="bg-skill-surface/60 rounded-lg px-3 py-2.5">
                  <p className="text-xs font-semibold text-skill-brand mb-0.5">{item.label}</p>
                  <p className="text-xs text-skill-muted/50 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why users return */}
          <p className="text-xs text-skill-brand font-semibold uppercase tracking-widest mb-4">Why users come back</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                title: "Routines remove daily decisions",
                body: "Once built, a routine answers what to practice for every future session.",
              },
              {
                title: "Inconsistency becomes visible",
                body: "The week strip shows completed, missed, and upcoming days. Patterns that felt invisible become obvious.",
              },
              {
                title: "Progress accumulates",
                body: "Sessions build a record. That record only exists in MakePerfect.",
              },
              {
                title: "The system grows with skills",
                body: "Users tune targets and swap exercises as they improve. The product stays useful without starting over.",
              },
            ].map(item => (
              <Card key={item.title}>
                <h4 className="text-sm font-semibold text-skill-text mb-1">{item.title}</h4>
                <p className="text-sm text-skill-muted/60 leading-relaxed">{item.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── INSIGHT ── */}
        <section id="insight" className="mb-16">
          <Label>The Insight</Label>

          <div className="bg-skill-raised/70 rounded-2xl px-7 py-9 mb-8 border border-skill-brand/20">
            <p className="text-xs text-skill-muted/40 uppercase tracking-widest font-medium mb-4">The realization that shaped every design decision</p>
            <p className="text-2xl font-bold text-skill-text leading-snug mb-4">
              &ldquo;Tracking is not the same as structure.&rdquo;
            </p>
            <p className="text-sm text-skill-muted/70 max-w-xl leading-relaxed">
              Most tools log what happened after a session ends. MakePerfect asks a different question first: what are you supposed to be practicing? The answer has to exist before the session starts. A routine isn&apos;t a log — it&apos;s a plan that runs before you sit down.
            </p>
          </div>

          <p className="text-xs text-skill-brand font-semibold uppercase tracking-widest mb-5">How that shaped the strategy</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: "Universal over domain-specific",
                body: "One system for any skill. User brings domain knowledge; product supplies structure. Metrics live on routine entries, not exercises — that's what keeps the library reusable.",
              },
              {
                title: "Structure before the session",
                body: "A routine names the exercises, configures tracking, and schedules days. When you start, the plan already exists.",
              },
              {
                title: "Hard data over subjective ratings",
                body: "Completion status, reps, sets, duration. All observable. Difficulty ratings were cut — they become noise and don't accumulate into signal.",
              },
            ].map(item => (
              <Card key={item.title}>
                <h4 className="text-sm font-semibold text-skill-text mb-2">{item.title}</h4>
                <p className="text-sm text-skill-muted/60 leading-relaxed">{item.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── DEMOS ── */}
        <section id="demos" className="mb-16">
          <Label>Interactive Demos</Label>
          <SectionHeading>Interactive demos of the highest-leverage product decisions behind MakePerfect.</SectionHeading>
          <div className="space-y-1 text-sm text-skill-muted/50 mb-12 max-w-xl">
            <p>These flows were designed for real mobile use and tested through working prototypes.</p>
            <p>Each demo shows how the product improves structure, activation, execution, or retention.</p>
          </div>

          <div className="space-y-24">
            <DemoSection
              subtitle="System Design"
              title="Build a repeatable routine"
              problem="An exercise library doesn't tell you how to train. The same exercise can be a warmup rep, a technique drill, or an endurance set — different targets, different tracking, different purpose."
              insight="Metric config belongs on the routine entry, not the exercise. The library stays reusable. Each routine defines exactly how to execute each exercise in that context. Configure once, run every session."
            >
              <SkillRoutineDemo />
            </DemoSection>

            <DemoSection
              subtitle="Product Loop"
              title="The complete practice loop"
              problem="Most practice tools break the feedback loop. The user finishes a session and returns to the same blank state. Nothing signals that anything changed."
              insight="Home surfaces the right action. Session executes the plan with required status per exercise — no default, so every log is honest. Session Complete rewards with rank and streak feedback. Home updates to reflect the new state. The loop closes."
            >
              <SkillDashboardDemo />
            </DemoSection>

            <DemoSection
              subtitle="Activation Design"
              title="Get started in under two minutes"
              problem="A new user opens a practice app and faces a blank screen. Before anything works, they need a subject, skills, exercises, and a routine. Most quit before their first session."
              insight="A starter pack installs a complete practice system in one tap — subject, skills, exercises, routines, and schedule. The user's only first decision is what domain they want to improve, not how to configure a data model."
            >
              <SkillOnboardingDemo />
            </DemoSection>

            <DemoSection
              subtitle="Retention / Motivation"
              title="Progress that earns its meaning"
              problem="Generic XP bars reward time logged, not the behavior worth reinforcing. A system that treats a 5-minute warmup and a 45-minute session identically teaches users nothing about what matters."
              insight="Mastery ranks are earned by completing routines, not accumulating minutes. Bronze at 20 completed routines is deliberately high — it should feel earned. Early milestones handle encouragement before the first rank lands. Tap the button to watch a rank unlock."
            >
              <SkillProgressDemo />
            </DemoSection>
          </div>
        </section>

        <Divider />

        {/* ── DECISIONS ── */}
        <section id="decisions" className="mb-16">
          <Label>Key Decisions</Label>
          <SectionHeading>What I chose and why.</SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: "Routine-first model",
                body: "Every session runs against a named routine. You can't start without one — the practice plan must exist before you sit down. The tradeoff is upfront setup; onboarding handles that transition.",
                tradeoff: "Structure vs. flexibility",
              },
              {
                title: "Metric config on the entry, not the exercise",
                body: "The same exercise tracks differently in different routines. A scale run by reps in technique practice is different from the same run by duration in a warmup. Config on the entry, not the exercise, is what makes the library genuinely reusable.",
                tradeoff: "Reusability vs. simplicity",
              },
              {
                title: "Counter buttons, not text inputs",
                body: "Reps and sets use a counter sized for thumb taps. Keyboard input during active practice is friction. When both are configured, hitting the rep target auto-increments sets — the user doesn't manage the transition.",
                tradeoff: "Speed vs. precision",
              },
              {
                title: "Guided setup for the cold-start problem",
                body: "Before a session can start, the app needs a Subject, Skill, Exercise, and Routine. Onboarding handles that with domain starter packs as a one-tap shortcut for the common case.",
                tradeoff: "Structure vs. immediacy",
              },
              {
                title: "Status required, no default",
                body: "Complete, Partial, and Rescheduled must be selected before advancing. No default. A required choice produces an honest log. An optional field produces a field that gets skipped.",
                tradeoff: "Friction vs. signal quality",
              },
              {
                title: "localStorage only, no account",
                body: "All data lives in localStorage. No login, no backend, no friction. The cost — no cross-device sync — is acceptable for validating the core model first.",
                tradeoff: "Accessibility vs. persistence",
              },
              {
                title: "Universal metrics, no domain-specific fields",
                body: "One permanent constraint: duration, reps, sets, and success tracking only. No instrument-specific or sport-specific fields, ever. Users bring domain knowledge; the product supplies structure.",
                tradeoff: "Universality vs. specificity",
              },
              {
                title: "Mastery ranks replaced XP levels",
                body: "XP rewards time logged, not the behavior worth reinforcing. Mastery ranks are earned by completing routines. Bronze at 20 is deliberately high — earned, not automatic.",
                tradeoff: "Intrinsic motivation vs. gamification",
              },
            ].map(item => (
              <Card key={item.title}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-semibold text-skill-text">{item.title}</h4>
                  <span className="text-xs text-skill-brand/70 border border-skill-brand/20 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">{item.tradeoff}</span>
                </div>
                <p className="text-sm text-skill-muted/60 leading-relaxed">{item.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── SCOPE ── */}
        <section id="scope" className="mb-16">
          <Label>Scope & Evolution</Label>
          <SectionHeading>What shipped, what didn&apos;t, and what changed.</SectionHeading>

          {/* Shipped */}
          <div className="bg-skill-surface border border-skill-raised/40 rounded-xl overflow-hidden mb-6">
            <div className="px-4 py-2.5 bg-skill-raised/60">
              <p className="text-xs font-semibold text-skill-muted/60 uppercase tracking-wider">Shipped</p>
            </div>
            <div className="divide-y divide-skill-raised/20">
              {[
                ["Library — Subjects, Skills, Exercises",  "Full 3-level hierarchy with inline create, edit, and delete. No metrics on the exercise itself — lean by design."],
                ["Routine builder",                         "Per-entry metric config and optional day scheduling. Exercises can be added, reordered, and configured independently per routine."],
                ["Session execution",                       "Counter UI for reps/sets, countdown and countup timer, Successful/Missed for success tracking. Status required per exercise, no default."],
                ["Session complete",                        "Mastery reward strip showing subject rank and streak. Per-exercise summary with actual metric values and status badges."],
                ["Home with smart CTA",                     "Rule-based hero card, seven-day week strip, and a prioritized CTA that always surfaces the right next action."],
                ["Progress screen",                         "Mastery ranks per subject (Unranked through Diamond) with progress bars, five milestones, and weekly snapshot stats."],
                ["Onboarding with starter packs",           "Five domain packs plus a build-from-scratch path. Gets users to their first session in under two minutes."],
                ["Session history and detail",              "Per-exercise breakdown for any completed session. Full history in reverse chronological order."],
                ["localStorage persistence",                "All data on device. No account, no backend, no setup friction."],
              ].map(([feature, reason]) => (
                <div key={feature} className="px-4 py-3 flex gap-4 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-skill-brand mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-skill-muted/80">{feature}</p>
                    <p className="text-xs text-skill-muted/40 mt-0.5">{reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cut */}
          <div className="mb-10">
            <p className="text-xs text-skill-muted/40 uppercase tracking-wider font-medium mb-3">Cut from scope — each with a reason</p>
            <div className="bg-skill-surface border border-skill-raised/40 rounded-xl overflow-hidden">
              <div className="divide-y divide-skill-raised/20">
                {[
                  ["Push notifications",        "V2, once the scheduling model is validated and the app moves to a native shell."],
                  ["Account and sync",          "By design for MVP. No login barrier. Cross-device sync is the obvious paid tier once the habit forms."],
                  ["Community starter packs",   "User-published templates would solve cold-start better than static packs. Deferred until accounts exist."],
                  ["Social and coach features", "Accountability partners and instructor mode are natural expansions — out of scope until the solo user model is validated."],
                  ["Settings screen",           "Low impact until there's a concrete reason users need data reset or preference management."],
                ].map(([item, reason]) => (
                  <div key={item} className="px-4 py-3 flex gap-4 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-skill-raised/80 mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-skill-muted/60">{item}</p>
                      <p className="text-xs text-skill-muted/40 mt-0.5">{reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What changed */}
          <p className="text-xs text-skill-brand font-semibold uppercase tracking-widest mb-4">What changed during build</p>
          <div className="space-y-2">
            {[
              {
                shift: "The routine layer became the core model, not a V2 add-on",
                detail: "Assumed auto-generating sessions from cadence data would give users a plan. Learned that users wanted to control what they practice, not have it chosen for them. Switched to named routines — users define the structure, the product executes it.",
              },
              {
                shift: "Metric config moved from the exercise to the routine entry",
                detail: "Assumed metric config belonged on the exercise. Learned the same exercise serves different purposes across routines — a reps drill here, a timed warmup there. Moved config to the entry. That's what makes the library genuinely reusable.",
              },
              {
                shift: "The counter replaced the text input for reps and sets",
                detail: "Assumed a number input would work. Learned that opening a keyboard mid-exercise breaks the physical flow. Built a counter sized for thumb taps — one hand on an instrument, tapping a target with the other.",
              },
              {
                shift: "Domain-specific metrics were rejected permanently, not deferred",
                detail: "Assumed instrument and sport-specific fields would add value. Learned they would fragment the product into multiple domain tools. Made the constraint permanent: duration, reps, sets, success tracking only.",
              },
              {
                shift: "XP levels were replaced with mastery ranks based on completed routines",
                detail: "Assumed XP and numeric levels would drive progression. Learned that model rewards time logged, not the behavior worth reinforcing. Switched to mastery ranks — Bronze at 20 completed routines is deliberately high.",
              },
              {
                shift: "Navigation tabs were reorganized around user intent",
                detail: "Assumed tabs organized around content (Dashboard, Library, Routines). Learned Progress data had no obvious home and users navigate by intent, not content type. Renamed to Home, Skills, Sessions, Progress — each tab answers a question.",
              },
            ].map((item, i) => (
              <details key={item.shift} className="group bg-skill-surface border border-skill-raised/40 rounded-xl overflow-hidden">
                <summary className="flex gap-3 items-center px-4 py-3.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <div className="w-6 h-6 rounded-full bg-skill-raised border border-skill-brand/40 text-skill-brand text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  <h4 className="text-sm font-semibold text-skill-text flex-1">{item.shift}</h4>
                  <svg className="w-4 h-4 text-skill-muted/30 group-open:rotate-180 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 pt-1 ml-9">
                  <p className="text-sm text-skill-muted/60 leading-relaxed">{item.detail}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── METRICS ── */}
        <section id="metrics" className="mb-16">
          <Label>Measuring Success</Label>
          <SectionHeading>How I&apos;d measure it.</SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              {
                category: "Activation",
                metrics: [
                  { name: "Onboarding completion rate",             why: "Users who skip setup never run a session." },
                  { name: "First session within 24 hours of install", why: "Long gap means motivation didn't survive setup." },
                ],
              },
              {
                category: "Engagement",
                metrics: [
                  { name: "Sessions completed per user per week", why: "The core behavior. Low here means session friction is still too high." },
                  { name: "Routine reuse rate",                   why: "Running the same routine repeatedly means the product is working as designed." },
                ],
              },
              {
                category: "Retention",
                metrics: [
                  { name: "7-day and 30-day return rate",          why: "Week one return is the first real signal on habit formation." },
                  { name: "Streak continuation after first break", why: "Restarting after a gap shows the product earned another chance." },
                ],
              },
              {
                category: "Product quality signals",
                metrics: [
                  { name: "Rescheduled exercise rate per session", why: "High rate signals over-scoped routines or targets that don't match reality." },
                  { name: "Routine edit frequency after first use", why: "Frequent early edits mean the setup flow produces poor-fit routines." },
                ],
              },
            ].map(group => (
              <Card key={group.category}>
                <p className="text-xs text-skill-brand font-semibold uppercase tracking-wider mb-3">{group.category}</p>
                <div className="space-y-2.5">
                  {group.metrics.map(m => (
                    <div key={m.name}>
                      <p className="text-sm font-medium text-skill-muted/80">{m.name}</p>
                      <p className="text-xs text-skill-muted/40 leading-relaxed">{m.why}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Revenue */}
          <div className="bg-skill-surface border border-skill-raised/40 rounded-xl overflow-hidden">
            <div className="px-4 py-2.5 bg-skill-raised/60">
              <p className="text-xs font-semibold text-skill-muted/60 uppercase tracking-wider">Potential revenue paths</p>
            </div>
            <div className="divide-y divide-skill-raised/20">
              {[
                ["Freemium tier",           "One subject, two routines free. Upgrade trigger: adding a second subject — exactly when value is established."],
                ["Cloud sync subscription", "Data stays on-device in MVP. Sync is the obvious paid tier once the habit forms and data has real value."],
                ["Premium analytics",       "Completion trends, rescheduling patterns, velocity over time. Meaningful once users have weeks of history."],
              ].map(([model, note]) => (
                <div key={model} className="px-4 py-3 flex gap-4 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-skill-brand/60 mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-skill-muted/80">{model}</p>
                    <p className="text-xs text-skill-muted/40 mt-0.5">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── WHAT'S NEXT ── */}
        <section id="next" className="mb-16">
          <Label>What&apos;s Next</Label>
          <SectionHeading>Next priorities and what building this taught me.</SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              {
                title: "Sessions Hub",
                priority: "High",
                body: "The Sessions tab is a list of routines with recent sessions appended. It should be a hub: active session resume at top, today's schedule, quick history access. The data exists. The organization doesn't.",
              },
              {
                title: "Smarter Home CTA",
                priority: "High",
                body: "The smart CTA has a rule hierarchy — resume, today's routine, overdue, any. The gap is a last-used fallback for non-schedulers and better surfacing of overdue sessions from earlier in the week.",
              },
              {
                title: "Subject-level history",
                priority: "Medium",
                body: "Subject Detail shows 8 sessions inline. A filtered view per subject lets users track their arc in one discipline without scrolling through unrelated sessions.",
              },
            ].map(item => (
              <Card key={item.title}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-skill-text">{item.title}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    item.priority === "High"
                      ? "bg-skill-brand/20 text-skill-brand"
                      : "bg-skill-raised/60 text-skill-muted/50"
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-sm text-skill-muted/60 leading-relaxed">{item.body}</p>
              </Card>
            ))}
          </div>

          <p className="text-xs text-skill-brand font-semibold uppercase tracking-widest mb-5">What building this taught me</p>
          <div className="space-y-4 max-w-2xl">
            {[
              {
                title: "Structure matters more than motivation.",
                body: "Most users don't fail because they lack intent. They fail because each session starts with fresh decisions.",
              },
              {
                title: "Cold-start is a sequencing problem.",
                body: "Users won't complete complex setup before seeing value. The product has to earn the right to ask for configuration.",
              },
              {
                title: "The shipped model should beat the original idea.",
                body: "The first concept auto-generated sessions. Building it revealed users wanted ownership and repeatable routines instead.",
              },
            ].map(item => (
              <div key={item.title} className="border-l-2 border-skill-raised/80 pl-5">
                <h4 className="text-sm font-semibold text-skill-text mb-1">{item.title}</h4>
                <p className="text-sm text-skill-muted/60 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── WHAT THIS PROJECT DEMONSTRATES ── */}
        <section className="mb-10">
          <Label>What This Project Demonstrates</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              "Product Judgment",
              "Tradeoff Decisions",
              "Activation Design",
              "Retention Thinking",
              "System Architecture",
              "Iteration from Learning",
              "UX Flow Design",
              "Prioritization",
              "Mobile Product Thinking",
            ].map(comp => (
              <div key={comp} className="bg-skill-surface border border-skill-raised/40 rounded-lg px-3 py-2.5 text-xs text-skill-muted/60 font-medium text-center">
                {comp}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <div className="bg-skill-raised/60 border border-skill-brand/20 rounded-2xl px-8 py-10 text-center">
          <p className="text-sm text-skill-muted/50 mb-2">This project shows how I approach product problems: find friction, simplify systems, and build products people return to.</p>
          <h3 className="text-xl font-bold text-skill-text mb-5">If that&apos;s relevant to what you&apos;re building, I&apos;d welcome the conversation.</h3>
          <a
            href="mailto:garrett.bryce.young@gmail.com"
            className="inline-block px-6 py-2.5 bg-skill-brand text-white text-sm font-semibold rounded-full hover:bg-skill-brand transition-colors"
          >
            garrett.bryce.young@gmail.com
          </a>
        </div>

      </article>
    </div>
  );
}
