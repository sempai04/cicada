
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScanDetail } from '@/types/scan';

interface ScanSummaryProps {
  scan: ScanDetail;
}

const ScanSummary: React.FC<ScanSummaryProps> = ({ scan }) => {
  return (
    <Card className="border border-border/50">
      <CardHeader className="pb-2">
        <CardTitle>Scan Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Target</h3>
            <p className="mt-1">{scan.target}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Duration</h3>
            <p className="mt-1">{scan.duration}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
            <Badge 
              variant="outline" 
              className="mt-1 border-cyber-success text-cyber-success"
            >
              {scan.status}
            </Badge>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-muted/20 rounded-md">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Critical</p>
            <h3 className="text-2xl font-bold text-cyber-error mt-1">
              {scan.vulnerabilities.filter(v => v.severity === 'critical').length}
            </h3>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-md">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">High</p>
            <h3 className="text-2xl font-bold text-cyber-error mt-1">
              {scan.vulnerabilities.filter(v => v.severity === 'high').length}
            </h3>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-md">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Medium</p>
            <h3 className="text-2xl font-bold text-cyber-warning mt-1">
              {scan.vulnerabilities.filter(v => v.severity === 'medium').length}
            </h3>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-md">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total</p>
            <h3 className="text-2xl font-bold mt-1">{scan.findings}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScanSummary;
