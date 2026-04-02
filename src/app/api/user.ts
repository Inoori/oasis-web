import request from "@/lib/axiosInstance";

export type User = {
  id?: string;
  userName?: string;
  email?: string;
  avatar?: string;
};

export const api = {
  getUser: (id: string) => {
    if (!id) {
      return Promise.reject(new Error("User ID is required"));
    }
    return request.post(`api/users/`, {
      userid: id,
    }) as unknown as Promise<User>;
  },
};
