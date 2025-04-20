
import { ScanDetail } from '@/types/scan';

export function generateReportContent(scan: ScanDetail, type: 'pdf' | 'csv'): string {
  if (type === 'csv') {
    let csv = 'ID,Title,Severity,Host,Port,Service,CVE\n';
    scan.vulnerabilities.forEach(vuln => {
      csv += `${vuln.id},"${vuln.title}",${vuln.severity},${vuln.host},${vuln.port},${vuln.service},${vuln.cve}\n`;
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
