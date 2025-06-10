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
import { useState } from "react";
import { AuthService } from "@/services/Auth";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { LoadingButton } from "@/components/loading-button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Formato de email inválido" })
    .min(1, { message: "Email é obrigatório" }),
});

const codeVerifySchema = z.object({
  code: z.string().min(1, { message: "Código de Verificação é obrigatório" }),
});

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, { message: "Senha é obrigatória" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirmar senha é obrigatório" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
  });

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
type CodeVerifySchema = z.infer<typeof codeVerifySchema>;
type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const codeForm = useForm<CodeVerifySchema>({
    resolver: zodResolver(codeVerifySchema),
    defaultValues: { code: "" },
  });

  const resetForm = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    setLoading(true);
    const toastId = toast.loading("Validando email e enviando código...");
    try {
      await AuthService.forgotPassword(data);
      toast.success(
        "Código enviado com sucesso! Por favor, verifique sua caixa de entrada.",
        { id: toastId }
      );
      setEmail(data.email);
      setStep(2);
    } catch (error) {
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

  const onSubmitCode = async (data: CodeVerifySchema) => {
    setLoading(true);
    const toastId = toast.loading("Validando código...");
    try {
      await AuthService.validateCode({ email, code: data.code });
      toast.success("Código validado com sucesso!", { id: toastId });
      setCode(data.code);
      setStep(3);
    } catch (error) {
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

  const onSubmitReset = async (data: ResetPasswordSchema) => {
    setLoading(true);
    const toastId = toast.loading("Validando código...");
    try {
      await AuthService.resetPassword({ ...data, email, code });
      toast.success("Senha redefinida com sucesso!", { id: toastId });
      navigate("/login");
    } catch (error) {
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
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">
                Recupere a sua senha
              </CardTitle>
              <CardDescription className="text-base mt-4">
                {step === 1 &&
                  "Digite seu email e enviaremos um código de verificação para redefinir sua senha"}
                {step === 2 &&
                  "Digite o código de verificação enviado para seu email"}
              </CardDescription>
            </CardHeader>

            {step === 1 && (
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
                          <Input
                            placeholder="john.doe@example.com"
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
                    Enviar
                  </LoadingButton>
                </form>
              </Form>
            )}

            {step === 2 && (
              <Form {...codeForm}>
                <form
                  onSubmit={codeForm.handleSubmit(onSubmitCode)}
                  className="space-y-4 mt-8"
                >
                  <FormField
                    control={codeForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código de Verificação</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup className="w-full">
                              <InputOTPSlot index={0} className="w-full h-12" />
                              <InputOTPSlot index={1} className="w-full h-12" />
                              <InputOTPSlot index={2} className="w-full h-12" />
                              <InputOTPSlot index={3} className="w-full h-12" />
                              <InputOTPSlot index={4} className="w-full h-12" />
                              <InputOTPSlot index={5} className="w-full h-12" />
                            </InputOTPGroup>
                          </InputOTP>
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
                    Validar
                  </LoadingButton>
                </form>
              </Form>
            )}

            {step === 3 && (
              <Form {...resetForm}>
                <form
                  onSubmit={resetForm.handleSubmit(onSubmitReset)}
                  className="space-y-4 mt-8"
                >
                  <FormField
                    control={resetForm.control}
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
                    control={resetForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar Senha</FormLabel>
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
                  <LoadingButton
                    isLoading={isLoading}
                    type="submit"
                    className="w-full"
                  >
                    Mudar senha
                  </LoadingButton>
                </form>
              </Form>
            )}

            <Button
              variant="link"
              className="w-full my-2"
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
