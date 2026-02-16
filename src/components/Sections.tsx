'use client'

import { useEffect, useState } from 'react'
import { useHeaderStore } from './store'
import QlikObjectWithMenu from '../components/QlikChartApi'

type ChartConfig = {
  chartObjectId: string
  tableObjectId: string
}

type Section = {
  pageTabId: string
  sectionId: string
  sectionLabel: string
  charts: ChartConfig[]
}

const APP_ID = process.env.NEXT_PUBLIC_QLIK_APP_ID!

export default function Sections() {
  const { activePageTab } = useHeaderStore()
  const [sections, setSections] = useState<Section[]>([])
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetch('/sections.csv')
      .then(r => r.text())
      .then(text => {
        const rows = text.split('\n').slice(1).filter(Boolean)

        const parsedSections: Section[] = rows.map(row => {
          const [
            pageTabId,
            sectionId,
            sectionLabel,
            chart,
            chart1,
            table1,
            chart2,
            table2,
          ] = row.split(',')

          const charts: ChartConfig[] = []

          if (chart1 && table1) {
            charts.push({
              chartObjectId: chart1.trim(),
              tableObjectId: table1.trim(),
            })
          }

          if (chart2 && table2) {
            charts.push({
              chartObjectId: chart2.trim(),
              tableObjectId: table2.trim(),
            })
          }

          return {
            pageTabId: pageTabId.trim(),
            sectionId: sectionId.trim(),
            sectionLabel: sectionLabel.trim(),
            charts,
          }
        })

        setSections(parsedSections)
      })
      .catch(err => console.error('Failed to load sections.csv:', err))
  }, [])

  const toggleSection = (sectionKey: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }))
  }

  return (
    <>
      {sections
        .filter(section => section.pageTabId === activePageTab)
        .map(section => {
          const sectionKey = `${section.pageTabId}-${section.sectionId}`
          const isCollapsed = collapsedSections[sectionKey]

          return (
            <div
              key={sectionKey}
              className="bg-white rounded-lg shadow p-4 mb-6"
            >
              {/* Section Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-base">
                  {section.sectionLabel}
                </h3>

                <button
                  onClick={() => toggleSection(sectionKey)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                    ${isCollapsed ? 'bg-gray-300' : 'bg-brand-green'}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                      ${isCollapsed ? 'translate-x-1' : 'translate-x-6'}`}
                  />
                </button>
              </div>

              {/* Charts Grid */}
              {!isCollapsed && section.charts.length > 0 && (
                <div
                  className="grid gap-6"
                  style={{
                    gridTemplateColumns: `repeat(${section.charts.length}, minmax(0, 1fr))`,
                  }}
                >
                  {section.charts.map((chart, index) => (
                    <QlikObjectWithMenu
                      key={index}
                      appId={APP_ID}
                      chartObjectId={chart.chartObjectId}
                      tableObjectId={chart.tableObjectId}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        })}
    </>
  )
}
