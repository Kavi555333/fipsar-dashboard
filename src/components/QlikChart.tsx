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
        appId={appId}
        objectId={objectId}
      />
    </div>
  )
}