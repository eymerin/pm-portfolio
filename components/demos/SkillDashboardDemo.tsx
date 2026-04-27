"use client";
import { useState } from "react";

const bg        = "#0b0b0b";
const surface   = "#171717";
const raised    = "#202020";
const border    = "#262626";
const accent    = "#4f9eff";
const accentGlow= "rgba(79,158,255,0.13)";
const success   = "#3ecf8e";
const warning   = "#f59e0b";
const danger    = "#e05555";
const text      = "#f0f0f0";
const sec       = "#888";
const bronze    = "#cd7f32";

type Screen = "home" | "session" | "complete";
type Status = "complete" | "partial" | "rescheduled";

const EXERCISES = [
  { name: "Travis Picking Pattern", skill: "Fingerpicking", target: 40 },
  { name: "Pentatonic Scale Run",   skill: "Scales",        target: 20 },
  { name: "Chord Transition Drill", skill: "Chord Changes", target: 15 },
];

const DAYS = [
  { label: "Sun", date: 19 },
  { label: "Mon", date: 20 },
  { label: "Tue", date: 21 },
  { label: "Wed", date: 22 },
  { label: "Thu", date: 23 },
  { label: "Fri", date: 24 },
  { label: "Sat", date: 25 },
];
const TODAY = 5;

function pillStyle(k: Status, active: boolean): React.CSSProperties {
  const base: React.CSSProperties = { padding: "9px 16px", borderRadius: 20, fontSize: 14, fontWeight: 500, cursor: "pointer", border: "1px solid", background: "none", fontFamily: "system-ui, sans-serif", transition: "all 0.12s" };
  if (!active) return { ...base, background: surface, color: sec, borderColor: border };
  if (k === "complete")    return { ...base, background: "rgba(62,207,142,0.12)", color: success, borderColor: "rgba(62,207,142,0.35)" };
  if (k === "partial")     return { ...base, background: "rgba(245,158,11,0.12)", color: warning, borderColor: "rgba(245,158,11,0.35)" };
  return { ...base, background: "rgba(255,255,255,0.06)", color: text, borderColor: "#303030" };
}

/* ── Screen 1: Home ─────────────────────────────────────────── */
function HomeScreen({ done, onStart }: { done: boolean; onStart: () => void }) {
  const heroHeadline = done ? "Strong Week"       : "Momentum Started";
  const heroStats    = done ? "3 sessions · 100% completion · 3-day streak"
                            : "2 sessions this week · 67% completion";

  const dayStatus = (i: number) => {
    if (done && i === TODAY) return "completed";
    if (i === TODAY)         return "today";
    if (i === 1 || i === 3)  return "completed";
    if (i < TODAY)           return "missed";
    return "upcoming";
  };

  return (
    <>
      <div style={{ flexShrink: 0, height: 56, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `1px solid ${border}`, background: "rgba(11,11,11,0.92)" }}>
        <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.4 }}>Home</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "18px 16px" }}>

        {/* Hero */}
        <div style={{ background: accentGlow, border: `1px solid rgba(79,158,255,0.2)`, borderTop: `2px solid rgba(79,158,255,0.55)`, borderRadius: 12, padding: "20px 20px 18px", marginBottom: 8 }}>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.7, lineHeight: 1.05, marginBottom: 8 }}>{heroHeadline}</div>
          <div style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>{heroStats}</div>
        </div>

        {/* Chips */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: accent, background: accentGlow, border: `1px solid rgba(79,158,255,0.28)`, borderRadius: 20, padding: "5px 12px" }}>
            {done ? "3 to Bronze in Guitar" : "6 to Bronze in Guitar"}
          </span>
          <span style={{ fontSize: 12, fontWeight: 600, color: sec, background: surface, border: `1px solid ${border}`, borderRadius: 20, padding: "5px 12px" }}>
            {done ? "3 active subjects" : "2 active subjects"}
          </span>
        </div>

        {/* Week strip */}
        <div style={{ display: "flex", gap: 4, marginBottom: 18 }}>
          {DAYS.map((d, i) => {
            const st = dayStatus(i);
            const isToday = st === "today";
            const bg2 =
              isToday        ? accent :
              st === "completed" ? "rgba(76,175,80,0.18)" :
              st === "missed"    ? "rgba(224,85,85,0.18)"  :
              st === "upcoming"  ? "rgba(79,158,255,0.15)" : surface;
            const lc =
              isToday        ? "rgba(255,255,255,0.8)" :
              st === "completed" ? "#4caf50" :
              st === "missed"    ? danger     :
              st === "upcoming"  ? accent     : sec;
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "6px 0", borderRadius: 8, background: bg2, boxShadow: isToday ? "0 0 0 1px rgba(79,158,255,0.4), 0 4px 14px rgba(79,158,255,0.25)" : "none", transform: isToday ? "scale(1.07)" : "none", opacity: st === "missed" ? 0.45 : 1, transition: "background 0.25s" }}>
                <span style={{ fontSize: 9, color: lc, fontWeight: 700, textTransform: "uppercase" }}>{d.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: isToday ? "#fff" : text }}>{d.date}</span>
              </div>
            );
          })}
        </div>

        {/* Today's schedule */}
        <div style={{ fontSize: 11, fontWeight: 700, color: sec, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 10 }}>Today&apos;s Schedule</div>
        <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 11, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", gap: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Morning Guitar</span>
            <span style={{ fontSize: 12, color: sec }}>22 min · 3 exercises</span>
          </div>
          <div style={{ padding: "0 14px 12px", display: "flex", justifyContent: "flex-end" }}>
            {done ? (
              <span style={{ fontSize: 12, fontWeight: 500, padding: "6px 14px", border: `1px solid rgba(62,207,142,0.25)`, borderRadius: 7, color: success, opacity: 0.75 }}>Completed</span>
            ) : (
              <button onClick={onStart} style={{ fontSize: 13, fontWeight: 600, padding: "7px 18px", border: "none", borderRadius: 7, cursor: "pointer", background: accent, color: "#fff", boxShadow: "0 2px 8px rgba(79,158,255,0.4)" }}>Start</button>
            )}
          </div>
        </div>

        {/* Smart CTA */}
        {!done && (
          <button onClick={onStart} style={{ width: "100%", background: accentGlow, border: `1px solid rgba(79,158,255,0.22)`, borderRadius: 12, padding: "15px 16px", textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: 4, marginBottom: 20 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: accent }}>Start a Session →</span>
            <span style={{ fontSize: 12, color: sec, fontWeight: 500 }}>Morning Guitar</span>
          </button>
        )}

        {/* Recent activity */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: sec, textTransform: "uppercase", letterSpacing: "0.09em" }}>Recent Activity</span>
          <button style={{ background: "none", border: "none", color: accent, fontSize: 13, cursor: "pointer", padding: 0 }}>View All</button>
        </div>
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: "0 14px" }}>
          {[
            ...(done ? [{ name: "Morning Guitar", time: "just now", done: true }] : []),
            { name: "Technique Builder", time: "1d ago",  done: true  },
            { name: "Morning Guitar",    time: "2d ago",  done: true  },
          ].slice(0, 3).map((s, i, arr) => (
            <div key={i} style={{ display: "flex", gap: 8, padding: "8px 0", borderBottom: i < arr.length - 1 ? `1px solid #1e1e1e` : "none", fontSize: 13, color: sec, alignItems: "center" }}>
              <span style={{ color: text, fontWeight: 500, flexShrink: 0 }}>{s.name}</span>
              <span>•</span><span>{s.time}</span><span>•</span>
              <span style={{ color: s.done ? success : warning }}>{s.done ? "Completed" : "In Progress"}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Screen 2: Session Active ───────────────────────────────── */
function SessionScreen({ onFinish }: { onFinish: (results: { name: string; reps: number; status: Status }[]) => void }) {
  const [exIdx, setExIdx]     = useState(0);
  const [count, setCount]     = useState(0);
  const [status, setStatus]   = useState<Status | null>(null);
  const [showErr, setShowErr] = useState(false);
  const [results, setResults] = useState<{ name: string; reps: number; status: Status }[]>([]);

  const ex     = EXERCISES[exIdx];
  const isLast = exIdx === EXERCISES.length - 1;
  const pct    = Math.round((exIdx / EXERCISES.length) * 100);

  function next() {
    if (!status) { setShowErr(true); return; }
    const rec = { name: ex.name, reps: count, status };
    const next = [...results, rec];
    if (isLast) { onFinish(next); return; }
    setResults(next);
    setExIdx(i => i + 1);
    setCount(0); setStatus(null); setShowErr(false);
  }

  return (
    <>
      {/* Progress bar */}
      <div style={{ flexShrink: 0, height: 4, background: border }}>
        <div style={{ height: "100%", background: accent, width: `${pct}%`, transition: "width 0.3s" }} />
      </div>

      {/* Top bar */}
      <div style={{ flexShrink: 0, height: 52, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `1px solid ${border}`, background: "rgba(11,11,11,0.92)" }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Morning Guitar — {exIdx + 1} of {EXERCISES.length}</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "18px 16px" }}>

        {/* Exercise card */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: "16px", marginBottom: 18 }}>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 5 }}>{ex.name}</div>
          <div style={{ fontSize: 13, color: accent }}>{ex.skill}</div>
        </div>

        {/* Counter */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: sec, marginBottom: 8 }}>Reps</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button onClick={() => setCount(c => Math.max(0, c - 1))} style={{ width: 52, height: 52, borderRadius: "50%", border: `2px solid ${border}`, background: surface, color: text, fontSize: 26, fontWeight: 300, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>−</button>
            <div style={{ fontSize: 44, fontWeight: 700, minWidth: 90, textAlign: "center", color: count >= ex.target ? accent : text, transition: "color 0.12s" }}>{count}</div>
            <button onClick={() => setCount(c => c + 1)} style={{ width: 52, height: 52, borderRadius: "50%", border: `2px solid ${border}`, background: surface, color: text, fontSize: 26, fontWeight: 300, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>+</button>
          </div>
          <div style={{ fontSize: 12, color: sec, marginTop: 6 }}>Target: {ex.target}</div>
        </div>

        {/* Status pills */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: sec, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Status <span style={{ color: danger, fontSize: 10 }}>{showErr ? "— required" : ""}</span></div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", border: showErr ? `1px solid ${danger}` : "1px solid transparent", borderRadius: 10, padding: 5, transition: "border-color 0.12s" }}>
            {(["complete", "partial", "rescheduled"] as Status[]).map(k => (
              <button key={k} onClick={() => { setStatus(k); setShowErr(false); }} style={pillStyle(k, status === k)}>
                {k.charAt(0).toUpperCase() + k.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Next / Finish */}
        <button onClick={next} style={{ width: "100%", background: accent, color: "#fff", fontSize: 16, fontWeight: 700, padding: 15, borderRadius: 12, border: "none", cursor: "pointer", fontFamily: "system-ui, sans-serif", boxShadow: "0 2px 14px rgba(79,158,255,0.3)" }}>
          {isLast ? "Finish Session" : "Next Exercise"}
        </button>
      </div>
    </>
  );
}

/* ── Screen 3: Session Complete ─────────────────────────────── */
function CompleteScreen({ results, onReturn }: { results: { name: string; reps: number; status: Status }[]; onReturn: () => void }) {
  const badgeStyle = (s: Status): React.CSSProperties => {
    if (s === "complete") return { background: "rgba(62,207,142,0.15)", color: success, padding: "3px 9px", borderRadius: 20, fontSize: 12, fontWeight: 500 };
    if (s === "partial")  return { background: "rgba(245,158,11,0.15)",  color: warning,  padding: "3px 9px", borderRadius: 20, fontSize: 12, fontWeight: 500 };
    return { background: "rgba(255,255,255,0.07)", color: sec, padding: "3px 9px", borderRadius: 20, fontSize: 12, fontWeight: 500 };
  };

  return (
    <>
      <div style={{ flexShrink: 0, height: 56, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `1px solid ${border}`, background: "rgba(11,11,11,0.92)" }}>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Session Complete</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "18px 16px" }}>

        {/* Summary card */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: "16px", textAlign: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Morning Guitar</div>
          <div style={{ fontSize: 12, color: sec, marginTop: 4 }}>{results.length} exercises completed</div>
        </div>

        {/* Reward strip */}
        <div style={{ display: "flex", background: surface, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden", marginBottom: 14 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 8px" }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: bronze, letterSpacing: -0.4 }}>✪ Bronze</span>
            <span style={{ fontSize: 10, color: sec, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.4px", fontWeight: 600 }}>Guitar</span>
          </div>
          <div style={{ width: 1, background: border, margin: "12px 0" }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 8px" }}>
            <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.4 }}>3</span>
            <span style={{ fontSize: 10, color: sec, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.4px", fontWeight: 600 }}>Day Streak</span>
          </div>
        </div>

        {/* Milestone unlock */}
        <div style={{ background: "rgba(245,158,11,0.07)", border: `1px solid rgba(245,158,11,0.25)`, borderRadius: 12, padding: "12px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 20, color: warning }}>◆</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>5 Sessions</div>
            <div style={{ fontSize: 12, color: sec, marginTop: 1 }}>Milestone unlocked</div>
          </div>
        </div>

        {/* Exercise summary */}
        <div style={{ fontSize: 11, fontWeight: 700, color: sec, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Summary</div>
        {results.map((r, i) => (
          <div key={i} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: "11px 13px", marginBottom: 7, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{r.name}</div>
              <div style={{ fontSize: 12, color: sec, marginTop: 2 }}>{r.reps} reps</div>
            </div>
            <span style={badgeStyle(r.status)}>{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span>
          </div>
        ))}

        {/* Return */}
        <button onClick={onReturn} style={{ width: "100%", background: accent, color: "#fff", fontSize: 15, fontWeight: 700, padding: 15, borderRadius: 12, border: "none", cursor: "pointer", fontFamily: "system-ui, sans-serif", marginTop: 8, marginBottom: 4, boxShadow: "0 2px 14px rgba(79,158,255,0.3)" }}>
          Back to Home
        </button>
      </div>
    </>
  );
}

/* ── Main routed demo ───────────────────────────────────────── */
export default function SkillDashboardDemo() {
  const [screen, setScreen]     = useState<Screen>("home");
  const [slideDir, setSlideDir] = useState<"forward" | "back">("forward");
  const [animKey, setAnimKey]   = useState(0);
  const [done, setDone]         = useState(false);
  const [results, setResults]   = useState<{ name: string; reps: number; status: Status }[]>([]);

  function go(to: Screen, dir: "forward" | "back") {
    setSlideDir(dir);
    setScreen(to);
    setAnimKey(k => k + 1);
  }

  function startSession() { go("session", "forward"); }

  function finishSession(r: typeof results) {
    setResults(r);
    go("complete", "forward");
  }

  function returnHome() {
    setDone(true);
    go("home", "back");
  }

  const anim = slideDir === "forward"
    ? "demoFwd 0.22s ease-out"
    : "demoBck 0.22s ease-out";

  return (
    <div style={{ height: 720, display: "flex", flexDirection: "column", background: bg, borderRadius: 12, overflow: "hidden", border: `1px solid ${border}`, fontFamily: "system-ui, sans-serif", color: text }}>
      <style>{`
        @keyframes demoFwd { from { transform: translateX(36px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes demoBck { from { transform: translateX(-36px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>

      <div key={animKey} style={{ display: "flex", flexDirection: "column", flex: 1, animation: anim, overflow: "hidden" }}>
        {screen === "home"     && <HomeScreen    done={done}    onStart={startSession} />}
        {screen === "session"  && <SessionScreen onFinish={finishSession} />}
        {screen === "complete" && <CompleteScreen results={results} onReturn={returnHome} />}
      </div>

      {/* Bottom nav — hidden during session */}
      {screen !== "session" && (
        <div style={{ flexShrink: 0, display: "flex", background: "rgba(23,23,23,0.95)", borderTop: `1px solid ${border}` }}>
          {[
            { icon: "⌂", label: "Home",     active: screen === "home"     },
            { icon: "◈", label: "Skills",   active: false                  },
            { icon: "≡", label: "Sessions", active: screen === "complete"  },
            { icon: "▲", label: "Progress", active: false                  },
          ].map(n => (
            <div key={n.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 0", minHeight: 56, color: n.active ? accent : sec, fontSize: 10, gap: 2 }}>
              <span style={{ fontSize: 18, lineHeight: 1 }}>{n.icon}</span>
              <span>{n.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
