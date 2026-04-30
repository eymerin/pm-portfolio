import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Garrett Young",
  description: "Resume of Garrett Young, Product Manager / Product-Focused Technical Professional.",
};

const EXPERIENCE = [
  {
    company: "JobNimbus",
    location: "Lehi, UT",
    roles: [
      { title: "Escalations Specialist (Product-Focused)", dates: "May 2025 – Present" },
      { title: "Technical Support Specialist",             dates: "Feb 2025 – May 2025"  },
    ],
    bullets: [
      "Led discovery and validation of multiple CRM feature opportunities using customer feedback, support data, and competitive research",
      "Developed and presented product proposals to VP and Director of Product, including market fit analysis, development and testing phases, and go-to-market considerations",
      "Built working proof-of-concept implementations for proposed features, including an AI-guided API integration assistant enabling natural-language integration setup",
      "Leading iteration on the AI assistant with MCP-based context grounding for accurate, account-specific guidance",
      "Managed experimental AI token budget to maximize learning while maintaining cost discipline",
      "Coordinated incident and outage response with Engineering, assessing user impact and contributing to post-incident reliability improvements",
      "Delivered internal training and documentation to support feature adoption and reduce repeat support issues",
      "Acted as a product point person for under-owned feature areas, improving prioritization clarity and time-to-resolution",
    ],
  },
  {
    company: "EasyPost",
    location: "Lehi, UT",
    roles: [
      { title: "Technical Support Engineer", dates: "July 2024 – Jan 2025" },
    ],
    bullets: [
      "Provided technical support for shipping software and APIs, diagnosing integration and workflow failures",
      "Investigated issues using SQL and internal tooling to validate data integrity",
      "Created customer-facing and internal documentation to improve onboarding and reduce repeat inquiries",
      "Supported incident response and customer enablement efforts, translating technical workflows into clearer onboarding documentation",
      "Partnered with engineering teams to resolve urgent incidents and improve system reliability",
    ],
  },
  {
    company: "Verizon Wireless",
    location: "Riverton, UT",
    roles: [
      { title: "Sales Specialist", dates: "Sept 2022 – July 2024" },
    ],
    bullets: [
      "Developed and executed sales strategies to increase customer acquisition and retention, exceeding annual quota by 25%+",
      "Delivered in-store technical troubleshooting and translated complex technical problems into clear recommendations",
      "Managed inventory flow and high-demand launches, balancing operational execution with customer satisfaction",
      "Earned top-tier district sales ranking through consistent performance and customer advocacy",
    ],
  },
  {
    company: "Grandeur Photography",
    location: "Severance, CO",
    roles: [
      { title: "Founder / Photographer", dates: "June 2021 – May 2023" },
    ],
    bullets: [
      "Founded and operated an independent business, owning end-to-end service design, pricing, marketing, and client experience",
      "Gathered and analyzed client feedback to refine offerings and drive repeat business",
      "Built and maintained a customer-facing website to support discovery, portfolio review, and booking",
      "Managed scheduling, finances, and vendor relationships to sustain profitable operations",
    ],
  },
  {
    company: "University of Utah Hospital",
    location: "Salt Lake City, UT",
    roles: [
      { title: "Health Information Specialist", dates: "Mar 2014 – June 2020" },
    ],
    bullets: [
      "Managed release-of-information requests for insurance billing, audits, and legal cases while ensuring strict compliance with HIPAA and hospital privacy policies",
      "Worked daily in Epic and PowerChart electronic medical record systems to retrieve, validate, and audit patient documentation across multiple departments",
      "Performed large-scale medical record indexing and classification using OnBase, improving document accessibility and audit readiness",
      "Evaluated existing physical inventory workflows and led the selection and implementation of a new warehouse management system for archived records, improving tracking accuracy and retrieval times",
      "Analyzed operational gaps in record retention and access policies to better align with state and federal regulations, and presented recommendations to senior hospital leadership; proposed changes were adopted organization-wide",
      "Acted as a liaison between frontline operations, IT, compliance teams, and hospital administrators to improve systems, workflows, and regulatory alignment",
    ],
  },
];

const SKILLS = [
  "Product Discovery & Roadmapping",
  "Agile / Scrum",
  "Stakeholder Management",
  "Data Analysis & Reporting",
  "API Integrations & Technical Troubleshooting",
  "CRM Platforms",
  "SQL, Python, Javascript",
  "MVC Software Development",
  "HIPAA Compliance & Healthcare Systems",
  "Epic, PowerChart, OnBase",
  "Incident & Outage Response",
];

export default function Resume() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 sm:py-20">

      {/* ── HEADER ── */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-site-ink leading-tight mb-1">
          Garrett Young
        </h1>
        <p className="text-site-secondary text-base mb-5">
          Product Manager / Product-Focused Technical Professional
        </p>

        <div className="text-sm text-site-muted space-y-1 mb-7">
          <p>South Jordan, UT</p>
          <p>
            <a href="mailto:garrett.bryce.young@gmail.com" className="hover:text-site-ink transition-colors">
              garrett.bryce.young@gmail.com
            </a>
            {" · "}
            <a href="tel:8018399110" className="hover:text-site-ink transition-colors">
              801-839-9110
            </a>
          </p>
          <p>
            <a
              href="https://linkedin.com/in/garrett-young-274179245"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-site-ink transition-colors"
            >
              linkedin.com/in/garrett-young-274179245
            </a>
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <a
            href="/Garrett_Young_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-site-warm text-white text-sm font-bold rounded-full hover:bg-site-warm/85 transition-colors"
          >
            View PDF
          </a>
          <a
            href="/Garrett_Young_Resume.pdf"
            download="Garrett_Young_Resume.pdf"
            className="px-5 py-2.5 border border-site-border/40 text-site-ink text-sm font-medium rounded-full hover:border-site-accent/60 hover:bg-site-accent/10 transition-colors"
          >
            Download PDF
          </a>
        </div>
      </div>

      <div className="border-t border-site-border/20 mb-10" />

      {/* ── SUMMARY ── */}
      <section className="mb-12">
        <p className="text-xs text-site-emerald font-semibold uppercase tracking-widest mb-4">Summary</p>
        <p className="text-site-secondary leading-relaxed">
          Product-focused technical professional with hands-on experience in SaaS product discovery,
          opportunity validation, and early-stage delivery. Rapidly promoted within a CRM company
          from Tier 1 to Tier 2 support and escalations, now partnering closely with Product and
          Engineering to identify feature gaps, validate solutions with real user and market data, and
          prototype product improvements. Currently leading iteration on an AI-guided API
          integration assistant designed to reduce integration friction and support burden. Strong
          technical foundation in APIs, full-stack development, AI-enabled systems, and data-driven
          problem solving.
        </p>
      </section>

      <div className="border-t border-site-border/20 mb-10" />

      {/* ── EXPERIENCE ── */}
      <section className="mb-12">
        <p className="text-xs text-site-emerald font-semibold uppercase tracking-widest mb-8">Professional Experience</p>

        <div className="space-y-10">
          {EXPERIENCE.map((job) => (
            <div key={job.company}>
              <div className="mb-3">
                <p className="text-base font-semibold text-site-ink">
                  {job.company} <span className="font-normal text-site-muted">— {job.location}</span>
                </p>
                {job.roles.map((role) => (
                  <p key={role.title} className="text-sm text-site-secondary mt-0.5">
                    {role.title}
                    <span className="text-site-muted"> | {role.dates}</span>
                  </p>
                ))}
              </div>
              <ul className="space-y-2">
                {job.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3 items-start text-sm text-site-secondary leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-site-muted mt-1.5 shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-site-border/20 mb-10" />

      {/* ── SKILLS ── */}
      <section className="mb-10">
        <p className="text-xs text-site-emerald font-semibold uppercase tracking-widest mb-5">Skills</p>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 bg-site-surface border border-site-border/25 rounded-lg text-xs text-site-secondary"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

    </div>
  );
}
