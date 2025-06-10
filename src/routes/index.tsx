import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import { lazy } from "react";

const NotFound = lazy(() => import("@/pages/NotFound"));
const LoginPage = lazy(() => import("@/pages/Login"));
const RegisterPage = lazy(() => import("@/pages/Register"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPassword"));
const DashboardPage = lazy(() => import("@/pages/Dashboard"));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" index element={<DashboardPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
