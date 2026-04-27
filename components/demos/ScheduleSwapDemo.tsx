"use client";
import { useState } from "react";

type MealTime = "Breakfast" | "Lunch" | "Dinner";
const MEAL_TIMES: MealTime[] = ["Breakfast", "Lunch", "Dinner"];

interface PreparedMeal {
  id: string;
  recipeName: string;
  variantName: string;
}

interface ScheduledSlot {
  date: string;
  mealTime: MealTime;
  mealId: string | null;
  eaten: boolean;
}

const MEALS: PreparedMeal[] = [
  { id: "1", recipeName: "Breakfast Burrito",  variantName: ""                                  },
  { id: "2", recipeName: "Rice Bowl",          variantName: "Japanese BBQ"                      },
  { id: "3", recipeName: "Protein Plate",      variantName: "Chicken · Brown Rice · Asparagus"  },
  { id: "4", recipeName: "Rice Bowl",          variantName: "Mexican"                           },
];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const INITIAL_DAILY: ScheduledSlot[] = [
  { date: "today", mealTime: "Breakfast", mealId: "1", eaten: true  },
  { date: "today", mealTime: "Lunch",     mealId: "2", eaten: false },
  { date: "today", mealTime: "Dinner",    mealId: null, eaten: false },
];

const INITIAL_WEEKLY: ScheduledSlot[] = [
  { date: "Mon", mealTime: "Breakfast", mealId: "1",  eaten: true  },
  { date: "Mon", mealTime: "Lunch",     mealId: "2",  eaten: false },
  { date: "Mon", mealTime: "Dinner",    mealId: null, eaten: false },
  { date: "Tue", mealTime: "Breakfast", mealId: "4",  eaten: false },
  { date: "Tue", mealTime: "Lunch",     mealId: "3",  eaten: false },
  { date: "Tue", mealTime: "Dinner",    mealId: null, eaten: false },
  { date: "Wed", mealTime: "Breakfast", mealId: null, eaten: false },
  { date: "Wed", mealTime: "Lunch",     mealId: "2",  eaten: false },
  { date: "Wed", mealTime: "Dinner",    mealId: "3",  eaten: false },
  ...["Thu", "Fri", "Sat", "Sun"].flatMap((d) =>
    MEAL_TIMES.map((t) => ({ date: d, mealTime: t, mealId: null, eaten: false }))
  ),
];

export default function ScheduleSwapDemo() {
  const [view, setView] = useState<"daily" | "weekly">("daily");
  const [daily, setDaily] = useState<ScheduledSlot[]>(INITIAL_DAILY);
  const [weekly, setWeekly] = useState<ScheduledSlot[]>(INITIAL_WEEKLY);
  const [modal, setModal] = useState<{ date: string; mealTime: MealTime; mode: "assign" | "swap" } | null>(null);

  const slots     = view === "daily" ? daily     : weekly;
  const setSlots  = view === "daily" ? setDaily  : setWeekly;

  function getMeal(id: string | null) {
    return MEALS.find((m) => m.id === id) ?? null;
  }

  function assign(date: string, mealTime: MealTime, mealId: string) {
    setSlots((prev) =>
      prev.map((s) => s.date === date && s.mealTime === mealTime ? { ...s, mealId, eaten: false } : s)
    );
    setModal(null);
  }

  function unschedule(date: string, mealTime: MealTime) {
    setSlots((prev) =>
      prev.map((s) => s.date === date && s.mealTime === mealTime ? { ...s, mealId: null, eaten: false } : s)
    );
  }

  function markEaten(date: string, mealTime: MealTime) {
    setSlots((prev) =>
      prev.map((s) => s.date === date && s.mealTime === mealTime ? { ...s, eaten: true } : s)
    );
  }

  function resetAll() {
    setDaily(INITIAL_DAILY);
    setWeekly(INITIAL_WEEKLY);
    setModal(null);
  }

  const modalSlot = modal ? slots.find((s) => s.date === modal.date && s.mealTime === modal.mealTime) : null;
  const swapMealId = modalSlot?.mealId ?? null;

  return (
    <div className="bg-brand-bg rounded-xl overflow-hidden border border-brand-raised/40">

      {/* Sub-tab toggle */}
      <div className="flex bg-brand-surface border-b border-brand-raised/30 p-1 mx-3 mt-3 rounded-lg">
        {(["daily", "weekly"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors capitalize ${
              view === v ? "bg-brand-raised text-brand-muted" : "text-brand-muted/40 hover:text-brand-muted/70"
            }`}
          >
            {v === "daily" ? "Daily" : "Weekly"}
          </button>
        ))}
      </div>

      {/* ── DAILY VIEW ── */}
      {view === "daily" && (
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-xs text-brand-muted/40 uppercase tracking-wide">Today</p>
              <p className="text-sm font-semibold text-brand-muted">Saturday, Apr 19</p>
            </div>
            <button onClick={resetAll} className="text-xs text-brand-muted/30 hover:text-brand-muted/60 transition-colors">Reset</button>
          </div>

          {daily.map((slot) => {
            const meal = getMeal(slot.mealId);
            return (
              <div key={slot.mealTime} className="bg-brand-surface rounded-lg border border-brand-raised/40 overflow-hidden">
                <div className="px-3 py-2 bg-brand-raised">
                  <span className="text-xs font-semibold text-brand-muted">{slot.mealTime}</span>
                </div>
                {meal ? (
                  <div className="px-3 py-2.5">
                    <p className={`text-sm font-medium transition-colors ${slot.eaten ? "text-brand-muted/40 line-through" : "text-brand-muted"}`}>
                      {meal.recipeName}
                    </p>
                    {meal.variantName && (
                      <p className={`text-xs mt-0.5 ${slot.eaten ? "text-brand-muted/30" : "text-brand-muted/50"}`}>
                        {meal.variantName}
                      </p>
                    )}
                    {slot.eaten ? (
                      <p className="text-xs text-brand-accent/70 font-medium mt-2">✓ Eaten</p>
                    ) : (
                      <div className="flex gap-2 mt-2.5">
                        <button
                          onClick={() => markEaten(slot.date, slot.mealTime)}
                          className="flex-1 text-xs py-1.5 bg-brand-accent text-brand-muted rounded-lg hover:bg-brand-accent/80 transition-colors font-medium"
                        >
                          Mark as Eaten
                        </button>
                        <button
                          onClick={() => setModal({ date: slot.date, mealTime: slot.mealTime, mode: "swap" })}
                          className="px-3 text-xs py-1.5 bg-brand-accent/20 text-brand-accent border border-brand-accent/30 rounded-lg hover:bg-brand-accent/30 transition-colors font-medium"
                        >
                          Swap
                        </button>
                        <button
                          onClick={() => unschedule(slot.date, slot.mealTime)}
                          className="px-2.5 text-xs py-1.5 border border-brand-raised/40 text-brand-muted/40 rounded-lg hover:border-red-700/60 hover:text-red-400 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setModal({ date: slot.date, mealTime: slot.mealTime, mode: "assign" })}
                    className="w-full px-3 py-2.5 text-left text-xs text-brand-muted/30 hover:text-brand-accent transition-colors"
                  >
                    + Assign meal
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── WEEKLY VIEW ── */}
      {view === "weekly" && (
        <div className="p-3 space-y-2 max-h-[520px] overflow-y-auto">
          <div className="flex justify-end mb-1">
            <button onClick={resetAll} className="text-xs text-brand-muted/30 hover:text-brand-muted/60 transition-colors">Reset</button>
          </div>
          {WEEK_DAYS.map((day) => {
            const daySlots = weekly.filter((s) => s.date === day);
            return (
              <div key={day} className="bg-brand-surface rounded-lg border border-brand-raised/40 overflow-hidden">
                <div className="px-3 py-2 bg-brand-raised flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-muted">{day === "Mon" ? "Monday (Today)" : day === "Tue" ? "Tuesday" : day === "Wed" ? "Wednesday" : day}</span>
                </div>
                <div className="divide-y divide-brand-raised/20">
                  {daySlots.map((slot) => {
                    const meal = getMeal(slot.mealId);
                    return (
                      <div key={slot.mealTime} className="px-3 py-2 flex items-center justify-between gap-2 bg-brand-bg/40">
                        <span className="text-xs font-medium text-brand-muted/50 w-16 shrink-0">{slot.mealTime}</span>
                        {meal ? (
                          <div className="flex-1 flex items-center justify-between gap-2 min-w-0">
                            <div className="min-w-0">
                              <p className={`text-xs truncate ${slot.eaten ? "text-brand-muted/30 line-through" : "text-brand-muted"}`}>
                                {meal.recipeName}
                              </p>
                              {meal.variantName && (
                                <p className="text-xs text-brand-muted/40 truncate">{meal.variantName}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {slot.eaten ? (
                                <span className="text-xs text-brand-accent/70 font-medium">✓ Eaten</span>
                              ) : (
                                <>
                                  <button
                                    onClick={() => setModal({ date: slot.date, mealTime: slot.mealTime, mode: "swap" })}
                                    className="text-xs px-2.5 py-1 bg-brand-accent/20 text-brand-accent border border-brand-accent/30 rounded-full hover:bg-brand-accent/30 transition-colors font-medium"
                                  >
                                    Swap
                                  </button>
                                  <button
                                    onClick={() => unschedule(slot.date, slot.mealTime)}
                                    className="text-xs px-2 py-1 text-brand-muted/40 hover:text-red-400 transition-colors"
                                  >
                                    ×
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setModal({ date: slot.date, mealTime: slot.mealTime, mode: "assign" })}
                            className="flex-1 text-left text-xs text-brand-muted/30 hover:text-brand-accent transition-colors py-1"
                          >
                            + Assign meal
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── ASSIGN / SWAP MODAL ── */}
      {modal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-brand-surface border border-brand-raised/40 rounded-xl w-full max-w-xs shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-brand-raised/30 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-brand-muted">
                  {modal.mode === "swap" ? "Swap Meal" : "Assign Meal"}
                </h3>
                <p className="text-xs text-brand-muted/50 mt-0.5">{modal.mealTime}</p>
              </div>
              <button onClick={() => setModal(null)} className="text-brand-muted/40 hover:text-brand-muted text-lg leading-none">×</button>
            </div>
            <div className="p-3 space-y-1.5 max-h-56 overflow-y-auto">
              {MEALS.filter((m) => m.id !== swapMealId).map((m) => (
                <button
                  key={m.id}
                  onClick={() => assign(modal.date, modal.mealTime, m.id)}
                  className="w-full text-left px-3 py-2.5 rounded-lg border border-brand-raised/30 hover:border-brand-accent hover:bg-brand-accent/10 transition-colors"
                >
                  <p className="text-sm font-medium text-brand-muted">{m.recipeName}</p>
                  {m.variantName && <p className="text-xs text-brand-muted/50 mt-0.5">{m.variantName}</p>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
