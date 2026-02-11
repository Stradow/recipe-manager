import apiClient from "./api.client";

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  token: string;
}

export const authorizationToken = async (
  token: string,
): Promise<AuthResponse> => {
  const { data } = await apiClient.get("/auth/verify", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const login = async (credentials: object): Promise<AuthResponse> => {
  const { data } = await apiClient.post("/auth/login", credentials);
  return data;
};

export const register = async (credentials: object): Promise<AuthResponse> => {
  const { data } = await apiClient.post("/auth/register", credentials);
  return data;
};
