"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { deleteComment } from "@/services/comment.service";
import { toast } from "sonner";

export default function ManageCommentsPage() {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await api.get("/comments/admin/all");
      setComments(res.data?.data || []);
    } catch { toast.error("Failed to load"); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    try { await deleteComment(id); toast.success("Deleted"); load(); }
    catch { toast.error("Failed"); }
  };

  if (loading) return <p className="text-sm text-gray-400">Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-900 mb-6">Manage Comments</h2>
      <div className="space-y-3">
        {comments.map((c) => (
          <div key={c.id} className="bg-white border border-green-100 rounded-2xl p-4 flex justify-between gap-4">
            <div>
              <p className="text-sm text-green-900">{c.content}</p>
              <p className="text-xs text-gray-400 mt-1">{c.user?.name} · {new Date(c.createdAt).toLocaleDateString()}</p>
            </div>
            <button onClick={() => handleDelete(c.id)} className="text-xs text-red-500 hover:text-red-700 shrink-0">Delete</button>
          </div>
        ))}
        {comments.length === 0 && <p className="text-sm text-gray-400">No comments found.</p>}
      </div>
    </div>
  );
}