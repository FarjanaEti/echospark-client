"use client";
import { useState } from "react";
import { subscribeNewsletter } from "@/services/newsletter.service";
import { toast } from "sonner";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await subscribeNewsletter(email);
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch {
      toast.error("Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-green-900">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-white mb-3">
          Stay in the loop 🌿
        </h2>
        <p className="text-green-300 text-sm mb-8">
          Get weekly updates on top voted ideas and new launches.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-green-400 text-sm outline-none focus:border-white/40"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-white text-green-900 rounded-full text-sm font-medium hover:bg-green-50 transition-colors disabled:opacity-60"
          >
            {loading ? "..." : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}