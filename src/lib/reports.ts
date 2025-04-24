
import { ScanDetail } from '@/types/scan';
import jsPDF from 'jspdf';

export function generateReportContent(scan: ScanDetail, type: 'pdf' | 'csv'): string {
  if (type === 'csv') {
    let csv = 'ID,Title,Severity,Host,Port,Service,CVE\n';
    scan.vulnerabilities.forEach(vuln => {
      csv += `${vuln.id},"${vuln.title}",${vuln.severity},${vuln.host},${vuln.port},${vuln.service},${vuln.cve || 'N/A'}\n`;
    });
    return csv;
  }

  // For PDF we'll just return an empty string since we handle PDF creation separately
  return '';
}

export function downloadReport(scan: ScanDetail, type: 'pdf' | 'csv'): void {
  if (type === 'csv') {
    const content = generateReportContent(scan, 'csv');
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const fileName = `${scan.name.replace(/\s+/g, '_')}_Vulnerabilities.csv`;
    
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  } else {
    // Generate PDF using jsPDF
    const doc = new jsPDF();
    const fileName = `${scan.name.replace(/\s+/g, '_')}_Report.pdf`;
    
    // Set font size and add title
    doc.setFontSize(16);
    doc.text('SECURITY SCAN REPORT', 20, 20);
    
    // Add scan information
    doc.setFontSize(12);
    doc.text(`Scan Name: ${scan.name}`, 20, 30);
    doc.text(`Target: ${scan.target}`, 20, 40);
    doc.text(`Date: ${scan.date}`, 20, 50);
    doc.text(`Duration: ${scan.duration}`, 20, 60);
    doc.text(`Status: ${scan.status}`, 20, 70);
    doc.text(`Total Findings: ${scan.findings}`, 20, 80);
    
    // Add vulnerabilities summary
    doc.setFontSize(14);
    doc.text('VULNERABILITIES SUMMARY', 20, 100);
    doc.setFontSize(12);
    const critical = scan.vulnerabilities.filter(v => v.severity === 'critical').length;
    const high = scan.vulnerabilities.filter(v => v.severity === 'high').length;
    const medium = scan.vulnerabilities.filter(v => v.severity === 'medium').length;
    const low = scan.vulnerabilities.filter(v => v.severity === 'low').length;
    const info = scan.vulnerabilities.filter(v => v.severity === 'info').length;
    
    doc.text(`Critical: ${critical}`, 20, 110);
    doc.text(`High: ${high}`, 20, 120);
    doc.text(`Medium: ${medium}`, 20, 130);
    doc.text(`Low: ${low}`, 20, 140);
    doc.text(`Info: ${info}`, 20, 150);
    
    // Add detailed findings section
    doc.setFontSize(14);
    doc.text('DETAILED FINDINGS', 20, 170);
    
    // Loop through vulnerabilities (with pagination for multi-page reports)
    let yPos = 190;
    const pageHeight = doc.internal.pageSize.height;
    
    scan.vulnerabilities.forEach((vuln, index) => {
      // Add new page if we're near the bottom
      if (yPos > pageHeight - 50) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(12);
      doc.text(`${index + 1}. ${vuln.title} (${vuln.severity.toUpperCase()})`, 20, yPos);
      yPos += 10;
      
      // Check if we need a new page
      if (yPos > pageHeight - 50) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(10);
      doc.text(`Host: ${vuln.host}:${vuln.port} (${vuln.service})`, 30, yPos);
      yPos += 10;
      
      if (vuln.cve) {
        if (yPos > pageHeight - 50) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(`CVE: ${vuln.cve}`, 30, yPos);
        yPos += 10;
      }
      
      // Split description into multiple lines if needed
      if (yPos > pageHeight - 50) {
        doc.addPage();
        yPos = 20;
      }
      
      const descriptionLines = doc.splitTextToSize(`Description: ${vuln.description}`, 150);
      doc.text(descriptionLines, 30, yPos);
      yPos += 10 * descriptionLines.length;
      
      // Split remediation into multiple lines if needed
      if (yPos > pageHeight - 50) {
        doc.addPage();
        yPos = 20;
      }
      
      const remediationLines = doc.splitTextToSize(`Remediation: ${vuln.remediation}`, 150);
      doc.text(remediationLines, 30, yPos);
      yPos += 10 * remediationLines.length + 10;
    });
    
    // Save and download the PDF
    doc.save(fileName);
  }
}
