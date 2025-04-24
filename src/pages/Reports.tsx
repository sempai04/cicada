import React, { useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { downloadReport } from "@/lib/reports";
import { ScanDetail } from "@/types/scan";

interface Report {
  id: string;
  name: string;
  date: string;
  type: 'vuln' | 'compliance' | 'executive';
  status: 'generated' | 'generating';
  size: string;
  scanData?: ScanDetail;
}

const Reports: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportType, setReportType] = useState<string>("");
  const [reportTemplate, setReportTemplate] = useState<string>("");
  
  const mockScanData: ScanDetail = {
    id: '123',
    name: 'Weekly Vulnerability Report',
    target: '10.0.1.0/24',
    date: '2025-04-16',
    duration: '3m 45s',
    findings: 47,
    status: 'completed',
    vulnerabilities: [
      {
        id: '1',
        title: 'SSL/TLS Server Supports TLS 1.0',
        severity: 'medium',
        host: '10.0.1.10',
        port: 443,
        service: 'https',
        description: 'The remote service accepts connections encrypted using TLS 1.0. TLS 1.0 has known issues.',
        remediation: 'Disable TLS 1.0 and configure the service to support only TLS 1.2 or higher.',
        cve: 'CVE-2011-3389',
      },
      {
        id: '2',
        title: 'Apache Log4j Remote Code Execution',
        severity: 'critical',
        host: '10.0.1.15',
        port: 8080,
        service: 'http',
        description: 'The remote web application uses a vulnerable version of Log4j.',
        remediation: 'Update Log4j to version 2.15.0 or later.',
        cve: 'CVE-2021-44228',
      }
    ]
  };
  
  const reports: Report[] = [
    {
      id: '1',
      name: 'Weekly Vulnerability Report',
      date: '2025-04-16',
      type: 'vuln',
      status: 'generated',
      size: '2.3 MB',
      scanData: mockScanData,
    },
    {
      id: '2',
      name: 'Executive Summary Q1',
      date: '2025-04-15',
      type: 'executive',
      status: 'generated',
      size: '1.5 MB',
      scanData: {...mockScanData, name: 'Executive Summary Q1'},
    },
    {
      id: '3',
      name: 'Internal Network Compliance Report',
      date: '2025-04-14',
      type: 'compliance',
      status: 'generated',
      size: '4.8 MB',
      scanData: {...mockScanData, name: 'Internal Network Compliance Report'},
    },
    {
      id: '4',
      name: 'Web Application Scan Report',
      date: '2025-04-12',
      type: 'vuln',
      status: 'generated',
      size: '3.1 MB',
      scanData: {...mockScanData, name: 'Web Application Scan Report'},
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
  
  const handleGenerateReport = () => {
    if (!reportType || !reportTemplate) {
      toast.error("Please select both report type and template");
      return;
    }
    
    setIsGenerating(true);
    
    toast.success("Generating report", {
      description: "Your report is being generated and will be ready shortly."
    });
    
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Report generated successfully");
      
      // In a real app, this would redirect to the new report or refresh the list
      // For now, we'll just close the dialog
    }, 2000);
  };
  
  const handleDownloadReport = (report: Report) => {
    if (!report.scanData) {
      toast.error("Report data is not available yet");
      return;
    }
    
    if (report.status === 'generating') {
      toast.info("This report is still being generated");
      return;
    }
    
    toast.success(`Downloading ${report.name}`, {
      description: "Your report will be downloaded shortly.",
    });
    
    setTimeout(() => {
      try {
        downloadReport(report.scanData, report.type === 'vuln' ? 'pdf' : 'csv');
        toast.success("Report downloaded successfully");
      } catch (error) {
        console.error("Error downloading report:", error);
        toast.error("Failed to download report");
      }
    }, 1000);
  };
  
  const handleViewReport = (report: Report) => {
    toast.info(`Viewing ${report.name}`, {
      description: "This feature will be available soon.",
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Generate and manage security reports</p>
        </div>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="bg-cyber hover:bg-cyber-accent text-black"
              >
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Generate New Report</DialogTitle>
                <DialogDescription>
                  Configure and generate a security report
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reportType" className="text-right">
                    Type
                  </Label>
                  <Select
                    value={reportType}
                    onValueChange={setReportType}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vuln">Vulnerability</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="executive">Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="template" className="text-right">
                    Template
                  </Label>
                  <Select
                    value={reportTemplate}
                    onValueChange={setReportTemplate}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="executive">Executive Summary</SelectItem>
                      <SelectItem value="technical">Technical Detail Report</SelectItem>
                      <SelectItem value="compliance">Compliance Audit</SelectItem>
                      <SelectItem value="weekly">Weekly Status</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  onClick={handleGenerateReport} 
                  disabled={isGenerating}
                  className="bg-cyber hover:bg-cyber-accent text-black"
                >
                  {isGenerating ? "Generating..." : "Generate Report"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleViewReport(report)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        disabled={report.status === 'generating'}
                        onClick={() => handleDownloadReport(report)}
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
