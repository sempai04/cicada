
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, AlarmClock, Download } from 'lucide-react';
import TerminalOutput from '@/components/terminal/TerminalOutput';

const Console: React.FC = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Starting VeilScanner v1.0.0...',
    'Loading modules...',
    'Network detection initialized',
    'Vulnerability database loaded (last updated: 2025-04-15)',
    'Type "help" for available commands',
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!command.trim()) return;
    
    setHistory(prev => [...prev, `> ${command}`]);
    
    // Simple command processing logic
    switch (command.toLowerCase()) {
      case 'help':
        setHistory(prev => [
          ...prev,
          'Available commands:',
          '  help - Show this help menu',
          '  scan <target> - Run a quick scan on target',
          '  clear - Clear console output',
          '  status - Show current scanner status',
          '  exit - Exit console mode'
        ]);
        break;
      case 'clear':
        setHistory(['Console cleared.']);
        break;
      case 'status':
        setHistory(prev => [
          ...prev,
          'Scanner Status:',
          '  Version: 1.0.0',
          '  Active scans: 1',
          '  CPU Usage: 24%',
          '  Memory Usage: 256MB',
          '  Vulnerability DB: Up to date'
        ]);
        break;
      case 'exit':
        setHistory(prev => [...prev, 'Cannot exit in web interface mode.']);
        break;
      default:
        if (command.toLowerCase().startsWith('scan')) {
          const target = command.split(' ')[1];
          if (target) {
            setHistory(prev => [
              ...prev,
              `Initiating quick scan on target: ${target}`,
              'Scanning...',
              'Discovered open ports: 22, 80, 443',
              'Running service detection...',
              'Checking for vulnerabilities...',
              'Scan complete. Found 3 potential vulnerabilities.'
            ]);
          } else {
            setHistory(prev => [...prev, 'Error: No target specified. Usage: scan <target>']);
          }
        } else {
          setHistory(prev => [...prev, `Command not recognized: ${command}`]);
        }
    }
    
    setCommand('');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Console</h1>
          <p className="text-muted-foreground">Command-line interface to the scanner</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <AlarmClock className="mr-2 h-4 w-4" />
            History
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Save Output
          </Button>
        </div>
      </div>
      
      <Card className="border border-border/50">
        <CardHeader className="bg-muted/30 py-3 px-4">
          <CardTitle className="text-lg">Terminal</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-2 pb-0">
            <TerminalOutput content={history} className="h-[400px]" />
          </div>
          
          <form onSubmit={handleSubmit} className="p-2 pt-0">
            <div className="flex mt-2">
              <Input
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Enter command..."
                className="font-mono border-cyber/50 bg-cyber-darker focus-visible:ring-cyber"
              />
              <Button 
                type="submit"
                className="ml-2 bg-cyber hover:bg-cyber-accent text-black"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card className="border border-border/50">
        <CardHeader className="bg-muted/30 py-3 px-4">
          <CardTitle className="text-lg">Quick Reference</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium mb-2">Basic Commands</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex">
                  <span className="font-mono text-cyber w-20">help</span>
                  <span className="text-muted-foreground">Show available commands</span>
                </li>
                <li className="flex">
                  <span className="font-mono text-cyber w-20">scan</span>
                  <span className="text-muted-foreground">Run a scan against a target</span>
                </li>
                <li className="flex">
                  <span className="font-mono text-cyber w-20">clear</span>
                  <span className="text-muted-foreground">Clear console output</span>
                </li>
                <li className="flex">
                  <span className="font-mono text-cyber w-20">status</span>
                  <span className="text-muted-foreground">Show scanner status</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Scan Options</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex">
                  <span className="font-mono text-cyber w-20">-p</span>
                  <span className="text-muted-foreground">Specify ports to scan</span>
                </li>
                <li className="flex">
                  <span className="font-mono text-cyber w-20">-sV</span>
                  <span className="text-muted-foreground">Version detection</span>
                </li>
                <li className="flex">
                  <span className="font-mono text-cyber w-20">-O</span>
                  <span className="text-muted-foreground">OS detection</span>
                </li>
                <li className="flex">
                  <span className="font-mono text-cyber w-20">-A</span>
                  <span className="text-muted-foreground">Aggressive scan mode</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Console;
