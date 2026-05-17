import { api } from "@/lib/api";

export const subscribeNewsletter = async (email: string) => {
                              const res = await api.post("/newsletter/subscribe", { email });
                              return res.data;
};