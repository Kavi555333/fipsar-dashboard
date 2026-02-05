// 'use client';
// import { useState } from 'react';

// export default function Sidebar() {
//   const [open, setOpen] = useState(true);

//   return (
//     <aside className={`bg-white border-r transition-all ${open ? 'w-64 p-4' : 'w-10 p-2'}`}>
//       <div className="flex items-center gap-2 cursor-pointer mb-4" onClick={() => setOpen(!open)}>
//         <span className={`transition-transform ${open ? 'rotate-90' : ''}`}>&gt;</span>
//         {open && <h2 className="font-semibold"> Filters </h2>}
//       </div>
//       {open && ['Brand','Indication','Product','Channel','Category','Geography'].map(f => (
//         <div key={f} className="mb-4">
//           <p className="text-sm mb-1">{f}</p>
//           <div className="h-2 bg-gray-200 rounded">
//             <div className="h-2 w-1/2 bg-teal-500 rounded"></div>
//           </div>
//         </div>
//       ))}
//     </aside>
//   );
// } 




// 'use client';

// import { useState } from 'react';
// import { QlikEmbed } from '@qlik/embed-react';

// const APP_ID = 'f310dfba-704d-4c21-ae47-4865725ee67e';

// // 🔑 Qlik Selection (List Box) Object IDs
// const SELECTION_OBJECTS = [
//   { label: 'Brand', objectId: 'jprPL' },
//   { label: 'Product', objectId: 'jLkTWDj' },
//   { label: 'Channel', objectId: 'cwjgmpB' },
//   { label: 'Geography', objectId: 'gLjUmd' },
// ];

// export default function Sidebar() {
//   const [open, setOpen] = useState(true);

//   return (
//     <aside
//       className={`bg-white border-r transition-all duration-300
//         ${open ? 'w-64 p-4' : 'w-10 p-2'}
//       `}
//     >
//       {/* Toggle */}
//       <div
//         className="flex items-center gap-2 cursor-pointer mb-4"
//         onClick={() => setOpen(!open)}
//       >
//         <span className={`transition-transform ${open ? 'rotate-90' : ''}`}>
//           &gt;
//         </span>
//         {open && <h2 className="font-semibold">Filters</h2>}
//       </div>

//       {/* Qlik Filters */}
//       {open &&
//         SELECTION_OBJECTS.map(f => (
//           <div key={f.objectId} className="mb-6">
//             <p className="text-sm font-medium mb-2">{f.label}</p>

//             <div className="h-[200px] border rounded-md overflow-hidden">
//               <QlikEmbed
//                 ui="analytics/chart"
//                 appId={APP_ID}
//                 objectId={f.objectId}
//               />
//             </div>
//           </div>
//         ))}
//     </aside>
//   );
// } 




'use client';

import { useState } from 'react';
import { QlikEmbed } from '@qlik/embed-react';

type FilterConfig = {
  label: string;
  objectId: string;
};

const APP_ID = 'f310dfba-704d-4c21-ae47-4865725ee67e';

const FILTERS: FilterConfig[] = [
  { label: 'Year', objectId: 'jprPL' },
  { label: 'Month Year', objectId: 'jLkTWDj' },
  { label: 'Quarter Year', objectId: 'cwjgmpB' },
  { label: 'Department Name', objectId: 'gLjUmd' },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleFilter = (label: string) => {
    setExpanded(prev => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

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
          const isExpanded = expanded[filter.label];

          return (
            <div key={filter.label} className="mb-4 border rounded-md">
              {/* Header */}
              <div
                className="flex items-center justify-between px-3 py-2 cursor-pointer bg-gray-50 hover:bg-gray-100"
                onClick={() => toggleFilter(filter.label)}
              >
                <span className="text-sm font-medium">
                  {filter.label}
                </span>
                <span
                  className={`transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                >
                  ⌄
                </span>
              </div>

              {/* Content */}
              {isExpanded && (
                <div className="p-2 h-[250px]">
                  <QlikEmbed
                    ui="analytics/chart"
                    appId={APP_ID}
                    objectId={filter.objectId}
                  />
                </div>
              )}
            </div>
          );
        })}
    </aside>
  );
}

