'use client';
import { useEffect, useState } from 'react';
import { useHeaderStore } from './store';

export default function PageTabs() {
  const { activeHeader, resetPageTab, activePageTab, setPageTab } = useHeaderStore();
  const [tabs, setTabs] = useState<{id:string,label:string}[]>([]);

  useEffect(() => {
    fetch('/page-tabs.csv')
      .then(r => r.text())
      .then(t => {
        const rows = t.split('\n').slice(1).filter(Boolean);
        const parsed = rows.map(r => {
          const [id,label,headerId] = r.split(',');
          return { id, label, headerId };
        }).filter(t => t.headerId === activeHeader);
        setTabs(parsed);
        if (parsed.length) resetPageTab(parsed[0].id);
      });
  }, [activeHeader]);

  return (
    <div className="flex gap-6 border-b mb-6">
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => setPageTab(t.id)}
          className={activePageTab === t.id ? 'border-b-2 border-blue-600 pb-2 font-semibold' : 'pb-2 text-gray-500'}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}