
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import TerminalOutput from '@/components/terminal/TerminalOutput';

// Define the validation schema
const scanFormSchema = z.object({
  targetHost: z.string().min(1, "Target host is required"),
  portRange: z.string().optional(),
  scanName: z.string().min(1, "Scan name is required"),
  scanType: z.enum(["quick", "full", "vuln", "custom"]),
  options: z.object({
    detectOS: z.boolean().default(true),
    skipHostDiscovery: z.boolean().default(false),
    aggressiveScan: z.boolean().default(false),
    scanAllPorts: z.boolean().default(false),
  }),
});

type ScanFormValues = z.infer<typeof scanFormSchema>;

// Default values
const defaultValues: Partial<ScanFormValues> = {
  scanType: "quick",
  options: {
    detectOS: true,
    skipHostDiscovery: false,
    aggressiveScan: false,
    scanAllPorts: false,
  },
};

// Mock scan results for demonstration
const mockScanOutput = [
  "Starting Cicada Scan Engine v1.0.0...",
  "Initializing scan parameters...",
  "Target: $TARGET_HOST",
  "Scan type: $SCAN_TYPE",
  "Port range: $PORT_RANGE",
  "Options: $OPTIONS",
  "Starting host discovery...",
  "Host $TARGET_HOST appears to be up.",
  "Starting port scan...",
  "Scanning ports...",
  "Port 22/tcp open  ssh",
  "Port 80/tcp open  http",
  "Port 443/tcp open  https",
  "Service detection started...",
  "22/tcp   OpenSSH 8.2p1",
  "80/tcp   nginx 1.18.0",
  "443/tcp  nginx 1.18.0 (TLS v1.3)",
  "OS detection attempted...",
  "OS details: Linux 5.4.0",
  "Vulnerability scanning...",
  "Found 3 potential vulnerabilities.",
  "Scan completed in $SCAN_TIME seconds.",
  "Results saved."
];

export function ScanForm() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanOutput, setScanOutput] = useState<string[]>([]);
  
  const form = useForm<ScanFormValues>({
    resolver: zodResolver(scanFormSchema),
    defaultValues,
  });

  function onSubmit(values: ScanFormValues) {
    setIsScanning(true);
    setScanOutput([]);
    
    toast.success("Scan initiated", {
      description: `Starting ${values.scanType} scan on ${values.targetHost}`,
    });
    
    console.log("Scan parameters:", values);
    
    // Simulate the scanning process with the mock data
    let count = 0;
    const options = [];
    if (values.options.detectOS) options.push("OS detection");
    if (values.options.skipHostDiscovery) options.push("Skip host discovery");
    if (values.options.aggressiveScan) options.push("Aggressive mode");
    if (values.options.scanAllPorts) options.push("All ports");
    
    const optionsString = options.length > 0 ? options.join(", ") : "Default";
    
    // Process the mock output with the actual values
    const processedOutput = mockScanOutput.map(line => {
      return line
        .replace('$TARGET_HOST', values.targetHost)
        .replace('$SCAN_TYPE', values.scanType)
        .replace('$PORT_RANGE', values.portRange || 'default (1-1000)')
        .replace('$OPTIONS', optionsString)
        .replace('$SCAN_TIME', Math.floor(Math.random() * 60 + 10).toString());
    });
    
    // Simulate progressive output of scan results
    const interval = setInterval(() => {
      if (count < processedOutput.length) {
        setScanOutput(prev => [...prev, processedOutput[count]]);
        count++;
      } else {
        clearInterval(interval);
        setIsScanning(false);
        
        // Redirect to results after scan completion
        setTimeout(() => {
          navigate('/scans', { state: { scanCompleted: true } });
        }, 2000);
      }
    }, 300);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField
              control={form.control}
              name="scanName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scan Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Network Scan" {...field} />
                  </FormControl>
                  <FormDescription>
                    A descriptive name for this scan
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetHost"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Target Host</FormLabel>
                  <FormControl>
                    <Input placeholder="192.168.1.1 or example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    IP address, hostname, or CIDR notation (192.168.1.0/24)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="portRange"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Port Range</FormLabel>
                  <FormControl>
                    <Input placeholder="1-1000 or 22,80,443" {...field} />
                  </FormControl>
                  <FormDescription>
                    Specify ports to scan (empty for default)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="scanType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scan Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a scan type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="quick">Quick Scan</SelectItem>
                      <SelectItem value="full">Full Scan</SelectItem>
                      <SelectItem value="vuln">Vulnerability Scan</SelectItem>
                      <SelectItem value="custom">Custom Scan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The type of scan to perform
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-4" />

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Advanced Options</h3>
              
              <FormField
                control={form.control}
                name="options.detectOS"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Detect OS</FormLabel>
                      <FormDescription>
                        Attempt to identify operating system
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="options.skipHostDiscovery"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Skip Host Discovery</FormLabel>
                      <FormDescription>
                        Treat all hosts as online
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="options.aggressiveScan"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Aggressive Scan</FormLabel>
                      <FormDescription>
                        Enable more intensive scanning techniques
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="options.scanAllPorts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Scan All Ports</FormLabel>
                      <FormDescription>
                        Scan all 65535 ports (slower)
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {isScanning && (
          <div className="my-6">
            <h3 className="text-sm font-medium mb-2">Scan Progress</h3>
            <TerminalOutput 
              content={scanOutput} 
              className="h-64 overflow-auto" 
              autoScroll={true}
            />
          </div>
        )}

        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-cyber hover:bg-cyber-accent text-black"
            disabled={isScanning}
          >
            {isScanning ? 'Scanning...' : 'Start Scan'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ScanForm;
