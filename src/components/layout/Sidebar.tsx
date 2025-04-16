
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart2, 
  Radar, 
  Shield, 
  FileText, 
  Settings, 
  Terminal, 
  AlertCircle,
  Database, 
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Scans', path: '/scans', icon: <Radar size={20} /> },
    { name: 'Vulnerabilities', path: '/vulnerabilities', icon: <AlertCircle size={20} /> },
    { name: 'Reports', path: '/reports', icon: <FileText size={20} /> },
    { name: 'Console', path: '/console', icon: <Terminal size={20} /> },
    { name: 'Target Manager', path: '/targets', icon: <Database size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="bg-cyber-dark w-full md:w-64 h-auto md:h-screen border-r border-cyber/10 py-6 flex flex-col">
      <div className="px-6 mb-8 flex items-center">
        <Shield className="w-8 h-8 text-cyber mr-2" />
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Veil<span className="text-cyber">Scanner</span></h1>
          <p className="text-xs text-muted-foreground">Penetration Testing Framework</p>
        </div>
      </div>
      
      <div className="space-y-1 px-3">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start mb-1 font-normal text-muted-foreground hover:text-foreground",
                location.pathname === item.path && "bg-muted text-foreground"
              )}
            >
              <span className={cn("mr-2", location.pathname === item.path ? "text-cyber" : "")}>{item.icon}</span>
              {item.name}
            </Button>
          </Link>
        ))}
      </div>

      <div className="mt-auto px-3">
        <div className="bg-muted/50 rounded-md p-3 text-xs space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Version</span>
            <span className="text-foreground">1.0.0</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Status</span>
            <span className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-cyber-success mr-1.5 animate-pulse-glow"></span>
              Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
