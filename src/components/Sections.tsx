'use client'

import { useEffect, useState } from 'react'
import { useHeaderStore } from './store'
import QlikChart from '../components/QlikChart'   // ← import the wrapper

type Section = {
  pageTabId: string
  label: string
  charts: number
  objectId1: string
  objectId2?: string
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
        setSections(
          rows.map(r => {
            const [pageTabId, , label, charts, obj1, obj2] = r.split(',')
            return {
              pageTabId: pageTabId.trim(),
              label: label.trim(),
              charts: Number(charts),
              objectId1: obj1?.trim(),
              objectId2: obj2?.trim(),
            }
          })
        )
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
          const sectionKey = `${section.pageTabId}-${section.label}`
          const isCollapsed = collapsedSections[sectionKey]

          return (
            <div
              key={sectionKey}
              className="bg-white rounded-lg shadow p-4 mb-6"
            >
              {/* Section Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-base">{section.label}</h3>

                {/* Toggle Button */}
                <button
                  onClick={() => toggleSection(sectionKey)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                    ${isCollapsed ? 'bg-gray-300' : 'bg-blue-600'}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                      ${isCollapsed ? 'translate-x-1' : 'translate-x-6'}`}
                  />
                </button>
              </div>

              {/* Charts Grid (only when expanded) */}
              {!isCollapsed && (
                <div className={`grid grid-cols-${section.charts} gap-6`}>
                  {/* Chart 1 */}
                  {section.objectId1 && (
                    <div className="h-[300px] bg-gray-50 border rounded-md p-2">
                      <QlikChart
                        appId={APP_ID}
                        objectId={section.objectId1}
                         theme="breeze"
                      />
                    </div>
                  )}

                  {/* Chart 2 (optional) */}
                  {section.charts > 1 && section.objectId2 && (
                    <div className="h-[300px] bg-gray-50 border rounded-md p-2">
                      <QlikChart
                        appId={APP_ID}
                        objectId={section.objectId2}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
    </>
  )
}