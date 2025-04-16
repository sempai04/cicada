
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Plus, Play, Pause, Trash2, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Scans: React.FC = () => {
  const navigate = useNavigate();
  
  const goToNewScan = () => {
    navigate('/scans/new');
  };
  
  // Mock scan templates
  const scanTemplates = [
    {
      id: '1',
      name: 'Quick Network Scan',
      description: 'Fast scan for common vulnerabilities',
      lastRun: '2 days ago',
    },
    {
      id: '2',
      name: 'Full Port Scan',
      description: 'Comprehensive port scan with service detection',
      lastRun: '1 week ago',
    },
    {
      id: '3',
      name: 'Web Application Scan',
      description: 'Scans web applications for OWASP Top 10 vulnerabilities',
      lastRun: 'Never',
    },
    {
      id: '4',
      name: 'Internal Network Assessment',
      description: 'Deep scan of internal network segments',
      lastRun: '3 days ago',
    },
  ];
  
  // Mock scheduled scans
  const scheduledScans = [
    {
      id: '1',
      name: 'Weekly Perimeter Scan',
      target: '192.168.1.0/24',
      nextRun: '2025-04-20 02:00',
      frequency: 'Weekly',
      status: 'active',
    },
    {
      id: '2',
      name: 'Daily Critical Systems Check',
      target: '10.0.1.5, 10.0.1.6, 10.0.1.10',
      nextRun: '2025-04-17 01:00',
      frequency: 'Daily',
      status: 'active',
    },
    {
      id: '3',
      name: 'Monthly Full Network Scan',
      target: 'All assets',
      nextRun: '2025-05-01 00:00',
      frequency: 'Monthly',
      status: 'paused',
    },
  ];
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Scans</h1>
          <p className="text-muted-foreground">Manage your security scans</p>
        </div>
        <Button 
          onClick={goToNewScan}
          className="bg-cyber hover:bg-cyber-accent text-black"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Scan
        </Button>
      </div>
      
      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full sm:w-auto sm:inline-grid grid-cols-2 sm:grid-cols-3">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {scanTemplates.map((template) => (
              <Card key={template.id} className="border border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Last run: {template.lastRun}
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-cyber hover:bg-cyber-accent text-black"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Run
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled" className="space-y-6 mt-6">
          <div className="rounded-md border border-border/50 overflow-hidden">
            <div className="bg-muted/30 p-4">
              <h3 className="text-lg font-medium">Scheduled Scans</h3>
            </div>
            <div>
              {scheduledScans.map((scan, index) => (
                <React.Fragment key={scan.id}>
                  {index > 0 && <Separator />}
                  <div className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{scan.name}</h4>
                          <Badge 
                            variant="outline" 
                            className={scan.status === 'active' ? 'border-cyber-success text-cyber-success' : 'border-muted-foreground text-muted-foreground'}
                          >
                            {scan.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Target: {scan.target}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs">Next run: {scan.nextRun}</span>
                          <span className="text-xs">Frequency: {scan.frequency}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {scan.status === 'active' ? (
                          <Button size="sm" variant="outline">
                            <Pause className="h-4 w-4 mr-2" />
                            Pause
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4 mr-2" />
                            Resume
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="border-cyber-error text-cyber-error hover:bg-cyber-error/10">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6 mt-6">
          <div className="rounded-md border border-border/50 overflow-hidden">
            <div className="bg-muted/30 p-4 flex justify-between items-center">
              <h3 className="text-lg font-medium">Scan History</h3>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            <div className="p-4">
              <p className="text-center text-muted-foreground py-12">
                Scan history will appear here. Start a scan to see results.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Scans;
