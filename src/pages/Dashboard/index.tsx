import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCheckIcon, MessagesSquareIcon, ServerIcon } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function DashboardPage() {
  const generateHourlyData = () => {
    const data = [];
    const startDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 1,
      new Date().getHours(),
      0,
      0,
      0
    );

    for (let i = 0; i < 24; i++) {
      const currentDate = new Date(startDate.getTime() + i * 60 * 60 * 1000);
      const day = currentDate.getDate().toString().padStart(2, "0");
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const year = currentDate.getFullYear();
      const hour = currentDate.getHours().toString().padStart(2, "0");
      const minute = currentDate.getMinutes().toString().padStart(2, "0");

      data.push({
        time: `${day}/${month}/${year} ${hour}:${minute}`,
        enviadas: 0,
        recebidas: 0,
        entregues: 0,
        lidas: 0,
        timestamp: currentDate.getTime(),
      });
    }

    return data;
  };

  const data = generateHourlyData();

  // Formatar label do eixo X
  const formatXAxisLabel = (tickItem: any) => {
    const date = new Date(tickItem);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");

    // Mostrar apenas alguns labels para não sobrecarregar
    if (hour === "00" && minute === "00") {
      return `${day}/${month}/${year} ${hour}:${minute}`;
    } else if (hour === "07" || hour === "14" || hour === "21") {
      return `${day}/${month}/${year} ${hour}:${minute}`;
    }
    return "";
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      const hour = date.getHours().toString().padStart(2, "0");
      const minute = date.getMinutes().toString().padStart(2, "0");

      return (
        <div className="p-3 rounded-lg shadow-lg border bg-card text-card-foreground">
          <p className="font-medium mb-2">{`${day}/${month}/${year} ${hour}:${minute}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-6 h-full font-display max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-center">
        <Card className="w-full">
          <CardContent className="flex flex-col justify-evenly gap-6 px-0">
            <CardHeader>
              <CardTitle className="text-3xl font-bold flex justify-between w-full items-center">
                0 <ServerIcon />
              </CardTitle>
              <CardDescription className="text-base mt-6">
                Instâncias Conectadas.
              </CardDescription>
            </CardHeader>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent className="flex flex-col justify-evenly gap-6 px-0">
            <CardHeader>
              <CardTitle className="text-3xl font-bold flex justify-between w-full items-center">
                0 <MessagesSquareIcon />
              </CardTitle>
              <CardDescription className="text-base mt-6">
                Mensagens Enviadas.
              </CardDescription>
            </CardHeader>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent className="flex flex-col justify-evenly gap-6 px-0">
            <CardHeader>
              <CardTitle className="text-3xl font-bold flex justify-between w-full items-center">
                0 <CheckCheckIcon />
              </CardTitle>
              <CardDescription className="text-base mt-6">
                Mensagens Recebidas.
              </CardDescription>
            </CardHeader>
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-6 w-full items-center">
        <Card className="w-full">
          <CardContent className="flex flex-col justify-evenly gap-6">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 bg-blue-500"></div>
                <span>Enviadas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 bg-teal-500"></div>
                <span>Recebidas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 bg-purple-500"></div>
                <span>Entregues</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 bg-orange-500"></div>
                <span>Lidas</span>
              </div>
            </div>

            <div className="w-full h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} className="-ml-6">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--muted-foreground)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="timestamp"
                    type="number"
                    scale="time"
                    domain={["dataMin", "dataMax"]}
                    tickFormatter={formatXAxisLabel}
                    tick={{ fontSize: 12, fill: "var(--card-foreground)" }}
                    axisLine={{ stroke: "var(--muted-foreground)" }}
                    tickLine={{ stroke: "var(--muted-foreground)" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "var(--card-foreground)" }}
                    axisLine={{ stroke: "var(--muted-foreground)" }}
                    tickLine={{ stroke: "var(--muted-foreground)" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="enviadas"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: "#3b82f6" }}
                    name="Enviadas"
                  />
                  <Line
                    type="monotone"
                    dataKey="recebidas"
                    stroke="#14b8a6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: "#14b8a6" }}
                    name="Recebidas"
                  />
                  <Line
                    type="monotone"
                    dataKey="entregues"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: "#8b5cf6" }}
                    name="Entregues"
                  />
                  <Line
                    type="monotone"
                    dataKey="lidas"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: "#f97316" }}
                    name="Lidas"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
