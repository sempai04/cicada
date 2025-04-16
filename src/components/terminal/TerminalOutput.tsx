
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface TerminalOutputProps {
  content: string[];
  className?: string;
  autoScroll?: boolean;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ 
  content, 
  className,
  autoScroll = true 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    if (content.length === 0) return;

    const addLines = () => {
      const newVisibleLines = [...visibleLines];
      
      for (let i = visibleLines.length; i < content.length; i++) {
        if (i >= visibleLines.length) {
          newVisibleLines.push(content[i]);
          break;
        }
      }
      
      setVisibleLines(newVisibleLines);
    };

    const interval = setInterval(addLines, 100);
    
    if (visibleLines.length >= content.length) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [content, visibleLines]);

  useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines, autoScroll]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "font-mono p-4 rounded-md bg-cyber-darker text-foreground text-sm leading-relaxed overflow-auto",
        className
      )}
    >
      {visibleLines.map((line, index) => (
        <div key={index} className="terminal-line mb-1">
          {line}
        </div>
      ))}
      <div className="animate-pulse h-4 w-3 bg-cyber inline-block"></div>
    </div>
  );
};

export default TerminalOutput;
