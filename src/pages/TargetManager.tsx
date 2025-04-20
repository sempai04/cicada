
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2, Target, Settings } from 'lucide-react';
import { 
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table';
import { toast } from 'sonner';

type TargetType = {
  id: string;
  name: string;
  host: string;
  type: 'server' | 'network' | 'web';
  tags: string[];
  lastScan: string | null;
};

const TargetManager: React.FC = () => {
  const [targets, setTargets] = useState<TargetType[]>([
    {
      id: '1',
      name: 'Web Server',
      host: 'example.com',
      type: 'web',
      tags: ['production', 'external'],
      lastScan: '2025-04-15'
    },
    {
      id: '2',
      name: 'Internal Network',
      host: '192.168.1.0/24',
      type: 'network',
      tags: ['internal'],
      lastScan: '2025-04-10'
    },
    {
      id: '3',
      name: 'Database Server',
      host: '10.0.0.5',
      type: 'server',
      tags: ['production', 'critical'],
      lastScan: '2025-04-18'
    }
  ]);
  
  const [newTarget, setNewTarget] = useState({
    name: '',
    host: '',
    type: 'server' as const,
    tags: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTarget(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddTarget = () => {
    if (!newTarget.name || !newTarget.host) {
      toast.error("Required fields missing", {
        description: "Please provide both a name and host for the target."
      });
      return;
    }
    
    const target: TargetType = {
      id: Date.now().toString(),
      name: newTarget.name,
      host: newTarget.host,
      type: newTarget.type,
      tags: newTarget.tags ? newTarget.tags.split(',').map(tag => tag.trim()) : [],
      lastScan: null
    };
    
    setTargets(prev => [...prev, target]);
    setNewTarget({
      name: '',
      host: '',
      type: 'server',
      tags: ''
    });
    
    toast.success("Target added successfully", {
      description: `${target.name} has been added to your targets.`
    });
  };
  
  const handleDeleteTarget = (id: string) => {
    const targetToDelete = targets.find(t => t.id === id);
    
    setTargets(prev => prev.filter(target => target.id !== id));
    
    if (targetToDelete) {
      toast.success("Target deleted", {
        description: `${targetToDelete.name} has been removed from your targets.`
      });
    }
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Target Manager</h1>
        <p className="text-muted-foreground">Manage your scan targets</p>
      </div>
      
      <Card className="border border-border/50">
        <CardHeader className="bg-muted/30 py-3 px-6">
          <CardTitle className="text-lg">Add New Target</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Target Name</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="Web Server" 
                value={newTarget.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="host">Host/IP/Range</Label>
              <Input 
                id="host" 
                name="host" 
                placeholder="example.com or 192.168.1.0/24" 
                value={newTarget.host}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Target Type</Label>
              <select 
                id="type"
                name="type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newTarget.type}
                onChange={(e) => setNewTarget(prev => ({ ...prev, type: e.target.value as any }))}
              >
                <option value="server">Server</option>
                <option value="network">Network</option>
                <option value="web">Web</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input 
                id="tags" 
                name="tags" 
                placeholder="production, critical" 
                value={newTarget.tags}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={handleAddTarget}
              className="bg-cyber hover:bg-cyber-accent text-black"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Target
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-border/50">
        <CardHeader className="bg-muted/30 py-3 px-6">
          <CardTitle className="text-lg">Target List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Host/IP/Range</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Last Scan</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {targets.length > 0 ? (
                targets.map(target => (
                  <TableRow key={target.id}>
                    <TableCell className="font-medium">{target.name}</TableCell>
                    <TableCell>{target.host}</TableCell>
                    <TableCell>
                      <span className="capitalize">{target.type}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {target.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="bg-muted px-2 py-0.5 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {target.lastScan ? target.lastScan : 'Never scanned'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Configure">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-cyber-error hover:text-cyber-error/80 hover:bg-cyber-error/10" 
                        title="Delete"
                        onClick={() => handleDeleteTarget(target.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No targets added yet. Add a target to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TargetManager;
