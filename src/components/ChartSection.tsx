
import { VideoResult } from "@/types/youtube-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLanguageDistributionData, getViewRangeData, getEarningsData, getTrendAnalysis } from "@/services/youtube-mock-service";
import { Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Pie, Cell, BarChart, PieChart, Tooltip } from "recharts";

interface ChartSectionProps {
  results: VideoResult[];
}

// Paleta de cores personalizada
const COLORS = ["#FF0000", "#CC0000", "#990000", "#660000", "#330000", "#000000", "#111111", "#222222", "#444444", "#666666"];

const ChartSection = ({ results }: ChartSectionProps) => {
  // Se não houver resultados, não renderizar nada
  if (!results.length) return null;

  // Preparar dados para os gráficos
  const languageData = getLanguageDistributionData(results);
  const viewsData = getViewRangeData(results);
  const earningsData = getEarningsData(results);
  const trendData = getTrendAnalysis(results);

  // Custom tooltip para o gráfico de pizza
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-popover border border-border p-2 rounded shadow-sm text-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p>Vídeos: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
      {/* Gráfico de distribuição por idioma */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Distribuição por Idioma</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#FF0000"
                  dataKey="count"
                  nameKey="language"
                  label={({ language }) => language}
                >
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de faixa de visualizações */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Faixa de Visualizações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" name="Vídeos" fill="#FF0000" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de nichos emergentes */}
      <Card className="dashboard-card col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Nichos Emergentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={trendData.slice(0, 8)} 
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis 
                  type="category" 
                  dataKey="niche" 
                  tick={{ fontSize: 12 }} 
                  width={100} 
                />
                <Tooltip />
                <Bar dataKey="avgViralScore" name="Score Médio" fill="#FF0000" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartSection;
