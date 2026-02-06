'use client';
import Sidebar from '../components/Sidebar';
import KPIBar from '../components/KPIBar';
import PageTabs from '../components/PageTabs';
import Sections from '../components/Sections';

export default function Page() {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar /> 
      <main className="flex-1 p-6 overflow-y-auto">
        <KPIBar />
        <PageTabs />
        <Sections />  
      </main>
    </div>
  );
}