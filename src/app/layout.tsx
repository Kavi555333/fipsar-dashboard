// import './globals.css';
// import Header from '../components/Header';

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html>
//       <body className="bg-gray-100 min-h-screen">
//         <Header />
//         {children}
//       </body>
//     </html>
//   );
// } 







import Header from '../components/Header';
import './globals.css';
import QlikProvider from '../providers/QlikProvider';
// import SelectionsBar from '../components/SelctionsBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <QlikProvider>
          <Header />
          {/* <SelectionsBar/> */}
          {children}
        </QlikProvider>
      </body>
    </html>
  );
}

