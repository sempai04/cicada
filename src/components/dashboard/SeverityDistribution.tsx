
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface SeverityDistributionProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

const SeverityDistribution: React.FC<SeverityDistributionProps> = ({ data }) => {
  return (
    <Card className="border border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Vulnerability Severity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[270px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={5}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#141625',
                  borderColor: '#05d9e8',
                  borderRadius: '4px',
                  fontSize: '12px',
                }}
                formatter={(value: number) => [`${value} vulnerabilities`, '']}
              />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeverityDistribution;
