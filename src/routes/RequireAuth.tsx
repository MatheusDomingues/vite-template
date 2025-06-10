import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { Layout } from "@/components/layout";

export function RequireAuth() {
  const { logout } = useAuth();

  const token = localStorage.getItem("access_token");
  const user = localStorage.getItem("user");

  if (!user || !token) {
    logout();
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
