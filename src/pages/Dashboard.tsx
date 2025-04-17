
import React from 'react';
import { AlertCircle, Radar, Scan, Clock, Laptop, Shield } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import SeverityDistribution from '@/components/dashboard/SeverityDistribution';
import ScanHistoryChart from '@/components/dashboard/ScanHistoryChart';
import RecentScans from '@/components/dashboard/RecentScans';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Mock data for dashboard
const severityData = [
  { name: 'Critical', value: 8, color: '#ff2e63' },
  { name: 'High', value: 15, color: '#ff8906' },
  { name: 'Medium', value: 27, color: '#f9c80e' },
  { name: 'Low', value: 36, color: '#05d9e8' },
  { name: 'Info', value: 64, color: '#5bffa4' },
];

const scanHistoryData = [
  { date: 'Apr 10', vulnerabilities: 130, scans: 2 },
  { date: 'Apr 11', vulnerabilities: 110, scans: 1 },
  { date: 'Apr 12', vulnerabilities: 145, scans: 3 },
  { date: 'Apr 13', vulnerabilities: 132, scans: 2 },
  { date: 'Apr 14', vulnerabilities: 118, scans: 2 },
  { date: 'Apr 15', vulnerabilities: 125, scans: 3 },
  { date: 'Apr 16', vulnerabilities: 150, scans: 4 },
];

const recentScans = [
  {
    id: '1',
    target: '192.168.1.0/24',
    timestamp: '2025-04-16 14:30',
    status: 'completed' as const,
    vulnerabilities: 47,
  },
  {
    id: '2',
    target: 'example.com',
    timestamp: '2025-04-16 12:15',
    status: 'completed' as const,
    vulnerabilities: 12,
  },
  {
    id: '3',
    target: '10.0.0.5',
    timestamp: '2025-04-16 10:05',
    status: 'in-progress' as const,
    vulnerabilities: 8,
  },
  {
    id: '4',
    target: 'api.internal.local',
    timestamp: '2025-04-15 19:22',
    status: 'failed' as const,
    vulnerabilities: 0,
  },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const startNewScan = () => {
    navigate('/scans/new');
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your security posture</p>
        </div>
        <Button 
          onClick={startNewScan}
          className="bg-cyber hover:bg-cyber-accent text-black"
        >
          <Scan className="mr-2 h-4 w-4" />
          New Scan
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Vulnerabilities"
          value="150"
          icon={<AlertCircle size={20} />}
          trend={{ value: 12, isPositive: false }}
        />
        <StatsCard
          title="Active Scans"
          value="3"
          icon={<Radar size={20} />}
          description="2 scheduled, 1 running"
        />
        <StatsCard
          title="Scan Time"
          value="12:05"
          icon={<Clock size={20} />}
          description="Avg. scan duration"
        />
        <StatsCard
          title="Hosts"
          value="94"
          icon={<Laptop size={20} />}
          description="54 active, 40 inactive"
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <SeverityDistribution data={severityData} />
        <ScanHistoryChart data={scanHistoryData} />
      </div>
      
      <RecentScans scans={recentScans} />
    </div>
  );
};

export default Dashboard;
