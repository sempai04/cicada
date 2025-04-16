
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import VulnerabilityTable, { Vulnerability } from '@/components/vulnerabilities/VulnerabilityTable';

const Vulnerabilities: React.FC = () => {
  // Mock vulnerability data
  const vulnerabilities: Vulnerability[] = [
    {
      id: '1',
      title: 'SSL/TLS Server Supports TLS 1.0',
      severity: 'medium',
      host: '192.168.1.10',
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
      host: '192.168.1.15',
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
      host: '192.168.1.11',
      port: 22,
      service: 'ssh',
      description: 'The version of OpenSSH running on the remote host is outdated and vulnerable to multiple security issues.',
      remediation: 'Update OpenSSH to the latest stable version.',
      cve: 'CVE-2020-14145',
    },
    {
      id: '4',
      title: 'HTTP Server Information Disclosure',
      severity: 'low',
      host: '192.168.1.10',
      port: 80,
      service: 'http',
      description: 'The HTTP server is revealing sensitive information in its response headers, including software versions and server details.',
      remediation: 'Configure the web server to hide version information in HTTP headers.',
    },
    {
      id: '5',
      title: 'Weak SSH Encryption Algorithms',
      severity: 'medium',
      host: '192.168.1.20',
      port: 22,
      service: 'ssh',
      description: 'The SSH server is configured to allow weak encryption algorithms (CBC mode ciphers).',
      remediation: 'Reconfigure the SSH server to disable weak cryptographic algorithms and only allow strong algorithms.',
    },
    {
      id: '6',
      title: 'Default Community String (public)',
      severity: 'high',
      host: '192.168.1.30',
      port: 161,
      service: 'snmp',
      description: 'The remote SNMP service uses a default community string (public).',
      remediation: 'Change the default community string to a strong, unique value. Consider implementing SNMPv3 with authentication and encryption.',
    },
    {
      id: '7',
      title: 'Web Server MIME Type XSS',
      severity: 'medium',
      host: '192.168.1.15',
      port: 8080,
      service: 'http',
      description: 'The web server is configured to serve static content with an incorrect MIME type that can lead to cross-site scripting attacks.',
      remediation: 'Configure the web server to use proper MIME types for all resources.',
      cve: 'CVE-2019-11358',
    },
  ];

  // Counts for summary cards
  const getCountBySeverity = (severity: string) => {
    return vulnerabilities.filter(v => v.severity === severity).length;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Vulnerabilities</h1>
          <p className="text-muted-foreground">Manage and remediate detected issues</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
        <Card className="border border-border/50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Critical</p>
              <h3 className="text-2xl font-bold text-cyber-error mt-1">{getCountBySeverity('critical')}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border/50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">High</p>
              <h3 className="text-2xl font-bold text-cyber-error mt-1">{getCountBySeverity('high')}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border/50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Medium</p>
              <h3 className="text-2xl font-bold text-cyber-warning mt-1">{getCountBySeverity('medium')}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border/50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Low</p>
              <h3 className="text-2xl font-bold text-cyber mt-1">{getCountBySeverity('low')}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border/50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Total</p>
              <h3 className="text-2xl font-bold mt-1">{vulnerabilities.length}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full sm:w-auto sm:inline-grid grid-cols-2 sm:grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
          <TabsTrigger value="high">High</TabsTrigger>
          <TabsTrigger value="medium">Medium</TabsTrigger>
          <TabsTrigger value="low">Low</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <VulnerabilityTable vulnerabilities={vulnerabilities} />
        </TabsContent>
        
        <TabsContent value="critical" className="mt-6">
          <VulnerabilityTable vulnerabilities={vulnerabilities.filter(v => v.severity === 'critical')} />
        </TabsContent>
        
        <TabsContent value="high" className="mt-6">
          <VulnerabilityTable vulnerabilities={vulnerabilities.filter(v => v.severity === 'high')} />
        </TabsContent>
        
        <TabsContent value="medium" className="mt-6">
          <VulnerabilityTable vulnerabilities={vulnerabilities.filter(v => v.severity === 'medium')} />
        </TabsContent>
        
        <TabsContent value="low" className="mt-6">
          <VulnerabilityTable vulnerabilities={vulnerabilities.filter(v => v.severity === 'low')} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Vulnerabilities;
