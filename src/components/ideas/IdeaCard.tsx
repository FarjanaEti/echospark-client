import Link from "next/link";
import { Idea } from "@/types";
import { ThumbsUp, MessageCircle, Lock } from "lucide-react";

export default function IdeaCard({ idea }: { idea: Idea }) {
  return (
    <div className="bg-white rounded-2xl border border-green-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all">
      {/* Image */}
      <div className="relative h-44 bg-green-100">
        {idea.images?.[0] ? (
          <img
            src={idea.images[0]}
            alt={idea.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🌱
          </div>
        )}
        {idea.isPaid && (
          <span className="absolute top-3 right-3 flex items-center gap-1 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
            <Lock className="w-3 h-3" /> Paid
          </span>
        )}
        <span className="absolute top-3 left-3 bg-green-700 text-white text-xs px-2 py-1 rounded-full">
          {idea.category?.name}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-green-900 mb-1 line-clamp-1">
          {idea.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
          {idea.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-400 text-sm">
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-3.5 h-3.5" />
              {idea._count?.votes ?? 0}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" />
              {idea._count?.comments ?? 0}
            </span>
          </div>
          <Link
            href={`/idea/${idea.id}`}
            className="text-xs px-3 py-1.5 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors"
          >
            View idea
          </Link>
        </div>
      </div>
    </div>
  );
}