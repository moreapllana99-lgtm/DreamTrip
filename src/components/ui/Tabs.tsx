import { cn } from '@/lib/utils';
import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onChange: (id: string) => void;
  className?: string;
}

export default function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className={cn('flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          onMouseEnter={() => setHovered(tab.id)}
          onMouseLeave={() => setHovered(null)}
          className={cn(
            'relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
            activeTab === tab.id
              ? 'text-gray-900 dark:text-white bg-white dark:bg-gray-700 shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          )}
        >
          {tab.icon && <span>{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
