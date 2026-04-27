"use client";

// All share the same dark structure from the current app palette
const BASE = {
  bg:      "#1C1F28",
  surface: "#2A3240",
  raised:  "#1E3A68",
  accent:  "#3D6A9A",
  ink:     "#CFD9E6",
  sec:     "#9AABB8",
  muted:   "#5A6A78",
};

const VARIANTS = [
  {
    name: "1 — Current",
    desc: "No warm accent. Steel blue does everything.",
    action: "#3D6A9A", actionText: "#CFD9E6",
    stat:   "#3D6A9A",
    label:  "#3D6A9A",
  },
  {
    name: "2 — Amber buttons only",
    desc: "Just the action buttons change. Minimal intervention.",
    action: "#F59E0B", actionText: "#1C1F28",
    stat:   "#3D6A9A",
    label:  "#3D6A9A",
  },
  {
    name: "3 — Amber buttons + emerald stats",
    desc: "Full analogous. Amber = action. Emerald = data. Two clear roles.",
    action: "#F59E0B", actionText: "#1C1F28",
    stat:   "#059669",
    label:  "#059669",
  },
  {
    name: "4 — Amber buttons + vivid emerald",
    desc: "Lighter emerald (#10B981) — more energy on the stats and labels.",
    action: "#F59E0B", actionText: "#1C1F28",
    stat:   "#10B981",
    label:  "#10B981",
  },
  {
    name: "5 — Gold buttons + emerald stats",
    desc: "Warmer, more muted than amber. Closer to current app's quieter tone.",
    action: "#D97706", actionText: "#fff",
    stat:   "#059669",
    label:  "#059669",
  },
  {
    name: "6 — Tangerine + emerald",
    desc: "Site's exact two-accent logic applied to app. Most contrast, least native.",
    action: "#F97316", actionText: "#fff",
    stat:   "#059669",
    label:  "#059669",
  },
  {
    name: "7 — Emerald buttons + amber stats",
    desc: "Flipped analogous. Emerald = action. Amber = data highlight. Unusual but distinctive.",
    action: "#059669", actionText: "#fff",
    stat:   "#F59E0B",
    label:  "#059669",
  },
  {
    name: "8 — Amber everywhere",
    desc: "Amber handles both action and stat roles. Single warm accent, no emerald.",
    action: "#F59E0B", actionText: "#1C1F28",
    stat:   "#F59E0B",
    label:  "#3D6A9A",
  },
  {
    name: "9 — Amber buttons + emerald labels only",
    desc: "Emerald appears only in labels, not stats. Subtlest two-accent version.",
    action: "#F59E0B", actionText: "#1C1F28",
    stat:   "#3D6A9A",
    label:  "#059669",
  },
  {
    name: "10 — Soft amber + muted emerald",
    desc: "Both accents pulled back in saturation — closest to current app's quieter feel.",
    action: "#D97706", actionText: "#1C1F28",
    stat:   "#0D9488",
    label:  "#0D9488",
  },
];

type V = typeof VARIANTS[0];

function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 99, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99 }} />
    </div>
  );
}

function AppMockup({ v }: { v: V }) {
  const meals = [
    { name: "Rice Bowl", sub: "Japanese BBQ", storage: "fridge", days: 1, shelf: 4, srv: 3, status: "expiring" as const },
    { name: "Protein Plate", sub: "Chicken · Brown Rice", storage: "fridge", days: 3, shelf: 4, srv: 4, status: "fresh" as const },
    { name: "Breakfast Burrito", sub: "", storage: "frozen", days: 76, shelf: 90, srv: 5, status: "fresh" as const },
  ];
  const statusColor = (s: "fresh"|"expiring"|"expired") =>
    s === "fresh" ? "#10B981" : s === "expiring" ? "#F59E0B" : "#EF4444";

  return (
    <div style={{ background: "#111", borderRadius: 18, padding: 2.5, boxShadow: "0 16px 40px rgba(0,0,0,0.6)" }}>
      <div style={{ background: BASE.bg, borderRadius: 16, overflow: "hidden", width: 240, fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" }}>

        {/* Header */}
        <div style={{ background: BASE.surface, borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "9px 12px", display: "flex", alignItems: "center", gap: 5 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BASE.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21 V13" /><path d="M12 16 C10 14 7 14 5 15 C6 18 9 18 12 16Z" />
            <path d="M12 13 C14 11 17 11 19 12 C18 15 15 15 12 13Z" /><path d="M12 13 C12 11 13 9 12 7" />
          </svg>
          <span style={{ color: BASE.ink, fontWeight: 700, fontSize: 13 }}>FreshPrep</span>
        </div>

        {/* Screen */}
        <div style={{ padding: "10px 10px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
            <div>
              <p style={{ color: v.label, fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 1 }}>Available Meals</p>
              <p style={{ color: BASE.ink, fontWeight: 700, fontSize: 13 }}>Meal Inventory</p>
            </div>
            <p style={{ color: BASE.sec, fontSize: 10 }}>3 ready</p>
          </div>

          {meals.map(m => {
            const sc = statusColor(m.status);
            const pct = Math.max(0, (m.days / m.shelf) * 100);
            const sl = m.status === "fresh" ? "Fresh" : m.status === "expiring" ? "Expiring" : "Expired";
            return (
              <div key={m.name} style={{ background: BASE.surface, borderRadius: 8, border: "1px solid rgba(255,255,255,0.05)", padding: "9px 9px 8px", marginBottom: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <div>
                    <p style={{ color: BASE.ink, fontWeight: 700, fontSize: 11, marginBottom: 1 }}>{m.name}</p>
                    {m.sub && <p style={{ color: BASE.sec, fontSize: 9 }}>{m.sub}</p>}
                  </div>
                  <span style={{ color: BASE.sec, fontSize: 8 }}>{m.storage === "fridge" ? "❄️" : "🧊"}</span>
                </div>
                <div style={{ display: "flex", gap: 10, fontSize: 9, marginBottom: 6 }}>
                  <span style={{ color: BASE.sec }}>Srv <span style={{ color: BASE.ink, fontWeight: 600 }}>{m.srv}</span></span>
                  <span style={{ color: BASE.sec }}>Unassigned <span style={{ color: BASE.ink, fontWeight: 600 }}>{m.srv - 1}</span></span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 8, fontWeight: 700, padding: "1px 6px", borderRadius: 99, background: `${sc}22`, color: sc, border: `1px solid ${sc}35` }}>{sl}</span>
                  <span style={{ color: BASE.muted, fontSize: 9 }}>{m.days}d</span>
                </div>
                <Bar pct={pct} color={sc} />
                <div style={{ display: "flex", gap: 5, marginTop: 7, paddingTop: 7, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <button style={{ flex: 1, background: v.action, color: v.actionText, border: "none", borderRadius: 5, padding: "5px 0", fontSize: 9, fontWeight: 700 }}>
                    Schedule
                  </button>
                  <button style={{ padding: "5px 8px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 5, color: BASE.sec, fontSize: 9 }}>
                    Remove
                  </button>
                </div>
              </div>
            );
          })}

          {/* Stats row */}
          <div style={{ display: "flex", gap: 12, padding: "8px 2px 10px", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: 2 }}>
            {[["4", "Failure modes"], ["14", "Features cut"], ["3", "Flows"]].map(([n, l]) => (
              <div key={l}>
                <p style={{ color: v.stat, fontWeight: 800, fontSize: 16 }}>{n}</p>
                <p style={{ color: BASE.muted, fontSize: 8 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom nav */}
        <div style={{ background: BASE.surface, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", padding: "6px 0 10px" }}>
          {["Plan", "Prep", "Cal", "Meals", "Rec"].map((tab, i) => (
            <div key={tab} style={{ flex: 1, textAlign: "center" }}>
              <p style={{ color: i === 3 ? v.action : BASE.muted, fontSize: 8, fontWeight: i === 3 ? 700 : 500 }}>{tab}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Compare() {
  return (
    <div style={{ background: "#050A10", minHeight: "100vh", padding: "44px 36px 60px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>

        <p style={{ color: "#646E78", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>App palette variations</p>
        <h1 style={{ color: "#C8E4F5", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Current → Analogous — 10 options</h1>
        <p style={{ color: "#646E78", fontSize: 12, marginBottom: 36 }}>
          All share the same dark surfaces. Only the action and accent colors vary. #1 is current. #3 is the full analogous.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 28, marginBottom: 28 }}>
          {VARIANTS.slice(0, 5).map(v => (
            <div key={v.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <AppMockup v={v} />
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "#C8E4F5", fontWeight: 700, fontSize: 11, marginBottom: 3 }}>{v.name}</p>
                <p style={{ color: "#646E78", fontSize: 10, lineHeight: 1.5 }}>{v.desc}</p>
                <div style={{ display: "flex", gap: 5, justifyContent: "center", marginTop: 8 }}>
                  <div title={v.action} style={{ width: 18, height: 18, borderRadius: 4, background: v.action, border: "1px solid rgba(255,255,255,0.1)" }} />
                  <div title={v.stat} style={{ width: 18, height: 18, borderRadius: 4, background: v.stat, border: "1px solid rgba(255,255,255,0.1)" }} />
                  <div title={v.label} style={{ width: 18, height: 18, borderRadius: 4, background: v.label, border: "1px solid rgba(255,255,255,0.1)" }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 28 }}>
          {VARIANTS.slice(5).map(v => (
            <div key={v.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <AppMockup v={v} />
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "#C8E4F5", fontWeight: 700, fontSize: 11, marginBottom: 3 }}>{v.name}</p>
                <p style={{ color: "#646E78", fontSize: 10, lineHeight: 1.5 }}>{v.desc}</p>
                <div style={{ display: "flex", gap: 5, justifyContent: "center", marginTop: 8 }}>
                  <div title={v.action} style={{ width: 18, height: 18, borderRadius: 4, background: v.action, border: "1px solid rgba(255,255,255,0.1)" }} />
                  <div title={v.stat} style={{ width: 18, height: 18, borderRadius: 4, background: v.stat, border: "1px solid rgba(255,255,255,0.1)" }} />
                  <div title={v.label} style={{ width: 18, height: 18, borderRadius: 4, background: v.label, border: "1px solid rgba(255,255,255,0.1)" }} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
