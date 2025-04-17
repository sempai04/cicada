
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import VulnerabilityTable, { Vulnerability } from '@/components/vulnerabilities/VulnerabilityTable';
import { toast } from 'sonner';

interface ScanDetail {
  id: string;
  name: string;
  target: string;
  date: string;
  duration: string;
  findings: number;
  status: string;
  vulnerabilities: Vulnerability[];
}

const ScanResults: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [scan, setScan] = useState<ScanDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetching scan data - in a real app this would be an API call
    const fetchScanData = () => {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        // Mock data for the specific scan
        const mockScan: ScanDetail = {
          id: id || '1',
          name: 'Daily Security Check',
          target: '10.0.1.0/24',
          date: '2025-04-16 14:30',
          duration: '5m 12s',
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
              description: 'The remote service accepts connections encrypted using TLS 1.0. TLS 1.0 has known cryptographic design issues and should be avoided.',
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
              description: 'The remote web application appears to use a vulnerable version of Log4j that is susceptible to remote code execution via JNDI injection.',
              remediation: 'Update Log4j to version 2.15.0 or later and apply recommended mitigations.',
              cve: 'CVE-2021-44228',
            },
            {
              id: '3',
              title: 'Outdated OpenSSH Version',
              severity: 'high',
              host: '10.0.1.11',
              port: 22,
              service: 'ssh',
              description: 'The version of OpenSSH running on the remote host is outdated and vulnerable to multiple security issues.',
              remediation: 'Update OpenSSH to the latest stable version.',
              cve: 'CVE-2020-14145',
            },
          ]
        };
        setScan(mockScan);
        setLoading(false);
      }, 500);
    };

    fetchScanData();
  }, [id]);

  const handleBack = () => {
    navigate('/scans');
  };

  // Generate PDF report
  const handleDownloadPDF = () => {
    if (!scan) return;
    
    toast.success("Generating PDF report", {
      description: "Your report will be downloaded shortly.",
    });
    
    // Simulate processing delay
    setTimeout(() => {
      // Create blob content for PDF
      const reportContent = generateReportContent(scan, 'pdf');
      
      // Create a Blob with the data
      const blob = new Blob([reportContent], { type: 'application/pdf' });
      
      // Create a link element, set properties, click it to download, then remove
      downloadFile(blob, `${scan.name.replace(/\s+/g, '_')}_Report.pdf`);
      
      toast.success("Report downloaded successfully");
    }, 1500);
  };

  // Generate CSV report
  const handleDownloadCSV = () => {
    if (!scan) return;
    
    toast.success("Generating CSV report", {
      description: "Your report will be downloaded shortly.",
    });
    
    // Simulate processing delay
    setTimeout(() => {
      // Create CSV content
      const csvContent = generateReportContent(scan, 'csv');
      
      // Create a Blob with the data
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      
      // Create a link element, set properties, click it to download, then remove
      downloadFile(blob, `${scan.name.replace(/\s+/g, '_')}_Vulnerabilities.csv`);
      
      toast.success("Report downloaded successfully");
    }, 1500);
  };

  // Helper function to download a file
  const downloadFile = (blob: Blob, filename: string) => {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  };

  // Helper function to generate report content based on type
  const generateReportContent = (scan: ScanDetail, type: 'pdf' | 'csv'): string => {
    if (type === 'csv') {
      // Create CSV header
      let csv = 'ID,Title,Severity,Host,Port,Service,CVE\n';
      
      // Add vulnerabilities data
      scan.vulnerabilities.forEach(vuln => {
        csv += `${vuln.id},"${vuln.title}",${vuln.severity},${vuln.host},${vuln.port},${vuln.service},${vuln.cve}\n`;
      });
      
      return csv;
    } else {
      // For PDF we're creating a text representation (in a real app this would use a PDF library)
      let content = `
SECURITY SCAN REPORT
====================
Scan Name: ${scan.name}
Target: ${scan.target}
Date: ${scan.date}
Duration: ${scan.duration}
Status: ${scan.status}
Total Findings: ${scan.findings}

VULNERABILITIES SUMMARY
----------------------
Critical: ${scan.vulnerabilities.filter(v => v.severity === 'critical').length}
High: ${scan.vulnerabilities.filter(v => v.severity === 'high').length}
Medium: ${scan.vulnerabilities.filter(v => v.severity === 'medium').length}

DETAILED FINDINGS
----------------
`;
      
      scan.vulnerabilities.forEach(vuln => {
        content += `
${vuln.title} (${vuln.severity.toUpperCase()})
Host: ${vuln.host}:${vuln.port} (${vuln.service})
CVE: ${vuln.cve}
Description: ${vuln.description}
Remediation: ${vuln.remediation}

`;
      });
      
      return content;
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Scans
          </Button>
          <h1 className="text-2xl font-bold">Loading Scan Results...</h1>
        </div>
      </div>
    );
  }

  if (!scan) {
    return (
      <div className="space-y-8">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Scans
          </Button>
          <h1 className="text-2xl font-bold">Scan Not Found</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <p>The requested scan could not be found. It may have been deleted or you may not have access to it.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{scan.name}</h1>
            <p className="text-muted-foreground">Scan results from {scan.date}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleDownloadCSV}>
            <Download className="mr-2 h-4 w-4" />
            CSV
          </Button>
          <Button 
            className="bg-cyber hover:bg-cyber-accent text-black"
            onClick={handleDownloadPDF}
          >
            <FileText className="mr-2 h-4 w-4" />
            PDF Report
          </Button>
        </div>
      </div>

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

      <VulnerabilityTable vulnerabilities={scan.vulnerabilities} />
    </div>
  );
};

export default ScanResults;
