
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileText, 
  Calendar, 
  BarChart2,
  Eye
} from 'lucide-react';

interface Report {
  id: string;
  name: string;
  date: string;
  type: 'vuln' | 'compliance' | 'executive';
  status: 'generated' | 'generating';
  size: string;
}

const Reports: React.FC = () => {
  // Mock reports data
  const reports: Report[] = [
    {
      id: '1',
      name: 'Weekly Vulnerability Report',
      date: '2025-04-16',
      type: 'vuln',
      status: 'generated',
      size: '2.3 MB',
    },
    {
      id: '2',
      name: 'Executive Summary Q1',
      date: '2025-04-15',
      type: 'executive',
      status: 'generated',
      size: '1.5 MB',
    },
    {
      id: '3',
      name: 'Internal Network Compliance Report',
      date: '2025-04-14',
      type: 'compliance',
      status: 'generated',
      size: '4.8 MB',
    },
    {
      id: '4',
      name: 'Web Application Scan Report',
      date: '2025-04-12',
      type: 'vuln',
      status: 'generated',
      size: '3.1 MB',
    },
    {
      id: '5',
      name: 'Monthly Security Posture',
      date: '2025-04-12',
      type: 'executive',
      status: 'generating',
      size: '—',
    },
  ];
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'vuln':
        return 'Vulnerability';
      case 'compliance':
        return 'Compliance';
      case 'executive':
        return 'Executive';
      default:
        return type;
    }
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vuln':
        return 'border-cyber text-cyber';
      case 'compliance':
        return 'border-cyber-success text-cyber-success';
      case 'executive':
        return 'border-cyber-warning text-cyber-warning';
      default:
        return '';
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Generate and manage security reports</p>
        </div>
        <div className="flex space-x-2">
          <Button
            className="bg-cyber hover:bg-cyber-accent text-black"
          >
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card className="border border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Report Templates</CardTitle>
              <span className="text-muted-foreground text-sm">8 templates</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between rounded-md p-2 hover:bg-muted/20 cursor-pointer">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-cyber" />
                  Executive Summary
                </div>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
              </li>
              <li className="flex items-center justify-between rounded-md p-2 hover:bg-muted/20 cursor-pointer">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-cyber" />
                  Technical Detail Report
                </div>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
              </li>
              <li className="flex items-center justify-between rounded-md p-2 hover:bg-muted/20 cursor-pointer">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-cyber" />
                  Compliance Audit
                </div>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
              </li>
              <li className="flex items-center justify-between rounded-md p-2 hover:bg-muted/20 cursor-pointer">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-cyber" />
                  Weekly Status
                </div>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Scheduled Reports</CardTitle>
              <span className="text-muted-foreground text-sm">3 active</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between rounded-md p-2 hover:bg-muted/20 cursor-pointer">
                <div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-cyber" />
                    Weekly Vulnerability Summary
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Every Monday at 8:00 AM</div>
                </div>
                <Badge variant="outline" className="border-cyber-success text-cyber-success">
                  Active
                </Badge>
              </li>
              <li className="flex items-center justify-between rounded-md p-2 hover:bg-muted/20 cursor-pointer">
                <div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-cyber" />
                    Monthly Executive Report
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">1st of month at 9:00 AM</div>
                </div>
                <Badge variant="outline" className="border-cyber-success text-cyber-success">
                  Active
                </Badge>
              </li>
              <li className="flex items-center justify-between rounded-md p-2 hover:bg-muted/20 cursor-pointer">
                <div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-cyber" />
                    Quarterly Compliance Report
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Last day of quarter</div>
                </div>
                <Badge variant="outline" className="border-cyber-success text-cyber-success">
                  Active
                </Badge>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Report Statistics</CardTitle>
              <BarChart2 className="h-5 w-5 text-cyber" />
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Reports Generated</span>
                <span className="font-bold">124</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">This Month</span>
                <span className="font-bold">17</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Average Size</span>
                <span className="font-bold">3.2 MB</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Most Common Type</span>
                <span className="font-bold">Vulnerability</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border border-border/50">
        <CardHeader className="bg-muted/30 py-3 px-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Recent Reports</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export List
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/20">
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getTypeColor(report.type)}
                    >
                      {getTypeLabel(report.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {report.status === 'generating' ? (
                        <>
                          <span className="h-2 w-2 rounded-full bg-cyber mr-1.5 animate-pulse"></span>
                          <span>Generating</span>
                        </>
                      ) : (
                        <span>Generated</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        disabled={report.status === 'generating'}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
