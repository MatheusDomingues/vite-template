import { CreateUserType, UserType } from "@/types/UserType";
import { api } from "./Api";

async function login({ email, password }: { email: string; password: string }) {
  return await api.post<UserType & { access_token: string }>("/v1/auth/login", {
    email,
    password,
  });
}

async function register(user: CreateUserType) {
  return await api.post<UserType>("/v1/auth/register", { ...user });
}

async function forgotPassword({ email }: { email: string }) {
  return await api.post<{ message: string }>("/v1/auth/forgot-password", {
    email,
  });
}

async function validateCode({ email, code }: { email: string; code: string }) {
  return await api.post<{ message: string }>("/v1/auth/validate-code", {
    email,
    code,
  });
}

async function resetPassword({
  email,
  code,
  password,
  confirmPassword,
}: {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}) {
  return await api.post<{ message: string }>("/v1/auth/reset-password", {
    email,
    code,
    password,
    confirmPassword,
  });
}

export const AuthService = {
  login,
  validateCode,
  register,
  forgotPassword,
  resetPassword,
};
