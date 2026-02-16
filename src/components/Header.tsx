'use client';

import { useEffect, useState } from 'react';
import { useHeaderStore } from './store';

type HeaderTab = {
  id: string;
  label: string;
  order: number;
};

export default function HeaderTabs() {
  const { activeHeader, setHeader } = useHeaderStore();
  const [headers, setHeaders] = useState<HeaderTab[]>([]);

  useEffect(() => {
    fetch('/header-tabs.csv')
      .then((r) => r.text())
      .then((t) => {
        const rows = t.split('\n').slice(1).filter(Boolean);

        const parsed = rows
          .map((r) => {
            const [id, label, order] = r.split(',');
            return {
              id: id.trim(),
              label: label.trim(),
              order: Number(order),
            };
          })
          .sort((a, b) => a.order - b.order);

        setHeaders(parsed);
      });
  }, []);

  return (
    <div className="flex gap-8 px-6 bg-brand-green text-white h-16 items-center">
      <h1 className="font-bold text-lg">Medical Analytics</h1>

      <div className="flex gap-6 ml-auto">
        {headers.map((h) => (
          <button
            key={h.id}
            onClick={() => setHeader(h.id)}
            className={`pb-1 ${
              activeHeader === h.id
                ? 'border-b-2 border-white font-semibold'
                : 'hover:opacity-100'
            }`}
          >
            {h.label}
          </button>
        ))}
      </div>
    </div>
  );
}