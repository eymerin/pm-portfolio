import type { Metadata } from "next";
import Link from "next/link";
import RecipeVariantDemo from "@/components/demos/RecipeVariantDemo";
import FreshnessInventoryDemo from "@/components/demos/FreshnessInventoryDemo";
import ScheduleSwapDemo from "@/components/demos/ScheduleSwapDemo";
import RetentionLoopDemo from "@/components/demos/RetentionLoopDemo";

export const metadata: Metadata = {
  title: "FreshPrep Case Study — Garrett Young",
  description: "A 0→1 PM case study: FreshPrep, a meal prep execution system shipped as an Android app.",
};

/* ── Shared primitives ────────────────────────────────────── */

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-brand-accent font-semibold uppercase tracking-widest mb-2">{children}</p>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold text-brand-muted mb-5 leading-snug">{children}</h2>;
}

function Divider() {
  return <div className="border-t border-brand-raised/40 my-16" />;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-brand-surface border border-brand-raised/40 rounded-xl p-5 ${className}`}>
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
          <p className="text-xs text-brand-accent font-semibold uppercase tracking-widest mb-2">{subtitle}</p>
        )}
        <h3 className="text-lg font-bold text-brand-muted mb-5">{title}</h3>
        <div className="space-y-4">
          <div className="border-l-2 border-brand-raised/80 pl-4">
            <p className="text-xs text-brand-muted/40 uppercase tracking-wider font-medium mb-1">The problem</p>
            <p className="text-sm text-brand-muted/70 leading-relaxed">{problem}</p>
          </div>
          <div className="border-l-2 border-brand-accent pl-4">
            <p className="text-xs text-brand-muted/40 uppercase tracking-wider font-medium mb-1">The decision</p>
            <p className="text-sm text-brand-muted/70 leading-relaxed">{insight}</p>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

/* ── Page nav ─────────────────────────────────────────────── */
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

/* ── Page ─────────────────────────────────────────────────── */

export default function FreshPrepCaseStudy() {
  return (
    <div className="bg-brand-bg min-h-screen">

      {/* Sticky in-page nav */}
      <nav className="sticky top-14 z-40 bg-brand-bg/90 backdrop-blur border-b border-brand-raised/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-brand-muted/50 hover:text-brand-muted whitespace-nowrap px-3 py-1.5 rounded-full hover:bg-brand-surface transition-colors font-medium"
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
          <Link href="/projects" className="text-xs text-brand-muted/40 hover:text-brand-muted/70 transition-colors">Back to projects</Link>

          <div className="mt-8 mb-10">
            <p className="text-xs text-brand-accent font-semibold uppercase tracking-widest mb-4">PM Case Study</p>

            <div className="flex items-center gap-3 mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-muted flex-shrink-0">
                <path d="M12 21 V13" />
                <path d="M12 16 C10 14 7 14 5 15 C6 18 9 18 12 16Z" />
                <path d="M12 13 C14 11 17 11 19 12 C18 15 15 15 12 13Z" />
                <path d="M12 13 C12 11 13 9 12 7" />
              </svg>
              <h1 className="text-3xl sm:text-5xl font-bold text-brand-muted tracking-tight">FreshPrep</h1>
            </div>

            <p className="text-base sm:text-xl text-brand-muted/70 max-w-2xl leading-relaxed mb-3">
              A meal prep system built for the part most tools ignore: the week after cooking.<br />Turn one prep session into multiple successful weekdays.
            </p>
            <p className="text-sm text-brand-muted/40 max-w-xl">
              Built solo. Working product with Android build and mobile-first workflows.
            </p>
          </div>

          <
            href="#demos"
            className="inline-flex items-center gap-2 text-sm text-brand-accent border border-brand-accent/30 px-4 py-2 rounded-full hover:bg-brand-accent/10 transition-colors font-medium"
          >
            Jump to interactive demos
          </a>
        </div>

        <Divider />

        {/* ── PROBLEM ── */}
        <section id="problem" className="mb-16">
          <Label>The Problem</Label>
          <SectionHeading>Meal prep breaks down after cooking, not before it.</SectionHeading>

          <p className="text-brand-muted/60 leading-relaxed mb-8 max-w-2xl">
            The bottleneck isn&apos;t motivation or missing recipes. It&apos;s the operational layer that starts the moment cooking ends: knowing what you made, whether it&apos;s still safe, what&apos;s scheduled for which day, and how to course-correct when Tuesday&apos;s plan falls apart.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: "Planning without follow-through",  body: "They decide Sunday to make chicken bowls. By Wednesday they've forgotten what they planned, how many servings, and what's still in the fridge." },
              { title: "Shopping from memory",             body: "No scaled quantity list, no category sorting. Items get duplicated or forgotten. Shopping takes longer than it needs to." },
              { title: "Cooking without logging",          body: "They cook but don't record what they made, when, or how much. By day four, they're guessing whether the chicken is still safe." },
              { title: "Eating without inventory",         body: "With nothing tracking what's available, they default to the same meal repeatedly — missing variety they actually prepped." },
            ].map((item) => (
              <Card key={item.title}>
                <h4 className="text-sm font-semibold text-brand-muted mb-1.5">{item.title}</h4>
                <p className="text-sm text-brand-muted/60 leading-relaxed">{item.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── MARKET ── */}
        <section id="market" className="mb-16">
          <Label>The Opportunity</Label>
          <SectionHeading>A gap the existing market doesn&apos;t own.</SectionHeading>

          <p className="text-brand-muted/60 leading-relaxed mb-8 max-w-2xl">
            Food apps address what you eat or what to cook. None address the execution layer between cooking and consuming — inventory, freshness, scheduling, and follow-through.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                title: "Calorie trackers log what you ate, not what you made",
                body: "No prep batches. No inventory. No freshness tracking. Built for consumption logging, not prep execution.",
              },
              {
                title: "Recipe apps stop at the shopping list",
                body: "After the list is generated, they offer nothing — no prep state, no inventory, no consumption scheduling.",
              },
              {
                title: "Generic tools require building the system yourself",
                body: "Notion and spreadsheets can technically work. Most users quit maintaining them before week two.",
              },
            ].map(item => (
              <Card key={item.title}>
                <h4 className="text-sm font-semibold text-brand-muted mb-2">{item.title}</h4>
                <p className="text-sm text-brand-muted/60 leading-relaxed">{item.body}</p>
              </Card>
            ))}
          </div>

          {/* Target user */}
          <div className="bg-brand-raised rounded-2xl px-7 py-8 mb-8 border border-brand-accent/20">
            <p className="text-xs text-brand-muted/40 uppercase tracking-widest font-medium mb-3">Initial target user</p>
            <h3 className="text-lg font-bold text-brand-muted mb-3">
              People who already meal prep and need a system for following through across the week.
            </h3>
            <p className="text-sm text-brand-muted/60 max-w-xl leading-relaxed mb-5">
              Not recipe browsers. Not macro counters. The intentional meal prepper who dedicates time to cooking ahead — and still struggles with the operational layer the rest of the week.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Already committed", detail: "They prep consistently. Motivation isn't the problem." },
                { label: "Pain is operational", detail: "Bottleneck is execution, freshness, and follow-through — not planning." },
                { label: "Recurring need", detail: "Every week resets the cycle. A tool that helps once helps every week." },
              ].map(item => (
                <div key={item.label} className="bg-brand-surface/60 rounded-lg px-3 py-2.5">
                  <p className="text-xs font-semibold text-brand-accent mb-0.5">{item.label}</p>
                  <p className="text-xs text-brand-muted/50 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why users return */}
          <p className="text-xs text-brand-accent font-semibold uppercase tracking-widest mb-4">Why users come back every week</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                title: "Recurring prep cycles reset the system",
                body: "Prep is weekly by nature. Every new run creates a new inventory and a new week to plan.",
              },
              {
                title: "Freshness confidence removes guesswork",
                body: "Knowing what's still safe eliminates the daily anxiety of eyeballing food. That's only possible if the system stays current.",
              },
              {
                title: "Scheduling reduces weekday decision fatigue",
                body: "Meals already on the calendar mean the 'what should I eat?' question is already answered.",
              },
              {
                title: "Inventory tracking rewards consistency",
                body: "Log prep, mark meals eaten, watch inventory stay accurate — that feedback loop is the retention mechanism.",
              },
            ].map(item => (
              <Card key={item.title}>
                <h4 className="text-sm font-semibold text-brand-muted mb-1">{item.title}</h4>
                <p className="text-sm text-brand-muted/60 leading-relaxed">{item.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── INSIGHT + STRATEGY ── */}
        <section id="insight" className="mb-16">
          <Label>The Insight</Label>

          <div className="bg-brand-raised rounded-2xl px-7 py-9 mb-5 border border-brand-accent/20">
            <p className="text-xs text-brand-muted/40 uppercase tracking-widest font-medium mb-4">The realization that shaped every design decision</p>
            <p className="text-2xl font-bold text-brand-muted leading-snug mb-4">
              &ldquo;The unit of value isn&apos;t the recipe.<br />It&apos;s the prepped batch.&rdquo;
            </p>
            <p className="text-sm text-brand-muted/60 max-w-xl leading-relaxed">
              A prep batch has a quantity, a storage type, a shelf life, and a freshness status. It gets planned, shopped for, cooked, scheduled, and consumed. Every screen either creates that object or acts on it. Once I named this, the architecture became obvious.
            </p>
          </div>

          <div className="bg-brand-raised rounded-2xl px-7 py-8 mb-8 border border-brand-accent/10">
            <p className="text-xs text-brand-muted/40 uppercase tracking-widest font-medium mb-3">The harder problem</p>
            <p className="text-lg font-bold text-brand-muted leading-snug mb-3">
              First-time activation is easy. Weekly return behavior is the real design challenge.
            </p>
            <p className="text-sm text-brand-muted/60 max-w-xl leading-relaxed">
              A meal prep tool is only useful if users come back every Sunday. That meant designing for the cycle — not just the first session. A dashboard that surfaces the one most-relevant next action. A streak tracker that rewards consistency. A reset prompt that fires at the right moment. Prep sessions that end with &ldquo;Covered through Thursday&rdquo; instead of &ldquo;Logged.&rdquo;
            </p>
          </div>

          <p className="text-xs text-brand-accent font-semibold uppercase tracking-widest mb-5">How that shaped the strategy</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Opinionated workflow, flexible choices", body: "The sequence is fixed: plan → shop → prep → schedule → eat. Within each step, real flexibility. Structure where it matters; freedom everywhere else." },
              { title: "Food as a living object",               body: "A prep batch isn't a log entry. It has real-time state: servings remaining, scheduled slots, days until expiration. Every screen reflects current state." },
              { title: "Designed for weekly return",            body: "Onboarding captures prep frequency and weekly targets. The dashboard zones, streak tracking, coverage estimates, and weekly reset trigger all reinforce the recurring habit — not just the first prep session." },
            ].map((item) => (
              <Card key={item.title}>
                <h4 className="text-sm font-semibold text-brand-muted mb-2">{item.title}</h4>
                <p className="text-sm text-brand-muted/60 leading-relaxed">{item.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── INTERACTIVE DEMOS ── */}
        <section id="demos" className="mb-16">
          <Label>Interactive Demos</Label>
          <SectionHeading>Interactive demos of the highest-leverage product decisions behind FreshPrep.</SectionHeading>
          <div className="space-y-1 text-sm text-brand-muted/50 mb-12 max-w-xl">
            <p>The app also has an Android build, so the flows were designed for real mobile use.</p>
            <p>Each demo shows one product decision behind the weekly meal-prep loop.</p>
          </div>

          <div className="space-y-20">
            <DemoSection
              subtitle="Planning Design"
              title="Plan with flexibility, commit at prep time"
              problem="Users planning ahead don't always know which recipe they'll actually make. Forcing a single choice at plan time creates friction and inaccurate records."
              insight="Select multiple options at plan time; commit to one at prep time when the decision is actually made. Flexible intent, precise record."
            >
              <RecipeVariantDemo />
            </DemoSection>

            <DemoSection
              subtitle="Inventory Design"
              title="Know exactly what's ready"
              problem="Without a visible inventory, users forget what they prepped, miss expiration windows, and repeat the same meal because they can't see their options."
              insight="The prep batch is stateful — not a note. Quantity, storage type, and freshness status are always visible. Prevents all four failure modes without requiring extra user action."
            >
              <FreshnessInventoryDemo />
            </DemoSection>

            <DemoSection
              subtitle="Scheduling Design"
              title="Schedule from inventory, not from ideas"
              problem="Without a scheduling layer over a real inventory, users eat whatever's most visible. Variety and intention get lost by Tuesday."
              insight="The calendar is a consumption interface over real inventory — not an abstract planner. Swap is always available; eaten meals lock out of further changes."
            >
              <ScheduleSwapDemo />
            </DemoSection>

            <DemoSection
              subtitle="Retention Design"
              title="The weekly return loop"
              problem="A meal prep tool has to be useful after the first prep session. The harder problem is getting users to return when the next week starts."
              insight="The dashboard shows one useful next action, weekly progress, and momentum. Prep completion uses benefit-first language like 'Covered through Thursday.' The system is designed around the weekly return loop, not just first-time setup."
            >
              <RetentionLoopDemo />
            </DemoSection>
          </div>
        </section>

        <Divider />

        {/* ── KEY DECISIONS + TRADEOFFS ── */}
        <section id="decisions" className="mb-16">
          <Label>Key Decisions</Label>
          <SectionHeading>What I chose and why.</SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: "Shopping gate before prep queue",
                body: "Early design auto-converted plans to a prep queue. Changed to a user-initiated 'Send to Prep' after shopping is confirmed. Prevents prep records from appearing before the user has shopped — which corrupts the inventory and breaks trust in freshness data.",
                tradeoff: "Speed vs. accuracy",
              },
              {
                title: "Local storage over a backend",
                body: "All data lives on the device. No account, no signup, no sync. Removes every barrier between installing and using. The cost — no multi-device sync — is the right tradeoff for MVP.",
                tradeoff: "Offline-first vs. sync",
              },
              {
                title: "No auto-fill calendar",
                body: "Auto-fill was considered and rejected. Users decide meal distribution after cooking, not before. An algorithm making that decision would be wrong too often — and when it's wrong, it breaks trust in the whole system.",
                tradeoff: "Automation vs. control",
              },
              {
                title: "Two recipe types, not one",
                body: "The Protein Plate use case — Protein + Carb + Vegetable — doesn't fit a base-plus-variants model. A distinct mix-and-match type correctly models how a large portion of meal prep actually works.",
                tradeoff: "Simplicity vs. accuracy",
              },
              {
                title: "Coverage language over inventory counts",
                body: "The product says 'Covered through Thursday' instead of '5 meals remaining.' Users want operational confidence, not arithmetic. The estimate derives automatically from their inventory and prep frequency preference collected at onboarding.",
                tradeoff: "Clarity vs. precision",
              },
              {
                title: "Freshness as a passive safety layer",
                body: "Shelf life auto-calculated (4 days fridge, 90 days frozen). Expired meals don't appear in scheduling. Freshness bar visible on every card. Prevents food waste without requiring any user action to maintain it.",
                tradeoff: "Visibility vs. clutter",
              },
              {
                title: "Onboarding preferences power multiple features",
                body: "A 2-minute onboarding captures meals per week, meal types, and prep frequency. Those answers feed the weekly target progress bar, coverage estimates, and planning adherence metrics in Insights. One setup step; cascading product intelligence.",
                tradeoff: "Upfront cost vs. downstream value",
              },
              {
                title: "Progress behind a header icon, not a nav tab",
                body: "Insights are available from the header instead of becoming another primary tab. The core workflow stays simple, while progress data remains one tap away.",
                tradeoff: "Discoverability vs. navigation clarity",
              },
            ].map((item) => (
              <Card key={item.title}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-semibold text-brand-muted">{item.title}</h4>
                  <span className="text-xs text-brand-accent/60 border border-brand-accent/20 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">{item.tradeoff}</span>
                </div>
                <p className="text-sm text-brand-muted/60 leading-relaxed">{item.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── MVP SCOPE + EVOLUTION ── */}
        <section id="scope" className="mb-16">
          <Label>Scope & Evolution</Label>
          <SectionHeading>What shipped, what didn&apos;t, and what changed during build.</SectionHeading>

          {/* What shipped */}
          <div className="bg-brand-surface border border-brand-raised/40 rounded-xl overflow-hidden mb-6">
            <div className="px-4 py-2.5 bg-brand-raised">
              <p className="text-xs font-semibold text-brand-muted/60 uppercase tracking-wider">Shipped in MVP</p>
            </div>
            <div className="divide-y divide-brand-raised/20">
              {[
                ["Recipe management (two distinct types)",             "Foundation — two types needed to correctly model different meal structures."],
                ["Plan screen with flexible selection",                "Core planning workflow. Single or multi-option selection per recipe."],
                ["Shopping list with quantity scaling",                "Auto-generates from plan, scaled by servings, sorted by store category."],
                ["Prep logging (from queue + manual)",                 "Two paths to a prep record — planned workflow or ad-hoc."],
                ["Prep batch inventory + freshness tracking",          "The core value proposition. Real-time state: servings, expiration, storage type."],
                ["Calendar scheduling (daily + weekly views)",         "Distributes inventory across the week. Swap and eaten-state tracking included."],
                ["Onboarding with preference capture",                 "3-screen setup: meals/week, meal types, prep frequency. Preferences cascade into target tracking, coverage estimates, and planning adherence metrics."],
                ["Three-zone dashboard (TODAY / THIS WEEK / MOMENTUM)", "Each zone serves a different cognitive register. TODAY surfaces the single most-relevant next action. THIS WEEK tracks schedule progress toward the user's target. MOMENTUM shows streak and consistency data."],
                ["Streak tracking + Insights modal",                   "Week-over-week consistency earns a visible streak. Insights (via persistent header icon) surfaces consistency, execution, and planning metrics over the user's full history."],
                ["Full offline operation",                             "No account, no network dependency. All state in local device storage."],
              ].map(([feature, reason]) => (
                <div key={feature} className="px-4 py-3 flex gap-4 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-brand-muted/80">{feature}</p>
                    <p className="text-xs text-brand-muted/40 mt-0.5">{reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What was delayed */}
          <div className="mb-10">
            <p className="text-xs text-brand-muted/40 uppercase tracking-wider font-medium mb-3">What I intentionally delayed</p>
            <p className="text-sm text-brand-muted/50 leading-relaxed mb-3 max-w-2xl">
              FreshPrep&apos;s first version focused on the weekly execution loop. Features that didn&apos;t strengthen that loop were deferred.
            </p>
            <div className="bg-brand-surface border border-brand-raised/40 rounded-xl overflow-hidden">
              <div className="divide-y divide-brand-raised/20">
                {[
                  ["Nutrition tracking",           "Already crowded, and not the core failure point. FreshPrep is about follow-through after cooking."],
                  ["Push notifications",           "Useful once the timing logic is proven. Expiration reminders are a natural next step, not required for v1."],
                  ["Multi-user sharing",           "Requires a backend. Validate the solo use case before adding household complexity."],
                  ["Grocery delivery integration", "Needs a third-party API. The shopping list covers the core need without the dependency."],
                  ["Recurring plan templates",     "Valuable once the recipe library is stable. Not needed to validate the core workflow."],
                  ["Shopping list persistence",    "Transactional by nature. Regenerates correctly from the plan on every prep cycle."],
                ].map(([item, reason]) => (
                  <div key={item} className="px-4 py-3 flex gap-4 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-raised/80 mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-brand-muted/60">{item}</p>
                      <p className="text-xs text-brand-muted/40 mt-0.5">{reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-brand-muted/40 mt-3 italic">The goal was not fewer features. It was a clearer product.</p>
          </div>

          {/* What changed during build — accordion */}
          <p className="text-xs text-brand-accent font-semibold uppercase tracking-widest mb-4">What changed during build</p>
          <div className="space-y-2">
            {[
              {
                shift: "Plan screen became a prep queue, not a schedule",
                detail: "Originally framed as a weekly meal schedule. Building it revealed that 'what to cook' and 'what to eat on Tuesday' are different cognitive tasks that happen at different times. The plan tells you what to cook. The calendar tells you when to eat it.",
              },
              {
                shift: "Mix-and-match recipes required a second recipe type",
                detail: "The Protein Plate use case — Protein + Carb + Vegetable — doesn't fit a base + flavor variant model. A distinct recipe type for component-based meals was necessary rather than forcing it into the existing structure.",
              },
              {
                shift: "Shopping needed a deliberate handoff to prep",
                detail: "Auto-converting a plan to a prep queue felt slick but created a real problem: prep records appearing before the user had actually shopped. The explicit 'Send to Prep' button isn't friction — it's a data integrity gate.",
              },
              {
                shift: "The home screen evolved from a stat strip to a three-zone command center",
                detail: "The first version was a simple stat strip. Building it showed that midweek check-ins, weekly planning, and momentum are different jobs. Splitting the dashboard into TODAY, THIS WEEK, and MOMENTUM made the screen easier to read and easier to act on.",
              },
            ].map((item, i) => (
              <details key={item.shift} className="group bg-brand-surface border border-brand-raised/40 rounded-xl overflow-hidden">
                <summary className="flex gap-3 items-center px-4 py-3.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <div className="w-6 h-6 rounded-full bg-brand-raised border border-brand-accent/40 text-brand-accent text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  <h4 className="text-sm font-semibold text-brand-muted flex-1">{item.shift}</h4>
                  <svg className="w-4 h-4 text-brand-muted/30 group-open:rotate-180 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 pt-1 ml-9">
                  <p className="text-sm text-brand-muted/60 leading-relaxed">{item.detail}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── METRICS ── */}
        <section id="metrics" className="mb-16">
          <Label>Measuring Success</Label>
          <SectionHeading>How I&apos;d know if this is working.</SectionHeading>

          <p className="text-brand-muted/60 leading-relaxed mb-8 max-w-2xl">
            The hypothesis: visible inventory, freshness tracking, and scheduling keep prepped food from going to waste and habits from breaking down mid-week.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                category: "Activation",
                metrics: [
                  { name: "First prep batch logged",              why: "The core value object — without it, nothing else is useful." },
                  { name: "First meal scheduled to calendar",     why: "Indicates the full workflow loop engaged, not just partial setup." },
                  { name: "Shopping list generated and completed", why: "Signals the plan-to-shop handoff worked." },
                ],
              },
              {
                category: "Engagement",
                metrics: [
                  { name: "Meals prepped per week",     why: "The core behavior. Low here means the app isn't part of prep day." },
                  { name: "Schedule adherence rate",    why: "Meals eaten as scheduled vs. total scheduled — the scheduling layer's usefulness test." },
                  { name: "Quick swap usage",           why: "Healthy swaps = inventory trusted. Excessive = schedule-to-inventory mismatch." },
                ],
              },
              {
                category: "Retention",
                metrics: [
                  { name: "Weekly return rate",                    why: "Prep is weekly. Return week over week = using the product as designed." },
                  { name: "Repeat prep cycles completed",          why: "Full plan → consume loop more than once = genuine workflow adoption." },
                  { name: "Active prep weeks in last 30 days",     why: "Forgiving retention signal that accounts for irregular schedules." },
                ],
              },
              {
                category: "Product quality signals",
                metrics: [
                  { name: "Expired meal rate",                             why: "The core failure mode the product exists to prevent. High rate = freshness tracking not changing behavior." },
                  { name: "Meals rescheduled vs. abandoned",               why: "Rescheduled = system adapts. Abandoned = execution gap still breaking down." },
                  { name: "Time from prep logging to first scheduled meal", why: "Long gaps suggest scheduling friction." },
                ],
              },
            ].map(group => (
              <Card key={group.category}>
                <p className="text-xs text-brand-accent font-semibold uppercase tracking-wider mb-3">{group.category}</p>
                <div className="space-y-2.5">
                  {group.metrics.map(m => (
                    <div key={m.name}>
                      <p className="text-sm font-medium text-brand-muted/80">{m.name}</p>
                      <p className="text-xs text-brand-muted/40 leading-relaxed">{m.why}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── WHAT'S NEXT + REFLECTION ── */}
        <section id="next" className="mb-16">
          <Label>What&apos;s Next</Label>
          <SectionHeading>V2 priorities and what building this taught me.</SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { title: "Expiration push notifications",    priority: "High",   body: "Capacitor already integrated. 'Chicken expires tomorrow' closes the most visible freshness gap without changing the core model. Infrastructure is done; timing logic is next." },
              { title: "Smarter coverage forecasting",     priority: "Medium", body: "Current coverage estimate uses raw inventory count. V2 accounts for scheduled consumption and freshness tier — so a frozen batch doesn't inflate 'covered through' for this week." },
              { title: "Household inventory sharing",      priority: "Medium", body: "Two people, shared prep, split servings. Meaningful segment — but requires a backend. Validate the solo use case fully before adding household complexity." },
            ].map((item) => (
              <Card key={item.title}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-brand-muted">{item.title}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.priority === "High" ? "bg-brand-accent/20 text-brand-accent" : "bg-brand-raised/60 text-brand-muted/50"}`}>{item.priority}</span>
                </div>
                <p className="text-sm text-brand-muted/60 leading-relaxed">{item.body}</p>
              </Card>
            ))}
          </div>

          <p className="text-xs text-brand-accent font-semibold uppercase tracking-widest mb-5">What building this taught me</p>
          <div className="space-y-4 max-w-2xl">
            {[
              { title: "Name the central object early",        body: "The product got clearer once the prep batch became the central object. Everything else — planning, freshness, scheduling, and eating — serves that object." },
              { title: "Workflow gates are product decisions", body: "The 'Send to Prep' step looks like friction, but it protects data quality. Sometimes the right product choice is the slower one because it keeps the system trustworthy." },
              { title: "Retention is a design problem",        body: "Useful workflows do not automatically create repeat behavior. Return moments have to be designed: the reset prompt, coverage language, streak, and benefit-first completion state all exist for that reason." },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-brand-raised/80 pl-5">
                <h4 className="text-sm font-semibold text-brand-muted mb-1">{item.title}</h4>
                <p className="text-sm text-brand-muted/60 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── WHAT THIS PROJECT DEMONSTRATES ── */}
        <section className="mb-10">
          <Label>PM Signals in This Project</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              "Lifecycle product design",
              "Habit loop engineering",
              "MVP scope discipline",
              "Tradeoff documentation",
              "Operational UX",
              "Instrumentation design",
              "Recurring behavior design",
              "Constraint-based architecture",
            ].map(comp => (
              <div key={comp} className="bg-brand-surface border border-brand-raised/40 rounded-lg px-3 py-2.5 text-xs text-brand-muted/60 font-medium text-center">
                {comp}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <div className="bg-brand-raised border border-brand-accent/30 rounded-2xl px-8 py-10 text-center">
          <p className="text-sm text-brand-muted/50 mb-2">This project shows how I think about recurring real-world problems: reduce friction, build trust, and make repeat use easier.</p>
          <h3 className="text-xl font-bold text-brand-muted mb-5">If that&apos;s relevant to what you&apos;re building, I&apos;d welcome the conversation.</h3>
          <a
            href="mailto:garrett.bryce.young@gmail.com"
            className="inline-block px-6 py-2.5 bg-brand-accent text-brand-muted text-sm font-semibold rounded-full hover:bg-brand-accent/80 transition-colors"
          >
            garrett.bryce.young@gmail.com
          </a>
        </div>

      </article>
    </div>
  );
}
