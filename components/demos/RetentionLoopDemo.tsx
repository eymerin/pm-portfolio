'use client';

import { useState } from 'react';

type Meal = { id: number; slot: 'Lunch' | 'Dinner'; name: string; eaten: boolean };

const INITIAL = {
  meals: [
    { id: 1, slot: 'Lunch'  as const, name: 'Protein Plate',           eaten: false },
    { id: 2, slot: 'Dinner' as const, name: 'Rice Bowl — Japanese BBQ', eaten: false },
  ] as Meal[],
  inventory:     14,
  expiring:       2,
  scheduled:      4,
  target:         7,
  streak:         2,
  eatenThisWeek:  4,
  prepSessions:   5,
};

export default function RetentionLoopDemo() {
  const [state, setState] = useState(INITIAL);
  const [showInsights, setShowInsights] = useState(false);

  const allEaten    = state.meals.every((m) => m.eaten);
  const activeWeeks = 5;
  const bestStreak  = 3;
  const onTarget    = 2;

  function markEaten(id: number) {
    setState((prev) => ({
      ...prev,
      meals:         prev.meals.map((m) => m.id === id ? { ...m, eaten: true } : m),
      inventory:     Math.max(0, prev.inventory - 1),
      eatenThisWeek: prev.eatenThisWeek + 1,
    }));
  }

  function reset() { setState(INITIAL); setShowInsights(false); }

  // Priority-ordered next action card
  type ActionStyle = 'green' | 'amber' | 'normal';
  let action: { msg: string; cta?: string; style: ActionStyle } | null = null;
  if (allEaten) {
    action = { msg: "All meals eaten today. You're on track.", style: 'green' };
  } else if (state.expiring > 0) {
    action = { msg: `${state.expiring} meals expiring soon — prioritize these.`, cta: 'View →', style: 'amber' };
  }

  const pct = Math.min(100, Math.round((state.scheduled / state.target) * 100));
  const gap = Math.max(0, state.target - state.scheduled);

  const actionBg: Record<ActionStyle, string> = {
    green:  'bg-emerald-900/20 border-emerald-700/25',
    amber:  'bg-amber-900/20 border-amber-700/25',
    normal: 'bg-brand-raised/20 border-brand-accent/20',
  };
  const actionText: Record<ActionStyle, string> = {
    green:  'text-emerald-300/80',
    amber:  'text-amber-300/80',
    normal: 'text-brand-muted/60',
  };
  const actionCta: Record<ActionStyle, string> = {
    green:  'text-emerald-400',
    amber:  'text-amber-400',
    normal: 'text-brand-accent',
  };

  return (
    <div className="bg-brand-bg rounded-xl overflow-hidden border border-brand-muted/10">

      {/* Browser chrome */}
      <div className="bg-brand-surface px-4 py-2.5 border-b border-brand-muted/10 flex items-center gap-2">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => <div key={i} className="w-2.5 h-2.5 rounded-full bg-brand-muted/20" />)}
        </div>
        <span className="text-[11px] text-brand-muted/50 font-medium mx-auto">FreshPrep — Calendar</span>
      </div>

      <div className="p-4 space-y-5">

        {/* ── TODAY zone ────────────────────────────────── */}
        <div>
          <div className="flex items-baseline justify-between mb-2.5">
            <p className="text-[10px] font-semibold text-brand-muted/40 uppercase tracking-widest">Today&apos;s Schedule</p>
            <p className="text-xs text-brand-muted/40">Sunday, Apr 27</p>
          </div>

          {action && (
            <div className={`mb-3 px-3 py-2 rounded-lg border flex items-center justify-between gap-2 ${actionBg[action.style]}`}>
              <p className={`text-xs ${actionText[action.style]}`}>{action.msg}</p>
              {action.cta && (
                <span className={`text-xs font-medium shrink-0 ${actionCta[action.style]}`}>{action.cta}</span>
              )}
            </div>
          )}

          <div className="space-y-2">
            {state.meals.map((meal) => (
              <div key={meal.id} className="bg-brand-surface rounded-lg border border-brand-raised/40 overflow-hidden">
                <div className="px-3 py-2 bg-brand-raised">
                  <span className="text-xs font-semibold text-brand-muted">{meal.slot}</span>
                </div>
                <div className="px-3 py-2.5">
                  <p className={`text-sm font-medium mb-2 transition-colors ${meal.eaten ? 'line-through text-brand-muted/35' : 'text-brand-muted'}`}>
                    {meal.name}
                  </p>
                  {meal.eaten ? (
                    <p className="text-xs text-brand-accent/70 font-medium">✓ Eaten</p>
                  ) : (
                    <button
                      onClick={() => markEaten(meal.id)}
                      className="text-xs bg-brand-accent text-brand-muted px-3 py-1.5 rounded-lg font-medium hover:bg-brand-accent/80 transition-colors"
                    >
                      Mark as Eaten
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── THIS WEEK zone ────────────────────────────── */}
        <div>
          <p className="text-[10px] font-semibold text-brand-muted/40 uppercase tracking-widest mb-2.5">This Week</p>
          <div className="space-y-2">
            <div className="bg-brand-surface rounded-lg border border-brand-muted/15 px-4 py-3">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs text-brand-muted/50">Meals scheduled</p>
                <p className="text-sm font-semibold text-brand-muted">
                  {state.scheduled}
                  <span className="font-normal text-brand-muted/40"> / {state.target}</span>
                </p>
              </div>
              <div className="h-1.5 bg-brand-bg rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-accent rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              {gap > 0 && (
                <p className="text-[11px] text-brand-muted/35 mt-1.5">{gap} more to hit your weekly target</p>
              )}
            </div>
            <div className="flex gap-2">
              <div className="flex-1 bg-brand-surface rounded-lg border border-brand-muted/15 px-3 py-3">
                <p className="text-[11px] text-brand-muted/40 mb-1.5">In inventory</p>
                <p className="text-base font-semibold text-brand-muted leading-none">{state.inventory}</p>
              </div>
              <div className="flex-1 bg-brand-surface rounded-lg border border-brand-muted/15 px-3 py-3">
                <p className="text-[11px] text-brand-muted/40 mb-1.5">Eaten this week</p>
                <p className="text-base font-semibold text-brand-muted leading-none">{state.eatenThisWeek}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOMENTUM zone ─────────────────────────────── */}
        <div>
          <p className="text-[10px] font-semibold text-brand-muted/40 uppercase tracking-widest mb-2.5">Momentum</p>
          <div className="flex gap-2 mb-3">
            {[
              { value: state.streak, unit: 'wks', label: 'week streak' },
              { value: state.eatenThisWeek, unit: undefined, label: 'eaten this week' },
              { value: state.prepSessions,  unit: undefined, label: 'prep sessions' },
            ].map((s) => (
              <div key={s.label} className="flex-1 bg-brand-surface rounded-lg border border-brand-muted/15 px-3 py-3 text-center">
                <p className="text-base font-semibold text-brand-muted leading-none mb-1.5">
                  {s.value}
                  {s.unit && <span className="text-xs font-normal text-brand-muted/40 ml-0.5">{s.unit}</span>}
                </p>
                <p className="text-[11px] text-brand-muted/45 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowInsights(!showInsights)}
            className="w-full text-xs text-brand-accent/70 hover:text-brand-accent transition-colors py-1 font-medium"
          >
            {showInsights ? 'Hide insights ↑' : 'View insights →'}
          </button>

          {showInsights && (
            <div className="mt-3 bg-brand-surface rounded-xl border border-brand-muted/15 overflow-hidden">
              <div className="px-4 py-3 border-b border-brand-muted/10">
                <p className="text-sm font-semibold text-brand-muted">Your Progress</p>
                <p className="text-xs text-brand-muted/40 mt-0.5">{activeWeeks} weeks of data</p>
              </div>

              {/* Consistency */}
              <div className="px-4 py-3 border-b border-brand-muted/10">
                <p className="text-[11px] font-semibold text-brand-muted/40 uppercase tracking-widest mb-2.5">Consistency</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { v: `${state.streak} wks`, l: 'current streak', peak: state.streak === bestStreak },
                    { v: `${bestStreak} wks`,   l: 'best streak',    peak: false },
                    { v: `${activeWeeks} wks`,  l: 'active weeks',   peak: false },
                  ].map((s) => (
                    <div key={s.l} className={`bg-brand-bg rounded-lg px-2 py-2.5 text-center ${s.peak ? 'border border-brand-accent/30' : ''}`}>
                      <p className={`text-sm font-semibold leading-none mb-1 ${s.peak ? 'text-brand-accent' : 'text-brand-muted'}`}>{s.v}</p>
                      <p className="text-[10px] text-brand-muted/40 leading-tight">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Execution */}
              <div className="px-4 py-3 border-b border-brand-muted/10">
                <p className="text-[11px] font-semibold text-brand-muted/40 uppercase tracking-widest mb-2.5">Execution</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { v: state.prepSessions,   l: 'prep sessions' },
                    { v: state.eatenThisWeek,  l: 'eaten this week' },
                    { v: 20,                   l: 'total eaten' },
                  ].map((s) => (
                    <div key={s.l} className="bg-brand-bg rounded-lg px-2 py-2.5 text-center">
                      <p className="text-sm font-semibold text-brand-muted leading-none mb-1">{s.v}</p>
                      <p className="text-[10px] text-brand-muted/40 leading-tight">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Planning */}
              <div className="px-4 py-3">
                <p className="text-[11px] font-semibold text-brand-muted/40 uppercase tracking-widest mb-2.5">Planning</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { v: onTarget,   l: 'weeks on target' },
                    { v: `${Math.round((onTarget / activeWeeks) * 100)}%`, l: 'hit rate' },
                  ].map((s) => (
                    <div key={s.l} className="bg-brand-bg rounded-lg px-2 py-2.5 text-center">
                      <p className="text-sm font-semibold text-brand-muted leading-none mb-1">{s.v}</p>
                      <p className="text-[10px] text-brand-muted/40 leading-tight">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reset */}
        <div className="pt-1 border-t border-brand-muted/10 flex justify-center">
          <button
            onClick={reset}
            className="text-xs text-brand-muted/30 hover:text-brand-muted/60 transition-colors"
          >
            Reset demo
          </button>
        </div>

      </div>
    </div>
  );
}
