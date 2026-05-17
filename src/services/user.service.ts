import { api } from "@/lib/api";

export const getMyProfile = async () => {
                              const res = await api.get("/users/me");
                              return res.data;
};

export const updateMyProfile = async (data: {
                              name?: string;
                              bio?: string;
                              profileImage?: string;
}) => {
                              const res = await api.patch("/users/me", data);
                              return res.data;
};

export const getAllUsers = async () => {
                              const res = await api.get("/users");
                              return res.data;
};

export const toggleUserActive = async (id: string, isActive: boolean) => {
                              const res = await api.patch(`/users/${id}/toggle-active`, { isActive });
                              return res.data;
};

export const changeUserRole = async (id: string, role: string) => {
                              const res = await api.patch(`/users/${id}/role`, { role });
                              return res.data;
};