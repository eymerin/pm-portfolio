"use client";
import { useState } from "react";

/* ── Data model ──────────────────────────────────────────────── */

interface CoreIngredient { name: string; qty: string }
interface Variant        { id: string; name: string; ingredients: { name: string; qty: string }[] }
interface SlotOption     { name: string }
interface Slot           { id: string; label: string; options: SlotOption[] }

interface Recipe {
  id: string;
  name: string;
  type: "standard" | "composed";
  coreIngredients?: CoreIngredient[];
  variants?: Variant[];
  slots?: Slot[];
}

const RECIPES: Recipe[] = [
  {
    id: "rice-bowl",
    name: "Rice Bowl",
    type: "standard",
    coreIngredients: [
      { name: "White rice",       qty: "1 cup dry"  },
      { name: "Spring mix",       qty: "4 cups"     },
      { name: "Cherry tomatoes",  qty: "1 cup"      },
      { name: "Cucumber",         qty: "1 whole"    },
    ],
    variants: [
      { id: "greek",    name: "Greek",        ingredients: [{ name: "Feta cheese",        qty: "4 oz"  }, { name: "Kalamata olives", qty: "½ cup" }, { name: "Lemon-herb dressing", qty: "3 tbsp" }] },
      { id: "japanese", name: "Japanese BBQ", ingredients: [{ name: "Teriyaki chicken",   qty: "6 oz"  }, { name: "Sesame seeds",    qty: "1 tsp"  }, { name: "Soy glaze",           qty: "2 tbsp" }] },
      { id: "mexican",  name: "Mexican",      ingredients: [{ name: "Black beans",        qty: "1 can" }, { name: "Pico de gallo",   qty: "½ cup"  }, { name: "Lime crema",          qty: "3 tbsp" }] },
    ],
  },
  {
    id: "protein-plate",
    name: "Protein Plate",
    type: "composed",
    slots: [
      { id: "protein", label: "Protein",   options: [{ name: "Chicken breast" }, { name: "Steak"       }, { name: "Salmon"      }] },
      { id: "carb",    label: "Carb",      options: [{ name: "Brown rice"     }, { name: "Wild rice"   }, { name: "Sweet potato"}] },
      { id: "veg",     label: "Vegetable", options: [{ name: "Asparagus"      }, { name: "Broccoli"    }, { name: "Green beans" }] },
    ],
  },
];

/* ── Plan entry type ─────────────────────────────────────────── */

interface Entry {
  id: string;
  recipeId: string;
  servings: number;
  selectedVariantIds: string[];
  slotPicks: Record<string, string[]>;
  collapsed: boolean;
}

/* ── Shopping list derivation ────────────────────────────────── */

type SingleItem   = { kind: "single";   key: string; name: string; qty?: string };
type FlexItem     = { kind: "flexible"; key: string; label: string; options: { name: string; qty?: string }[] };
type ShoppingItem = SingleItem | FlexItem;
interface ShoppingSection { title: string; entryId: string; items: ShoppingItem[] }

function parseFraction(s: string): number {
  if (s.includes("/")) {
    const [n, d] = s.split("/").map(Number);
    return d ? n / d : NaN;
  }
  return Number(s);
}

function scaleQty(qty: string, servings: number): string {
  if (servings === 1) return qty;
  const match = qty.match(/^(\d+(?:\/\d+)?)/);
  if (!match) return qty;
  const base = parseFraction(match[1]);
  if (isNaN(base)) return qty;
  const scaled = base * servings;
  const result = scaled % 1 === 0 ? String(scaled) : scaled.toFixed(1);
  return qty.replace(/^\d+(?:\/\d+)?/, result);
}

function buildShoppingList(entries: Entry[]): ShoppingSection[] {
  const sections: ShoppingSection[] = [];
  for (const entry of entries) {
    const recipe = RECIPES.find((r) => r.id === entry.recipeId);
    if (!recipe) continue;
    const items: ShoppingItem[] = [];
    const srv = entry.servings;
    const scale = (q: string) => scaleQty(q, srv);

    if (recipe.type === "standard") {
      for (const ing of recipe.coreIngredients ?? []) {
        items.push({ kind: "single", key: `${entry.id}-core-${ing.name}`, name: ing.name, qty: scale(ing.qty) });
      }
      const selected = (recipe.variants ?? []).filter((v) => entry.selectedVariantIds.includes(v.id));
      if (selected.length === 1) {
        for (const ing of selected[0].ingredients) {
          items.push({ kind: "single", key: `${entry.id}-${selected[0].id}-${ing.name}`, name: ing.name, qty: scale(ing.qty) });
        }
      } else if (selected.length > 1) {
        items.push({
          kind: "flexible",
          key: `${entry.id}-variant-flex`,
          label: "Which variant did you buy for?",
          options: selected.map((v) => ({ name: v.name })),
        });
      }
    } else if (recipe.type === "composed") {
      for (const slot of recipe.slots ?? []) {
        const picks = entry.slotPicks[slot.id] ?? [];
        if (picks.length === 1) {
          items.push({ kind: "single", key: `${entry.id}-${slot.id}`, name: picks[0] });
        } else if (picks.length > 1) {
          items.push({ kind: "flexible", key: `${entry.id}-${slot.id}-flex`, label: slot.label, options: picks.map((n) => ({ name: n })) });
        }
      }
    }

    if (items.length > 0) {
      const suffix = srv > 1 ? ` (×${srv})` : "";
      sections.push({ title: recipe.name + suffix, entryId: entry.id, items });
    }
  }
  return sections;
}

/* ── Plan entry summary ──────────────────────────────────────── */

function getEntrySummary(entry: Entry, recipe: Recipe): string {
  if (recipe.type === "composed" && recipe.slots) {
    const parts = recipe.slots
      .map((slot) => {
        const picks = entry.slotPicks[slot.id] || [];
        if (!picks.length) return null;
        return picks.length === 1 ? picks[0] : picks.join(" or ");
      })
      .filter(Boolean) as string[];
    if (!parts.length) return "Nothing configured yet";
    if (parts.length < recipe.slots.length) return `${parts.length} of ${recipe.slots.length} components set`;
    return parts.join(" · ");
  } else {
    const selected = entry.selectedVariantIds;
    if (!recipe.variants?.length || !selected.length) return "No variants selected";
    const names = recipe.variants.filter((v) => selected.includes(v.id)).map((v) => v.name);
    return selected.length === 1 ? names[0] : names.join(", ") + " (flexible)";
  }
}

/* ── Main component ──────────────────────────────────────────── */

export default function RecipeVariantDemo() {
  const [activeTab, setActiveTab] = useState<"picks" | "shopping">("picks");
  const [entries, setEntries] = useState<Entry[]>([
    { id: "e1", recipeId: "rice-bowl",     servings: 4, selectedVariantIds: [], slotPicks: {}, collapsed: false },
    { id: "e2", recipeId: "protein-plate", servings: 5, selectedVariantIds: [], slotPicks: {}, collapsed: false },
  ]);
  const [showPicker, setShowPicker] = useState(false);
  const [grabbed, setGrabbed]       = useState<Set<string>>(new Set());
  const [chosen, setChosen]         = useState<Record<string, string>>({});

  function updateEntry(id: string, update: Partial<Entry>) {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...update } : e)));
  }
  function toggleVariant(entryId: string, variantId: string) {
    setEntries((prev) =>
      prev.map((e) => {
        if (e.id !== entryId) return e;
        const has = e.selectedVariantIds.includes(variantId);
        return { ...e, selectedVariantIds: has ? e.selectedVariantIds.filter((v) => v !== variantId) : [...e.selectedVariantIds, variantId] };
      })
    );
  }
  function toggleSlot(entryId: string, slotId: string, optName: string) {
    setEntries((prev) =>
      prev.map((e) => {
        if (e.id !== entryId) return e;
        const cur = e.slotPicks[slotId] || [];
        const has = cur.includes(optName);
        return { ...e, slotPicks: { ...e.slotPicks, [slotId]: has ? cur.filter((o) => o !== optName) : [...cur, optName] } };
      })
    );
  }
  function removeEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }
  function addEntry(recipeId: string) {
    const id = Math.random().toString(36).slice(2, 8);
    setEntries((prev) => [...prev, { id, recipeId, servings: 4, selectedVariantIds: [], slotPicks: {}, collapsed: false }]);
    setShowPicker(false);
  }
  function toggleGrabbed(key: string) {
    setGrabbed((prev) => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });
  }
  function pickChosen(key: string, name: string) {
    setChosen((prev) => ({ ...prev, [key]: prev[key] === name ? "" : name }));
  }
  function resetShopping() { setGrabbed(new Set()); setChosen({}); }

  const recipeCountMap: Record<string, number> = {};
  const entryNumberMap: Record<string, number> = {};
  for (const e of entries) recipeCountMap[e.recipeId] = (recipeCountMap[e.recipeId] || 0) + 1;
  const seen: Record<string, number> = {};
  for (const e of entries) { seen[e.recipeId] = (seen[e.recipeId] || 0) + 1; entryNumberMap[e.id] = seen[e.recipeId]; }

  const shoppingSections = buildShoppingList(entries);
  const totalItems  = shoppingSections.reduce((n, s) => n + s.items.length, 0);
  const checkedCount = shoppingSections.reduce((n, s) =>
    n + s.items.filter((item) =>
      item.kind === "single" ? grabbed.has(item.key) : !!chosen[item.key]
    ).length, 0
  );

  /* shopping list item count badge on the tab */
  const shopBadge = shoppingSections.reduce((n, s) =>
    n + s.items.filter((i) => i.kind === "single").length +
        s.items.filter((i) => i.kind === "flexible").length, 0
  );

  return (
    <div className="bg-brand-bg rounded-xl overflow-hidden border border-brand-raised/40">

      {/* ── Sub-tab header ──────────────────────────────────── */}
      <div className="flex bg-brand-surface border-b border-brand-raised/30 p-1 mx-3 mt-3 rounded-lg gap-1">
        <button
          onClick={() => setActiveTab("picks")}
          className={`flex-1 py-1.5 text-xs font-medium text-center rounded-md transition-colors ${
            activeTab === "picks"
              ? "bg-brand-raised text-brand-muted"
              : "text-brand-muted/40 hover:text-brand-muted/70"
          }`}
        >
          What to Prep
        </button>
        <button
          onClick={() => setActiveTab("shopping")}
          className={`flex-1 py-1.5 text-xs font-medium text-center rounded-md transition-colors flex items-center justify-center gap-1 ${
            activeTab === "shopping"
              ? "bg-brand-raised text-brand-muted"
              : "text-brand-muted/40 hover:text-brand-muted/70"
          }`}
        >
          Shopping List
          {shopBadge > 0 && (
            <span className={`inline-flex items-center justify-center w-4 h-4 text-[10px] rounded-full font-semibold ${
              activeTab === "shopping" ? "bg-brand-accent text-brand-muted" : "bg-brand-raised/60 text-brand-muted/50"
            }`}>{shopBadge}</span>
          )}
        </button>
      </div>

      {/* ── WHAT TO PREP view ───────────────────────────────── */}
      {activeTab === "picks" && (
        <div className="p-3 space-y-2">
          {entries.map((entry) => {
            const recipe = RECIPES.find((r) => r.id === entry.recipeId)!;
            const hasContent = recipe.type === "composed" ? (recipe.slots?.length ?? 0) > 0 : (recipe.variants?.length ?? 0) > 0;
            const summary    = getEntrySummary(entry, recipe);
            const entryNum   = entryNumberMap[entry.id];
            const showNum    = recipeCountMap[entry.recipeId] > 1;

            return (
              <div key={entry.id} className="bg-brand-surface rounded-lg border border-brand-muted/15 overflow-hidden">
                {/* Card header */}
                <div className="flex items-center gap-2 px-3 py-2.5">
                  <button
                    onClick={() => hasContent && updateEntry(entry.id, { collapsed: !entry.collapsed })}
                    className={`flex-1 text-left min-w-0 ${!hasContent ? "cursor-default" : ""}`}
                  >
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-brand-muted">
                        {recipe.name}{showNum ? ` — Meal ${entryNum}` : ""}
                      </p>
                      {hasContent && (
                        <span className="text-brand-muted/30 text-xs">{entry.collapsed ? "▼" : "▲"}</span>
                      )}
                    </div>
                    {hasContent && entry.collapsed && summary && (
                      <p className="text-xs text-brand-muted/50 mt-0.5 truncate">{summary}</p>
                    )}
                  </button>

                  {/* Serving counter */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => updateEntry(entry.id, { servings: Math.max(1, entry.servings - 1) })}
                      className="w-6 h-6 rounded border border-brand-muted/20 text-brand-muted/50 hover:border-brand-accent hover:text-brand-accent flex items-center justify-center text-sm leading-none transition-colors"
                    >−</button>
                    <span className="text-sm font-medium text-brand-muted w-4 text-center">{entry.servings}</span>
                    <button
                      onClick={() => updateEntry(entry.id, { servings: entry.servings + 1 })}
                      className="w-6 h-6 rounded border border-brand-muted/20 text-brand-muted/50 hover:border-brand-accent hover:text-brand-accent flex items-center justify-center text-sm leading-none transition-colors"
                    >+</button>
                    <span className="text-xs text-brand-muted/30 ml-0.5">srv</span>
                  </div>

                  <button
                    onClick={() => removeEntry(entry.id)}
                    className="text-brand-muted/25 hover:text-red-400 transition-colors text-lg leading-none shrink-0 ml-1"
                  >×</button>
                </div>

                {/* Card body */}
                {hasContent && !entry.collapsed && (
                  <div className="border-t border-brand-muted/10 px-3 py-3 space-y-3">
                    {recipe.type === "composed" && recipe.slots
                      ? recipe.slots.map((slot) => {
                          const picked = entry.slotPicks[slot.id] || [];
                          return (
                            <div key={slot.id}>
                              <p className="text-xs font-semibold text-brand-muted/50 uppercase tracking-wide mb-1.5">{slot.label}</p>
                              <div className="flex flex-wrap gap-1.5">
                                {slot.options.map((opt) => (
                                  <button
                                    key={opt.name}
                                    onClick={() => toggleSlot(entry.id, slot.id, opt.name)}
                                    className={`px-3 py-1.5 rounded-lg border text-xs transition-colors ${
                                      picked.includes(opt.name)
                                        ? "bg-brand-accent text-brand-muted border-brand-accent"
                                        : "bg-brand-bg text-brand-muted/60 border-brand-muted/20 hover:border-brand-accent/50"
                                    }`}
                                  >
                                    {opt.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })
                      : (recipe.variants ?? []).map((variant) => {
                          const isSelected = entry.selectedVariantIds.includes(variant.id);
                          return (
                            <label
                              key={variant.id}
                              className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                                isSelected
                                  ? "border-brand-accent bg-brand-accent/10"
                                  : "border-brand-muted/15 hover:border-brand-accent/40 hover:bg-brand-muted/5"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleVariant(entry.id, variant.id)}
                                className="w-4 h-4 accent-brand-accent"
                              />
                              <div>
                                <p className="text-sm text-brand-muted/90">{variant.name}</p>
                                <p className="text-xs text-brand-muted/40 mt-0.5">
                                  + {variant.ingredients.slice(0, 3).map((i) => i.name).join(", ")}
                                </p>
                              </div>
                            </label>
                          );
                        })
                    }
                    {recipe.type === "standard" && entry.selectedVariantIds.length > 1 && (
                      <p className="text-xs text-brand-accent bg-brand-accent/10 border border-brand-accent/20 rounded-lg px-3 py-2">
                        {entry.selectedVariantIds.length} variants selected — you&apos;ll confirm which you made at prep time.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          <button
            onClick={() => setShowPicker(true)}
            className="w-full py-2.5 rounded-lg border border-dashed border-brand-muted/25 text-sm text-brand-muted/50 hover:border-brand-accent/50 hover:text-brand-accent transition-colors"
          >
            + Add a meal to this week&apos;s plan
          </button>
        </div>
      )}

      {/* ── SHOPPING LIST view ──────────────────────────────── */}
      {activeTab === "shopping" && (
        <div className="p-3">
          {shoppingSections.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-2xl mb-3">🛒</p>
              <p className="text-sm font-medium text-brand-muted/50">No items yet</p>
              <p className="text-xs text-brand-muted/35 mt-1">
                Add meals and select variants in the What to Prep tab.
              </p>
            </div>
          ) : (
            <>
              {/* Status bar */}
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-brand-muted/45">
                  {checkedCount} of {totalItems} checked
                </p>
                {(grabbed.size > 0 || Object.values(chosen).some(Boolean)) && (
                  <button
                    onClick={resetShopping}
                    className="text-xs text-brand-muted/40 hover:text-brand-muted/70 transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {shoppingSections.map((section) => (
                  <div key={section.entryId}>
                    <p className="text-xs font-semibold text-brand-muted/45 uppercase tracking-wide mb-1.5">
                      {section.title}
                    </p>
                    <div className="bg-brand-surface rounded-lg border border-brand-muted/15 overflow-hidden divide-y divide-brand-muted/10">
                      {section.items.map((item) => {
                        if (item.kind === "single") {
                          const isGrabbed = grabbed.has(item.key);
                          return (
                            <button
                              key={item.key}
                              onClick={() => toggleGrabbed(item.key)}
                              className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-brand-muted/5 transition-colors"
                            >
                              <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                                isGrabbed ? "bg-brand-accent border-brand-accent" : "border-brand-muted/30"
                              }`}>
                                {isGrabbed && <span className="text-brand-muted text-[10px] font-bold">✓</span>}
                              </div>
                              <span className={`text-sm flex-1 transition-colors ${isGrabbed ? "text-brand-muted/30 line-through" : "text-brand-muted"}`}>
                                {item.name}
                              </span>
                              {item.qty && (
                                <span className={`text-xs shrink-0 ${isGrabbed ? "text-brand-muted/20" : "text-brand-muted/45"}`}>
                                  {item.qty}
                                </span>
                              )}
                            </button>
                          );
                        }

                        // Flexible group
                        const picked = chosen[item.key] ?? "";
                        if (picked) {
                          return (
                            <button
                              key={item.key}
                              onClick={() => pickChosen(item.key, picked)}
                              className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-brand-muted/5 transition-colors"
                            >
                              <div className="w-4 h-4 rounded border bg-brand-accent border-brand-accent flex items-center justify-center shrink-0">
                                <span className="text-brand-muted text-[10px] font-bold">✓</span>
                              </div>
                              <span className="text-sm text-brand-muted flex-1">{picked}</span>
                            </button>
                          );
                        }

                        return (
                          <div key={item.key} className="px-3 py-2.5">
                            <p className="text-xs text-brand-muted/40 mb-2">Select a {item.label.toLowerCase()}:</p>
                            <div className="space-y-1 pl-3 border-l border-brand-muted/15">
                              {item.options.map((opt) => (
                                <button
                                  key={opt.name}
                                  onClick={() => pickChosen(item.key, opt.name)}
                                  className="w-full flex items-center gap-3 py-1.5 px-2 rounded-md text-left hover:bg-brand-muted/5 transition-colors"
                                >
                                  <div className="w-4 h-4 rounded border border-brand-muted/30 shrink-0" />
                                  <span className="text-sm text-brand-muted">{opt.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Recipe picker modal ──────────────────────────────── */}
      {showPicker && (
        <div
          className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 p-4"
          onClick={() => setShowPicker(false)}
        >
          <div
            className="bg-brand-surface border border-brand-muted/15 rounded-xl w-full max-w-xs shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-brand-muted/10 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-brand-muted">Add to Plan</h3>
              <button onClick={() => setShowPicker(false)} className="text-brand-muted/40 hover:text-brand-muted text-lg leading-none">×</button>
            </div>
            <div className="p-3 space-y-2">
              {RECIPES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => addEntry(r.id)}
                  className="w-full text-left px-3 py-2.5 rounded-lg border border-brand-muted/15 hover:border-brand-accent hover:bg-brand-accent/10 transition-colors"
                >
                  <p className="text-sm font-medium text-brand-muted">{r.name}</p>
                  <p className="text-xs text-brand-muted/50 mt-0.5">
                    {r.type === "composed"
                      ? `${r.slots?.length || 0} components`
                      : `${r.variants?.length ?? 0} variant${(r.variants?.length ?? 0) !== 1 ? "s" : ""}`}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
