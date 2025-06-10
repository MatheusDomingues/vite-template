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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthService } from "@/services/Auth";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { LoadingButton } from "@/components/loading-button";

const registerSchema = z
  .object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    lastName: z.string().min(1, { message: "Sobrenome é obrigatório" }),
    phone: z.string().min(1, { message: "Telefone é obrigatório" }),
    email: z
      .string()
      .email({ message: "Formato de email inválido" })
      .min(1, { message: "Email é obrigatório" }),
    password: z.string().min(6, { message: "Senha é obrigatória" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirmar senha é obrigatório" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      lastName: "",
      phone: "",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    setLoading(true);
    const toastId = toast.loading("Criando conta...");
    try {
      await AuthService.register({
        ...data,
        name: `${data.name} ${data.lastName}`,
      });
      toast.success("Conta criada com sucesso!", { id: toastId });
      toast.loading("Redirecionando para tela de login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error: any) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, { id: toastId });
        return;
      }
      toast.error("Houve um erro interno. Por favor, tente mais tarde.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Layout hasBackButton>
      <div className="flex flex-col h-full items-center justify-center font-display">
        <Card className="w-full max-w-3xl">
          <CardContent className="flex flex-col">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">
                Crie sua conta
              </CardTitle>
              <CardDescription className="text-base mt-4">
                Primeiro precisamos de algumas informações sobre você.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sobrenome</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john.doe@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="5511988888888" {...field} />
                        </FormControl>
                        <FormDescription className="text-xs">
                          DDI + DDD + Telefone (apenas números)
                        </FormDescription>
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
                            placeholder="••••••••••"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar senha</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="••••••••••"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <LoadingButton
                  isLoading={isLoading}
                  type="submit"
                  className="w-full"
                >
                  Continuar
                </LoadingButton>
              </form>
            </Form>
            <Button
              variant="link"
              className="w-full mt-2"
              onClick={handleLogin}
            >
              Fazer login
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
