'use client';

import { useEffect, useState } from 'react';
import { useHeaderStore } from './store';

type PageTab = {
  id: string;
  label: string;
  headerId: string;
  order: number;
};

export default function PageTabs() {
  const { activeHeader, activePageTab, setPageTab } = useHeaderStore();
  const [tabs, setTabs] = useState<PageTab[]>([]);

  useEffect(() => {
    fetch('/page-tabs.csv')
      .then((r) => r.text())
      .then((t) => {
        const rows = t.split('\n').slice(1).filter(Boolean);

        const parsed = rows
          .map((r) => {
            const [id, label, headerId, order] = r.split(',');
            return {
              id: id.trim(),
              label: label.trim(),
              headerId: headerId.trim(),
              order: Number(order),
            };
          })
          .filter((t) => t.headerId === activeHeader)
          .sort((a, b) => a.order - b.order);

        setTabs(parsed);

        // set default page tab ONLY if none selected
        if (parsed.length && !parsed.find((t) => t.id === activePageTab)) {
          setPageTab(parsed[0].id);
        }
      });
  }, [activeHeader]);

  return (
    <div className="flex gap-6 border-b mb-6">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setPageTab(t.id)}
          className={
            activePageTab === t.id
              ? 'border-b-2 border-blue-600 pb-2 font-semibold'
              : 'pb-2 text-gray-500'
          }
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}