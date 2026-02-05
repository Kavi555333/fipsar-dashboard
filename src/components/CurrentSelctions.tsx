'use client';

import { QlikEmbed } from '@qlik/embed-react';

const APP_ID = process.env.NEXT_PUBLIC_QLIK_APP_ID!;

export default function CurrentSelections() {
  return (
    <div className="bg-white border-b px-4 py-2 shadow-sm">
      <QlikEmbed
        ui="analytics/selections"
        appId={APP_ID}
      />
    </div>
  );
}
