import Link from "next/link";

export default function Home() {
  return (
    <div>

      {/* ── HERO ── */}
      <section className="hero-glow relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-20 sm:pt-28 sm:pb-32">
          <p className="text-sm text-site-secondary mb-3">
            Hi, I&apos;m <span className="text-site-ink font-semibold">Garrett Young</span>, a PM candidate who builds working products, not just presentations.
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold text-site-ink leading-[1.08] tracking-tight max-w-3xl mb-6">
            I turn user problems<br />
            into shipped products.
          </h1>
          <p className="text-base sm:text-lg text-site-secondary max-w-lg leading-relaxed mb-10">
            My background spans design, production, and technical support, where I learned to spot the gap between what products promise and where users actually get stuck.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/projects/freshprep"
              className="px-6 py-3 bg-site-warm text-white text-sm font-bold rounded-full hover:bg-site-warm/85 transition-colors shadow-lg"
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
      </section>

      <div className="divider-fade mx-6" />

      {/* ── FEATURED PROJECT ── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-xs text-site-emerald uppercase tracking-widest font-semibold mb-8">Featured Project</p>

        <div className="bg-site-surface rounded-2xl p-8 border border-site-border/25">

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-site-ink">FreshPrep</h2>
          </div>

          <div className="border-l-2 border-site-emerald pl-5 mb-8">
            <p className="text-base text-site-ink font-medium leading-relaxed">
              &ldquo;The unit of value isn&apos;t the recipe. It&apos;s the prepped batch.&rdquo;
            </p>
            <p className="text-xs text-site-muted mt-1.5">— the insight that shaped the entire product</p>
          </div>

          <p className="text-site-secondary text-sm leading-relaxed mb-8 max-w-xl">
            Meal prep fails after cooking, not before it. FreshPrep solves the operational gap: tracking what you made,
            how much is left, whether it&apos;s still fresh, and what to eat this week.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-site-border/20 mb-8">
            {([
              { n: "4",          label: "User failure modes solved",  sub: null },
              { n: "Scope",      label: "Intentional tradeoffs",      sub: "Focused v1 on the workflows most likely to create immediate value." },
              { n: "Lifecycle",  label: "Plan → prep → repeat",       sub: null },
              { n: "0",          label: "Accounts required to start", sub: null },
            ] as { n: string | null; label: string; sub: string | null }[]).map((stat) => (
              <div key={stat.label}>
                {stat.n !== null && <p className="text-3xl font-bold text-site-emerald">{stat.n}</p>}
                <p className={stat.n !== null ? "text-xs text-site-muted mt-1" : "text-sm font-semibold text-site-ink mb-1"}>
                  {stat.label}
                </p>
                {stat.sub && <p className="text-xs text-site-muted mt-0.5 leading-relaxed">{stat.sub}</p>}
              </div>
            ))}
          </div>

          <Link
            href="/projects/freshprep"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-site-emerald text-white text-sm font-bold rounded-full hover:bg-site-emerald/85 transition-colors shadow-lg"
          >
            Read the full case study
          </Link>

        </div>
      </section>

      {/* ── POINT OF VIEW ── */}
      <section className="bg-site-raised">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-xs text-site-emerald uppercase tracking-widest font-semibold mb-2">Point of view</p>
          <h2 className="text-2xl font-bold text-site-ink mb-3">The product problems I&apos;m drawn to</h2>
          <p className="text-site-secondary text-sm mb-10 max-w-lg">
            These are patterns I&apos;ve seen in support escalations, product proposals, and the products I built for this portfolio.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Execution gaps, not inspiration gaps",
                body: "The user often knows what they want to do. The harder part is following through consistently. Most apps try to solve that with reminders or motivation, but the better question is where the workflow breaks.",
              },
              {
                title: "Objects with a lifecycle",
                body: "Some product objects have real state: a prep batch, a support ticket, a reservation. They get created, updated, consumed, and resolved. That is where small UX decisions start to carry real weight.",
              },
              {
                title: "The seam between deciding and doing",
                body: "Planning tools exist everywhere, and logging tools do too. The more interesting product gap is the handoff between deciding and actually doing.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-site-bg/50 border border-site-bg/60 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-site-ink mb-3">{item.title}</h3>
                <p className="text-sm text-site-secondary leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-site-surface rounded-2xl px-6 py-10 sm:px-10 sm:py-14 text-center border border-site-border/25 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-48 bg-site-warm/10 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <p className="text-xs text-site-emerald font-semibold uppercase tracking-widest mb-3">Actively seeking PM roles</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-site-ink mb-4">Let&apos;s talk product</h2>
            <p className="text-site-secondary text-base mb-3 max-w-sm mx-auto leading-relaxed">
              If your team is building products where execution, adoption, or workflow friction matters, I&apos;d welcome the conversation.
            </p>
            <p className="text-site-muted text-sm mb-6">garrett.bryce.young@gmail.com</p>
            <a
              href="https://linkedin.com/in/garrett-young-274179245"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 bg-site-warm text-white text-sm font-bold rounded-full hover:bg-site-warm/85 transition-colors shadow-lg"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
