
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { downloadFile } from '@/lib/utils';
import { toast } from 'sonner';
import { ScanDetail } from '@/types/scan';
import { generateReportContent } from '@/lib/reports';

interface ScanReportActionsProps {
  scan: ScanDetail;
}

const ScanReportActions: React.FC<ScanReportActionsProps> = ({ scan }) => {
  const handleDownloadPDF = () => {
    toast.success("Generating PDF report", {
      description: "Your report will be downloaded shortly.",
    });
    
    setTimeout(() => {
      const reportContent = generateReportContent(scan, 'pdf');
      const blob = new Blob([reportContent], { type: 'application/pdf' });
      downloadFile(blob, `${scan.name.replace(/\s+/g, '_')}_Report.pdf`);
      toast.success("Report downloaded successfully");
    }, 1500);
  };

  const handleDownloadCSV = () => {
    toast.success("Generating CSV report", {
      description: "Your report will be downloaded shortly.",
    });
    
    setTimeout(() => {
      const csvContent = generateReportContent(scan, 'csv');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      downloadFile(blob, `${scan.name.replace(/\s+/g, '_')}_Vulnerabilities.csv`);
      toast.success("Report downloaded successfully");
    }, 1500);
  };

  return (
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
  );
};

export default ScanReportActions;
