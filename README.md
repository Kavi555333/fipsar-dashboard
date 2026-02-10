# fipsar-dashboard
**Fipsar Analytics Dashboard**
**Executive Summary**

Fipsar Analytics Dashboard is a modern, scalable analytics web application built using Next.js and Qlik Cloud.
The project provides a configurable UI layer over Qlik analytics, allowing business teams to consume insights through a custom-designed dashboard without modifying core UI code.
The solution follows enterprise best practices for frontend architecture, analytics embedding, and CI/CD deployment.

**Key Objectives**

Build a data-heavy analytics dashboard using Next.js
Embed Qlik Cloud charts, tables, and filters natively
Drive UI structure using configuration (CSV files)
Ensure scalability, maintainability, and deployment readiness

**Core Features**

Dynamic header tabs, page tabs, and sections
CSV-driven UI configuration (no code changes for layout updates)
Embedded Qlik charts and tables with shared selection context
Section-level toggle to show/hide analytics
Global filters applied across all analytics
Environment-based configuration (secure & portable)
CI/CD enabled with automated build and deployment

**Technology Stack**

**Frontend**
Next.js (App Router)
React 18
TypeScript
Tailwind CSS
**Analytics**
Qlik Cloud
@qlik/embed-react (Nebula-based embedding)
**DevOps**
GitHub
GitHub Actions (CI)
Vercel (CD & Hosting)

## Setup
1. Copy `.env.example` to `.env.local`
2. Fill in your actual environment variables



