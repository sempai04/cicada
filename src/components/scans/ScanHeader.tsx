
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ScanHeaderProps {
  name: string;
  date: string;
  onBack: () => void;
}

const ScanHeader: React.FC<ScanHeaderProps> = ({ name, date, onBack }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center space-y-4 sm:space-y-0">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-muted-foreground">Scan results from {date}</p>
        </div>
      </div>
    </div>
  );
};

export default ScanHeader;
