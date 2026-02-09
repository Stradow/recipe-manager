import axios from "axios";

const API_URL = "http://localhost:5005/api";

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
  const { data } = await axios.get(`${API_URL}/auth/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const login = async (credentials: object): Promise<AuthResponse> => {
  const { data } = await axios.post(`${API_URL}/auth/login`, credentials);
  return data;
};

export const register = async (credentials: object): Promise<AuthResponse> => {
  const { data } = await axios.post(`${API_URL}/auth/register`, credentials);
  return data;
};
