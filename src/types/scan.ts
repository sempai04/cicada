
export interface Vulnerability {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  host: string;
  port: number;
  service: string;
  description: string;
  remediation: string;
  cve?: string;
}

export interface ScanDetail {
  id: string;
  name: string;
  target: string;
  date: string;
  duration: string;
  findings: number;
  status: string;
  vulnerabilities: Vulnerability[];
}
