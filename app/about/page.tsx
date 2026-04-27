import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About — Garrett Young" };

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 sm:py-20">
      <p className="text-xs text-site-emerald font-semibold uppercase tracking-widest mb-6">About</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-site-ink leading-tight mb-6">About Me</h1>

      <p className="text-site-secondary text-base sm:text-lg leading-relaxed mb-4">
        I&apos;m working toward product management through a background that combines design, production, and hands-on technical support.
      </p>
      <p className="text-site-secondary leading-relaxed mb-4">
        My degree in game design, with a producing focus, taught me how to think about scope, priorities, team
        coordination, and building within real constraints. Creating anything worthwhile means balancing ambition
        with time, resources, and what matters most to the user. That lesson applies just as much to software
        products as it does to games.
      </p>
      <p className="text-site-secondary leading-relaxed mb-14">
        Later, working in technical support and escalations gave me a different kind of product education. I saw
        where users got stuck, where workflows created friction, and how often the requested fix was different
        from the real problem. That experience made me comfortable working through ambiguity, identifying
        patterns, and focusing on root causes instead of surface symptoms.
      </p>

      <div className="space-y-5">

        <div className="bg-site-surface rounded-xl border border-site-border/25 p-7">
          <p className="text-xs text-site-emerald uppercase tracking-wider font-semibold mb-4">Why I Built a Portfolio</p>
          <p className="text-site-secondary leading-relaxed mb-3">
            I didn&apos;t want to rely only on resumes or interviews to explain how I think.
          </p>
          <p className="text-site-secondary leading-relaxed mb-4">
            It&apos;s easy to say you care about product decisions. It&apos;s harder to show your judgment through
            something real. I started building products so hiring managers could see how I approach scope,
            tradeoffs, and execution.
          </p>
          <p className="text-site-secondary leading-relaxed mb-4">
            FreshPrep is one example. It began with a practical problem around meal prep consistency and became
            a fully functional Android app built for personal use, with a clear MVP boundary, intentional
            feature cuts, and documented reasoning behind major decisions.
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
            I&apos;m especially interested in products that help people follow through.
          </p>
          <p className="text-site-secondary leading-relaxed mb-4">
            A lot of software promises value but asks too much from the user. Setup takes too long, workflows
            are clunky, or habits break because the product creates too much friction. Improving adoption and
            completion rates can be more valuable than adding another feature.
          </p>
          <p className="text-site-secondary leading-relaxed">
            I also enjoy products built around systems that change over time. Inventory, schedules, progress
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
          <p className="text-site-secondary leading-relaxed mb-4">
            Some of the best product decisions are the features that stay out of version one.
          </p>
          <p className="text-site-secondary leading-relaxed">
            In FreshPrep, several ideas were intentionally deferred so the first version could stay simple,
            usable, and valuable from day one. I see that kind of restraint as part of good product judgment.
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
          href="mailto:garrett.bryce.young@gmail.com"
          className="px-6 py-3 border border-site-border/40 text-site-ink text-sm font-medium rounded-full hover:border-site-accent/60 hover:bg-site-accent/10 transition-colors"
        >
          Get in touch
        </a>
      </div>
    </div>
  );
}
