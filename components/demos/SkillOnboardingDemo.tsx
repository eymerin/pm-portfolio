"use client";
import { useState } from "react";

const bg      = "#0f0f0f";
const surface = "#171717";
const border  = "#262626";
const accent  = "#4f9eff";
const success = "#3ecf8e";
const text    = "#f0f0f0";
const sec     = "#888";

type Screen = "welcome" | "category" | "preview" | "success" | "home";

const CATEGORIES = [
  { key: "guitar",     icon: "🎸", label: "Guitar"     },
  { key: "basketball", icon: "🏀", label: "Basketball" },
  { key: "coding",     icon: "💻", label: "Coding"     },
  { key: "language",   icon: "🗣️", label: "Language"  },
  { key: "fitness",    icon: "🏋️", label: "Fitness"   },
  { key: "other",      icon: "✏️", label: "Other"      },
];

const PACKS: Record<string, { subject: string; skills: string[]; exercises: number; routines: string[] }> = {
  guitar:     { subject: "Guitar",     skills: ["Fingerpicking", "Scales", "Chord Changes"], exercises: 8, routines: ["Morning Warm-Up", "Technique Builder"] },
  basketball: { subject: "Basketball", skills: ["Shooting", "Ball Handling", "Conditioning"], exercises: 9, routines: ["Shooting Clinic", "Ball Handling Drill"] },
  coding:     { subject: "Coding",     skills: ["Data Structures", "Algorithms", "Problem Solving"], exercises: 9, routines: ["Daily Practice", "Interview Prep"] },
  language:   { subject: "Language",   skills: ["Vocabulary", "Grammar", "Speaking"], exercises: 9, routines: ["Daily Study", "Intensive Review"] },
  fitness:    { subject: "Fitness",    skills: ["Strength", "Cardio", "Flexibility"], exercises: 9, routines: ["Morning Routine", "Full Body Workout"] },
  other:      { subject: "My Practice", skills: ["Core Skill", "Supporting Skill", "Applied Practice"], exercises: 6, routines: ["Practice Session"] },
};

export default function SkillOnboardingDemo() {
  const [screen, setScreen]     = useState<Screen>("welcome");
  const [category, setCategory] = useState<string>("guitar");
  const [slideKey, setSlideKey] = useState(0);

  function go(to: Screen, cat?: string) {
    if (cat) setCategory(cat);
    setScreen(to);
    setSlideKey(k => k + 1);
  }

  const pack = PACKS[category] ?? PACKS.guitar;

  return (
    <div style={{ height: 720, display: "flex", flexDirection: "column", background: bg, borderRadius: 12, overflow: "hidden", border: `1px solid ${border}`, fontFamily: "system-ui, sans-serif", color: text }}>
      <style>{`
        @keyframes obSlide { from { transform: translateX(32px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>

      <div key={slideKey} style={{ flex: 1, display: "flex", flexDirection: "column", animation: "obSlide 0.2s ease-out", overflow: "hidden" }}>

        {/* ── Welcome ── */}
        {screen === "welcome" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px 40px", textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🎯</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>MakePerfect</div>
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.25, marginBottom: 10 }}>Train Skills With Structure</div>
            <div style={{ fontSize: 15, color: sec, lineHeight: 1.5, marginBottom: 40, maxWidth: 280 }}>
              Build routines, track your practice, and improve consistently.
            </div>
            <button
              onClick={() => go("category")}
              style={{ width: "100%", background: accent, color: "#fff", border: "none", borderRadius: 10, fontSize: 16, fontWeight: 600, padding: 15, cursor: "pointer", fontFamily: "system-ui, sans-serif", boxShadow: "0 2px 14px rgba(79,158,255,0.3)" }}
            >
              Get Started
            </button>
            <button style={{ background: "none", border: "none", color: "#666", fontSize: 14, cursor: "pointer", marginTop: 14, fontFamily: "system-ui, sans-serif" }}>
              I already have data
            </button>
          </div>
        )}

        {/* ── Category Picker ── */}
        {screen === "category" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "32px 24px 40px" }}>
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.25, marginBottom: 10 }}>What do you want to improve?</div>
            <div style={{ fontSize: 15, color: sec, marginBottom: 28 }}>Pick one to start — you can add more later.</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, flex: 1 }}>
              {CATEGORIES.map(c => (
                <div
                  key={c.key}
                  onClick={() => go("preview", c.key)}
                  style={{ background: surface, border: `1.5px solid ${border}`, borderRadius: 11, padding: "20px 12px", textAlign: "center", cursor: "pointer", transition: "border-color 0.12s, background 0.12s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = "rgba(79,158,255,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.background = surface; }}
                >
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{c.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Starter Pack Preview ── */}
        {screen === "preview" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "32px 24px 40px" }}>
            <button onClick={() => go("category")} style={{ background: "none", border: "none", color: sec, fontSize: 14, cursor: "pointer", padding: 0, marginBottom: 24, textAlign: "left", fontFamily: "system-ui, sans-serif" }}>← Back</button>
            <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.25, marginBottom: 6 }}>Your Starter Pack</div>
            <div style={{ fontSize: 15, color: sec, marginBottom: 24 }}>Here&apos;s what will be created for you.</div>

            {/* Pack preview card */}
            <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 11, padding: "16px", marginBottom: 24, flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>
                {pack.subject} Pack
              </div>
              {[
                { label: "Subject", value: pack.subject },
                { label: "Skills",  value: pack.skills.join(", ") },
                { label: "Exercises", value: `${pack.exercises} ready-to-use exercises` },
              ].map((row, i, arr) => (
                <div key={row.label} style={{ padding: "10px 0", borderBottom: i < arr.length - 1 ? `1px solid #1e1e1e` : "none", display: "flex", flexDirection: "column", gap: 3 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: sec, textTransform: "uppercase", letterSpacing: "0.06em" }}>{row.label}</span>
                  <span style={{ fontSize: 13, color: text }}>{row.value}</span>
                </div>
              ))}
              <div style={{ padding: "10px 0" }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: sec, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>Routines included</span>
                {pack.routines.map(r => (
                  <div key={r} style={{ fontSize: 13, color: text, padding: "4px 0", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 9, color: accent }}>●</span> {r}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => go("success")}
              style={{ width: "100%", background: accent, color: "#fff", border: "none", borderRadius: 10, fontSize: 16, fontWeight: 600, padding: 15, cursor: "pointer", fontFamily: "system-ui, sans-serif", boxShadow: "0 2px 14px rgba(79,158,255,0.3)" }}
            >
              Install Starter Pack
            </button>
          </div>
        )}

        {/* ── Success ── */}
        {screen === "success" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 24px 40px" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
              <div style={{ fontSize: 52, textAlign: "center", marginBottom: 20 }}>✅</div>
              <div style={{ fontSize: 22, fontWeight: 700, textAlign: "center", marginBottom: 6 }}>Your practice system is ready.</div>
              <div style={{ fontSize: 14, color: sec, textAlign: "center", marginBottom: 24 }}>These routines are ready to go:</div>
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 11, padding: "14px 16px", width: "100%", marginBottom: 32 }}>
                {pack.routines.map((r, i) => (
                  <div key={r} style={{ fontSize: 14, color: text, padding: "8px 0", borderBottom: i < pack.routines.length - 1 ? `1px solid #1e1e1e` : "none", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: success, fontSize: 12 }}>✓</span> {r}
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => go("home")}
              style={{ width: "100%", background: accent, color: "#fff", border: "none", borderRadius: 10, fontSize: 16, fontWeight: 600, padding: 15, cursor: "pointer", fontFamily: "system-ui, sans-serif", boxShadow: "0 2px 14px rgba(79,158,255,0.3)" }}
            >
              Go to Home →
            </button>
          </div>
        )}

        {/* ── Home (with installed content) ── */}
        {screen === "home" && (
          <>
            <div style={{ flexShrink: 0, height: 56, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `1px solid ${border}`, background: "rgba(11,11,11,0.92)" }}>
              <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.4 }}>Home</span>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "18px 16px" }}>
              {/* Hero — first time, no sessions yet */}
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: "20px 20px 18px", marginBottom: 16 }}>
                <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.7, lineHeight: 1.05, marginBottom: 8 }}>Start Training</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: sec }}>Complete your first session to start tracking progress.</div>
              </div>

              {/* Setup checklist — done */}
              <div style={{ background: "rgba(62,207,142,0.06)", border: `1px solid rgba(62,207,142,0.2)`, borderRadius: 12, padding: "12px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 18, color: success }}>✓</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Practice system installed</div>
                  <div style={{ fontSize: 12, color: sec, marginTop: 2 }}>{pack.subject} · {pack.routines.length} routines ready</div>
                </div>
              </div>

              {/* Today's schedule */}
              <div style={{ fontSize: 11, fontWeight: 700, color: sec, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 10 }}>Today&apos;s Schedule</div>
              <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 11, marginBottom: 20, overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", gap: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{pack.routines[0]}</span>
                  <span style={{ fontSize: 12, color: sec }}>{pack.exercises} exercises</span>
                </div>
                <div style={{ padding: "0 14px 12px", display: "flex", justifyContent: "flex-end" }}>
                  <button style={{ fontSize: 13, fontWeight: 600, padding: "7px 18px", border: "none", borderRadius: 7, cursor: "pointer", background: accent, color: "#fff", boxShadow: "0 2px 8px rgba(79,158,255,0.4)" }}>Start</button>
                </div>
              </div>

              {/* Smart CTA */}
              <button
                style={{ width: "100%", background: "rgba(79,158,255,0.13)", border: `1px solid rgba(79,158,255,0.22)`, borderRadius: 12, padding: "15px 16px", textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: 4 }}
              >
                <span style={{ fontSize: 15, fontWeight: 700, color: accent }}>Start a Session →</span>
                <span style={{ fontSize: 12, color: sec, fontWeight: 500 }}>{pack.routines[0]}</span>
              </button>

              {/* Reset */}
              <button
                onClick={() => go("welcome")}
                style={{ background: "none", border: "none", color: sec, fontSize: 12, cursor: "pointer", padding: "16px 0 4px", display: "block", width: "100%", textAlign: "center", fontFamily: "system-ui, sans-serif" }}
              >
                Reset demo
              </button>
            </div>

            {/* Bottom nav */}
            <div style={{ flexShrink: 0, display: "flex", background: "rgba(23,23,23,0.95)", borderTop: `1px solid ${border}` }}>
              {[{ icon: "⌂", label: "Home", active: true }, { icon: "◈", label: "Skills", active: false }, { icon: "≡", label: "Sessions", active: false }, { icon: "▲", label: "Progress", active: false }].map(n => (
                <div key={n.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 0", minHeight: 56, color: n.active ? accent : sec, fontSize: 10, gap: 2 }}>
                  <span style={{ fontSize: 18, lineHeight: 1 }}>{n.icon}</span>
                  <span>{n.label}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
