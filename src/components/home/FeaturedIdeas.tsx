import { getAllIdeas } from "@/services/idea.service";
import IdeaCard from "@/components/ideas/IdeaCard";
import Link from "next/link";

export default async function FeaturedIdeas() {
  let ideas = [];
  try {
    const res = await getAllIdeas({ sortBy: "votes", limit: 6 });
    ideas = res.ideas || [];
  } catch {}

  return (
    <section className="py-16 bg-green-50 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-semibold text-green-900">
              Top voted ideas
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Community favorites this week
            </p>
          </div>
          <Link
            href="/ideas"
            className="text-sm text-green-700 hover:text-green-900 font-medium"
          >
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea: any) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </div>
    </section>
  );
}