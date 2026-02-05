'use client';

import { QlikEmbedConfig } from '@qlik/embed-react';



const hostConfig = {
  host: process.env.NEXT_PUBLIC_QLIK_TENANT!,
  webIntegrationId: process.env.NEXT_PUBLIC_QLIK_WEB_INTEGRATION_ID!,
};


export default function QlikProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <QlikEmbedConfig.Provider value={hostConfig}>
      {children}
    </QlikEmbedConfig.Provider>
  );
}
