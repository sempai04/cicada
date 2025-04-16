
import React from 'react';
import Sidebar from './Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-cyber-darker">
      <Sidebar />
      <ScrollArea className="flex-1 h-screen">
        <main className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </ScrollArea>
    </div>
  );
};

export default AppShell;
