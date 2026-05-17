import { api } from "@/lib/api";

export const getComments = async (ideaId: string) => {
                              const res = await api.get(`/comments/${ideaId}`);
                              return res.data;
};

export const addComment = async (data: {
                              content: string;
                              ideaId: string;
                              parentId?: string;
}) => {
                              const res = await api.post("/comments", data);
                              return res.data;
};

export const deleteComment = async (id: string) => {
                              const res = await api.delete(`/comments/${id}`);
                              return res.data;
};