'use client';
import { useEffect, useState } from 'react';
import { useHeaderStore } from './store';

export default function Header() {
  const [tabs, setTabs] = useState<{id:string,label:string}[]>([]);
  const { activeHeader, setHeader } = useHeaderStore();

  useEffect(() => {
    fetch('/header-tabs.csv')
      .then(r => r.text())
      .then(t => {
        const rows = t.split('\n').slice(1).filter(Boolean);
        setTabs(rows.map(r => {
          const [id,label] = r.split(',');
          return { id, label };
        }));
      });
  }, []);

  return (
    <header className="h-16 bg-blue-600 text-white flex items-center justify-between px-6">
      <h1 className="font-semibold">Franchise Analytics</h1>
      <nav className="flex gap-6 text-sm">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setHeader(t.id)}
            className={activeHeader === t.id ? 'border-b-2 border-white pb-1' : 'opacity-80'}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </header>
  );
}