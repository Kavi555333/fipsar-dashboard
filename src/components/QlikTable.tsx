// 

// 'use client';

// import { useEffect, useRef } from 'react';
// import { qlikEmbed } from '../lib/qlik';

// type Props = {
//   objectId: string;
//   height?: number;
// };

// export default function QlikTable({ objectId, height = 400 }: Props) {
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!ref.current) return;

//     const element = ref.current;

    

//     // const rendered = qlikEmbed.render({
//     //   element,
//     //   id: objectId,
//     // }); 


//     let rendered: Awaited<ReturnType<typeof qlikEmbed.render>> | null = null;

//     qlikEmbed.render({
//       element,
//       id: objectId,
//     }).then((result) => {
//       rendered = result;
//     });

//     return () => {
//       rendered?.destroy?.();
//       element.innerHTML = '';
//     };
//   }, [objectId]);

//   return (
//     <div
//       ref={ref}
//       className="w-full rounded border bg-white"
//       style={{ height }}
//     />
//   );
// }


// 'use client';

// import { useEffect, useRef } from 'react';
// import { qlikEmbed } from '../lib/qlik';

// type Props = {
//   objectId: string;
//   height?: number;
// };

// export default function QlikTable({ objectId, height = 400 }: Props) {
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!ref.current) return;

//     const element = ref.current;

//     const rendered = qlikEmbed.render({
//       element,
//       id: objectId,
//     });

//     return () => {
//       rendered?.destroy?.();
//       element.innerHTML = '';
//     };
//   }, [objectId]);

//   return (
//     <div
//       ref={ref}
//       className="w-full rounded border bg-white"
//       style={{ height }}
//     />
//   );
// }
