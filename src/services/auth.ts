import Axios from "./axiosConfig";

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const resp = await Axios.post<LoginResponse>(`/auth/login`, credentials);
    return resp.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const validateSession = async (): Promise<LoginResponse> => {
  try {
    const resp = await Axios.get<LoginResponse>(`/auth/me`);
    return resp.data;
  } catch (error) {
    throw new Error("Session validation failed");
  }
};
