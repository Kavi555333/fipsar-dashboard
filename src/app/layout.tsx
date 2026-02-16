
import Header from '../components/Header';
import './globals.css';
import dynamic from 'next/dynamic';

const QlikProvider = dynamic(() => import('../providers/QlikProvider'), {
  ssr: false,
});

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <head>
        <title>Medical Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />  
        <link rel="icon" href="/favicon.ico" />
        
        <script src="https://w9mj1mv1plu5dod.in.qlikcloud.com/resources/assets/external/requirejs/require.js"></script>
      </head>
      <body className="bg-gray-100 min-h-screen">
        <QlikProvider>
          <Header />
          {children}
        </QlikProvider>
      </body>
    </html>
  );
}

