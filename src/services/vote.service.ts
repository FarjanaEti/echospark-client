import { api } from "@/lib/api";

export const castVote = async (ideaId: string, type: "UPVOTE" | "DOWNVOTE") => {
                              const res = await api.post("/votes", { ideaId, type });
                              return res.data;
};

export const removeVote = async (ideaId: string) => {
                              const res = await api.delete(`/votes/${ideaId}`);
                              return res.data;
};