
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Scan {
  id: string;
  target: string;
  timestamp: string;
  status: 'completed' | 'in-progress' | 'failed';
  vulnerabilities: number;
}

interface RecentScansProps {
  scans: Scan[];
}

const RecentScans: React.FC<RecentScansProps> = ({ scans }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-cyber-success" />;
      case 'in-progress':
        return <Clock size={16} className="text-cyber" />;
      case 'failed':
        return <XCircle size={16} className="text-cyber-error" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-cyber-success border-cyber-success';
      case 'in-progress':
        return 'text-cyber border-cyber';
      case 'failed':
        return 'text-cyber-error border-cyber-error';
      default:
        return '';
    }
  };

  return (
    <Card className="border border-border/50">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Recent Scans</CardTitle>
          <Button variant="outline" size="sm" className="text-xs h-8">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scans.map((scan) => (
            <div
              key={scan.id}
              className="flex items-center justify-between p-3 rounded-md bg-muted/30 border border-border/50"
            >
              <div className="flex-1">
                <div className="font-medium">{scan.target}</div>
                <div className="text-xs text-muted-foreground">{scan.timestamp}</div>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  variant="outline"
                  className={cn(
                    "flex items-center gap-1.5 px-2 py-1 h-7 rounded-sm",
                    getStatusClass(scan.status)
                  )}
                >
                  {getStatusIcon(scan.status)}
                  <span className="capitalize">{scan.status.replace('-', ' ')}</span>
                </Badge>
                <div className="text-sm font-medium min-w-[60px] text-right">
                  {scan.vulnerabilities > 0 ? (
                    <span className="text-cyber-error">{scan.vulnerabilities} vulns</span>
                  ) : (
                    <span className="text-cyber-success">No vulns</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentScans;
