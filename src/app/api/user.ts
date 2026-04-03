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
    return request.get(`api/users/`, {
      params: {
        userid: id,
      },
    }) as unknown as Promise<User>;
  },

  updateProfile: (data: Partial<User>) => {
    return request.post(
      `api/users/update-profile`,
      data
    ) as unknown as Promise<void>;
  },
};
