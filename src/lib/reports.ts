
import { ScanDetail } from '@/types/scan';

export function generateReportContent(scan: ScanDetail, type: 'pdf' | 'csv'): string {
  if (type === 'csv') {
    let csv = 'ID,Title,Severity,Host,Port,Service,CVE\n';
    scan.vulnerabilities.forEach(vuln => {
      csv += `${vuln.id},"${vuln.title}",${vuln.severity},${vuln.host},${vuln.port},${vuln.service},${vuln.cve || 'N/A'}\n`;
    });
    return csv;
  }

  // For PDF (text representation)
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
Low: ${scan.vulnerabilities.filter(v => v.severity === 'low').length}
Info: ${scan.vulnerabilities.filter(v => v.severity === 'info').length}

DETAILED FINDINGS
----------------
`;
  
  scan.vulnerabilities.forEach(vuln => {
    content += `
${vuln.title} (${vuln.severity.toUpperCase()})
Host: ${vuln.host}:${vuln.port} (${vuln.service})
CVE: ${vuln.cve || 'N/A'}
Description: ${vuln.description}
Remediation: ${vuln.remediation}

`;
  });
  
  return content;
}

export function downloadReport(scan: ScanDetail, type: 'pdf' | 'csv'): void {
  const content = generateReportContent(scan, type);
  const mimeType = type === 'csv' ? 'text/csv;charset=utf-8;' : 'application/pdf';
  const fileExtension = type === 'csv' ? 'csv' : 'pdf';
  const fileName = `${scan.name.replace(/\s+/g, '_')}_${type === 'csv' ? 'Vulnerabilities' : 'Report'}.${fileExtension}`;
  
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  window.URL.revokeObjectURL(link.href);
}
