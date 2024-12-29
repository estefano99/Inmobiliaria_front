import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { estadosContratosPorMes } from "@/api/Dashboard";
import { dataGraficos } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

const chartConfig = {
  vigente: {
    label: "Vigentes",
    color: "#00ff2a",
  },
  finalizado: {
    label: "Finalizados",
    color: "#fcfcfc",
  },
  proximo_a_vencer: {
    label: "Proximos a vencer",
    color: "#d1ff04",
  },
  rescindido: {
    label: "Rescindidos",
    color: "#ff4800",
  },
} satisfies ChartConfig

export function GraficoBarras() {

  const { data, isLoading } = useQuery<dataGraficos[]>({
    queryKey: ["estadosContratosPorMes"],
    queryFn: estadosContratosPorMes,
  });

  // Mapeo para traducir los nombres de los meses
  const monthMap: Record<string, string> = {
    January: "Enero",
    February: "Febrero",
    March: "Marzo",
    April: "Abril",
    May: "Mayo",
    June: "Junio",
    July: "Julio",
    August: "Agosto",
    September: "Septiembre",
    October: "Octubre",
    November: "Noviembre",
    December: "Diciembre"
  };

  // Función para formatear los datos
  const formatChartData = (data: dataGraficos[]) => {
    const groupedData: Record<string, any> = {};

    // Agrupar datos por mes y estado
    data.forEach(({ mes, estado, cantidad }) => {
      const monthName = monthMap[mes] || mes;

      if (!groupedData[monthName]) {
        groupedData[monthName] = { mes: monthName };
      }

      // Asignar cantidad al estado correspondiente
      groupedData[monthName][estado] = (groupedData[monthName][estado] || 0) + cantidad;
    });

    // Convertir el objeto agrupado en un array
    return Object.values(groupedData);
  };

  // Transformar los datos
  const chartData = formatChartData(data || []);
  console.log(chartData)

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (<p>Cargando...</p>) : (
        <ChartContainer config={chartConfig} className="min-h-[200px] max-h-[450px] w-full border-2 dark:border-slate-800 border-slate-200 rounded-md">
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="mes"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <CartesianGrid vertical={false} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="vigente" fill="#00ff2a" radius={4} />
            <Bar dataKey="finalizado" fill="#fcfcfc" radius={4} />
            <Bar dataKey="proximo_a_vencer" fill="#d1ff04" radius={4} />
            <Bar dataKey="rescindido" fill="#ff4800" radius={4} />
          </BarChart>
        </ChartContainer>
      )}
    </div>
  )
}
