
'use client'

import { useState } from 'react'
import QlikFilterChart from './QlikChart'   // ← import the wrapper

type FilterConfig = {
  label: string
  objectId: string
}

const APP_ID = 'f310dfba-704d-4c21-ae47-4865725ee67e'

const FILTERS: FilterConfig[] = [
  { label: 'Year', objectId: 'jprPL' },
  { label: 'Month Year', objectId: 'jLkTWDj' },
  { label: 'Quarter Year', objectId: 'cwjgmpB' },
  { label: 'Department Name', objectId: 'gLjUmd' },
]

export default function Sidebar() {
  const [open, setOpen] = useState(true)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const toggleFilter = (label: string) => {
    setExpanded(prev => ({
      ...prev,
      [label]: !prev[label] || false,
    }))
  }

  return (
    <aside
      className={`bg-white border-r transition-all ${
        open ? 'w-64 p-4' : 'w-10 p-2'
      }`}
    >
      {/* Sidebar Toggle */}
      <div
        className="flex items-center gap-2 cursor-pointer mb-4"
        onClick={() => setOpen(!open)}
      >
        <span className={`transition-transform ${open ? 'rotate-90' : ''}`}>
          &gt;
        </span>
        {open && <h2 className="font-semibold">Filters</h2>}
      </div>

      {/* Filters */}
      {open &&
        FILTERS.map(filter => {
          const isExpanded = expanded[filter.label]

          return (
            <div key={filter.label} className="mb-4 border rounded-md">
              {/* Header */}
              <div
                className="flex items-center justify-between px-3 py-2 cursor-pointer bg-gray-50 hover:bg-gray-100"
                onClick={() => toggleFilter(filter.label)}
              >
                <span className="text-sm font-medium">{filter.label}</span>
                <span
                  className={`transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                >
                  ⌄
                </span>
              </div>

              {/* Content – only render chart when expanded */}
              {isExpanded && (
                <div className="p-2 h-[250px]">
                  <QlikFilterChart
                    appId={APP_ID}
                    objectId={filter.objectId}
                  />
                </div>
              )}
            </div>
          )
        })}
    </aside>
  )
}