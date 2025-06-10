import React from "react";

import { UserType } from "@/types/UserType";

import toast from "react-hot-toast";
import { AuthService } from "@/services/Auth";
import { AuthContext } from "@/hooks/useAuth";

export type IAuth = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  login: (data: { email: string; password: string }) => Promise<unknown>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState<UserType | null>(null);

  const login = React.useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setIsLoading(true);

      return AuthService.login({ email, password })
        .then(({ data }) => {
          const userData = {
            id: data?.id,
            createdAt: data?.createdAt,
            updatedAt: data?.updatedAt,
            name: data?.name,
            email: data?.email,
            phone: data?.phone,
            access_token: data.access_token,
            organizationId: data?.organizationId,
            role: data?.role,
            invites: data?.invites,
          } as UserType;

          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...userData, access_token: undefined })
          );

          setUser(userData);
        })
        .catch(({ response }) => {
          toast.error(response?.data?.message ?? "Erro ao fazer login.");
          throw response?.data;
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    []
  );

  const logout = React.useCallback(async () => {
    setIsLoading(true);

    localStorage.clear();
    setUser(null);

    setIsLoading(false);
  }, []);

  const memoedValue = React.useMemo(
    () => ({
      user,
      setUser,
      login,
      isLoading,
      logout,
    }),
    [user, login, isLoading, logout]
  );

  React.useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);

      const oldToken = localStorage.getItem("access_token");
      const oldUserData = localStorage.getItem("user");

      if (!oldToken || !oldUserData) {
        logout();
        return;
      }

      const userData = JSON.parse(oldUserData) as UserType;
      setUser(userData);

      setIsLoading(false);
    };

    loadUser();
  }, [logout]);

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}
