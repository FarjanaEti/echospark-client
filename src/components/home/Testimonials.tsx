import { getAllIdeas } from "@/services/idea.service";
import Link from "next/link";

export default async function Testimonials() {
  let ideas = [];
  try {
    const res = await getAllIdeas({ sortBy: "votes", limit: 3 });
    ideas = res.ideas || [];
  } catch {}

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-green-900 text-center mb-2">
        Community highlights
      </h2>
      <p className="text-center text-gray-500 text-sm mb-10">
        Top 3 ideas by vote count
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {ideas.map((idea: any, i: number) => (
          <div
            key={idea.id}
            className="p-6 rounded-2xl border border-green-100 bg-white hover:border-green-300 transition-colors"
          >
            <div className="text-3xl mb-3">{["🥇", "🥈", "🥉"][i]}</div>
            <h3 className="font-medium text-green-900 mb-2">{idea.title}</h3>
            <p className="text-gray-500 text-sm line-clamp-3 mb-4">
              {idea.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-green-700 font-medium">
                👍 {idea._count?.votes ?? 0} votes
              </span>
              <Link
                href={`/ideas/${idea.id}`}
                className="text-xs text-green-700 hover:underline"
              >
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}