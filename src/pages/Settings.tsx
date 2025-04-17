import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const saveSettings = () => {
    toast.success("Settings saved successfully");
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure Cicada scanner options and preferences</p>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full sm:w-auto sm:inline-grid grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="scanning">Scanning</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6 space-y-6">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="app-name">Application Name</Label>
                  <Input id="app-name" defaultValue="Cicada" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-target">Default Target</Label>
                  <Input id="default-target" defaultValue="localhost" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Interface Options</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Use dark theme for the interface</p>
                  </div>
                  <Switch id="dark-mode" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-refresh">Auto Refresh</Label>
                    <p className="text-sm text-muted-foreground">Automatically refresh scan results</p>
                  </div>
                  <Switch id="auto-refresh" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-advanced">Show Advanced Options</Label>
                    <p className="text-sm text-muted-foreground">Display additional settings and controls</p>
                  </div>
                  <Switch id="show-advanced" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="admin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="admin@example.com" />
              </div>
              
              <Button 
                className="bg-cyber hover:bg-cyber-accent text-black mt-2"
                onClick={saveSettings}
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scanning" className="mt-6 space-y-6">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Scan Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Default Scan Options</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="os-detection">OS Detection</Label>
                    <p className="text-sm text-muted-foreground">Enable operating system detection</p>
                  </div>
                  <Switch id="os-detection" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="service-detection">Service Detection</Label>
                    <p className="text-sm text-muted-foreground">Identify services running on open ports</p>
                  </div>
                  <Switch id="service-detection" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="aggressive-scan">Aggressive Scan</Label>
                    <p className="text-sm text-muted-foreground">Use more intensive scanning techniques</p>
                  </div>
                  <Switch id="aggressive-scan" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="fast-scan">Fast Scan Mode</Label>
                    <p className="text-sm text-muted-foreground">Optimize for speed over thoroughness</p>
                  </div>
                  <Switch id="fast-scan" />
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="default-port-range">Default Port Range</Label>
                  <Input id="default-port-range" defaultValue="1-1000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scan-timeout">Scan Timeout (seconds)</Label>
                  <Input id="scan-timeout" type="number" defaultValue="300" />
                </div>
              </div>
              
              <Button 
                className="bg-cyber hover:bg-cyber-accent text-black mt-2"
                onClick={saveSettings}
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Alert Preferences</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="critical-alerts">Critical Vulnerability Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified about critical vulnerabilities</p>
                  </div>
                  <Switch id="critical-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="scan-completion">Scan Completion</Label>
                    <p className="text-sm text-muted-foreground">Notification when scans finish</p>
                  </div>
                  <Switch id="scan-completion" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="report-generation">Report Generation</Label>
                    <p className="text-sm text-muted-foreground">Notification when reports are ready</p>
                  </div>
                  <Switch id="report-generation" defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Notification Methods</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="email-notifications">Email Address</Label>
                  <Input id="email-notifications" type="email" defaultValue="admin@example.com" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="browser-notifications">Browser Notifications</Label>
                    <p className="text-sm text-muted-foreground">Show notifications in browser</p>
                  </div>
                  <Switch id="browser-notifications" defaultChecked />
                </div>
              </div>
              
              <Button 
                className="bg-cyber hover:bg-cyber-accent text-black mt-2"
                onClick={saveSettings}
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="mt-6 space-y-6">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Performance</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="max-concurrent-scans">Max Concurrent Scans</Label>
                  <Input id="max-concurrent-scans" type="number" defaultValue="3" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="thread-count">Thread Count</Label>
                  <Input id="thread-count" type="number" defaultValue="10" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Database</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-update-vuln-db">Auto-Update Vulnerability Database</Label>
                    <p className="text-sm text-muted-foreground">Keep vulnerability definitions up to date</p>
                  </div>
                  <Switch id="auto-update-vuln-db" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="db-path">Database Path</Label>
                  <Input id="db-path" defaultValue="/var/lib/veilscanner/db" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Danger Zone</h3>
                
                <div className="p-4 border border-cyber-error/30 rounded-md">
                  <h4 className="text-sm font-medium text-cyber-error mb-2">Reset Application</h4>
                  <p className="text-sm text-muted-foreground mb-4">This will reset all settings to default and delete all scan data.</p>
                  <Button variant="destructive">
                    Reset Application
                  </Button>
                </div>
              </div>
              
              <Button 
                className="bg-cyber hover:bg-cyber-accent text-black mt-2"
                onClick={saveSettings}
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
