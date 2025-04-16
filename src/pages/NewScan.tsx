
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ScanForm from '@/components/scans/ScanForm';

const NewScan: React.FC = () => {
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate('/scans');
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Button variant="ghost" onClick={goBack} className="mr-2 p-0 h-8 w-8">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">New Scan</h1>
          <p className="text-muted-foreground">Configure your scan parameters</p>
        </div>
      </div>
      
      <Card className="border border-border/50">
        <CardHeader className="bg-muted/30 py-3 px-6">
          <CardTitle className="text-lg">Scan Configuration</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ScanForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewScan;
