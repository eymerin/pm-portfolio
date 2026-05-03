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
  { href: "#problem",       label: "Problem"       },
  { href: "#market",        label: "Market"        },
  { href: "#insight",       label: "Insight"       },
  { href: "#business-case", label: "Business Case" },
  { href: "#demos",         label: "Demos"         },
  { href: "#decisions",     label: "Decisions"     },
  { href: "#scope",         label: "Scope"         },
  { href: "#metrics",       label: "Metrics"       },
  { href: "#next",          label: "What's Next"   },
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

      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

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
              <h1 className="text-3xl sm:text-5xl font-bold text-skill-text tracking-tight">MakePerfect</h1>
            </div>

            <p className="text-base sm:text-xl text-skill-muted/80 max-w-2xl leading-relaxed mb-3">
              A universal structured practice system for people who already show up, but still are not improving.
            </p>
            <p className="text-sm text-skill-muted/60 max-w-xl">
              Showing up consistently is a solved problem. Getting better consistently isn&apos;t.
            </p>
            <p className="text-sm text-skill-muted/40 max-w-xl mt-2">
              Built solo as a working product with web and Android builds, designed to support progress across any skill.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-w-xl">
            {[
              { value: "74%",  label: "of U.S. adults actively pursue personal learning",  source: "Pew Research, 2016" },
              { value: "3%",   label: "Day-30 retention in education apps",                source: "AppsFlyer, 2022"    },
              { value: "$6B",  label: "global education apps market",                      source: "IMARC, 2024"        },
            ].map(item => (
              <div key={item.value} className="bg-skill-surface border border-skill-raised/40 rounded-xl px-3 py-3">
                <p className="text-xl font-bold text-skill-brand mb-0.5">{item.value}</p>
                <p className="text-xs text-skill-muted/60 leading-snug mb-1">{item.label}</p>
                <p className="text-xs text-skill-muted/30">{item.source}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-skill-muted/40 max-w-xl mb-6">The learners exist. The tools aren&apos;t keeping them.</p>

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
          <SectionHeading>People practice consistently. Improvement still stalls.</SectionHeading>

          <p className="text-skill-muted/60 leading-relaxed mb-2 max-w-2xl">
            The failure mode is not missing sessions. It is what happens inside them. When there is no plan, decisions get made under pressure. Familiar exercises win, and the ones that matter get deferred.
          </p>
          <p className="text-skill-muted/60 text-sm mb-8 max-w-xl">
            When sessions don&apos;t show visible progress, users disengage. That&apos;s not a motivation problem — it&apos;s a product design problem.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {[
              {
                title: "Practice drift",
                body: "Without a predefined plan, users work on what feels comfortable. The exercises that drive improvement are often the hardest to start, so they get dropped.",
              },
              {
                title: "Unclear structure",
                body: "Most learners cannot answer what to practice first, how long to spend, or what a complete session should look like.",
              },
              {
                title: "No record of what happened",
                body: "A full session and one where they skipped three exercises can look identical. Without exercise-level status, sessions become blocks of time with little usable signal.",
              },
              {
                title: "Invisible inconsistency",
                body: "Without tracking planned versus actual practice, patterns of drift stay invisible until the habit is already weakening.",
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
            <div className="divide-y divide-skill-raised/20">
              {[
                ["Habit trackers (Streaks, Loop)", "Track attendance, not quality. A 5-minute warmup and a 45-minute session look identical."],
                ["Domain-specific apps",            "Built for one discipline. Multi-skill users need a separate app for each."],
                ["Timers and journals",             "Measure time spent, not progression. Blank canvases require users to design structure themselves."],
                ["Notion, spreadsheets",            "Flexible, but users must build and maintain the system. Most abandon it by week two."],
              ].map(([tool, gap]) => (
                <div key={tool} className="px-4 py-3 flex flex-col sm:flex-row sm:gap-4">
                  <p className="text-sm font-medium text-skill-muted/80 sm:w-56 sm:shrink-0 mb-0.5 sm:mb-0">{tool}</p>
                  <p className="text-sm text-skill-muted/50">{gap}</p>
                </div>
              ))}
              <div className="px-4 py-3 flex flex-col sm:flex-row sm:gap-4 bg-skill-brand/5">
                <p className="text-sm font-semibold text-skill-brand sm:w-56 sm:shrink-0 mb-0.5 sm:mb-0">MakePerfect</p>
                <p className="text-sm text-skill-muted/70">Most tools track time or streaks. MakePerfect tracks measurable progress within exercises — reusable across any skill, with the structure already defined before each session starts.</p>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── MARKET ── */}
        <section id="market" className="mb-16">
          <Label>The Opportunity</Label>
          <SectionHeading>A real market gap no existing tool owns.</SectionHeading>

          <p className="text-skill-muted/60 leading-relaxed mb-6 max-w-2xl">
            Millions of adults practice skills seriously outside formal instruction. Most already have consistency. What they lack is structure that transfers across disciplines.
          </p>

          <div className="bg-skill-surface border border-skill-raised/40 rounded-xl px-5 py-5 mb-8">
            <p className="text-xs text-skill-muted/40 uppercase tracking-widest font-medium mb-3">Market Context</p>
            <p className="text-sm text-skill-muted/60 leading-relaxed max-w-2xl">
              The personal development market is large and growing — education apps alone represent a $6 billion global category (IMARC, 2024), and 74% of U.S. adults actively pursued personal learning in the past year (Pew Research, 2016). Most tools in this space track attendance or are locked to a single discipline. The cross-domain, structure-first layer remains largely unaddressed. That is where MakePerfect operates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                title: "Habit trackers measure attendance, not quality",
                body: "The serious practitioner often already has consistency. What they need is quality and progression, neither of which attendance data captures.",
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

          {/* Gap validation */}
          <div className="bg-skill-surface border border-skill-raised/40 rounded-xl px-5 py-5 mb-8">
            <p className="text-xs text-skill-muted/40 uppercase tracking-widest font-medium mb-4">How I validated the gap</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="border-l-2 border-skill-raised/80 pl-4">
                <p className="text-xs text-skill-muted/40 uppercase tracking-wider font-medium mb-1">Personal experience</p>
                <p className="text-sm text-skill-muted/60 leading-relaxed">Practiced a skill consistently for years — regular sessions, real motivation — but noticed improvement wasn&apos;t keeping pace with the time invested. Sessions ended without a clear record, no defined plan for what was next, and no way to tell whether the effort had been well-spent. The gap between showing up and actually getting better was visible before any tool existed to address it.</p>
              </div>
              <div className="border-l-2 border-skill-brand pl-4">
                <p className="text-xs text-skill-muted/40 uppercase tracking-wider font-medium mb-1">Competitive analysis</p>
                <p className="text-sm text-skill-muted/60 leading-relaxed">Reviewed tools across the space: Streaks and Loop (habit trackers — attendance only, no session structure); Yousician and Strong (domain-specific, single discipline each); Notion and spreadsheets (flexible but require users to design and maintain the system, which most abandon within weeks). Every option either locked users to one domain, ignored what happened inside a session, or imposed a setup burden most users don&apos;t sustain.</p>
              </div>
            </div>
            <p className="text-xs text-skill-muted/30 mt-4 pt-4 border-t border-skill-raised/30">Finding: no tool provided structured, cross-domain practice management without requiring the user to build the system themselves.</p>
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

          <div className="bg-skill-raised/70 rounded-2xl px-7 py-8 mb-8 border border-skill-brand/10">
            <p className="text-xs text-skill-muted/40 uppercase tracking-widest font-medium mb-3">The harder problem</p>
            <p className="text-lg font-bold text-skill-text leading-snug mb-3">
              Getting users to their first session is a UX problem. Getting them to return after progress stalls is a product design problem.
            </p>
            <p className="text-sm text-skill-muted/60 max-w-xl leading-relaxed">
              Starter packs handle the cold start. The harder challenge is week three, when novelty fades and effort starts to feel unrewarded. Mastery ranks, streak tracking, and visible completion trends all exist for that moment — not as engagement mechanics, but as evidence that the work is accumulating into something real.
            </p>
          </div>

          <p className="text-xs text-skill-brand font-semibold uppercase tracking-widest mb-5">How that shaped the strategy</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: "Universal over domain-specific",
                body: "One system can support any skill because the user brings the domain knowledge and the product supplies structure. Metrics live on routine entries, not exercises, which keeps the library reusable.",
              },
              {
                title: "Structure before the session",
                body: "A routine names the exercises, configures tracking, and schedules the days. When a session starts, the plan already exists.",
              },
              {
                title: "Hard data over subjective ratings",
                body: "Completion status, reps, sets, and duration are all observable. Difficulty ratings were cut because they become noise and do not accumulate into useful signal.",
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

        {/* ── BUSINESS CASE ── */}
        <section id="business-case" className="mb-16">
          <Label>Business Case</Label>
          <SectionHeading>The product has to earn the second session.</SectionHeading>

          <p className="text-skill-muted/60 leading-relaxed mb-4 max-w-2xl">
            Education apps have some of the worst retention numbers of any app category. Day-30 retention sits around 3% (AppsFlyer, 2022). The underlying cause is usually the same: users cannot see whether their effort is translating to improvement. Invisible progress leads to disengagement, and disengagement leads to churn.
          </p>

          <p className="text-skill-muted/60 leading-relaxed mb-4 max-w-2xl">
            In freemium products, early retention is the primary driver of lifetime value. Improving it increases revenue per user and reduces the treadmill of chasing new installs to maintain growth.
          </p>

          <p className="text-skill-muted/60 leading-relaxed mb-8 max-w-2xl">
            The research supports the direction. A meta-analysis across 88 studies found that deliberate practice — structured, goal-directed effort with measurable feedback — explains 21% of performance variance in music and 18% in sport (Macnamara et al., 2014, Psychological Science). Most tools don&apos;t support deliberate practice. They log time. MakePerfect builds the structure that deliberate practice requires.
          </p>

          {/* Visual 1 — Modeled Impact */}
          <div className="bg-skill-raised/70 rounded-2xl px-7 py-8 mb-8 border border-skill-brand/20">
            <p className="text-xs text-skill-muted/40 uppercase tracking-widest font-medium mb-1">Modeled Impact</p>
            <p className="text-xs text-skill-muted/30 italic mb-5">Illustrative model only. Improvement rate assumed, not measured. Baseline from AppsFlyer education app benchmarks, 2022.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { value: "3%",        label: "Day-30 retention baseline",                   note: "AppsFlyer benchmark for education apps (2022)"                                                     },
                { value: "+5pp",      label: "Modeled improvement for engaged users",        note: "Assumed for users completing 2+ structured sessions — consistent with Amplitude activation research" },
                { value: "+50 users", label: "Additional retained users per 1,000 signups",  note: "At modeled improvement rate — illustrative only"                                                   },
              ].map(item => (
                <div key={item.label} className="bg-skill-surface/60 rounded-xl px-4 py-4">
                  <p className="text-2xl font-bold text-skill-brand mb-1">{item.value}</p>
                  <p className="text-xs font-medium text-skill-muted/70 mb-1">{item.label}</p>
                  <p className="text-xs text-skill-muted/30 leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-skill-raised/60 pt-5">
              <p className="text-xs text-skill-muted/50 leading-relaxed max-w-2xl">
                At scale, small improvements in early retention compound across cohorts. The more durable effect is conversion: MakePerfect&apos;s freemium trigger fires at the second subject — exactly when a user has proven they want structure across more than one skill. Users who reach that moment have already demonstrated the habit the product is designed to build. Amplitude research shows 69% of products with strong week-1 activation are also top 3-month retention performers (2025 Product Benchmark Report, 2,600+ companies).
              </p>
            </div>
          </div>

          {/* Visual 2 — Product to Metric Mapping */}
          <p className="text-xs text-skill-brand font-semibold uppercase tracking-widest mb-4">How product decisions connect to metrics</p>
          <div className="overflow-hidden rounded-xl border border-skill-raised/40">
            <div className="grid grid-cols-3 bg-skill-raised/60 px-4 py-2.5">
              <p className="text-xs font-semibold text-skill-muted/40 uppercase tracking-wider">Product Decision</p>
              <p className="text-xs font-semibold text-skill-muted/40 uppercase tracking-wider">Metric Affected</p>
              <p className="text-xs font-semibold text-skill-muted/40 uppercase tracking-wider">Business Value</p>
            </div>
            <div className="divide-y divide-skill-raised/20">
              {[
                { decision: "Routine-first model",               metric: "Session completion rate", value: "No plan means no session. Users with routines complete sessions; without them, they stall before starting."   },
                { decision: "Starter packs",                     metric: "Time to first session",   value: "Gets users to value before cold-start kills motivation — under two minutes from install."                    },
                { decision: "Mastery ranks on completion",       metric: "Long-term retention",     value: "Rewards completing structured sessions, not logging time — the behavior that predicts improvement."           },
                { decision: "Second subject as upgrade trigger", metric: "Freemium conversion",     value: "Fires at peak intent: the user has proven the model works for one skill and wants it for another."           },
              ].map(row => (
                <div key={row.decision} className="grid grid-cols-3 gap-4 px-4 py-3.5">
                  <p className="text-sm font-medium text-skill-muted/80">{row.decision}</p>
                  <p className="text-sm text-skill-muted/60">{row.metric}</p>
                  <p className="text-sm text-skill-muted/50 leading-relaxed">{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── DEMOS ── */}
        <section id="demos" className="mb-16">
          <Label>Interactive Demos</Label>
          <SectionHeading>Interactive demos of the highest-leverage product decisions behind MakePerfect.</SectionHeading>
          <div className="space-y-1 text-sm text-skill-muted/50 mb-12 max-w-xl">
            <p>The app also has an Android build, so the flows were designed for real mobile use.</p>
            <p>Each demo focuses on a different product problem: structure, activation, execution, or retention.</p>
          </div>

          <div className="space-y-24">
            <DemoSection
              subtitle="System Design"
              title="Build a repeatable routine"
              problem="An exercise library does not tell you how to train. The same exercise can be a warmup, a technique drill, or an endurance set, each with different targets and tracking needs."
              insight="Metric configuration belongs on the routine entry, not the exercise. The library stays reusable, while each routine defines how that exercise should be performed in context. Configure once, run every session."
            >
              <SkillRoutineDemo />
            </DemoSection>

            <DemoSection
              subtitle="Product Loop"
              title="The complete practice loop"
              problem="Practice tools often log effort without making progress visible. The user finishes a session, but the product does not clearly show what changed."
              insight="Home recommends the next action. Session mode runs the routine with required status per exercise. Completion shows rank and streak feedback, and Home reflects the new state. The loop closes."
            >
              <SkillDashboardDemo />
            </DemoSection>

            <DemoSection
              subtitle="Activation Design"
              title="Get started in under two minutes"
              problem="A new user should not have to build a full practice system before they see value."
              insight="A starter pack installs the structure for them: subject, skills, exercises, routines, and schedule. Their first decision becomes what they want to improve, not how to configure the app."
            >
              <SkillOnboardingDemo />
            </DemoSection>

            <DemoSection
              subtitle="Retention / Motivation"
              title="Progress that earns its meaning"
              problem="Generic XP bars reward time logged, not the behavior worth reinforcing. If a system treats a 5-minute warmup and a 45-minute session identically, it teaches users very little about what matters."
              insight="Mastery ranks are earned by completing routines, not logging minutes. Bronze starts at 20 routines so it feels earned, while milestones create early momentum before the first rank unlocks."
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
                body: "Every session runs against a named routine. Users cannot start without one because the practice plan has to exist before the session begins. The tradeoff is upfront setup, which onboarding is designed to reduce.",
                tradeoff: "Structure vs. flexibility",
              },
              {
                title: "Metric config on the entry, not the exercise",
                body: "The same exercise tracks differently in different routines. A scale run tracked by reps in technique practice is different from the same run tracked by duration in a warmup. Config on the entry, not the exercise, is what makes the library genuinely reusable.",
                tradeoff: "Reusability vs. simplicity",
              },
              {
                title: "Counter buttons, not text inputs",
                body: "Reps and sets use a counter sized for thumb taps. Keyboard input during active practice creates friction. When both are configured, hitting the rep target auto-increments sets — the user doesn't manage the transition.",
                tradeoff: "Speed vs. precision",
              },
              {
                title: "Guided setup for the cold-start problem",
                body: "The app needs structure before a session can start. Starter packs solve the cold-start problem by giving users a working system immediately.",
                tradeoff: "Structure vs. immediacy",
              },
              {
                title: "Status required, no default",
                body: "Complete, Partial, and Rescheduled must be selected before advancing. No default. A required choice produces an honest log. An optional field produces a field that gets skipped.",
                tradeoff: "Friction vs. signal quality",
              },
              {
                title: "localStorage only, no account",
                body: "All data lives locally. No login, no backend, no setup barrier. Cross-device sync can wait until the core model proves useful.",
                tradeoff: "Accessibility vs. persistence",
              },
              {
                title: "Universal metrics, no domain-specific fields",
                body: "The product stays universal by limiting metrics to duration, reps, sets, and success tracking. Users bring the domain knowledge; the product supplies the structure.",
                tradeoff: "Universality vs. specificity",
              },
              {
                title: "Mastery ranks replaced XP levels",
                body: "XP rewards time logged, not the behavior worth reinforcing. Mastery ranks are earned by completing routines, with Bronze set high enough to feel earned rather than automatic.",
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
                ["Routine builder",               "Per-entry metric config and optional day scheduling. The same exercise tracks differently across routines — config on the entry keeps the library reusable."],
                ["Session execution",             "Counter UI for reps/sets, countdown and countup timer, success tracking. Status required per exercise, no default — an honest log requires a deliberate choice."],
                ["Onboarding with starter packs", "Five domain packs plus a build-from-scratch path. Solves the cold-start problem by giving users a working system before their first session."],
                ["Home with smart CTA",           "Rule-based hero card, seven-day week strip, and a prioritized CTA that always surfaces the right next action based on the user's schedule and history."],
                ["Progress screen",               "Mastery ranks per subject (Unranked through Diamond) with progress bars and milestones. Ranks earned by completing routines, not logging minutes."],
                ["localStorage persistence",      "All data on device. No account, no backend, no setup friction — removes the barrier between installing and using."],
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

          {/* What I chose not to build yet */}
          <div className="mb-10">
            <p className="text-xs text-skill-muted/40 uppercase tracking-wider font-medium mb-3">What I chose not to build yet</p>
            <p className="text-sm text-skill-muted/50 leading-relaxed mb-3 max-w-2xl">
              The first version needed to prove the core loop: build a routine, run it, capture the result, and return. Anything outside that loop was delayed.
            </p>
            <div className="bg-skill-surface border border-skill-raised/40 rounded-xl overflow-hidden">
              <div className="divide-y divide-skill-raised/20">
                {[
                  ["Push notifications",        "Useful later, once scheduling behavior is validated."],
                  ["Account and sync",          "Deferred to keep first use frictionless. Sync becomes valuable once users have history worth protecting."],
                  ["Community starter packs",   "High upside, but only after the solo workflow is proven and accounts exist."],
                  ["Social and coach features", "A natural expansion, but a second audience. The solo learner model comes first."],
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
            <p className="text-xs text-skill-muted/40 mt-3 italic">The best early version was the one users would actually return to.</p>
          </div>

          {/* What changed */}
          <p className="text-xs text-skill-brand font-semibold uppercase tracking-widest mb-4">What changed during build</p>
          <div className="space-y-2">
            {[
              {
                shift: "The routine layer became the core model",
                detail: "Assumed cadence automation would create the practice plan. Building showed users wanted control over what they practiced. Named routines became the core model.",
              },
              {
                shift: "Counters replaced text inputs",
                detail: "Assumed numeric input was fine. Testing the session flow made keyboard entry feel wrong. Large counters fit the moment of use.",
              },
              {
                shift: "Domain-specific metrics were rejected permanently",
                detail: "Assumed category-specific metrics might be useful later. Reframed them as a threat to the product's universal value.",
              },
            ].map((item) => (
              <details key={item.shift} className="group bg-skill-surface border border-skill-raised/40 rounded-xl overflow-hidden">
                <summary className="flex gap-3 items-center px-4 py-3.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h4 className="text-sm font-semibold text-skill-text flex-1">{item.shift}</h4>
                  <svg className="w-4 h-4 text-skill-muted/30 group-open:rotate-180 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 pt-1">
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
          <SectionHeading>What I&apos;d measure and why it matters.</SectionHeading>

          <p className="text-skill-muted/60 leading-relaxed mb-4 max-w-2xl">
            Education apps retain only 3% of users by Day 30 — the lowest of any major app category (AppsFlyer, 2022). The product has a narrow window to prove its value before most users are gone. The metrics below track whether MakePerfect is winning that window.
          </p>
          <p className="text-skill-muted/60 leading-relaxed mb-8 max-w-2xl">
            The hypothesis: structured routines and visible progress drive the repeat behavior that retention requires — not just a cleaner interface.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              {
                category: "Activation",
                metrics: [
                  { name: "Onboarding completion rate",              why: "Users who skip setup never run a session. At 3% industry Day-30 retention, every friction point in activation is a user who never sees the product's value." },
                  { name: "First session within 24 hours of install", why: "Motivation is highest at install. Long gaps mean the product failed to prove itself before momentum died." },
                ],
              },
              {
                category: "Engagement",
                metrics: [
                  { name: "Sessions completed per user per week", why: "The core retention behavior. Without regular completion, there's no habit, no history, and no path to freemium conversion." },
                  { name: "Routine reuse rate",                   why: "High reuse means the routine has become the user's default practice plan — the embedded behavior that drives long-term retention." },
                ],
              },
              {
                category: "Retention",
                metrics: [
                  { name: "7-day and 30-day return rate",          why: "The primary retention KPI. Against a 3% Day-30 industry median (AppsFlyer, 2022), early return is the clearest signal that the product has earned a place in the user's routine." },
                  { name: "Streak continuation after first break", why: "The first missed session is where most habits end. Restart rate is the most honest signal of whether the product has built enough pull to survive real life." },
                ],
              },
              {
                category: "Product quality signals",
                metrics: [
                  { name: "Rescheduled exercise rate per session",  why: "High rates signal over-scoped routines. That's a data quality problem and a sign the setup flow isn't helping users build realistic plans." },
                  { name: "Routine edit frequency after first use", why: "Heavy early editing means first-run setup produces poor-fit routines. If this is high, starter packs need refinement." },
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
                title: "Setup has to earn its place",
                body: "You can't ask users for hard setup before they understand the payoff. The onboarding flow exists because cold-start was a sequencing problem, not a form-design problem.",
              },
              {
                title: "Universality is a constraint, not a feature",
                body: "Every time a domain-specific field came up — tempo for music, split times for running — saying no got easier once the model was clear. Metrics live on routine entries, not exercises. That one decision protected the library's reusability across every skill a user might add.",
              },
              {
                title: "The shipped model should beat the original idea",
                body: "The original concept auto-generated sessions. Building showed users wanted ownership. The routine model came from running the product, not protecting the first idea.",
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

        {/* ── CTA ── */}
        <div className="bg-skill-raised/60 border border-skill-brand/20 rounded-2xl px-8 py-10 text-center">
          <p className="text-sm text-skill-muted/50 mb-2">This project reflects how I approach product problems: identify where structure breaks down, design the system that replaces it, and connect improvements to retention and long-term value.</p>
          <h3 className="text-xl font-bold text-skill-text mb-5">If that&apos;s relevant to what you&apos;re building, I&apos;d welcome the conversation.</h3>
          <a
            href="https://linkedin.com/in/garrett-young-274179245"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2.5 bg-skill-brand text-white text-sm font-semibold rounded-full hover:bg-skill-brand/85 transition-colors mb-3"
          >
            Connect on LinkedIn
          </a>
          <p className="text-xs text-skill-muted/40">garrett.bryce.young@gmail.com</p>
        </div>

      </article>
    </div>
  );
}
