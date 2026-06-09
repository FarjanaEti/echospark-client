import { api } from "@/lib/api";

export const allUserService = {
 getAllUsers: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    return res.json();
  },

   getMyProfile : async () => {
 const res = await api.get("/users/me");
 return res.data;
},

   toggleUserActive : async (id: string, isActive: boolean) => {
      const res = await api.patch(`/users/${id}/toggle-active`, { isActive });
   return res.data;
},

 changeUserRole : async (id: string, role: string) => {
  const res = await api.patch(`/users/${id}/role`, { role });
                               return res.data;
 },

  updateMyProfile : async (data: {
                              name?: string;
                              bio?: string;
                              profileImage?: string;
}) => {
                              const res = await api.patch("/users/me", data);
                              return res.data;
}

}