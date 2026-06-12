"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Idea } from "@/types";
import { ThumbsUp, MessageCircle, Lock } from "lucide-react";
import { castVote } from "@/services/vote.service";
import { addComment } from "@/services/comment.service";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function IdeaCard({ idea }: { idea: Idea }) {
  const { data } = useSession();
  const user = (data as any)?.user;

  const [voteCount, setVoteCount] = useState(idea._count?.votes ?? 0);
  const [commentCount, setCommentCount] = useState(idea._count?.comments ?? 0);
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isVoting, setIsVoting] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    setVoteCount(idea._count?.votes ?? 0);
    setCommentCount(idea._count?.comments ?? 0);
    setHasVoted(!!idea.votes?.some((vote) => vote.userId === (user as any)?.id));
  }, [idea._count?.votes, idea._count?.comments, idea.votes, user]);

  const handleVote = async () => {
    if (!user) {
      toast.error("Please sign in to vote.");
      return;
    }

    if (hasVoted) {
      toast.error("You already voted for this idea.");
      return;
    }

    try {
      setIsVoting(true);
      await castVote(idea.id, "UPVOTE");
      setVoteCount((count) => count + 1);
      setHasVoted(true);
      toast.success("Vote recorded.");
    } catch (error) {
      console.error("Vote error", error);
      toast.error("Unable to save your vote. Please try again.");
    } finally {
      setIsVoting(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!user) {
      toast.error("Please sign in to comment.");
      return;
    }

    const content = commentText.trim();
    if (!content) {
      toast.error("Comment cannot be empty.");
      return;
    }

    try {
      setIsCommenting(true);
      await addComment({ content, ideaId: idea.id });
      setCommentText("");
      setCommentCount((count) => count + 1);
      toast.success("Comment added.");
    } catch (error) {
      console.error("Comment error", error);
      toast.error("Unable to add comment. Please try again.");
    } finally {
      setIsCommenting(false);
    }
  };

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

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <button
                type="button"
                onClick={handleVote}
                disabled={isVoting}
                className="inline-flex items-center gap-1 rounded-full px-2 py-1 transition hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                {voteCount}
              </button>
              <button
                type="button"
                onClick={() => setCommentOpen((open) => !open)}
                className="inline-flex items-center gap-1 rounded-full px-2 py-1 transition hover:text-green-700"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                {commentCount}
              </button>
            </div>
            <Link
              href={`/idea/${idea.id}`}
              className="text-xs px-3 py-1.5 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors"
            >
              View idea
            </Link>
          </div>

          {commentOpen && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <textarea
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                rows={3}
                className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-green-500"
                placeholder="Write a quick comment..."
              />
              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCommentOpen(false)}
                  className="rounded-full border border-slate-300 px-3 py-1.5 text-xs text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCommentSubmit}
                  disabled={isCommenting}
                  className="rounded-full bg-green-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCommenting ? "Posting..." : "Post comment"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}