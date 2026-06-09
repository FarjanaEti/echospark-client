import { api } from "@/lib/api";

export const getAllCategories = async () => {
    const res = await api.get("/categories");
    return res.data;
};


export const createCategory = async (
    payload: string | { name: string; isActive?: boolean }
) => {
    const body = typeof payload === "string" ? { name: payload } : payload;
    const res = await api.post("/categories", body);
    return res.data;
};

export const deleteCategory = async (id: string) => {
    const res = await api.delete(`/categories/${id}`);
    return res.data;
};