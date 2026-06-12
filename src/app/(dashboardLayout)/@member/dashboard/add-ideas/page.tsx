"use client";

import { useEffect, useState, useTransition, type FormEvent } from "react";
import { createIdea } from "@/services/idea.service";
import { getAllCategories } from "@/services/category.service";

// Contextual helpful recommendations based on focused fields
const FIELD_RECOMMENDATIONS = {
  title: {
    tip: "Make it punchy and outcome-oriented.",
    examples: ["'Solar Panels for Oak St. Library'", "'Community Tool-Sharing Hub'"],
    checks: ["Keep it under 60 characters.", "Avoid overly generic titles like 'Save Trees'."]
  },
  problemStatement: {
    tip: "Focus cleanly on the current negative environmental impact.",
    examples: ["'Single-use plastic water bottles dominate our local football matches due to a lack of water fountains.'"],
    checks: ["What is happening right now?", "Who or what does this impact locally?"]
  },
  proposedSolution: {
    tip: "Explain your tangible operational intervention.",
    examples: ["'Install 3 heavy-duty water filtration systems and distribute community-branded metal bottles.'"],
    checks: ["Is this actionable?", "How exactly does it fix the problem statement above?"]
  },
  description: {
    tip: "Provide the deep implementation roadmap here.",
    examples: ["Break down steps: Phase 1 (Sourcing spatial permits), Phase 2 (Gathering volunteers), Phase 3 (Launch event)."],
    checks: ["Mention required resources.", "Outline maintenance responsibility long-term."]
  },
  monetization: {
    tip: "Is your community plan a paid premium project or a free open initiative?",
    examples: ["Charge a premium access fee for specialized blueprints or specialized materials kits."],
    checks: ["Paid items face review for financial compliance.", "Ensure fair micro-pricing."]
  }
};

type FieldKey = keyof typeof FIELD_RECOMMENDATIONS;

export default function AddIdeaPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Form State matching your exact Prisma Model
  const [title, setTitle] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [proposedSolution, setProposedSolution] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState<number | "">("");
  const [images, setImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    getAllCategories()
      .then((result) => setCategories(result || []))
      .catch(() => setCategories([]));
  }, []);

  // Tracking user focus to change recommendations dynamically
  const [activeField, setActiveField] = useState<FieldKey>("title");

  /* ---------------- Handlers ---------------- */
  const handleAddImageUrl = () => {
    if (imageUrlInput.trim() && !images.includes(imageUrlInput.trim())) {
      setImages([...images, imageUrlInput.trim()]);
      setImageUrlInput("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);

    if (!title.trim() || !problemStatement.trim() || !proposedSolution.trim() || !description.trim() || !categoryId) {
      setFeedback({ type: "error", text: "Please fill in all standard required fields and choose a category." });
      return;
    }

    startTransition(async () => {
      try {
        const payload = {
          title: title.trim(),
          problemStatement: problemStatement.trim(),
          proposedSolution: proposedSolution.trim(),
          description: description.trim(),
          categoryId,
          isPaid,
          price: isPaid ? Number(price) || 0 : undefined,
          images,
        };

        await createIdea(payload);
        setFeedback({ type: "success", text: "Idea saved successfully and sent for review." });
        setTitle("");
        setProblemStatement("");
        setProposedSolution("");
        setDescription("");
        setCategoryId("");
        setIsPaid(false);
        setPrice("");
        setImages([]);
        setImageUrlInput("");
      } catch (err) {
        setFeedback({ type: "error", text: "An error occurred while saving your sustainability project idea." });
      }
    });
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 text-gray-800">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Propose a Sustainable Idea</h1>
        <p className="text-gray-500 mt-1">Draft a blueprint for positive environmental changes in your community.</p>
      </div>

      {feedback && (
        <div className={`mb-6 p-4 rounded-lg text-sm ${
          feedback.type === "success"
            ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
            : "bg-red-50 border border-red-200 text-red-700"
        }`}>
          {feedback.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* FORM SIDE (7 Columns) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Project Title</label>
            <input
              type="text"
              value={title}
              onFocus={() => setActiveField("title")}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Solar Powered Community Microgrid"
              className="w-full border border-gray-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all text-sm"
            />
          </div>

          {/* Category Dropdown Selection */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Strategic Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border border-gray-200 p-2.5 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all text-sm"
            >
              <option value="">-- Choose a Sustainable Pillar --</option>
              {categories.length === 0 ? (
                <option value="">Loading categories...</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Problem Statement */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Problem Statement</label>
            <textarea
              rows={3}
              value={problemStatement}
              onFocus={() => setActiveField("problemStatement")}
              onChange={(e) => setProblemStatement(e.target.value)}
              placeholder="What current climate/waste issue needs troubleshooting?"
              className="w-full border border-gray-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all text-sm resize-none"
            />
          </div>

          {/* Proposed Solution */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Proposed Solution</label>
            <textarea
              rows={3}
              value={proposedSolution}
              onFocus={() => setActiveField("proposedSolution")}
              onChange={(e) => setProposedSolution(e.target.value)}
              placeholder="How can our portal members resolve this issue collectively?"
              className="w-full border border-gray-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all text-sm resize-none"
            />
          </div>

          {/* Detailed Narrative Description */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Full Operational Description</label>
            <textarea
              rows={6}
              value={description}
              onFocus={() => setActiveField("description")}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Elaborate on structural phases, timeline requirements, and resources..."
              className="w-full border border-gray-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all text-sm generic-scrollbar"
            />
          </div>

          {/* Images Upload Link Simulation */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Project Moodboards & Images</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="Paste cloud mockups or structural asset diagram URLs"
                className="flex-1 border border-gray-200 p-2.5 rounded-lg focus:outline-none text-sm"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all"
              >
                Attach
              </button>
            </div>

            {/* Simulated Upload Strip */}
            {images.length > 0 && (
              <div className="flex gap-3 flex-wrap mt-3 bg-gray-50 p-3 border border-dashed border-gray-200 rounded-lg">
                {images.map((img, i) => (
                  <div key={i} className="relative w-16 h-16 rounded border bg-white overflow-hidden group">
                    <img src={img} alt="preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="absolute inset-0 bg-red-600/80 text-white font-bold opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px]"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Monetization / Pricing Controls */}
          <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl" onFocus={() => setActiveField("monetization")}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-800">Is this a Monetized Idea Blueprint?</h4>
                <p className="text-xs text-gray-500">Enable if access requires premium materials or licensing funding downloads.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isPaid}
                  onChange={(e) => setIsPaid(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-400/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            {isPaid && (
              <div className="mt-4 flex items-center gap-3 animate-fadeIn">
                <span className="text-sm font-semibold text-gray-600">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value !== "" ? parseFloat(e.target.value) : "")}
                  placeholder="0.00"
                  className="w-32 border border-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 text-sm"
                />
                <span className="text-xs text-gray-400">USD Download Tier Fee</span>
              </div>
            )}
          </div>

          {/* Submission Mechanics */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors disabled:opacity-50 text-sm tracking-wide"
          >
            {isPending ? "Syncing Proposal Draft..." : "Publish to Admin Audit Review Queue"}
          </button>
        </form>

        {/* INTERACTIVE RECOMMENDATION PANEL (5 Columns) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-6">
          <div className="bg-linear-to-br from-green-900 to-emerald-950 text-emerald-50 rounded-xl p-5 shadow-sm border border-emerald-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">💡</span>
              <h3 className="font-bold text-base tracking-wide uppercase text-emerald-300">
                Live Recommendation Matrix
              </h3>
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed mb-4">
              Our framework ensures submissions maintain maximum architectural clarity before admin processing.
            </p>

            <div className="bg-white/10 rounded-lg p-4 border border-white/10 backdrop-blur-xs min-h-55 transition-all">
              <div className="text-xs font-bold text-green-300 uppercase tracking-widest mb-1">
                Focus Field: <span className="text-white underline decoration-wavy underline-offset-4">{activeField}</span>
              </div>
              
              <h4 className="text-sm font-bold mt-2 text-white">
                {FIELD_RECOMMENDATIONS[activeField].tip}
              </h4>

              <div className="mt-4">
                <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider mb-1">Inspirations:</div>
                <ul className="space-y-1.5">
                  {FIELD_RECOMMENDATIONS[activeField].examples.map((ex, index) => (
                    <li key={index} className="text-xs text-gray-200 italic leading-relaxed bg-black/10 p-1.5 rounded border-l-2 border-emerald-400">
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider mb-1">Quality Assessment Checklist:</div>
                <ul className="space-y-1">
                  {FIELD_RECOMMENDATIONS[activeField].checks.map((chk, index) => (
                    <li key={index} className="text-xs text-emerald-100 flex items-center gap-1.5">
                      <span className="text-emerald-400">✔</span> {chk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Informational Blueprint Card */}
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-xs text-gray-500 leading-relaxed">
            <h5 className="font-bold text-gray-700 mb-1">Audit Queue Rules</h5>
            All incoming recommendations default to a <span className="font-semibold text-amber-600">DRAFT</span> status value. System reviewers verify safety bounds, evaluate community scalability tags, and approve items to the consumer feed within 48 hours.
          </div>
        </div>

      </div>
    </div>
  );
}