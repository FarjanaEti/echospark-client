"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/reviews/my")
      .then(r => setReviews(r.data?.data || []))
      .catch(() => toast.error("Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-sm text-gray-400">Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-900 mb-6">My Reviews</h2>
      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white border border-green-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-green-700">Rating: {r.rating}/10</span>
              <span className="text-xs text-gray-400">{r.idea?.title}</span>
            </div>
            <p className="text-sm text-gray-700">{r.experience}</p>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-sm text-gray-400">No reviews yet.</p>}
      </div>
    </div>
  );
}