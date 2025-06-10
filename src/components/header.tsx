import { useTheme } from "@/hooks/useTheme";
import { Button } from "./ui/button";
import { ArrowLeft, CreditCardIcon, Moon, Sun, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

// const routesTitle = {
//   routes: [
//     {
//       title: "Dashboard",
//       path: "/dashboard",
//     },
//     {
//       title: "Instâncias",
//       path: "/instances",
//     },
//     {
//       title: "Usuários",
//       path: "/users",
//     },
//     {
//       title: "Webhooks",
//       path: "/webhooks",
//     },
//     {
//       title: "Api Keys",
//       path: "/api-keys",
//     },
//     {
//       title: "Cadastro",
//       path: "/register",
//     },
//     {
//       title: "Login",
//       path: "/login",
//     },
//   ],
//   unauthRoutes: [
//     {
//       title: "Cadastro",
//       path: "/register",
//     },
//     {
//       title: "Login",
//       path: "/login",
//     },
//   ],
// };

export function Header({ hasBackButton }: { hasBackButton?: boolean }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="border-b flex justify-center px-4 min-h-16 w-full sticky top-0 left-0 z-50 bg-card">
      <div className="flex items-center justify-between w-full gap-8 max-w-7xl">
        <div className="flex items-center gap-4">
          {hasBackButton && (
            <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft />
            </Button>
          )}
          <img
            src={
              theme === "dark" ? "/images/logo-dark.png" : "/images/logo.png"
            }
            alt="Linkify logo"
            className="h-8 w-fit"
          />
        </div>
        <div className="flex gap-4 items-center">
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" size="sm">
                  <User />
                  {user.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-bold">
                    Minha conta
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCardIcon />
                    Planos e Cobranças
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
