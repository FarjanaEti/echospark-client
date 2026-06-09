import { allUserService } from "@/services/allUser.service";
import { getAllIdeasAdmin } from "@/services/idea.service";
// import { getAllUsers } from "@/services/user.service";

export default async function AdminDashboardPage() {
  let ideas = [], users = [];
  try {
    const [ir, ur] = await Promise.all([getAllIdeasAdmin(),  allUserService.getAllUsers(),]);
    ideas = ir.data || [];
    users = ur.data || [];
  } catch {}

  const pending = ideas.filter((i: any) => i.status === "UNDER_REVIEW").length;
  const approved = ideas.filter((i: any) => i.status === "APPROVED").length;
  const rejected = ideas.filter((i: any) => i.status === "REJECTED").length;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-900 mb-6">Admin Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Users", value: users.length, color: "bg-blue-50 text-blue-700" },
          { label: "Total Ideas", value: ideas.length, color: "bg-green-50 text-green-700" },
          { label: "Under Review", value: pending, color: "bg-amber-50 text-amber-700" },
          { label: "Approved", value: approved, color: "bg-emerald-50 text-emerald-700" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl p-5 ${s.color}`}>
            <p className="text-sm font-medium opacity-70">{s.label}</p>
            <p className="text-3xl font-semibold mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent under review */}
      <h3 className="text-lg font-medium text-green-900 mb-4">Pending Review</h3>
      <div className="space-y-3">
        {ideas.filter((i: any) => i.status === "UNDER_REVIEW").slice(0, 5).map((idea: any) => (
          <div key={idea.id} className="flex items-center justify-between bg-white border border-green-100 rounded-xl px-4 py-3">
            <div>
              <p className="font-medium text-sm text-green-900">{idea.title}</p>
              <p className="text-xs text-gray-500">{idea.author?.name} · {idea.category?.name}</p>
            </div>
            <a href={`/dashboard/admin/ideas`} className="text-xs px-3 py-1 bg-green-700 text-white rounded-full">Review</a>
          </div>
        ))}
        {ideas.filter((i: any) => i.status === "UNDER_REVIEW").length === 0 && (
          <p className="text-sm text-gray-400">No ideas pending review.</p>
        )}
      </div>
    </div>
  );
}