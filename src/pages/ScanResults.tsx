import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import VulnerabilityTable from '@/components/vulnerabilities/VulnerabilityTable';
import ScanHeader from '@/components/scans/ScanHeader';
import ScanReportActions from '@/components/scans/ScanReportActions';
import ScanSummary from '@/components/scans/ScanSummary';
import type { ScanDetail } from '@/types/scan';

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

  if (loading) {
    return (
      <div className="space-y-8">
        <ScanHeader name="Loading Scan Results..." date="" onBack={handleBack} />
      </div>
    );
  }

  if (!scan) {
    return (
      <div className="space-y-8">
        <ScanHeader name="Scan Not Found" date="" onBack={handleBack} />
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
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <ScanHeader name={scan.name} date={scan.date} onBack={handleBack} />
        <ScanReportActions scan={scan} />
      </div>

      <ScanSummary scan={scan} />
      <VulnerabilityTable vulnerabilities={scan.vulnerabilities} />
    </div>
  );
};

export default ScanResults;
