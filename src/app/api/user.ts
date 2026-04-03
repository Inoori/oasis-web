import request from "@/lib/axiosInstance";

export type User = {
  id?: string;
  userName?: string;
  email?: string;
  avatar?: string;
};

export const api = {
  //todo:get user form cookies
  getUser: (signal?: AbortSignal) =>
    request.get(`api/users/me`, { signal }) as unknown as Promise<User>,

  updateProfile: (data: Partial<User>) => {
    return request.post(
      `api/users/update-profile`,
      data
    ) as unknown as Promise<void>;
  },
};
