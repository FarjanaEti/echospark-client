"use client";

import { createCategoryAction } from "@/app/action/category.action";
import { useState, useRef, type FormEvent } from "react";

export default function AddCategoryPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#10B981");
  const [isActive, setIsActive] = useState(true);
  const [icon, setIcon] = useState("🌱");
  const [scaleTag, setScaleTag] = useState("Micro"); // Added state for Scale Tag
  const colorRef = useRef<HTMLInputElement | null>(null);

  /* ---------------- Submit Handler ---------------- */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      setMessage("Category name is required.");
      return;
    }

    if (!confirm(`Submit category "${name.trim()}" with [${scaleTag}] scale?`)) {
      return;
    }

    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    formData.set("name", name);
    formData.set("isActive", isActive ? "true" : "false");
    formData.set("color", color);
    formData.set("icon", icon);
    formData.set("scaleTag", scaleTag); // 

    const res = await createCategoryAction(formData);

    setLoading(false);
    setMessage(res.message);
    if (res.success) {
      setName("");
      setColor("#10B981");
      setIcon("🌱");
      setScaleTag("Micro");
      setIsActive(true);
    }
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-4xl mx-auto bg-card p-6 rounded-xl shadow text-card-foreground">
      <h1 className="text-2xl font-semibold mb-6">Add Sustainability Category</h1>

      {message && (
        <p
          className={`mb-4 text-lg ${
            message.toLowerCase().includes("success") ? "text-accent" : "text-destructive"
          }`}
        >
          {message}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Column */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Input */}
            <div>
              <label className="text-sm font-medium mb-2 block">Category Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                placeholder="e.g., Clean Energy, Waste Reduction"
                className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>

            {/* Scale Tag Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">Scale Tag</label>
              <div className="flex gap-2">
                <input type="hidden" name="scaleTag" value={scaleTag} />
                {[
                  { name: "Micro", desc: "Individual/Household habits" },
                  { name: "Macro", desc: "Community/Systemic infrastructure" }
                ].map((tag) => (
                  <button
                    type="button"
                    key={tag.name}
                    onClick={() => setScaleTag(tag.name)}
                    className={`flex-1 p-2 rounded-md border text-sm text-left transition-all ${
                      scaleTag === tag.name 
                        ? "border-green-600 bg-green-50 ring-2 ring-green-600/20" 
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{tag.name}</div>
                    <div className="text-xs text-gray-500">{tag.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sustainability Icons */}
            <div>
              <label className="text-sm font-medium mb-2 block">Icon</label>
              <div className="flex gap-2 items-center">
                <input type="hidden" name="icon" value={icon} />
                {[
                  { symbol: "🌱", label: "Biodiversity/Ecosystems" },
                  { symbol: "☀️", label: "Clean Energy" },
                  { symbol: "🔄", label: "Waste Reduction/Circularity" },
                  { symbol: "🚲", label: "Sustainable Mobility" },
                  { symbol: "💧", label: "Water Stewardship" }
                ].map((em) => (
                  <button
                    type="button"
                    key={em.symbol}
                    onClick={() => setIcon(em.symbol)}
                    title={em.label}
                    className={`text-2xl p-2 rounded-md border transition-all ${
                      icon === em.symbol 
                        ? "border-green-600 bg-green-50 ring-2 ring-green-600/20" 
                        : "border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    {em.symbol}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Input */}
            <div>
              <label className="text-sm font-medium mb-2 block">Badge Color</label>
              <div className="flex items-center gap-3">
                <input
                  ref={colorRef}
                  name="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  type="color"
                  className="w-12 h-10 p-0 border-0 cursor-pointer rounded overflow-hidden"
                />
                <div className="text-sm text-muted-foreground">Pick a color theme for this cluster</div>
              </div>
            </div>

            {/* Status Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => setIsActive((s) => !s)}
                name="isActive"
                className="h-5 w-5 accent-green-600 rounded"
              />
              <span className="text-sm">Active (Visible to community members immediately)</span>
            </label>

            {/* Submit & Reset Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-black font-medium py-2.5 rounded-md disabled:opacity-60 transition-colors shadow-sm"
              >
                {loading ? "Saving Category..." : "Confirm & Add Category"}
              </button>
              <button
                type="button"
                onClick={() => { 
                  setName(""); 
                  setColor("#10B981"); 
                  setIcon("🌱"); 
                  setScaleTag("Micro"); 
                  setIsActive(true); 
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Preview Column */}
        <div className="bg-linear-to-br from-green-50/60 to-white p-6 rounded-lg border border-green-100 flex flex-col items-center justify-center">
          <div className="mb-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800">Live Portal Preview</h3>
            <p className="text-sm text-gray-500">See how this card badge dynamically updates for members</p>
          </div>

          {/* Dynamic Badge Display */}
          <div
            className="px-6 py-4 rounded-2xl inline-flex flex-col items-center gap-2 shadow-xl border border-white/20 transition-all max-w-xs w-full text-center"
            style={{ background: color, color: '#fff' }}
          >
            <div className="flex items-center justify-between w-full border-b border-white/20 pb-2 mb-1">
              <span className="text-xs font-bold tracking-wider uppercase bg-white/20 px-2 py-0.5 rounded-md">
                [{scaleTag}] Scale
              </span>
              {!isActive && <span className="text-xs bg-red-500/80 font-medium px-2 py-0.5 rounded-md">Hidden</span>}
            </div>
            
            <span className="text-4xl my-1 drop-shadow-sm">{icon}</span>
            <span className="font-bold text-lg leading-snug wrap-break-words w-full">
              {name || 'Category Title'}
            </span>
          </div>

          <div className="mt-8 w-full border-t border-gray-100 pt-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Color Usage Tip</div>
            <div className="text-xs text-gray-500 leading-relaxed">
              Ensure white text readability against your selection. Darker greens, blues, and teals typically score higher on accessibility guidelines.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}