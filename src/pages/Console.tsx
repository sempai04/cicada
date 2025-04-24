import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, AlarmClock, Download, Terminal, Trash2, InfoIcon, Copy } from 'lucide-react';
import TerminalOutput from '@/components/terminal/TerminalOutput';
import { toast } from 'sonner';

const Console: React.FC = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Starting VeilScanner v1.0.0...',
    'Loading modules...',
    'Network detection initialized',
    'Vulnerability database loaded (last updated: 2025-04-15)',
    'Type "help" for available commands',
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const commandHistoryRef = useRef<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClearConsole = () => {
    setHistory(['Console cleared.']);
    toast.success('Console cleared');
  };

  const handleCopyOutput = () => {
    const textToCopy = history.join('\n');
    navigator.clipboard.writeText(textToCopy)
      .then(() => toast.success('Console output copied to clipboard'))
      .catch(() => toast.error('Failed to copy to clipboard'));
  };

  const handleSaveOutput = () => {
    const textToSave = history.join('\n');
    const blob = new Blob([textToSave], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'console-output.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    toast.success('Console output saved to file');
  };

  const executeCommand = (cmd: string) => {
    if (cmd.trim() && (commandHistoryRef.current.length === 0 || commandHistoryRef.current[0] !== cmd)) {
      commandHistoryRef.current = [cmd, ...commandHistoryRef.current];
    }
    setHistoryIndex(-1);
    
    const cmdLower = cmd.toLowerCase().trim();
    const cmdParts = cmdLower.split(' ');
    const baseCmd = cmdParts[0];
    
    switch (baseCmd) {
      case 'help':
        setHistory(prev => [
          ...prev,
          'Available commands:',
          '  help - Show this help menu',
          '  scan <target> - Run a quick scan on target',
          '    Options:',
          '      -p <ports> - Specify ports (e.g., scan 192.168.1.1 -p 80,443)',
          '      -sV - Version detection',
          '      -O - OS detection',
          '      -A - Aggressive scan mode',
          '  clear - Clear console output',
          '  status - Show current scanner status',
          '  info - Show system information',
          '  exit - Exit console mode'
        ]);
        break;
        
      case 'clear':
        handleClearConsole();
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
        
      case 'info':
        setHistory(prev => [
          ...prev,
          'System Information:',
          '  VeilScanner v1.0.0',
          '  Web Interface Mode',
          '  Network: Connected',
          '  Latest update: 2025-04-20',
          '  License: Enterprise (Valid until 2026-04-24)'
        ]);
        break;
        
      case 'exit':
        setHistory(prev => [
          ...prev,
          'Exiting console mode...',
          'Notice: In web interface mode, console session remains active.'
        ]);
        toast.info('Cannot fully exit in web interface mode.');
        break;
        
      case 'scan':
        if (cmdParts.length > 1) {
          const target = cmdParts[1];
          let options = '';
          
          if (cmdParts.length > 2) {
            options = cmdParts.slice(2).join(' ');
          }
          
          setHistory(prev => [
            ...prev,
            `Initiating scan on target: ${target} ${options ? `with options: ${options}` : ''}`,
            'Scanning...',
          ]);
          
          setTimeout(() => {
            setHistory(prev => [
              ...prev,
              'Discovered open ports: 22, 80, 443',
              'Running service detection...',
              'Checking for vulnerabilities...',
              'Scan complete. Found 3 potential vulnerabilities:',
              ' - CVE-2023-1234: OpenSSH < 9.0 Authentication Bypass (High)',
              ' - CVE-2024-5678: Apache 2.4.52 Directory Traversal (Medium)',
              ' - Weak TLS Configuration on port 443 (Medium)'
            ]);
            
            toast.success('Scan completed', {
              description: 'Found 3 potential vulnerabilities',
            });
          }, 2000);
        } else {
          setHistory(prev => [
            ...prev,
            'Error: No target specified. Usage: scan <target> [options]',
            'Example: scan 192.168.1.1 -p 80,443 -sV'
          ]);
        }
        break;
        
      default:
        setHistory(prev => [...prev, `Command not recognized: ${cmd}`]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!command.trim()) return;
    
    setHistory(prev => [...prev, `> ${command}`]);
    executeCommand(command);
    setCommand('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, commandHistoryRef.current.length - 1);
      setHistoryIndex(newIndex);
      if (newIndex >= 0 && commandHistoryRef.current[newIndex]) {
        setCommand(commandHistoryRef.current[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      if (newIndex >= 0 && commandHistoryRef.current[newIndex]) {
        setCommand(commandHistoryRef.current[newIndex]);
      } else {
        setCommand('');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Console</h1>
          <p className="text-muted-foreground">Command-line interface to the scanner</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleClearConsole}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>
          <Button variant="outline" onClick={handleCopyOutput}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" onClick={handleSaveOutput}>
            <Download className="mr-2 h-4 w-4" />
            Save Output
          </Button>
        </div>
      </div>
      
      <Card className="border border-border/50">
        <CardHeader className="bg-muted/30 py-3 px-4">
          <CardTitle className="text-lg flex items-center">
            <Terminal className="mr-2 h-5 w-5 text-cyber" />
            Terminal
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-2 pb-0">
            <TerminalOutput content={history} className="h-[400px]" />
          </div>
          
          <form onSubmit={handleSubmit} className="p-2 pt-0">
            <div className="flex mt-2">
              <Input
                ref={inputRef}
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleKeyDown}
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
