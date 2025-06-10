import { Layout } from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LoadingButton } from "@/components/loading-button";
import { useEffect } from "react";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Formato de email inválido" })
    .min(1, { message: "Email é obrigatório" }),
  password: z.string().min(6, { message: "Senha é obrigatória" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, isLoading, user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    const toastId = toast.loading("Fazendo login...");
    try {
      await login(data);

      toast.success("Login realizado com sucesso!", { id: toastId });
      navigate("/");
    } catch {
      toast.error("Erro ao realizar login", { id: toastId });
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [navigate, user]);

  return (
    <Layout>
      <div className="flex flex-col h-full items-center justify-center font-display">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">
                Seja muito bem-vindo ao{" "}
                {import.meta.env.VITE_PRIVATE_LABEL || "Linkify"}
              </CardTitle>
              <CardDescription className="text-base mt-4">
                Faça login para continuar
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <LoadingButton
                  isLoading={isLoading}
                  type="submit"
                  className="w-full"
                >
                  Entrar
                </LoadingButton>
              </form>
            </Form>
            <Button
              variant="secondary"
              className="w-full my-2"
              onClick={handleRegister}
            >
              Criar conta
            </Button>
            <Button
              variant="link"
              className="w-full"
              onClick={handleForgotPassword}
            >
              Esqueci minha senha
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
