export const allUserService = {
  getAllUsers: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    return res.json();
  },
};