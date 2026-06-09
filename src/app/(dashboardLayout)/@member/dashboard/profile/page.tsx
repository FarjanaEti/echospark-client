"use client";
import { allUserService } from "@/services/allUser.service";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function MemberProfilePage() {
  const [form, setForm] = useState({ name: "", bio: "", profileImage: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    allUserService.getMyProfile().then(r => {
      const u = r.data;
      if (u) setForm({ name: u.name || "", bio: u.bio || "", profileImage: u.profileImage || "" });
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try { await allUserService.updateMyProfile(form); toast.success("Profile updated!"); }
    catch { toast.error("Failed"); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-semibold text-green-900 mb-6">My Profile</h2>
      <form onSubmit={handleSubmit} className="bg-white border border-green-100 rounded-2xl p-6 space-y-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Name</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 border border-green-200 rounded-xl text-sm outline-none focus:border-green-400" />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Bio</label>
          <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })}
            rows={3} className="w-full px-4 py-2 border border-green-200 rounded-xl text-sm outline-none focus:border-green-400 resize-none" />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Profile image URL</label>
          <input value={form.profileImage} onChange={e => setForm({ ...form, profileImage: e.target.value })}
            className="w-full px-4 py-2 border border-green-200 rounded-xl text-sm outline-none focus:border-green-400" />
        </div>
        <button disabled={loading} className="w-full py-2.5 bg-green-700 text-white rounded-xl text-sm hover:bg-green-800 disabled:opacity-60">
          {loading ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}