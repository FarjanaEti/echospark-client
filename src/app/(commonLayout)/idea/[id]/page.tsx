import Link from "next/link";
import { notFound } from "next/navigation";
import { ThumbsUp, MessageCircle, ArrowLeft, Sparkles, CheckCircle2, Bolt, ShieldCheck } from "lucide-react";
import { getIdeaById } from "@/services/idea.service";
import { Idea } from "@/types";

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

function generateAIInsight(idea: Idea) {
  console.log(idea)
  const text = `${idea.title} ${idea.problemStatement} ${idea.proposedSolution} ${idea.description}`;
  const impactKeywords = ["waste", "energy", "plastic", "water", "community", "carbon", "pollution", "recycle", "food", "green"];
  const score = impactKeywords.reduce((count, keyword) => count + (text.toLowerCase().includes(keyword) ? 1 : 0), 0);

  const impact = score >= 3 ? "High potential" : score === 2 ? "Strong potential" : "Emerging potential";
  const recommendation = idea.isPaid
    ? "Make the paid value clear for contributors, and tie the budget to measurable community outcomes."
    : "Emphasize how this idea delivers measurable benefits without charging the community."

  const strengths = [
    idea.problemStatement ? "Clear problem focus" : "Add a precise problem statement",
    idea.proposedSolution ? "Practical solution idea" : "Define the implementation steps",
   (idea.description?.length ?? 0) > 120 ? "Strong supporting narrative"
     : "Add more detail to build confidence",
    
  ];

  return {
    impact,
    recommendation,
    strengths,
  };
}
export default async function IdeaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await getIdeaById(id).catch(() => null);

if (!response?.data) {
  notFound();
}

const idea = response.data as Idea;

const aiInsight = generateAIInsight(idea);



  return (
    <main className="bg-slate-100 text-slate-900 mt-8 pb-16">
      <div className="container mx-auto px-6 ">
        <div className=" flex items-center gap-4 text-sm text-slate-900">
          <Link
  href="/idea"
  className="relative z-50 inline-flex items-center gap-2 font-medium text-emerald-700 hover:text-emerald-900"
>
  <ArrowLeft className="h-4 w-4" />
  Back to ideas
</Link>
          <span className="h-1 w-1 rounded-full bg-slate-400" />
          <span>{idea.category?.name || "Uncategorized"}</span>
          <span className="h-1 w-1 rounded-full bg-slate-400" />
          <span>{formatDate(idea.createdAt)}</span>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.6fr,1fr]">
          <div>
            <div className="rounded-[2rem] bg-slate-50 p-8 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-3">
                  <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
                    {idea.status}
                  </span>
                  <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
                    {idea.title}
                  </h1>
                  <p className="max-w-2xl text-sm text-slate-900 sm:text-base">
                    {idea.description}
                  </p>
                </div>
                <div className="rounded-3xl bg-emerald-950 px-5 py-4 text-black shadow-lg shadow-emerald-950/10">
                  <div className="text-xs uppercase tracking-[0.3em] text-black">Community signal</div>
                  <div className="mt-3 flex items-center gap-4 text-sm">
                    <span className="inline-flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4" /> {idea._count?.votes ?? 0}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" /> {idea._count?.comments ?? 0}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Problem</p>
                  <p className="mt-3 text-sm leading-7 text-slate-900">{idea.problemStatement || "No problem statement provided."}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Proposed solution</p>
                  <p className="mt-3 text-sm leading-7 text-slate-900">{idea.proposedSolution || "No proposed solution provided."}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Author</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-2xl text-emerald-700">
                      {idea.author?.name?.[0] ?? "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{idea.author?.name || "Unknown"}</p>
                      <p className="text-sm text-slate-500">Submitted by community member</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Access</p>
                  <p className="mt-3 text-sm leading-7 text-slate-900">
                    {idea.isPaid ? `Paid idea - ?${idea.price ?? "0"} access` : "Free for community review"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] bg-slate-50 p-8 shadow-sm">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-emerald-700">
                <Sparkles className="h-5 w-5" />
                <span>AI insight</span>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-700">Impact</p>
                  <p className="mt-3 text-lg font-semibold text-emerald-950">{aiInsight.impact}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Next step</p>
                  <p className="mt-3 text-sm leading-7 text-slate-900">{aiInsight.recommendation}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Confidence</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">{idea.description.length > 150 ? "Strong narrative" : "Needs more detail"}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-6">
                <p className="text-sm font-semibold text-slate-900">Strengths detected</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {aiInsight.strengths.map((strength, index) => (
                    <div key={index} className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-900 shadow-sm">
                      <div className="flex items-center gap-2 text-emerald-700">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="font-medium">Strength</span>
                      </div>
                      <p className="mt-3 leading-6">{strength}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] bg-slate-50 p-8 shadow-sm">
              <div className="flex items-center gap-3 text-slate-900">
                <Bolt className="h-5 w-5 text-emerald-700" />
                <h2 className="text-lg font-semibold">Quick summary</h2>
              </div>
              <div className="mt-5 space-y-4 text-sm text-slate-900">
                <div>
                  <p className="font-medium text-slate-900">Category</p>
                  <p>{idea.category?.name || "No category"}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Status</p>
                  <p>{idea.status}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Votes</p>
                  <p>{idea._count?.votes ?? 0} people like this idea</p>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Comments</p>
                  <p>{idea._count?.comments ?? 0} discussion entries</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-50 p-8 shadow-sm">
              <div className="flex items-center gap-3 text-slate-900">
                <ShieldCheck className="h-5 w-5 text-emerald-700" />
                <h2 className="text-lg font-semibold">What reviewers look for</h2>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-slate-900">
                <li className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
                  Clear community benefit and measurable impact.
                </li>
                <li className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
                  Practical execution with resources and timeline.
                </li>
                <li className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
                  Strong narrative that speaks to local stakeholders.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
