'use client';
import Sidebar from '../components/Sidebar';
import KPIBar from '../components/KPIBar';
import PageTabs from '../components/PageTabs';
import Sections from '../components/Sections';
import YearSelectionListener from '../components/YearSelctionListener';
// import   Design  from "../components/TechDasboardDesign.jsx";

export default function Page() {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* <YearSelectionListener /> */}
         <Sidebar />  
      <main className="flex-1 p-6 overflow-y-auto">
        <KPIBar /> 
        {/* <YearSelectionListener /> */}
         <PageTabs /> 
         <Sections />  
        {/* < Design/> */}
      </main>
    </div>
  );
}
