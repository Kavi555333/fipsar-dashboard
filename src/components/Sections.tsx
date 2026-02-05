// 'use client';
// import { useEffect, useState } from 'react';
// import { useHeaderStore } from './store';


// import { QlikEmbed, QlikEmbedConfig } from '@qlik/embed-react'; 

// const hostConfig = {
//   host: "https://w9mj1mv1plu5dod.in.qlikcloud.com",
//   webIntegrationId: "Cf3kmADhA9mXI9i2gNJiAqMdtir7Y8ev",
// };



// export default function Sections() {
//   const { activePageTab } = useHeaderStore();
//   const [sections, setSections] = useState<any[]>([]);

//   useEffect(() => {
//     fetch('/sections.csv')
//       .then(r => r.text())
//       .then(t => {
//         const rows = t.split('\n').slice(1).filter(Boolean);
//         const parsed = rows.map(r => {
//           const [pageTabId,_,label,charts] = r.split(',');
//           return { pageTabId, label, charts: Number(charts) };
//         });
//         setSections(parsed);
//       });
//   }, []);

//   return (
//     <>
//                 <QlikEmbedConfig.Provider value={hostConfig}>
//                   <div style={{ height: '300px', width: '100%' }}>
//                     <QlikEmbed
//                       ui="analytics/chart"
//                       appId="f310dfba-704d-4c21-ae47-4865725ee67e"
//                       objectId="kfu"
//                       style={{ height: '300px', width: '100%' }}
//                     />
//                   </div>
                 
//                  </QlikEmbedConfig.Provider>

//       {sections.filter(s => s.pageTabId === activePageTab).map((s,i) => (
//         <div key={i} className="bg-white rounded-lg shadow p-4 mb-6">
//           <h3 className="font-semibold mb-4">{s.label}</h3>
//           <div className={`grid grid-cols-${s.charts} gap-4`}>
//             {Array.from({ length: s.charts }).map((_,i) => (
//               <div key={i} className="h-40 bg-gray-200 flex items-center justify-center">
//                 Chart {i+1}
//               </div>
//             ))}

//           </div>
//         </div>
//       ))}
//     </>
//   );
// } 



// 'use client';

// import { useEffect, useState } from 'react';
// import { QlikEmbed } from '@qlik/embed-react';
// import { useHeaderStore } from './store';

// type Section = {
//   pageTabId: string;
//   label: string;
//   charts: number;
// };

// const APP_ID = 'f310dfba-704d-4c21-ae47-4865725ee67e';

// // 🔒 Qlik Object IDs (configured here, NOT in CSV)
// const QLIK_OBJECT_IDS = {
//   chart1: 'RPYmq',
//   chart2: 'gNXFhm',  
//   // replace when needed
// };

// export default function Sections() {
//   const { activePageTab } = useHeaderStore();
//   const [sections, setSections] = useState<Section[]>([]);

//   useEffect(() => {
//     fetch('/sections.csv')
//       .then(res => res.text())
//       .then(text => {
//         const rows = text.split('\n').slice(1).filter(Boolean);

//         const parsed: Section[] = rows.map(row => {
//           const [pageTabId, , label, charts] = row.split(',');

//           return {
//             pageTabId,
//             label,
//             charts: Number(charts),
//           };
//         });

//         setSections(parsed);
//       });
//   }, []);

//   return (
//     <>
//       {sections
//         .filter(section => section.pageTabId === activePageTab)
//         .map((section, index) => (
//           <div
//             key={index}
//             className="bg-gray rounded-lg shadow p-4 mb-6"
//           >
//             {/* Section Title */}
//             <h3 className="font-semibold mb-4">
//               {section.label}
//             </h3>

//             {/* Charts Grid */}
//             <div className={`grid grid-cols-${section.charts} gap-4`}>
//               {/* Chart 1 → REAL QLIK OBJECT */}
//               <div className="h-[300px] bg-gray-200 flex items-center justify-center">
//                 <QlikEmbed
//                   ui="analytics/chart"
//                   appId={APP_ID}
//                   objectId={QLIK_OBJECT_IDS.chart1}
//                 />
//               </div>

//               <br/>

              

//               {/* Chart 2 → Placeholder (if exists) */}
//               {section.charts > 1 && (
//                 <div className="h-[300px] bg-gray-200 flex items-center justify-center mx-2">
//                   <QlikEmbed
//                     ui="analytics/chart"
//                     appId={APP_ID}
//                     objectId={QLIK_OBJECT_IDS.chart2}
//                 />
//                 </div>
//               )}
//             </div>
//           </div>
//         ))} 


       

//     </>
//   );
// }


// 

'use client';

import { useEffect, useState } from 'react';
import { QlikEmbed } from '@qlik/embed-react';
import { useHeaderStore } from './store';

type Section = {
  pageTabId: string;
  label: string;
  charts: number;
  objectId1: string;
  objectId2?: string;
};

const APP_ID = process.env.NEXT_PUBLIC_QLIK_APP_ID!;

export default function Sections() {
  const { activePageTab } = useHeaderStore();
  const [sections, setSections] = useState<Section[]>([]);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch('/sections.csv')
      .then(res => res.text())
      .then(text => {
        const rows = text.split('\n').slice(1).filter(Boolean);

        const parsed: Section[] = rows.map(row => {
          const [
            pageTabId,
            ,
            label,
            charts,
            objectId1,
            objectId2,
          ] = row.split(',');

          return {
            pageTabId: pageTabId.trim(),
            label: label.trim(),
            charts: Number(charts),
            objectId1: objectId1?.trim(),
            objectId2: objectId2?.trim(),
          };
        });

        setSections(parsed);
      });
  }, []);

  const toggleSection = (sectionKey: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  return (
    <>
      {sections
        .filter(section => section.pageTabId === activePageTab)
        .map((section, index) => {
          const sectionKey = `${section.pageTabId}-${section.label}`;
          const isCollapsed = collapsedSections[sectionKey];

          return (
            <div
              key={sectionKey}
              className="bg-white rounded-lg shadow p-4 mb-6"
            >
              {/* Section Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-base">
                  {section.label}
                </h3>

                {/* Toggle Button */}
                <button
                  onClick={() => toggleSection(sectionKey)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                    ${isCollapsed ? 'bg-gray-300' : 'bg-blue-600'}
                  `}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                      ${isCollapsed ? 'translate-x-1' : 'translate-x-6'}
                    `}
                  />
                </button>
              </div>

              {/* Charts Grid (only when toggle ON) */}
              {!isCollapsed && (
                <div className={`grid grid-cols-${section.charts} gap-6`}>
                  {/* Chart 1 */}
                  {section.objectId1 && (
                    <div className="h-[300px] bg-gray-50 border rounded-md p-2">
                      <QlikEmbed
                        ui="analytics/chart"
                        appId={APP_ID}
                        objectId={section.objectId1}
                      />
                    </div>
                  )}

                  {/* Chart 2 (optional) */}
                  {section.charts > 1 && section.objectId2 && (
                    <div className="h-[300px] bg-gray-50 border rounded-md p-2">
                      <QlikEmbed
                        ui="analytics/chart"
                        appId={APP_ID}
                        objectId={section.objectId2}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
    </>
  );
}
