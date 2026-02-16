// // 'use client'; // For Next.js 13+

// // import React, { useEffect, useRef, useState } from 'react';

// // interface QlikObjectProps {
// //   appId: string;
// //   objectId: string;
// //   height?: string;
// // }

// // const QlikObjectWithMenu: React.FC<QlikObjectProps> = ({ 
// //   appId, 
// //   objectId, 
// //   height = '500px' 
// // }) => {
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const config = {
// //       host: 'https://w9mj1mv1plu5dod.in.qlikcloud.com', // Replace with your server
// //       prefix: '/',
// //       port: 443,
// //       isSecure: true
// //     };

// //     const baseUrl = `${config.isSecure ? 'https://' : 'http://'}${config.host}${config.port ? ':' + config.port : ''}${config.prefix}resources`;

// //     // Load require.js if not already loaded
// //     const loadRequireJs = () => {
// //       return new Promise<void>((resolve, reject) => {
// //         if ((window as any).require) {
// //           resolve();
// //           return;
// //         }

// //         const script = document.createElement('script');
// //         script.src = `${baseUrl}/assets/external/requirejs/require.js`;
// //         script.onload = () => resolve();
// //         script.onerror = () => reject(new Error('Failed to load require.js'));
// //         document.body.appendChild(script);
// //       });
// //     };

// //     const initQlik = async () => {
// //       try {
// //         await loadRequireJs();

// //         (window as any).requirejs.config({ baseUrl });

// //         (window as any).require(['js/qlik'], (qlik: any) => {
// //           const app = qlik.openApp(appId, config);

// //           // This method includes ALL interaction menus by default
// //           app.getObject(containerRef.current, objectId).then(() => {
// //             setIsLoading(false);
// //             console.log('✅ Qlik object loaded with full interaction menu');
// //           }).catch((err: Error) => {
// //             setError(err.message);
// //             setIsLoading(false);
// //           });
// //         });
// //       } catch (err) {
// //         setError(err instanceof Error ? err.message : 'Failed to load Qlik');
// //         setIsLoading(false);
// //       }
// //     };

// //     initQlik();

// //     return () => {
// //       // Cleanup if needed
// //     };
// //   }, [appId, objectId]);

// //   if (error) {
// //     return <div style={{ color: 'red' }}>Error: {error}</div>;
// //   }

// //   return (
// //     <div style={{ position: 'relative', height, width: '100%' }}>
// //       {isLoading && (
// //         <div style={{ 
// //           position: 'absolute', 
// //           top: '50%', 
// //           left: '50%', 
// //           transform: 'translate(-50%, -50%)' 
// //         }}>
// //           Loading Qlik object...
// //         </div>
// //       )}
// //       <div 
// //         ref={containerRef} 
// //         style={{ height: '100%', width: '100%' }}
// //       />
// //     </div>
// //   );
// // };

// // export default QlikObjectWithMenu;


// 'use client'; // For Next.js 13+

// import React, { useEffect, useRef, useState } from 'react';

// // TypeScript interfaces for Qlik types
// interface QlikConfig {
//   host: string;
//   prefix: string;
//   port: number;
//   isSecure: boolean;
// }

// interface QlikApp {
//   getObject: (element: HTMLElement | null, objectId: string) => Promise<void>;
//   field: (fieldName: string) => any;
//   visualization: {
//     get: (objectId: string) => Promise<any>;
//   };
// }

// interface QlikAPI {
//   openApp: (appId: string, config: QlikConfig) => QlikApp;
// }

// // Extend Window interface for Qlik globals
// declare global {
//   interface Window {
//     require: any;
//     requirejs: any;
//   }
// }

// interface QlikObjectProps {
//   appId: string;
//   objectId: string;
//   height?: string;
//   width?: string;
// }

// const QlikObjectWithMenu: React.FC<QlikObjectProps> = ({ 
//   appId, 
//   objectId, 
//   height = '500px',
//   width = '100%'
// }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const config: QlikConfig = {
//       host: 'https://w9mj1mv1plu5dod.in.qlikcloud.com',
//       prefix: '/',
//       port: 443,
//       isSecure: true
//     };

//     const baseUrl = `${config.isSecure ? 'https://' : 'http://'}${config.host}${config.port ? ':' + config.port : ''}${config.prefix}resources`;

//     // Load require.js if not already loaded
//     const loadRequireJs = (): Promise<void> => {
//       return new Promise<void>((resolve, reject) => {
//         if (window.require) {
//           resolve();
//           return;
//         }

//         const script = document.createElement('script');
//         script.src = `${baseUrl}/assets/external/requirejs/require.js`;
//         script.onload = () => resolve();
//         script.onerror = () => reject(new Error('Failed to load require.js'));
//         document.body.appendChild(script);
//       });
//     };

//     const initQlik = async (): Promise<void> => {
//       try {
//         await loadRequireJs();

//         // Configure require.js
//         if (window.requirejs) {
//           window.requirejs.config({ baseUrl });
//         } else if (window.require && window.require.config) {
//           window.require.config({ baseUrl });
//         }

//         // Load Qlik Sense API
//         window.require(['js/qlik'], (qlik: QlikAPI) => {
//           const app: QlikApp = qlik.openApp(appId, config);

//           // Load object with full interaction menu
//           app.getObject(containerRef.current, objectId)
//             .then(() => {
//               setIsLoading(false);
//               console.log('✅ Qlik object loaded with full interaction menu');
//             })
//             .catch((err: Error) => {
//               console.error('❌ Error loading Qlik object:', err);
//               setError(err.message);
//               setIsLoading(false);
//             });
//         });
//       } catch (err) {
//         const errorMessage = err instanceof Error ? err.message : 'Failed to load Qlik';
//         console.error('❌ Qlik initialization error:', errorMessage);
//         setError(errorMessage);
//         setIsLoading(false);
//       }
//     };

//     initQlik();

//     // Cleanup function
//     return () => {
//       // Optional: Add cleanup logic if needed
//     };
//   }, [appId, objectId]);

//   if (error) {
//     return (
//       <div style={{ 
//         color: '#ef4444', 
//         padding: '20px', 
//         border: '1px solid #ef4444',
//         borderRadius: '8px',
//         backgroundColor: '#fef2f2'
//       }}>
//         <strong>Error loading Qlik object:</strong> {error}
//       </div>
//     );
//   }

//   return (
//     <div style={{ position: 'relative', height, width }}>
//       {isLoading && (
//         <div style={{ 
//           position: 'absolute', 
//           top: '50%', 
//           left: '50%', 
//           transform: 'translate(-50%, -50%)',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: '10px'
//         }}>
//           <div style={{
//             width: '40px',
//             height: '40px',
//             border: '4px solid #f3f4f6',
//             borderTop: '4px solid #3b82f6',
//             borderRadius: '50%',
//             animation: 'spin 1s linear infinite'
//           }} />
//           <span style={{ color: '#6b7280', fontSize: '14px' }}>
//             Loading Qlik object...
//           </span>
//         </div>
//       )}
//       <div 
//         ref={containerRef} 
//         style={{ height: '100%', width: '100%' }}
//       />
      
//       {/* Add CSS for spinner animation */}
//       <style > {`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default QlikObjectWithMenu;



'use client'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { MoreVertical, Download, Table, BarChart3 } from 'lucide-react'
const QlikEmbed = dynamic(
  () => import('@qlik/embed-react').then(mod => mod.QlikEmbed),
  { ssr: false }
)

type Props = {
  appId: string
  chartObjectId: string
  tableObjectId: string
  height?: string
  width?: string
}

export default function QlikObjectWithMenu({
  appId,
  chartObjectId,
  tableObjectId,
  height = '300px',
  width = '100%',
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart')
  const containerRef = useRef<HTMLDivElement>(null)

  const currentObjectId =
    viewMode === 'chart'
      ? chartObjectId
      : tableObjectId

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_QLIK_TENANT}/api/v1/apps/${appId}/objects/${currentObjectId}/data/export`,
        {
          headers: {
            'qlik-web-integration-id':
              process.env.NEXT_PUBLIC_QLIK_WEB_INTEGRATION_ID!,
          },
        }
      )

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `${currentObjectId}.csv`
      a.click()

      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download failed:', err)
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative bg-gray-50 border rounded-md p-2"
      style={{ height, width }}
    >
      {/* Top Right Action Button */}
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded hover:bg-gray-200 transition"
        >
          <MoreVertical size={18} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg transition-all animate-in fade-in zoom-in-95">
            <button
              onClick={() => {
                setViewMode(viewMode === 'chart' ? 'table' : 'chart')
                setMenuOpen(false)
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
            >
              {viewMode === 'chart' ? (
                <>
                  <Table size={16} />
                  View Data
                </>
              ) : (
                <>
                  <BarChart3 size={16} />
                  View Chart
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
            >
              <Download size={16} />
              Download CSV
            </button>
          </div>
        )}
      </div>

      {/* Qlik Object Rendering */}
      <QlikEmbed
        ui="analytics/chart"
        appId={appId}
        objectId={currentObjectId}
      />
    </div>
  )
}

