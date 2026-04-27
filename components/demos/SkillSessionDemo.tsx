"use client";
import { useState } from "react";

const bg      = "#0b0b0b";
const surface = "#171717";
const border  = "#262626";
const borderLt= "#303030";
const accent  = "#4f9eff";
const success = "#3ecf8e";
const warning = "#f59e0b";
const text    = "#f0f0f0";
const sec     = "#888";
const danger  = "#e05555";

const EXERCISES = [
  { name: "Travis Picking Pattern", skill: "Fingerpicking", repsTarget: 40 },
  { name: "Pentatonic Scale Run",   skill: "Scales",        repsTarget: 20 },
  { name: "Chord Transition Drill", skill: "Chord Changes", repsTarget: 15 },
];

type Status = "complete" | "partial" | "rescheduled";
interface Done { name: string; reps: number; status: Status; }

function pillStyle(key: Status, active: boolean): React.CSSProperties {
  const base: React.CSSProperties = {
    padding: "8px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500,
    cursor: "pointer", border: "1px solid", transition: "all 0.12s",
    background: "none", fontFamily: "system-ui, sans-serif",
  };
  if (!active) return { ...base, background: surface, color: sec, borderColor: border };
  if (key === "complete")    return { ...base, background: "rgba(62,207,142,0.12)", color: success, borderColor: "rgba(62,207,142,0.35)" };
  if (key === "partial")     return { ...base, background: "rgba(245,158,11,0.12)", color: warning, borderColor: "rgba(245,158,11,0.35)" };
  return { ...base, background: "rgba(255,255,255,0.06)", color: text, borderColor: borderLt };
}

function badgeStyle(s: Status): React.CSSProperties {
  if (s === "complete")    return { background: "rgba(62,207,142,0.15)", color: success, padding: "3px 9px", borderRadius: 20, fontSize: 12, fontWeight: 500, display: "inline-block" };
  if (s === "partial")     return { background: "rgba(245,158,11,0.15)",  color: warning, padding: "3px 9px", borderRadius: 20, fontSize: 12, fontWeight: 500, display: "inline-block" };
  return { background: "rgba(255,255,255,0.07)", color: sec, padding: "3px 9px", borderRadius: 20, fontSize: 12, fontWeight: 500, display: "inline-block" };
}

export default function SkillSessionDemo() {
  const [index, setIndex]         = useState(0);
  const [count, setCount]         = useState(0);
  const [status, setStatus]       = useState<Status | null>(null);
  const [notes, setNotes]         = useState("");
  const [showErr, setShowErr]     = useState(false);
  const [done, setDone]           = useState<Done[]>([]);
  const [finished, setFinished]   = useState(false);
  const [focused, setFocused]     = useState(false);

  const ex     = EXERCISES[index];
  const isLast = index === EXERCISES.length - 1;
  const pct    = Math.round((index / EXERCISES.length) * 100);

  function next() {
    if (!status) { setShowErr(true); return; }
    const rec = { name: ex.name, reps: count, status };
    const next = [...done, rec];
    setDone(next);
    if (isLast) { setFinished(true); return; }
    setIndex(i => i + 1); setCount(0); setStatus(null); setNotes(""); setShowErr(false);
  }

  function restart() {
    setIndex(0); setCount(0); setStatus(null); setNotes("");
    setShowErr(false); setDone([]); setFinished(false);
  }

  const containerStyle: React.CSSProperties = {
    height: 720,
    display: "flex",
    flexDirection: "column",
    background: bg,
    borderRadius: 12,
    overflow: "hidden",
    border: `1px solid ${border}`,
    fontFamily: "system-ui, sans-serif",
    color: text,
  };

  if (finished) {
    return (
      <div style={containerStyle}>
        <div style={{ flexShrink: 0, height: 56, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `1px solid ${border}`, background: "rgba(11,11,11,0.92)" }}>
          <span style={{ fontSize: 18, fontWeight: 700 }}>Session Complete</span>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 0" }}>
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: "14px", textAlign: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 30, marginBottom: 8 }}>✓</div>
            <div style={{ fontSize: 17, fontWeight: 600 }}>Morning Technique</div>
            <div style={{ fontSize: 12, color: sec, marginTop: 4 }}>3 exercises completed</div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: sec, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Summary</div>
          {done.map((rec, i) => (
            <div key={i} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: "11px 13px", marginBottom: 7, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{rec.name}</div>
                <div style={{ fontSize: 12, color: sec, marginTop: 2 }}>{rec.reps} reps</div>
              </div>
              <span style={badgeStyle(rec.status)}>{rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}</span>
            </div>
          ))}
          <button onClick={restart} style={{ width: "100%", marginTop: 12, padding: 11, borderRadius: 12, border: `1px solid ${border}`, background: "none", color: accent, fontSize: 13, cursor: "pointer", fontFamily: "system-ui, sans-serif", marginBottom: 14 }}>
            Run demo again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Progress bar */}
      <div style={{ flexShrink: 0, height: 4, background: border }}>
        <div style={{ height: "100%", background: accent, width: `${pct}%`, transition: "width 0.3s" }} />
      </div>

      {/* Top bar */}
      <div style={{ flexShrink: 0, height: 52, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `1px solid ${border}`, background: "rgba(11,11,11,0.92)" }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Morning Technique — {index + 1} of {EXERCISES.length}</span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 0" }}>

        {/* Exercise card */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: "13px 14px", marginBottom: 14 }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 5 }}>{ex.name}</div>
          <div style={{ fontSize: 13, color: accent }}>{ex.skill}</div>
        </div>

        {/* Reps counter */}
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: sec, marginBottom: 7 }}>Reps</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button onClick={() => setCount(c => Math.max(0, c - 1))} style={{ width: 52, height: 52, borderRadius: "50%", border: `2px solid ${border}`, background: surface, color: text, fontSize: 26, fontWeight: 300, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>−</button>
            <div style={{ fontSize: 42, fontWeight: 700, minWidth: 80, textAlign: "center", color: count >= ex.repsTarget ? accent : text, transition: "color 0.12s" }}>{count}</div>
            <button onClick={() => setCount(c => c + 1)} style={{ width: 52, height: 52, borderRadius: "50%", border: `2px solid ${border}`, background: surface, color: text, fontSize: 26, fontWeight: 300, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>+</button>
          </div>
          <div style={{ fontSize: 12, color: sec, marginTop: 5 }}>Target: {ex.repsTarget}</div>
        </div>

        {/* Status pills */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: sec, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 7 }}>Status</div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", border: showErr ? `1px solid ${danger}` : "1px solid transparent", borderRadius: 10, padding: 5, transition: "border-color 0.12s" }}>
            {(["complete", "partial", "rescheduled"] as Status[]).map(k => (
              <button key={k} onClick={() => { setStatus(k); setShowErr(false); }} style={pillStyle(k, status === k)}>
                {k.charAt(0).toUpperCase() + k.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: "10px 12px", marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: sec, marginBottom: 5 }}>Notes (optional)</div>
          <textarea
            rows={2}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Any notes for this exercise…"
            style={{ width: "100%", background: bg, border: `1px solid ${focused ? accent : border}`, borderRadius: 8, color: text, fontSize: 14, padding: "8px 10px", resize: "none", outline: "none", fontFamily: "system-ui, sans-serif", boxSizing: "border-box", transition: "border-color 0.12s" }}
          />
        </div>

        {/* Next / Finish */}
        <button onClick={next} style={{ width: "100%", background: accent, color: "#fff", fontSize: 16, fontWeight: 700, padding: 15, borderRadius: 12, border: "none", cursor: "pointer", fontFamily: "system-ui, sans-serif", marginBottom: 14, boxShadow: "0 2px 14px rgba(79,158,255,0.3)" }}>
          {isLast ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
