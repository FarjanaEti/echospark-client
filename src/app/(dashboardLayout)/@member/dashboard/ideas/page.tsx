"use client";
import { useEffect, useState } from "react";
import { getMyIdeas, deleteIdea, submitIdea } from "@/services/idea.service";
import Link from "next/link";
import { toast } from "sonner";

const statusColor: any = {
  DRAFT: "bg-gray-100 text-gray-600",
  UNDER_REVIEW: "bg-amber-100 text-amber-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-600",
  PENDING: "bg-blue-100 text-blue-700",
};

export default function MyIdeasPage() {
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try { const res = await getMyIdeas(); setIdeas(res.data || []); }
    catch { toast.error("Failed to load"); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete idea?")) return;
    try { await deleteIdea(id); toast.success("Deleted"); load(); }
    catch { toast.error("Can only delete draft or rejected ideas"); }
  };

  const handleSubmit = async (id: string) => {
    try { await submitIdea(id); toast.success("Submitted for review!"); load(); }
    catch { toast.error("Failed to submit"); }
  };

  if (loading) return <p className="text-sm text-gray-400">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-green-900">My Ideas</h2>
        <Link href="/dashboard/add-ideas" className="px-4 py-2 bg-green-700 text-white rounded-xl text-sm hover:bg-green-800">
          + New idea
        </Link>
      </div>
      <div className="space-y-3">
        {ideas.map((idea) => (
          <div key={idea.id} className="bg-white border border-green-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[idea.status]}`}>{idea.status}</span>
                <span className="text-xs text-gray-400">{idea.category?.name}</span>
              </div>
              <p className="font-medium text-sm text-green-900">{idea.title}</p>
              {idea.status === "REJECTED" && idea.rejectionFeedback && (
                <p className="text-xs text-red-500 mt-1">Feedback: {idea.rejectionFeedback}</p>
              )}
            </div>
            <div className="flex gap-2">
              {idea.status === "DRAFT" && (
                <>
                  <button onClick={() => handleSubmit(idea.id)} className="text-xs px-3 py-1.5 bg-green-700 text-white rounded-full">Submit</button>
                  <Link href={`/dashboard/member/ideas/${idea.id}/edit`} className="text-xs px-3 py-1.5 bg-green-50 text-green-700 rounded-full">Edit</Link>
                </>
              )}
              {idea.status === "REJECTED" && (
                <Link href={`/dashboard/member/ideas/${idea.id}/edit`} className="text-xs px-3 py-1.5 bg-green-50 text-green-700 rounded-full">Edit</Link>
              )}
              {["DRAFT", "REJECTED"].includes(idea.status) && (
                <button onClick={() => handleDelete(idea.id)} className="text-xs px-3 py-1.5 bg-red-50 text-red-600 rounded-full">Delete</button>
              )}
            </div>
          </div>
        ))}
        {ideas.length === 0 && <p className="text-sm text-gray-400">No ideas yet. Create your first one!</p>}
      </div>
    </div>
  );
}