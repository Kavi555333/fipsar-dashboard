'use client';

import { QlikEmbed } from '@qlik/embed-react';

const APP_ID = process.env.NEXT_PUBLIC_QLIK_APP_ID!;

export default function ClearSelectionsButton() {
  return (
    <div className="flex justify-end">

      <QlikEmbed
        ui="analytics/clear-selections"
        appId={APP_ID}
      />

    </div>
  );
}
