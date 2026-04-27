import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Projects — Garrett Young" };

export default function Projects() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <p className="text-xs text-site-emerald font-semibold uppercase tracking-widest mb-6">Portfolio</p>
      <h1 className="text-4xl font-bold text-site-ink leading-tight mb-4">Projects</h1>
      <p className="text-site-secondary text-base mb-14 max-w-xl leading-relaxed">
        Shipped prototypes built to demonstrate specific PM competencies. Not ideas — executed products with documented decisions.
      </p>

      <div className="space-y-4">
        <Link href="/projects/freshprep" className="group block">
          <div className="bg-site-surface rounded-2xl p-8 border border-site-border/25 hover:border-site-accent/50 transition-all duration-300">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-60">
                <h2 className="text-xl font-bold text-site-ink mb-2">FreshPrep</h2>
                <p className="text-sm text-site-secondary leading-relaxed max-w-md">
                  A meal prep execution system. Built around the insight that meal prep fails after
                  cooking, not before it. 14 features cut with documented rationale. Shipped as a
                  native Android app.
                </p>
              </div>
              <span className="text-sm text-site-muted group-hover:text-site-emerald transition-colors font-medium self-center shrink-0">
                View case study
              </span>
            </div>
          </div>
        </Link>

        <Link href="/projects/skilltrainer" className="group block">
          <div className="bg-site-surface rounded-2xl p-8 border border-site-border/25 hover:border-indigo-500/40 transition-all duration-300">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-60">
                <h2 className="text-xl font-bold text-site-ink mb-2">MakePerfect</h2>
                <p className="text-sm text-site-secondary leading-relaxed max-w-md">
                  A universal structured practice system for self-directed learners. Domain-agnostic
                  by design — the same system for guitar, basketball, coding, or anything else. Built
                  around deliberate routines, guided sessions, and honest completion tracking.
                </p>
              </div>
              <span className="text-sm text-site-muted group-hover:text-indigo-400 transition-colors font-medium self-center shrink-0">
                View case study
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
