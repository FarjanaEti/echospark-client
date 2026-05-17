import { getAllCategories } from "@/services/category.service";
import Link from "next/link";

const categoryIcons: Record<string, string> = {
  Energy: "⚡",
  Waste: "♻️",
  Transportation: "🚲",
  Water: "💧",
  Food: "🌱",
  default: "🌍",
};

export default async function CategorySection() {
  let categories = [];
  try {
    const res = await getAllCategories();
    categories = res.data || [];
  } catch {}

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-green-900 text-center mb-2">
        Browse by category
      </h2>
      <p className="text-center text-gray-500 mb-10 text-sm">
        Find ideas that match your passion
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((cat: any) => (
          <Link
            key={cat.id}
            href={`/ideas?categoryId=${cat.id}`}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-green-100 hover:border-green-300 hover:bg-green-50 transition-all group"
          >
            <span className="text-2xl">
              {categoryIcons[cat.name] || categoryIcons.default}
            </span>
            <span className="text-sm text-green-900 font-medium text-center">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}