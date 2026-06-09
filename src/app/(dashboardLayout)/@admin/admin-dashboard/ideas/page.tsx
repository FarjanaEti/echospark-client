"use client";
import { useEffect, useState } from "react";
import { getAllIdeasAdmin, approveIdea, rejectIdea, adminDeleteIdea } from "@/services/idea.service";
import { toast } from "sonner";

export default function ManageIdeasPage() {
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");

  const load = async () => {
    try {
      const res = await getAllIdeasAdmin();
      setIdeas(res.data || []);
    } catch { toast.error("Failed"); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleApprove = async (id: string) => {
    try { await approveIdea(id); toast.success("Approved!"); load(); }
    catch { toast.error("Failed"); }
  };

  const handleReject = async () => {
    if (!rejectId || !feedback) return;
    try { await rejectIdea(rejectId, feedback); toast.success("Rejected"); setRejectId(null); setFeedback(""); load(); }
    catch { toast.error("Failed"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this idea?")) return;
    try { await adminDeleteIdea(id); toast.success("Deleted"); load(); }
    catch { toast.error("Failed"); }
  };

  const statusColor: any = {
    UNDER_REVIEW: "bg-amber-100 text-amber-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-600",
    DRAFT: "bg-gray-100 text-gray-600",
    PENDING: "bg-blue-100 text-blue-700",
  };

  if (loading) return <p className="text-sm text-gray-400">Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-900 mb-6">Manage Ideas</h2>

      {/* Reject modal */}
      {rejectId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="font-semibold text-green-900 mb-3">Rejection feedback</h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Reason for rejection..."
              className="w-full border border-green-200 rounded-xl p-3 text-sm h-24 resize-none outline-none"
            />
            <div className="flex gap-3 mt-4">
              <button onClick={handleReject} className="flex-1 py-2 bg-red-600 text-white rounded-xl text-sm">Confirm Reject</button>
              <button onClick={() => setRejectId(null)} className="flex-1 py-2 border border-green-200 rounded-xl text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {ideas.map((idea) => (
          <div key={idea.id} className="bg-white border border-green-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[idea.status]}`}>{idea.status}</span>
                <span className="text-xs text-gray-400">{idea.category?.name}</span>
              </div>
              <p className="font-medium text-green-900 text-sm">{idea.title}</p>
              <p className="text-xs text-gray-500">{idea.author?.name} · {new Date(idea.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {idea.status === "UNDER_REVIEW" && (
                <>
                  <button onClick={() => handleApprove(idea.id)} className="text-xs px-3 py-1.5 bg-green-700 text-white rounded-full">Approve</button>
                  <button onClick={() => setRejectId(idea.id)} className="text-xs px-3 py-1.5 bg-red-50 text-red-600 rounded-full">Reject</button>
                </>
              )}
              <button onClick={() => handleDelete(idea.id)} className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}