"use client";
import { useState } from "react";

const bg      = "#0b0b0b";
const surface = "#171717";
const border  = "#262626";
const accent  = "#4f9eff";
const success = "#3ecf8e";
const warning = "#f59e0b";
const text    = "#f0f0f0";
const sec     = "#888";
const bronze  = "#cd7f32";
const silver  = "#a8a9ad";

// Rank thresholds: Unranked=0, Bronze=20, Silver=50, Gold=100
function getRank(n: number): { label: string; color: string; icon: string; next: string; nextAt: number } {
  if (n >= 50) return { label: "Silver",   color: silver,  icon: "✪", next: "Gold",    nextAt: 100 };
  if (n >= 20) return { label: "Bronze",   color: bronze,  icon: "✪", next: "Silver",  nextAt: 50  };
  return              { label: "Unranked", color: sec,     icon: "○", next: "Bronze",  nextAt: 20  };
}

function barPct(n: number): number {
  if (n >= 50) return Math.min(((n - 50) / 50) * 100, 100);
  if (n >= 20) return Math.min(((n - 20) / 30) * 100, 100);
  return Math.min((n / 20) * 100, 100);
}

const MILESTONES = [
  { id: "first_session", label: "First Session",  desc: "Complete your first session",           done: true  },
  { id: "sessions_5",    label: "5 Sessions",     desc: "Complete 5 practice sessions",          done: true  },
  { id: "sessions_10",   label: "10 Sessions",    desc: "Complete 10 practice sessions",         done: true  },
  { id: "routine_5x",    label: "Routine ×5",     desc: "Complete the same routine 5 times",     done: true  },
  { id: "exercises_100", label: "100 Exercises",  desc: "Log 100 completed exercise entries",    done: false },
];

export default function SkillProgressDemo() {
  // Guitar starts at 19 — one session from Bronze
  const [guitarSessions, setGuitarSessions] = useState(19);
  const [justRankedUp, setJustRankedUp]     = useState(false);

  const guitarRank = getRank(guitarSessions);
  const fitnessRank = getRank(8);
  const totalSessions = guitarSessions + 8;
  const streak = guitarSessions >= 20 ? 5 : 4;

  function logSession() {
    if (guitarSessions >= 22) return; // cap demo at Silver track
    const next = guitarSessions + 1;
    setGuitarSessions(next);
    if (next === 20) setJustRankedUp(true);
    setTimeout(() => setJustRankedUp(false), 1800);
  }

  function reset() {
    setGuitarSessions(19);
    setJustRankedUp(false);
  }

  return (
    <div style={{ height: 720, display: "flex", flexDirection: "column", background: bg, borderRadius: 12, overflow: "hidden", border: `1px solid ${border}`, fontFamily: "system-ui, sans-serif", color: text }}>
      <style>{`
        @keyframes rankUp { 0% { transform: scale(1); } 40% { transform: scale(1.18); } 100% { transform: scale(1); } }
        .rank-up { animation: rankUp 0.45s ease-out forwards; }
      `}</style>

      {/* Top bar */}
      <div style={{ flexShrink: 0, height: 56, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `1px solid ${border}`, background: "rgba(11,11,11,0.92)" }}>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Progress</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "18px 16px" }}>

        {/* Snapshot strip */}
        <div style={{ display: "flex", background: surface, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
          {[
            [String(totalSessions), "Sessions"],
            [String(streak),        "Day Streak"],
            ["3",                   "This Week"],
          ].map(([val, lbl], i) => (
            <div key={lbl} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 6px", borderRight: i < 2 ? `1px solid ${border}` : "none" }}>
              <span style={{ fontSize: 16, fontWeight: 700, transition: "all 0.3s" }}>{val}</span>
              <span style={{ fontSize: 10, color: sec, marginTop: 3, textTransform: "uppercase", letterSpacing: "0.4px", fontWeight: 600 }}>{lbl}</span>
            </div>
          ))}
        </div>

        {/* Mastery Ranks */}
        <div style={{ fontSize: 11, fontWeight: 700, color: sec, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 10 }}>Mastery Ranks</div>

        {/* Guitar — interactive subject */}
        <div style={{
          background: surface,
          border: `1px solid ${justRankedUp ? "rgba(205,127,50,0.5)" : border}`,
          borderRadius: 12,
          padding: "14px 14px",
          marginBottom: 8,
          transition: "border-color 0.3s",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span className={justRankedUp ? "rank-up" : ""} style={{ fontSize: 22, color: guitarRank.color, transition: "color 0.4s", lineHeight: 1 }}>
              {guitarRank.icon}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>Guitar</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: guitarRank.color, textTransform: "uppercase", letterSpacing: "0.5px", transition: "color 0.4s" }}>
                  {guitarRank.label}
                </span>
              </div>
              <div style={{ fontSize: 12, color: sec, marginTop: 2, transition: "all 0.3s" }}>
                {guitarSessions >= guitarRank.nextAt
                  ? `${guitarSessions - (guitarRank.nextAt === 50 ? 20 : 0)} / ${guitarRank.nextAt} to ${guitarRank.next}`
                  : `${guitarRank.nextAt - guitarSessions} to ${guitarRank.next}`
                }
              </div>
            </div>
          </div>
          <div style={{ height: 5, background: border, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${barPct(guitarSessions)}%`, background: guitarRank.color, borderRadius: 3, transition: "width 0.5s cubic-bezier(0.34,1.56,0.64,1)" }} />
          </div>
          {justRankedUp && (
            <div style={{ marginTop: 8, fontSize: 12, color: bronze, fontWeight: 600, textAlign: "center" }}>
              🏅 Bronze rank unlocked
            </div>
          )}
        </div>

        {/* Fitness — static second subject */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: "14px 14px", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 22, color: fitnessRank.color, lineHeight: 1 }}>{fitnessRank.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>Fitness</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: fitnessRank.color, textTransform: "uppercase", letterSpacing: "0.5px" }}>{fitnessRank.label}</span>
              </div>
              <div style={{ fontSize: 12, color: sec, marginTop: 2 }}>12 to Bronze</div>
            </div>
          </div>
          <div style={{ height: 5, background: border, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${barPct(8)}%`, background: fitnessRank.color, borderRadius: 3 }} />
          </div>
        </div>

        {/* Milestones */}
        <div style={{ fontSize: 11, fontWeight: 700, color: sec, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 10 }}>Milestones</div>
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
          {MILESTONES.map((m, i) => (
            <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderBottom: i < MILESTONES.length - 1 ? `1px solid ${border}` : "none" }}>
              <span style={{ fontSize: 15, color: m.done ? warning : "#2a2a2a", flexShrink: 0 }}>{m.done ? "◆" : "◇"}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: m.done ? text : sec }}>{m.label}</div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>{m.desc}</div>
              </div>
              {m.done && <span style={{ fontSize: 10, color: warning, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px", flexShrink: 0 }}>Unlocked</span>}
            </div>
          ))}
        </div>

        {/* Demo interaction — log a session to see Guitar rank update */}
        <button
          onClick={logSession}
          disabled={guitarSessions >= 22}
          style={{
            width: "100%",
            background: guitarSessions >= 22 ? "#1a1a1a" : "rgba(79,158,255,0.13)",
            border: `1px solid ${guitarSessions >= 22 ? border : "rgba(79,158,255,0.28)"}`,
            borderRadius: 12,
            padding: "14px 16px",
            color: guitarSessions >= 22 ? sec : accent,
            fontSize: 14,
            fontWeight: 600,
            cursor: guitarSessions >= 22 ? "default" : "pointer",
            fontFamily: "system-ui, sans-serif",
            transition: "all 0.15s",
            marginBottom: 8,
          }}
        >
          {guitarSessions < 20
            ? `Log a Guitar session — ${20 - guitarSessions} to Bronze`
            : guitarSessions < 22
            ? "Log another Guitar session"
            : "Ranks update after each completed session"}
        </button>

        {guitarSessions > 19 && (
          <button
            onClick={reset}
            style={{ background: "none", border: "none", color: sec, fontSize: 12, cursor: "pointer", padding: "4px 0", display: "block", width: "100%", textAlign: "center", fontFamily: "system-ui, sans-serif" }}
          >
            Reset demo
          </button>
        )}
      </div>

      {/* Bottom nav */}
      <div style={{ flexShrink: 0, display: "flex", background: "rgba(23,23,23,0.95)", borderTop: `1px solid ${border}` }}>
        {[
          { icon: "⌂", label: "Home",     active: false },
          { icon: "◈", label: "Skills",   active: false },
          { icon: "≡", label: "Sessions", active: false },
          { icon: "▲", label: "Progress", active: true  },
        ].map(n => (
          <div key={n.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 0", minHeight: 56, color: n.active ? accent : sec, fontSize: 10, gap: 2 }}>
            <span style={{ fontSize: 18, lineHeight: 1 }}>{n.icon}</span>
            <span>{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
