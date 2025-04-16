
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface ScanHistoryChartProps {
  data: {
    date: string;
    vulnerabilities: number;
    scans: number;
  }[];
}

const ScanHistoryChart: React.FC<ScanHistoryChartProps> = ({ data }) => {
  return (
    <Card className="border border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Scan History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[270px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <XAxis 
                dataKey="date" 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false}
                axisLine={{ stroke: '#2a3142' }} 
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false}
                axisLine={{ stroke: '#2a3142' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#141625',
                  borderColor: '#05d9e8',
                  borderRadius: '4px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line 
                type="monotone" 
                dataKey="vulnerabilities" 
                stroke="#ff2e63" 
                strokeWidth={2} 
                dot={{ 
                  fill: '#ff2e63', 
                  r: 4, 
                  strokeWidth: 0 
                }}
                activeDot={{ 
                  fill: '#ff2e63', 
                  r: 6, 
                  strokeWidth: 0 
                }}
              />
              <Line 
                type="monotone" 
                dataKey="scans" 
                stroke="#05d9e8" 
                strokeWidth={2} 
                dot={{ 
                  fill: '#05d9e8', 
                  r: 4, 
                  strokeWidth: 0 
                }}
                activeDot={{ 
                  fill: '#05d9e8', 
                  r: 6, 
                  strokeWidth: 0 
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScanHistoryChart;
