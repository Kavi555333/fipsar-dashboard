'use client'
import dynamic from 'next/dynamic'

const QlikEmbed = dynamic(
  () => import('@qlik/embed-react').then(mod => mod.QlikEmbed),
  { ssr: false }
)

type QlikChartProps = {
  appId: string
  objectId: string
  height?: string   // optional – can make it customizable later
  theme?: 'breeze' | 'dark'  // optional – for future theme support
}

export default function QlikChart({ appId, objectId, height = '100%', theme }: QlikChartProps) {
  return (
    <div style={{ height, width: '100%' }}>
      <QlikEmbed
        ui="analytics/chart"
        // ui="classic/chart"
        appId={appId}
        objectId={objectId}
        // options={{ showInteractionMenu: true }}
      

      // // Interaction options
      //   showContextMenu={true}
        
      //   // Additional props you can use
      //   theme="horizon" // or "dark"
      //   language="en-US"
        
      //   // Event handlers
      //   onObjectChange={(event: any) => {
      //     console.log('Object changed:', event);
      //   }}
      //   onSelectionChange={(event: any) => {
      //     console.log('Selection changed:', event);
      //   }}

      //Try 2 Method
    //   interactions={{
    //   select: true,
    //   selectionsBarMode: 'show',
    //   contextmenu: true
    // }}

    //Try 3 Method
    // options={{
    //   showInteractionMenu: true,
    //   contextMenu: true
    // }}
          />
     
    </div>
  )
}