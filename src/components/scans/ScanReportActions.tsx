
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { ScanDetail } from '@/types/scan';
import { downloadReport } from '@/lib/reports';

interface ScanReportActionsProps {
  scan: ScanDetail;
}

const ScanReportActions: React.FC<ScanReportActionsProps> = ({ scan }) => {
  const handleDownloadPDF = () => {
    toast.success("Generating PDF report", {
      description: "Your report will be downloaded shortly.",
    });
    
    setTimeout(() => {
      try {
        downloadReport(scan, 'pdf');
        toast.success("Report downloaded successfully");
      } catch (error) {
        console.error("Error downloading PDF report:", error);
        toast.error("Failed to download PDF report");
      }
    }, 1000);
  };

  const handleDownloadCSV = () => {
    toast.success("Generating CSV report", {
      description: "Your report will be downloaded shortly.",
    });
    
    setTimeout(() => {
      try {
        downloadReport(scan, 'csv');
        toast.success("Report downloaded successfully");
      } catch (error) {
        console.error("Error downloading CSV report:", error);
        toast.error("Failed to download CSV report");
      }
    }, 1000);
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
