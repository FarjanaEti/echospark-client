// import { api } from "@/lib/api";

// export const getMyProfile = async () => {
//  const res = await api.get("/users/me");
//  return res.data;
// };

// export const updateMyProfile = async (data: {
//                               name?: string;
//                               bio?: string;
//                               profileImage?: string;
// }) => {
//                               const res = await api.patch("/users/me", data);
//                               return res.data;
// };

// export const getAllUsers = async () => {
//                               const res = await api.get("/users");
//                               return res.data;
// };

// export const toggleUserActive = async (id: string, isActive: boolean) => {
//                               const res = await api.patch(`/users/${id}/toggle-active`, { isActive });
//                               return res.data;
// };

// export const changeUserRole = async (id: string, role: string) => {
//                               const res = await api.patch(`/users/${id}/role`, { role });
//                               return res.data;
// };

import { cookies } from "next/headers";

const AUTH_URL = process.env.AUTH_URL!;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const allCookies = cookieStore.getAll();
      
      const cookieHeader = allCookies
        .map((c: { name: string; value: string }) => `${c.name}=${c.value}`)
        .join("; ");

   

      const res = await fetch(`${AUTH_URL}/get-session`, {
        method: "GET",
        headers: {
          cookie: cookieHeader,
          "cache-control": "no-store",
        },
        cache: "no-store",
      });
console.log("status", res.status);
      const session = await res.json();
    

      if (session?.user) {
        return { data: session, error: null };
      }
console.log("session response", session);
      return { data: null, error: { message: "No session" } };
    } catch (err) {
      console.error("Session error:", err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};