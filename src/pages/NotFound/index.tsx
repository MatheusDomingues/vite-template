import { Layout } from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <Layout hasBackButton>
      <div className="flex flex-col h-full items-center justify-center font-display">
        <Card className="w-full max-w-xl">
          <CardContent className="flex flex-col justify-evenly gap-6 text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                404 - Página Não Encontrada
              </CardTitle>
              <CardDescription className="text-base !mt-6">
                Desculpe, mas a página que você está procurando não existe ou
                você não tem permissão para acessá-la.
              </CardDescription>
            </CardHeader>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
