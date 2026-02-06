
import Header from '../components/Header';
import './globals.css';
import dynamic from 'next/dynamic';

const QlikProvider = dynamic(() => import('../providers/QlikProvider'), {
  ssr: false,
});

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <QlikProvider>
          <Header />
          {children}
        </QlikProvider>
      </body>
    </html>
  );
}

