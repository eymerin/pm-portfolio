"use client";
import { useState } from "react";

type Storage = "refrigerated" | "frozen";
type FreshnessStatus = "fresh" | "expiring" | "expired";

interface Meal {
  id: string;
  recipeName: string;
  variantName: string;
  storage: Storage;
  prepDaysAgo: number;
  servingsRemaining: number;
  servingsTotal: number;
  prepDate: string;
}

const SHELF: Record<Storage, number> = { refrigerated: 4, frozen: 90 };

const INITIAL_MEALS: Meal[] = [
  { id: "1", recipeName: "Rice Bowl",       variantName: "Japanese BBQ",                 storage: "refrigerated", prepDaysAgo: 3,  servingsRemaining: 3, servingsTotal: 4, prepDate: "3 days ago" },
  { id: "2", recipeName: "Protein Plate",   variantName: "Chicken · Brown Rice · Asparagus", storage: "refrigerated", prepDaysAgo: 1,  servingsRemaining: 4, servingsTotal: 4, prepDate: "Yesterday"  },
  { id: "3", recipeName: "Rice Bowl",       variantName: "Mexican",                       storage: "frozen",        prepDaysAgo: 14, servingsRemaining: 2, servingsTotal: 3, prepDate: "2 wks ago"  },
  { id: "4", recipeName: "Breakfast Burrito", variantName: "",                            storage: "refrigerated", prepDaysAgo: 4,  servingsRemaining: 5, servingsTotal: 6, prepDate: "4 days ago" },
];

type SlotOption = { date: string; time: string };
const SCHEDULE_SLOTS: SlotOption[] = [
  { date: "Today",     time: "Breakfast" },
  { date: "Today",     time: "Lunch"     },
  { date: "Today",     time: "Dinner"    },
  { date: "Tomorrow",  time: "Breakfast" },
  { date: "Tomorrow",  time: "Lunch"     },
  { date: "Tomorrow",  time: "Dinner"    },
];

function getFreshness(meal: Meal): FreshnessStatus {
  const shelf = SHELF[meal.storage];
  const remaining = shelf - meal.prepDaysAgo;
  if (remaining <= 0) return "expired";
  if (remaining / shelf <= 0.25) return "expiring";
  return "fresh";
}

function getDaysLeft(meal: Meal): number {
  return SHELF[meal.storage] - meal.prepDaysAgo;
}

function freshnessBar(status: FreshnessStatus) {
  if (status === "fresh")    return "bg-emerald-500";
  if (status === "expiring") return "bg-amber-400";
  return "bg-red-500";
}

function freshnessBadge(status: FreshnessStatus) {
  if (status === "fresh")    return "text-emerald-400 bg-emerald-900/40 border border-emerald-800";
  if (status === "expiring") return "text-amber-400  bg-amber-900/40  border border-amber-800";
  return                            "text-red-400    bg-red-900/40    border border-red-800";
}

function freshnessLabel(status: FreshnessStatus) {
  if (status === "fresh")    return "Fresh";
  if (status === "expiring") return "Expiring soon";
  return "Expired";
}

export default function FreshnessInventoryDemo() {
  const [meals, setMeals] = useState<Meal[]>(INITIAL_MEALS);
  const [schedulingId, setSchedulingId] = useState<string | null>(null);
  const [scheduled, setScheduled] = useState<Record<string, SlotOption[]>>({});

  const available = meals.filter((m) => m.servingsRemaining > 0);
  const finished  = meals.filter((m) => m.servingsRemaining === 0);

  const sorted = [...available].sort((a, b) => {
    const order: Record<FreshnessStatus, number> = { expired: 0, expiring: 1, fresh: 2 };
    return order[getFreshness(a)] - order[getFreshness(b)];
  });

  function remove(id: string) {
    setMeals((prev) => prev.filter((m) => m.id !== id));
  }

  function assignedCount(id: string): number {
    return (scheduled[id] || []).length;
  }

  function scheduleSlot(mealId: string, slot: SlotOption) {
    setScheduled((prev) => ({ ...prev, [mealId]: [...(prev[mealId] || []), slot] }));
    setSchedulingId(null);
  }

  const schedulingMeal = meals.find((m) => m.id === schedulingId) ?? null;
  const usedSlots = Object.values(scheduled).flat();
  const availableSlots = SCHEDULE_SLOTS.filter(
    (s) => !usedSlots.some((u) => u.date === s.date && u.time === s.time)
  );

  return (
    <div className="bg-brand-bg rounded-xl overflow-hidden border border-brand-raised/40">

      {/* Header */}
      <div className="px-4 py-3 border-b border-brand-raised/30">
        <h4 className="text-sm font-semibold text-brand-muted">Available Meals</h4>
        <p className="text-xs text-brand-muted/50 mt-0.5">
          {available.length} meal{available.length !== 1 ? "s" : ""} ready to eat
        </p>
      </div>

      {/* Meal cards */}
      <div className="p-3 space-y-2">
        {sorted.map((meal) => {
          const status   = getFreshness(meal);
          const daysLeft = getDaysLeft(meal);
          const shelf    = SHELF[meal.storage];
          const pct      = Math.max(0, (daysLeft / shelf) * 100);
          const assigned = assignedCount(meal.id);
          const unassigned = meal.servingsRemaining - assigned;

          return (
            <div key={meal.id} className="bg-brand-surface rounded-lg border border-brand-raised/40 p-3">
              {/* Name + storage badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-brand-muted leading-tight">{meal.recipeName}</p>
                  {meal.variantName && (
                    <p className="text-xs text-brand-muted/60 mt-0.5">{meal.variantName}</p>
                  )}
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-brand-bg text-brand-muted shrink-0">
                  {meal.storage === "refrigerated" ? "❄️ Fridge" : "🧊 Frozen"}
                </span>
              </div>

              {/* Meta */}
              <div className="mt-2 flex items-center gap-4 text-xs">
                <span className="text-brand-muted/50">Prepped {meal.prepDate}</span>
                <span className="text-brand-muted/50">
                  Servings{" "}
                  <span className="font-medium text-brand-muted">{meal.servingsRemaining}</span>
                </span>
                <span className={unassigned > 0 ? "text-brand-muted/50" : "text-brand-muted/30"}>
                  Unassigned{" "}
                  <span className={`font-medium ${unassigned > 0 ? "text-brand-muted" : "text-brand-muted/30"}`}>
                    {unassigned}
                  </span>
                </span>
              </div>

              {/* Freshness bar */}
              <div className="mt-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${freshnessBadge(status)}`}>
                    {freshnessLabel(status)}
                  </span>
                  <span className="text-xs text-brand-muted/50">
                    {daysLeft > 0 ? `${daysLeft}d left` : "Expired"}
                  </span>
                </div>
                <div className="h-1.5 bg-brand-bg rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${freshnessBar(status)}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-3 pt-2.5 border-t border-brand-raised/30">
                <button
                  onClick={() => unassigned > 0 && setSchedulingId(meal.id)}
                  disabled={unassigned <= 0}
                  className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors ${
                    unassigned > 0
                      ? "bg-brand-accent text-brand-muted hover:bg-brand-accent/80"
                      : "bg-brand-surface border border-brand-raised/30 text-brand-muted/25 cursor-not-allowed"
                  }`}
                >
                  {unassigned > 0 ? "Schedule" : "Fully Scheduled"}
                </button>
                <button
                  onClick={() => remove(meal.id)}
                  className="px-3 text-xs py-1.5 border border-brand-raised/40 text-brand-muted/50 rounded-lg hover:border-red-700/60 hover:text-red-400 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}

        {/* Finished section */}
        {finished.length > 0 && (
          <div className="pt-1">
            <p className="text-xs text-brand-muted/40 uppercase tracking-wide font-medium mb-1.5">Finished</p>
            {finished.map((meal) => (
              <div
                key={meal.id}
                className="flex items-center justify-between py-2 px-3 bg-brand-surface/40 rounded-lg mb-1 opacity-50"
              >
                <p className="text-sm text-brand-muted">{meal.recipeName}</p>
                <button
                  onClick={() => remove(meal.id)}
                  className="text-xs text-brand-muted/40 hover:text-red-400 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {sorted.length === 0 && finished.length === 0 && (
          <div className="text-center py-10">
            <p className="text-2xl mb-2">📦</p>
            <p className="text-sm font-medium text-brand-muted">No meals prepped yet</p>
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      {schedulingMeal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 p-4"
          onClick={() => setSchedulingId(null)}
        >
          <div
            className="bg-brand-surface border border-brand-raised/40 rounded-xl w-full max-w-xs shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-brand-raised/30 flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold text-brand-muted">Schedule Meal</h3>
                <p className="text-xs text-brand-muted/50 mt-0.5">
                  {schedulingMeal.recipeName}
                  {schedulingMeal.variantName ? ` · ${schedulingMeal.variantName}` : ""}
                </p>
              </div>
              <button
                onClick={() => setSchedulingId(null)}
                className="text-brand-muted/40 hover:text-brand-muted text-lg leading-none ml-2"
              >
                ×
              </button>
            </div>
            <div className="p-3 max-h-64 overflow-y-auto">
              {availableSlots.length === 0 ? (
                <p className="text-xs text-brand-muted/50 text-center py-6">All slots this week are filled.</p>
              ) : (
                <div className="space-y-1">
                  {(["Today", "Tomorrow"] as const).map((day) => {
                    const daySlots = availableSlots.filter((s) => s.date === day);
                    if (!daySlots.length) return null;
                    return (
                      <div key={day} className="mb-2">
                        <p className="text-xs font-semibold text-brand-muted/40 uppercase tracking-wider mb-1.5">{day}</p>
                        {daySlots.map((slot) => (
                          <button
                            key={`${slot.date}-${slot.time}`}
                            onClick={() => scheduleSlot(schedulingMeal.id, slot)}
                            className="w-full text-left px-3 py-2 rounded-lg border border-brand-raised/30 hover:border-brand-accent hover:bg-brand-accent/10 transition-colors mb-1 flex items-center justify-between"
                          >
                            <span className="text-sm text-brand-muted">{slot.time}</span>
                            <span className="text-brand-muted/30 text-xs">+</span>
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
