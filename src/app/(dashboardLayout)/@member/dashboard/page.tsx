import { allUserService } from "@/services/allUser.service";
import { getMyIdeas } from "@/services/idea.service";
// import { getMyProfile } from "@/services/user.service";
import Link from "next/link";

export default async function MemberDashboardPage() {
  let ideas = [], user: any = null;
  try {
    const [ir, ur] = await Promise.all([getMyIdeas(), allUserService.getAllUsers()]);
    ideas = ir.data || [];
    user = ur.data;
  } catch {}

  const draft = ideas.filter((i: any) => i.status === "DRAFT").length;
  const review = ideas.filter((i: any) => i.status === "UNDER_REVIEW").length;
  const approved = ideas.filter((i: any) => i.status === "APPROVED").length;
  const rejected = ideas.filter((i: any) => i.status === "REJECTED").length;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-900 mb-6">
        Welcome back, {user?.name?.split(" ")[0]} 👋
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Drafts", value: draft, color: "bg-gray-50 text-gray-700" },
          { label: "Under Review", value: review, color: "bg-amber-50 text-amber-700" },
          { label: "Approved", value: approved, color: "bg-green-50 text-green-700" },
          { label: "Rejected", value: rejected, color: "bg-red-50 text-red-600" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl p-5 ${s.color}`}>
            <p className="text-sm font-medium opacity-70">{s.label}</p>
            <p className="text-3xl font-semibold mt-1">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <Link href="/dashboard/member/ideas/new" className="px-5 py-2.5 bg-green-700 text-white rounded-xl text-sm hover:bg-green-800">
          + Submit new idea
        </Link>
        <Link href="/dashboard/member/ideas" className="px-5 py-2.5 border border-green-200 text-green-800 rounded-xl text-sm hover:bg-green-50">
          View my ideas
        </Link>
      </div>
    </div>
  );
}