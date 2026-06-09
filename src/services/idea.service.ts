import { api } from "@/lib/api";
import { Idea } from "@/types";

export const getAllIdeas = async (params?: {
 search?: string;
 categoryId?: string;
 isPaid?: boolean;
 sortBy?: string;
 page?: number;
 limit?: number;
}) => {
                              const query = new URLSearchParams();
                              if (params?.search) query.append("search", params.search);
                              if (params?.categoryId) query.append("categoryId", params.categoryId);
                              if (params?.isPaid !== undefined) query.append("isPaid", String(params.isPaid));
                              if (params?.sortBy) query.append("sortBy", params.sortBy);
                              if (params?.page) query.append("page", String(params.page));
                              if (params?.limit) query.append("limit", String(params.limit));

                              const res = await api.get(`/ideas?${query.toString()}`);
                              return res.data;
};

export const getIdeaById = async (id: string) => {
                              const res = await api.get(`/ideas/${id}`);
                              return res.data;
};

export const getMyIdeas = async () => {
                              const res = await api.get("/ideas/my/ideas");
                              return res.data;
};

export const createIdea = async (data: Partial<Idea>) => {
                              const res = await api.post("/ideas", data);
                              return res.data;
};

export const updateIdea = async (id: string, data: Partial<Idea>) => {
                              const res = await api.patch(`/ideas/${id}`, data);
                              return res.data;
};

export const deleteIdea = async (id: string) => {
                              const res = await api.delete(`/ideas/${id}`);
                              return res.data;
};

export const submitIdea = async (id: string) => {
                              const res = await api.patch(`/ideas/${id}/submit`, {});
                              return res.data;
};

// Admin
export const getAllIdeasAdmin = async () => {
                              const res = await api.get("/ideas/admin/all");
                              return res.data;
};

export const approveIdea = async (id: string) => {
                              const res = await api.patch(`/ideas/admin/${id}/approve`, {});
                              return res.data;
};

export const rejectIdea = async (id: string, rejectionFeedback: string) => {
                              const res = await api.patch(`/ideas/admin/${id}/reject`, { rejectionFeedback });
                              return res.data;
};

export const adminDeleteIdea = async (id: string) => {
                              const res = await api.delete(`/ideas/admin/${id}`);
                              return res.data;
};