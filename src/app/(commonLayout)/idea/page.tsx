import Link from "next/link";
import { getAllIdeas } from "@/services/idea.service";
import IdeaCard from "@/components/ideas/IdeaCard";

export default async function IdeasPage() {
  let ideas = [];

  try {
    const res = await getAllIdeas({ sortBy: "votes", limit: 12 });
    ideas = res.ideas || [];
  } catch {
    ideas = [];
  }

  return (
    <main className="bg-slate-200 text-slate-900">
      <section className="relative overflow-hidden bg-emerald-950 text-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.25),transparent_45%)]" />
        <div className="container mx-auto px-6 py-20 relative">
          <div className="max-w-3xl space-y-6">
            <p className="inline-flex rounded-full
             bg-emerald-700/20 px-4 py-1 text-sm font-medium
              text-black">
              Discover sustainable community ideas
            </p>
            <h1 className="text-4xl font-semibold tracking-tight 
            sm:text-5xl">
              Explore meaningful projects built by our community.
            </h1>
            <p className="max-w-2xl text-base text-emerald-100/90 sm:text-lg">
              Browse real proposals, see progress signals, and join the movement with ideas that tackle waste,
              energy, mobility, and local impact.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/idea"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-950 shadow-sm shadow-emerald-900/10 transition hover:bg-emerald-100"
              >
                Browse all ideas
              </Link>
              <Link
                href="/dashboard/add-ideas"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/15"
              >
                Share your idea
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Community feed</p>
            <h2 className="text-3xl font-semibold text-slate-900">Featured ideas</h2>
          </div>
          <p className="max-w-xl text-sm text-slate-900 sm:text-right">
            These ideas are ranked by community engagement, votes, and relevance to sustainable development.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {ideas.length > 0 ? (
            ideas.map((idea: any) => <IdeaCard key={idea.id} idea={idea} />)
          ) : (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center shadow-sm">
              <p className="text-xl font-semibold text-slate-900">No ideas available yet.</p>
              <p className="mt-3 text-sm text-slate-900">
                Community ideas are loading, or there are none yet. Be the first to submit a sustainable proposal.
              </p>
              <Link
                href="/dashboard/add-ideas"
                className="mt-6 inline-flex rounded-full bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Add an idea
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="bg-slate-100 py-14">
        <div className="container mx-auto px-6 grid gap-8 lg:grid-cols-3">
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-8">
            <h3 className="text-lg font-semibold text-emerald-900">Why contribute?</h3>
            <p className="mt-4 text-sm leading-7 text-slate-900">
              Every idea helps shape the ecosystem. Share practical solutions, support local change makers, and help bring community sustainability plans to life.
            </p>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-slate-950 p-8 text-black">
            <h3 className="text-lg font-semibold text-white">Built for impact</h3>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              Our feed highlights ideas that are action-oriented, community-centered, and easy to evaluate for next-step review.
            </p>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-slate-50 p-8">
            <h3 className="text-lg font-semibold text-slate-900">Stay informed</h3>
            <p className="mt-4 text-sm leading-7 text-slate-900">
              Click through any idea to see its full details, author story, and a quick AI-powered analysis of strengths and suggested next steps.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
