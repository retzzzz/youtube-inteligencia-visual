
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VideoResult } from "@/types/youtube-types";
import { analyzeNichePerformance } from "@/utils/advancedAnalytics";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface CPMAnalysisChartProps {
  results: VideoResult[];
}

const CPMAnalysisChart = ({ results }: CPMAnalysisChartProps) => {
  const analysisData = analyzeNichePerformance(results)
    .filter(item => item.videoCount >= 2)
    .slice(0, 8);

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Análise de CPM/RPM por Nicho e País
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={analysisData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="niche" 
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
              />
              <YAxis yAxisId="left" orientation="left" stroke="#82ca9d" />
              <YAxis yAxisId="right" orientation="right" stroke="#8884d8" />
              <Tooltip />
              <Bar 
                yAxisId="left" 
                dataKey="avgCPM" 
                name="CPM Médio" 
                fill="#82ca9d" 
              />
              <Bar 
                yAxisId="right" 
                dataKey="avgRPM" 
                name="RPM Estimado" 
                fill="#8884d8" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CPMAnalysisChart;
