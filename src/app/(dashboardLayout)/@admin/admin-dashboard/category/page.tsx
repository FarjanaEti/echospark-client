"use client";
import { useEffect, useState } from "react";
import { getAllCategories, createCategory, deleteCategory } from "@/services/category.service";
import { toast } from "sonner";

export default function ManageCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try { const res = await getAllCategories(); setCategories(res.data || []); }
    catch { toast.error("Failed to load"); }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try { await createCategory(name); toast.success("Created!"); setName(""); load(); }
    catch { toast.error("Failed"); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete category?")) return;
    try { await deleteCategory(id); toast.success("Deleted"); load(); }
    catch { toast.error("Failed — may have ideas attached"); }
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-semibold text-green-900 mb-6">Manage Categories</h2>
      <form onSubmit={handleCreate} className="flex gap-3 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name..."
          className="flex-1 px-4 py-2 border border-green-200 rounded-xl text-sm outline-none focus:border-green-400"
        />
        <button disabled={loading} className="px-5 py-2 bg-green-700 text-white rounded-xl text-sm hover:bg-green-800 disabled:opacity-60">
          {loading ? "..." : "Add"}
        </button>
      </form>
      <div className="space-y-2">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between bg-white border border-green-100 rounded-xl px-4 py-3">
            <span className="text-sm font-medium text-green-900">{cat.name}</span>
            <button onClick={() => handleDelete(cat.id)} className="text-xs text-red-500 hover:text-red-700">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}