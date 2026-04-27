"use client";
import { useState } from "react";

const bg      = "#0b0b0b";
const surface = "#171717";
const raised  = "#202020";
const border  = "#262626";
const borderLt= "#303030";
const accent  = "#4f9eff";
const text    = "#f0f0f0";
const sec     = "#888";
const danger  = "#e05555";

interface Metrics { duration?: number; reps?: number; sets?: number; }
interface Entry   { id: string; name: string; skill: string; metrics: Metrics; }

const INIT: Entry[] = [
  { id: "e1", name: "Travis Picking Pattern", skill: "Fingerpicking", metrics: { reps: 40 } },
  { id: "e2", name: "Pentatonic Scale Run",   skill: "Scales",        metrics: { duration: 300, sets: 3 } },
  { id: "e3", name: "Chord Transition Drill", skill: "Chord Changes", metrics: { reps: 15, sets: 4 } },
];

const PICKER = [
  { id: "p1", name: "Metronome Strumming", skill: "Timing" },
  { id: "p2", name: "Barre Chord Hold",    skill: "Chord Changes" },
];

function tags(m: Metrics) {
  const t: string[] = [];
  if (m.duration) t.push("Duration");
  if (m.reps)     t.push("Reps");
  if (m.sets)     t.push("Sets");
  return t;
}

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

export default function SkillRoutineDemo() {
  const [entries, setEntries]           = useState<Entry[]>(INIT);
  const [editingId, setEditingId]       = useState<string | null>(null);
  const [draft, setDraft]               = useState<Metrics>({});
  const [pickerOpen, setPickerOpen]     = useState(false);
  const [dragIdx, setDragIdx]           = useState<number | null>(null);
  const [overIdx, setOverIdx]           = useState<number | null>(null);

  // Routine-level edit state
  const [routineName, setRoutineName]   = useState("Morning Technique");
  const [routineDays, setRoutineDays]   = useState<number[]>([1, 3, 5]);
  const [editingRoutine, setEditingRoutine] = useState(false);
  const [draftName, setDraftName]       = useState("");
  const [draftDays, setDraftDays]       = useState<number[]>([]);

  function openRoutineEdit() {
    setDraftName(routineName);
    setDraftDays([...routineDays]);
    setEditingRoutine(true);
    setEditingId(null);
    setPickerOpen(false);
  }

  function saveRoutineEdit() {
    setRoutineName(draftName.trim() || routineName);
    setRoutineDays(draftDays);
    setEditingRoutine(false);
  }

  function toggleDraftDay(day: number) {
    setDraftDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  }

  const dayLabel = routineDays
    .sort((a, b) => a - b)
    .map(d => ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d])
    .join(" · ") || "No days set";

  function openEdit(e: Entry) {
    setDraft({ ...e.metrics });
    setEditingId(e.id);
    setPickerOpen(false);
  }

  function saveEdit() {
    setEntries(prev => prev.map(e => e.id === editingId ? { ...e, metrics: { ...draft } } : e));
    setEditingId(null);
  }

  function removeEntry(id: string) {
    setEntries(prev => prev.filter(e => e.id !== id));
    if (editingId === id) setEditingId(null);
  }

  function addEntry(opt: typeof PICKER[number]) {
    setEntries(prev => [...prev, { id: opt.id, name: opt.name, skill: opt.skill, metrics: { reps: 10 } }]);
    setPickerOpen(false);
  }

  function handleDragStart(e: React.DragEvent, idx: number) {
    setDragIdx(idx);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (idx !== overIdx) setOverIdx(idx);
  }

  function handleDrop(e: React.DragEvent, idx: number) {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) { setDragIdx(null); setOverIdx(null); return; }
    setEntries(prev => {
      const next = [...prev];
      const [moved] = next.splice(dragIdx, 1);
      next.splice(idx, 0, moved);
      return next;
    });
    // close editor if the edited entry moved
    setEditingId(null);
    setDragIdx(null);
    setOverIdx(null);
  }

  function handleDragEnd() {
    setDragIdx(null);
    setOverIdx(null);
  }

  const available = PICKER.filter(p => !entries.find(e => e.id === p.id));

  return (
    <div style={{
      height: 720,
      display: "flex",
      flexDirection: "column",
      background: bg,
      borderRadius: 12,
      overflow: "hidden",
      border: `1px solid ${border}`,
      fontFamily: "system-ui, sans-serif",
      color: text,
    }}>

      {/* Top bar */}
      <div style={{ flexShrink: 0, height: 56, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `1px solid ${border}`, background: "rgba(11,11,11,0.92)", position: "relative" }}>
        <span style={{ color: accent, position: "absolute", left: 14, fontSize: 14 }}>← Back</span>
        <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.4 }}>{routineName}</span>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 0" }}>

        {/* Routine info card */}
        <div style={{ background: "rgba(79,158,255,0.04)", border: `1px solid ${editingRoutine ? "rgba(79,158,255,0.45)" : "rgba(79,158,255,0.18)"}`, borderRadius: 12, marginBottom: 14, overflow: "hidden", transition: "border-color 0.15s" }}>
          <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{routineName}</div>
              <div style={{ fontSize: 12, color: sec, marginTop: 2 }}>{dayLabel}</div>
            </div>
            <button
              onClick={() => editingRoutine ? setEditingRoutine(false) : openRoutineEdit()}
              style={{ background: "none", border: "none", color: editingRoutine ? sec : accent, fontSize: 13, cursor: "pointer" }}
            >
              {editingRoutine ? "Cancel" : "Edit"}
            </button>
          </div>

          {/* Inline edit form */}
          {editingRoutine && (
            <div style={{ borderTop: `1px solid rgba(79,158,255,0.2)`, padding: "12px 14px", background: "rgba(0,0,0,0.2)" }}>
              {/* Name input */}
              <div style={{ fontSize: 11, fontWeight: 600, color: sec, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>Name</div>
              <input
                type="text"
                value={draftName}
                onChange={e => setDraftName(e.target.value)}
                style={{ width: "100%", background: bg, border: `1px solid ${border}`, borderRadius: 8, color: text, padding: "8px 10px", fontSize: 14, boxSizing: "border-box", outline: "none", fontFamily: "system-ui, sans-serif", marginBottom: 12 }}
              />

              {/* Day toggles */}
              <div style={{ fontSize: 11, fontWeight: 600, color: sec, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Schedule</div>
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                {DAY_LABELS.map((lbl, day) => {
                  const active = draftDays.includes(day);
                  return (
                    <button
                      key={day}
                      onClick={() => toggleDraftDay(day)}
                      style={{ flex: 1, aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", background: active ? accent : bg, border: `1.5px solid ${active ? accent : border}`, borderRadius: 8, fontSize: 12, fontWeight: 700, color: active ? "#fff" : sec, cursor: "pointer", transition: "all 0.12s" }}
                    >
                      {lbl}
                    </button>
                  );
                })}
              </div>

              {/* Save */}
              <button
                onClick={saveRoutineEdit}
                style={{ width: "100%", background: accent, color: "#fff", fontSize: 13, fontWeight: 600, padding: "10px", borderRadius: 8, border: "none", cursor: "pointer" }}
              >
                Save
              </button>
            </div>
          )}
        </div>

        {/* Section header */}
        <div style={{ fontSize: 12, fontWeight: 700, color: sec, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
          {entries.length} Exercise{entries.length !== 1 ? "s" : ""}
        </div>

        {/* Entry cards */}
        {entries.map((entry, idx) => {
          const isDragging = dragIdx === idx;
          const isDropTarget = overIdx === idx && dragIdx !== null && dragIdx !== idx;

          return (
            <div
              key={entry.id}
              style={{ marginBottom: 8 }}
              onDragOver={e => handleDragOver(e, idx)}
              onDrop={e => handleDrop(e, idx)}
            >
              <div style={{
                background: surface,
                border: `1px solid ${isDropTarget ? accent : border}`,
                borderRadius: editingId === entry.id ? "12px 12px 0 0" : 12,
                padding: "12px 14px",
                opacity: isDragging ? 0.4 : 1,
                transition: "opacity 0.15s, border-color 0.15s",
                boxShadow: isDropTarget ? `0 0 0 1px ${accent}` : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

                  {/* Drag handle */}
                  <div
                    draggable
                    onDragStart={e => handleDragStart(e, idx)}
                    onDragEnd={handleDragEnd}
                    style={{ cursor: "grab", padding: "4px 6px", color: sec, fontSize: 16, lineHeight: 1, userSelect: "none", flexShrink: 0, display: "flex", flexDirection: "column", gap: 3 }}
                    title="Drag to reorder"
                  >
                    {/* Dot grid grip icon */}
                    {[0, 1].map(row => (
                      <div key={row} style={{ display: "flex", gap: 3 }}>
                        {[0, 1].map(col => (
                          <div key={col} style={{ width: 3, height: 3, borderRadius: "50%", background: sec }} />
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{entry.name}</div>
                    <div style={{ fontSize: 12, color: sec, marginTop: 2 }}>{entry.skill}</div>
                    <div style={{ marginTop: 5 }}>
                      {tags(entry.metrics).map(t => (
                        <span key={t} style={{ display: "inline-block", padding: "2px 7px", borderRadius: 4, fontSize: 11, background: border, color: sec, marginRight: 4 }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Edit button */}
                  <button
                    onClick={() => editingId === entry.id ? setEditingId(null) : openEdit(entry)}
                    style={{ background: editingId === entry.id ? "rgba(79,158,255,0.12)" : "none", border: "none", color: editingId === entry.id ? accent : sec, cursor: "pointer", padding: "6px 8px", fontSize: 15, borderRadius: 8, lineHeight: 1 }}
                  >
                    ✎
                  </button>

                  {/* Remove button */}
                  <button
                    onClick={() => removeEntry(entry.id)}
                    style={{ background: "none", border: "none", color: danger, cursor: "pointer", padding: "6px 8px", fontSize: 15, borderRadius: 8, lineHeight: 1 }}
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Inline metric editor */}
              {editingId === entry.id && (
                <div style={{ background: raised, border: `1px solid ${borderLt}`, borderTop: "none", borderRadius: "0 0 12px 12px", padding: "12px 14px" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: sec, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Configure Metrics</div>

                  {(["duration", "reps", "sets"] as const).map((key, i) => {
                    const isOn = !!draft[key];
                    const label = key === "duration" ? "Duration (sec)" : key.charAt(0).toUpperCase() + key.slice(1);
                    return (
                      <div key={key} style={{ marginBottom: i < 2 ? 10 : 0 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: isOn ? 6 : 0 }}>
                          <span style={{ fontSize: 13, fontWeight: 500 }}>{label}</span>
                          <div
                            onClick={() => setDraft(prev => {
                              const next = { ...prev };
                              if (isOn) { delete next[key]; } else { (next as Record<string, number>)[key] = key === "duration" ? 300 : key === "reps" ? 20 : 3; }
                              return next;
                            })}
                            style={{ width: 38, height: 22, borderRadius: 22, background: isOn ? accent : border, position: "relative", cursor: "pointer", flexShrink: 0, transition: "background 0.15s" }}
                          >
                            <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: isOn ? 19 : 3, transition: "left 0.15s" }} />
                          </div>
                        </div>
                        {isOn && (
                          <input
                            type="number"
                            value={draft[key] ?? ""}
                            onChange={e => setDraft(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                            placeholder="Target"
                            style={{ width: "100%", background: bg, border: `1px solid ${border}`, borderRadius: 8, color: text, padding: "7px 10px", fontSize: 13, boxSizing: "border-box", outline: "none", fontFamily: "system-ui, sans-serif" }}
                          />
                        )}
                      </div>
                    );
                  })}

                  <button
                    onClick={saveEdit}
                    style={{ width: "100%", background: accent, color: "#fff", fontSize: 13, fontWeight: 600, padding: "10px", borderRadius: 8, border: "none", marginTop: 12, cursor: "pointer" }}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Add Exercise */}
        <button
          onClick={() => { setPickerOpen(o => !o); setEditingId(null); }}
          style={{ display: "block", width: "100%", background: accent, color: "#fff", fontSize: 14, fontWeight: 600, padding: "13px 14px", borderRadius: 12, border: "none", cursor: "pointer", boxShadow: "0 2px 12px rgba(79,158,255,0.28)", marginBottom: 8 }}
        >
          + Add Exercise
        </button>

        {pickerOpen && (
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 12, marginBottom: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: sec, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Select Exercise</div>
            {available.length === 0
              ? <div style={{ fontSize: 13, color: sec, textAlign: "center", padding: "6px 0" }}>All exercises added.</div>
              : available.map(opt => (
                <div
                  key={opt.id}
                  onClick={() => addEntry(opt)}
                  style={{ padding: "9px 10px", borderRadius: 8, cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(79,158,255,0.1)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{opt.name}</div>
                  <div style={{ fontSize: 12, color: sec, marginTop: 2 }}>{opt.skill}</div>
                </div>
              ))
            }
          </div>
        )}

        <div style={{ height: 14 }} />
      </div>

      {/* Bottom nav — static */}
      <div style={{ flexShrink: 0, display: "flex", background: "rgba(23,23,23,0.95)", borderTop: `1px solid ${border}` }}>
        {[
          { icon: "⌂", label: "Home",     active: false },
          { icon: "◈", label: "Skills",   active: false },
          { icon: "≡", label: "Sessions", active: true  },
          { icon: "▲", label: "Progress", active: false },
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
