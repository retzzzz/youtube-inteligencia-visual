
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
        <CardTitle className="text-lg font-medium bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Análise de CPM/RPM por Nicho e País
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] animate-fade-in">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={analysisData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
              <XAxis 
                dataKey="niche" 
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
              />
              <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--emerging))" />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--explosive))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--glass-bg)',
                  borderColor: 'var(--glass-border)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(8px)'
                }}
              />
              <Bar 
                yAxisId="left" 
                dataKey="avgCPM" 
                name="CPM Médio" 
                fill="hsl(var(--emerging))"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                yAxisId="right" 
                dataKey="avgRPM" 
                name="RPM Estimado" 
                fill="hsl(var(--explosive))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CPMAnalysisChart;
