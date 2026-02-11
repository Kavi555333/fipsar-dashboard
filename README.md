# fipsar-dashboard
**Fipsar Analytics Dashboard**  
**Summary:**  
1.Fipsar Analytics Dashboard is a modern, scalable analytics web application built using **Next.js and Qlik Cloud.**  
2.The project provides a configurable UI layer over Qlik analytics, allowing business teams to consume insights through a custom-designed dashboard without modifying core UI code.  
3.The solution follows enterprise best practices for frontend architecture, analytics embedding, and CI/CD deployment.

**Key Objectives:**  
1.Build a data-heavy analytics dashboard using Next.js.  
2.Embed Qlik Cloud charts, tables, and filters natively.  
3.Drive UI structure using configuration (CSV files).  
4.Ensure scalability, maintainability, and deployment readiness.

**Core Features:**  
1.Dynamic header tabs, page tabs, and sections.  
2.CSV-driven UI configuration (no code changes for layout updates).  
3.Embedded Qlik charts and tables with shared selection context.  
4.Section-level toggle to show/hide analytics.  
5.Global filters applied across all analytics.  
6.Environment-based configuration (secure & portable).  
7.CI/CD enabled with automated build and deployment.  

**Technology Stack:**  
**Frontend:**
Next.js (App Router),
React 18,
TypeScript,
Tailwind CSS.  
**Analytics:**
Qlik Cloud,
@qlik/embed-react (Nebula-based embedding).  
**DevOps**
GitHub,
GitHub Actions (CI),
Vercel (CD & Hosting).

## Setup & Run
1.🚀 Project Setup & Run Guide

📋 Prerequisites
Make sure you have the following installed on your system:  
1.Node.js  
2.npm   
3.Git  

📦 Clone the Repository
git clone https://github.com/<your-username>/<your-repo-name>.git

📥 Install Dependencies
Install all required packages:  
**npm install**    

📥 Environment Variables  
Copy `.env.example` to `.env.local`    
Fill in your actual environment variables  

▶️ Run the Project (Development)
Start the development server:  
**npm run dev**  
The application will be available at:http://localhost:3000

🏗️ Build for Production
To create an optimized production build:  
**npm run build**  
If the build is successful, you’ll see a confirmation in the terminal.  
🚀 Run Production Build Locally
After building, start the production server:  
npm run start  
App will run at:
http://localhost:3000




