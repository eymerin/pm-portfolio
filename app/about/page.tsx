import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About — Garrett Young" };

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 sm:py-20">
      <p className="text-xs text-site-emerald font-semibold uppercase tracking-widest mb-6">About</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-site-ink leading-tight mb-6">About Me</h1>

      <p className="text-site-secondary text-base sm:text-lg leading-relaxed mb-4">
        I come from technical support, implementation, and customer-facing operations — the side of software where product decisions meet real-world use.
      </p>
      <p className="text-site-secondary leading-relaxed mb-4">
        Working directly with users taught me where friction builds, where workflows break down, and which requests are symptoms rather than real opportunities.
      </p>
      <p className="text-site-secondary leading-relaxed mb-14">
        I&apos;m pursuing product roles because I already think in product terms: user pain, prioritization, tradeoffs, workflows, and outcomes.
      </p>

      <div className="space-y-5">

        <div className="bg-site-surface rounded-xl border border-site-border/25 p-7">
          <p className="text-xs text-site-emerald uppercase tracking-wider font-semibold mb-4">Why I Built a Portfolio</p>
          <p className="text-site-secondary leading-relaxed mb-4">
            I build products because nothing sharpens judgment faster than turning ideas into something real.
          </p>
          <p className="text-site-secondary leading-relaxed mb-4">
            This portfolio is meant to show how I frame problems, make tradeoffs, and turn product thinking into working software.
          </p>
          <p className="text-site-secondary leading-relaxed mb-4">
            FreshPrep started as a practical problem around meal prep consistency and became a working Android app focused on weekly follow-through. MakePerfect explores a different kind of follow-through: structured practice for people who already show up but still are not improving.
          </p>
          <p className="text-site-secondary leading-relaxed mb-4">My portfolio is meant to show the parts of product work that matter most to me:</p>
          <ul className="space-y-1.5 mb-0">
            {[
              "Clear problem definition",
              "Practical prioritization",
              "Thoughtful scope control",
              "Useful execution over flashy ideas",
              "Decisions that can be explained plainly",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-site-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-site-warm mt-1.5 shrink-0 inline-block" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-site-surface rounded-xl border border-site-border/25 p-7">
          <p className="text-xs text-site-emerald uppercase tracking-wider font-semibold mb-4">What I Like Working On</p>
          <p className="text-site-secondary leading-relaxed mb-4">
            I&apos;m especially interested in products that help people follow through when the hard part is execution, not intent.
          </p>
          <p className="text-site-secondary leading-relaxed mb-4">
            A lot of software promises value but asks too much from the user. Setup takes too long, workflows
            get clunky, and habits break because the product creates too much friction. Improving adoption and
            completion can be more valuable than adding another feature.
          </p>
          <p className="text-site-secondary leading-relaxed">
            I also enjoy products built around systems that change over time: inventory, schedules, progress
            tracking, recurring workflows, and anything where people need confidence that the current state is
            accurate. Those products reward careful thinking and clear UX.
          </p>
        </div>

        <div className="bg-site-surface rounded-xl border border-site-border/25 p-7">
          <p className="text-xs text-site-emerald uppercase tracking-wider font-semibold mb-4">How I Think About Scope</p>
          <p className="text-site-secondary leading-relaxed mb-4">
            Scope determines whether a product stays focused or becomes harder to use.
          </p>
          <p className="text-site-secondary leading-relaxed mb-4">
            I try to protect the core outcome first. If a feature strengthens the main job the user needs done,
            it deserves consideration. If it distracts from that outcome, creates complexity too early, or
            depends on something unproven, it can wait.
          </p>
          <p className="text-site-secondary leading-relaxed">
            Some of the best product decisions are the things that stay out of version one. I&apos;m drawn to focused products where the core workflow is clear before the roadmap expands.
          </p>
        </div>

      </div>

      <div className="mt-10 flex gap-4 flex-wrap">
        <Link
          href="/projects/freshprep"
          className="px-6 py-3 bg-site-warm text-white text-sm font-bold rounded-full hover:bg-site-warm/85 transition-colors"
        >
          View FreshPrep Case Study
        </Link>
        <a
          href="https://linkedin.com/in/garrett-young-274179245"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-site-border/40 text-site-ink text-sm font-medium rounded-full hover:border-site-accent/60 hover:bg-site-accent/10 transition-colors"
        >
          Connect on LinkedIn
        </a>
      </div>
    </div>
  );
}
