import { api } from "@/lib/api";

export const getAllCategories = async () => {
                              const res = await api.get("/categories");
                              return res.data;
};

export const createCategory = async (name: string) => {
                              const res = await api.post("/categories", { name });
                              return res.data;
};

export const deleteCategory = async (id: string) => {
                              const res = await api.delete(`/categories/${id}`);
                              return res.data;
};