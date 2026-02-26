import { useState } from "react";

const techData = {
  "Qlik Sense": {
    icon: "◈",
    color: "#00b388",
    accent: "#00d4a0",
    tagline: "Business Intelligence & Analytics",
    description: "Qlik Sense is a modern cloud analytics platform that transforms your data into actionable insights through powerful AI-assisted analytics and stunning visualizations.",
    version: "May 2024",
    category: "Business Intelligence",
    status: "Active",
    features: [
      "Self-service data visualization",
      "AI-powered insights with Insight Advisor",
      "Associative analytics engine",
      "Mobile-first responsive design",
      "Multi-cloud deployment",
      "Real-time collaboration",
    ],
    metrics: [{ label: "Performance", value: 92 }, { label: "Scalability", value: 88 }, { label: "Usability", value: 95 }, { label: "Integration", value: 85 }],
    useCases: ["Sales Performance Tracking", "Financial Reporting", "Supply Chain Analytics", "Customer 360 Views"],
    team: "Data & Analytics",
    license: "Enterprise",
    docs: "docs.qlik.com",
  },
  "Talend": {
    icon: "⬡",
    color: "#ff6d00",
    accent: "#ffa040",
    tagline: "Data Integration & ETL",
    description: "Talend is a unified platform for data integration, data quality, and data governance — enabling organizations to connect, transform, and trust their data across any environment.",
    version: "8.0.1",
    category: "Data Integration",
    status: "Active",
    features: [
      "Drag-and-drop ETL pipeline builder",
      "800+ native connectors",
      "Built-in data quality rules",
      "Real-time & batch processing",
      "Data lineage tracking",
      "Cloud & on-premise support",
    ],
    metrics: [{ label: "Reliability", value: 90 }, { label: "Speed", value: 86 }, { label: "Coverage", value: 94 }, { label: "Quality", value: 89 }],
    useCases: ["Data Warehouse Automation", "Cloud Migration", "Master Data Management", "API Integration"],
    team: "Data Engineering",
    license: "Cloud",
    docs: "docs.talend.com",
  },
  "Snowflake": {
    icon: "❄",
    color: "#29b5e8",
    accent: "#6dd5fa",
    tagline: "Cloud Data Platform",
    description: "Snowflake is the AI Data Cloud — a single platform delivering the data cloud experience for all your data workloads, with near-unlimited concurrency and instant elasticity.",
    version: "7.38",
    category: "Cloud Data Platform",
    status: "Active",
    features: [
      "Separate compute & storage scaling",
      "Zero-copy data cloning",
      "Secure data sharing across clouds",
      "Time-travel & fail-safe recovery",
      "Native Python & Spark support",
      "Snowpark for ML workloads",
    ],
    metrics: [{ label: "Performance", value: 97 }, { label: "Reliability", value: 96 }, { label: "Elasticity", value: 99 }, { label: "Security", value: 95 }],
    useCases: ["Data Lake & Warehouse", "ML/AI Feature Stores", "Real-time Data Sharing", "Cybersecurity Analytics"],
    team: "Cloud Infrastructure",
    license: "Enterprise+",
    docs: "docs.snowflake.com",
  },
};

// ─── DESIGN 1: Dark Industrial ────────────────────────────────────────────────
function Design1({ onTechClick, activeTech, onClose }) {
  return (
    <div style={{ fontFamily: "'Courier New', monospace", background: "#0a0a0f", color: "#e0e0e0", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;600;700&display=swap');
        .d1-sidebar { width: 220px; background: #111118; border-right: 1px solid #1e1e2e; padding: 0; flex-shrink: 0; }
        .d1-nav-item { padding: 14px 24px; font-family: 'Share Tech Mono'; font-size: 12px; color: #555; cursor: pointer; border-left: 2px solid transparent; transition: all 0.2s; letter-spacing: 1px; }
        .d1-nav-item:hover, .d1-nav-item.active { color: #00b388; border-left-color: #00b388; background: rgba(0,179,136,0.05); }
        .d1-tech-card { border: 1px solid #1e1e2e; background: #0d0d16; padding: 24px; cursor: pointer; transition: all 0.3s; position: relative; overflow: hidden; }
        .d1-tech-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--accent); transform: scaleX(0); transition: transform 0.3s; }
        .d1-tech-card:hover::before { transform: scaleX(1); }
        .d1-tech-card:hover { border-color: #2e2e3e; background: #111118; transform: translateY(-2px); }
        .d1-metric-bar { height: 4px; background: #1e1e2e; margin-top: 6px; }
        .d1-metric-fill { height: 100%; transition: width 1s ease; }
        .d1-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center; z-index: 100; backdrop-filter: blur(4px); }
        .d1-modal-box { background: #0d0d16; border: 1px solid #2e2e3e; width: 680px; max-height: 85vh; overflow-y: auto; position: relative; }
        .d1-modal-box::-webkit-scrollbar { width: 4px; } .d1-modal-box::-webkit-scrollbar-thumb { background: #2e2e3e; }
        .d1-tag { display: inline-block; padding: 3px 10px; border: 1px solid currentColor; font-size: 10px; letter-spacing: 2px; margin: 3px; font-family: 'Share Tech Mono'; }
        .d1-close { position: absolute; top: 16px; right: 16px; background: none; border: 1px solid #2e2e3e; color: #666; width: 30px; height: 30px; cursor: pointer; font-family: 'Share Tech Mono'; font-size: 16px; display: flex; align-items: center; justify-content: center; }
        .d1-close:hover { border-color: #ff4444; color: #ff4444; }
        .d1-feature-item { padding: 10px 0; border-bottom: 1px solid #1a1a24; display: flex; align-items: center; gap: 12px; font-size: 13px; color: #aaa; }
        .d1-feature-item::before { content: '▸'; font-size: 10px; }
        .d1-use-tag { display: inline-block; padding: 6px 14px; background: #1a1a24; border: 1px solid #2a2a34; font-size: 11px; margin: 4px; border-radius: 0; cursor: default; }
      `}</style>

      {/* Header */}
      <div style={{ background: "#0d0d16", borderBottom: "1px solid #1e1e2e", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "'Share Tech Mono'", color: "#00b388", fontSize: 13, letterSpacing: 4 }}>▣ DATA_PLATFORM v2.4</div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 11, color: "#444", letterSpacing: 2 }}>SYS_ONLINE</div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1a1a24", border: "1px solid #2e2e3e", display: "flex", alignItems: "center", justifyContent: "center", color: "#00b388", fontSize: 16, cursor: "pointer" }}>⬡</div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <div className="d1-sidebar">
          <div style={{ padding: "20px 24px 8px", fontFamily: "'Share Tech Mono'", fontSize: 9, color: "#333", letterSpacing: 3 }}>NAVIGATION</div>
          {["DASHBOARD", "TECHNOLOGIES", "PIPELINES", "MONITORING", "GOVERNANCE", "SETTINGS"].map((item, i) => (
            <div key={item} className={`d1-nav-item ${item === "TECHNOLOGIES" ? "active" : ""}`}>{String(i + 1).padStart(2, "0")} {item}</div>
          ))}
          <div style={{ margin: "24px", borderTop: "1px solid #1e1e2e", paddingTop: 20 }}>
            <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 9, color: "#333", letterSpacing: 3, marginBottom: 12 }}>SYSTEM STATUS</div>
            {["QLIK", "TALEND", "SNOWFLAKE"].map(s => (
              <div key={s} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 11, color: "#555" }}>
                <span>{s}</span><span style={{ color: "#00b388" }}>● ON</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main */}
        <div style={{ flex: 1, padding: 32 }}>
          <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 11, color: "#444", letterSpacing: 3, marginBottom: 8 }}>// TECHNOLOGIES</div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 28, fontWeight: 700, color: "#e0e0e0", marginBottom: 4 }}>Data Stack Overview</div>
          <div style={{ color: "#444", fontSize: 13, fontFamily: "'Share Tech Mono'", marginBottom: 32 }}>3 active technologies · last sync 2m ago</div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {Object.entries(techData).map(([name, tech]) => (
              <div key={name} className="d1-tech-card" style={{ "--accent": tech.color }} onClick={() => onTechClick(name)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ fontSize: 28, color: tech.color }}>{tech.icon}</div>
                  <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 9, color: "#00b388", letterSpacing: 2, background: "rgba(0,179,136,0.08)", padding: "3px 8px", border: "1px solid rgba(0,179,136,0.2)" }}>ACTIVE</div>
                </div>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 18, color: "#e0e0e0", marginBottom: 4 }}>{name}</div>
                <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 10, color: "#555", letterSpacing: 1, marginBottom: 20 }}>{tech.tagline.toUpperCase()}</div>
                {tech.metrics.slice(0, 2).map(m => (
                  <div key={m.label} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Share Tech Mono'", fontSize: 10, color: "#444", marginBottom: 4 }}>
                      <span>{m.label}</span><span style={{ color: tech.color }}>{m.value}%</span>
                    </div>
                    <div className="d1-metric-bar"><div className="d1-metric-fill" style={{ width: `${m.value}%`, background: tech.color }} /></div>
                  </div>
                ))}
                <div style={{ marginTop: 16, fontFamily: "'Share Tech Mono'", fontSize: 10, color: tech.color, letterSpacing: 1 }}>VIEW_DETAILS ▸</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeTech && (
        <div className="d1-modal" onClick={e => e.target === e.currentTarget && onClose()}>
          <div className="d1-modal-box">
            <div style={{ borderBottom: "1px solid #1e1e2e", padding: "24px 28px", background: "#0a0a0f" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ fontSize: 36, color: techData[activeTech].color }}>{techData[activeTech].icon}</div>
                <div>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 24, color: "#e0e0e0" }}>{activeTech}</div>
                  <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 10, color: "#555", letterSpacing: 2 }}>{techData[activeTech].tagline.toUpperCase()} · v{techData[activeTech].version}</div>
                </div>
              </div>
              <button className="d1-close" onClick={onClose}>✕</button>
            </div>
            <div style={{ padding: "28px" }}>
              <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7, fontFamily: "'Share Tech Mono'", marginBottom: 28 }}>{techData[activeTech].description}</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 28 }}>
                <div>
                  <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 9, color: "#444", letterSpacing: 3, marginBottom: 16 }}>// CAPABILITIES</div>
                  {techData[activeTech].features.map(f => <div key={f} className="d1-feature-item">{f}</div>)}
                </div>
                <div>
                  <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 9, color: "#444", letterSpacing: 3, marginBottom: 16 }}>// PERFORMANCE</div>
                  {techData[activeTech].metrics.map(m => (
                    <div key={m.label} style={{ marginBottom: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Share Tech Mono'", fontSize: 11, color: "#666", marginBottom: 6 }}>
                        <span>{m.label}</span><span style={{ color: techData[activeTech].color }}>{m.value}%</span>
                      </div>
                      <div className="d1-metric-bar"><div className="d1-metric-fill" style={{ width: `${m.value}%`, background: techData[activeTech].color }} /></div>
                    </div>
                  ))}
                  <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[["TEAM", techData[activeTech].team], ["LICENSE", techData[activeTech].license], ["STATUS", techData[activeTech].status], ["DOCS", techData[activeTech].docs]].map(([k, v]) => (
                      <div key={k} style={{ background: "#0a0a0f", border: "1px solid #1e1e2e", padding: "10px 14px" }}>
                        <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 9, color: "#444", letterSpacing: 2 }}>{k}</div>
                        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 13, color: "#aaa", marginTop: 4, fontWeight: 600 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontFamily: "'Share Tech Mono'", fontSize: 9, color: "#444", letterSpacing: 3, marginBottom: 12 }}>// USE CASES</div>
                <div>{techData[activeTech].useCases.map(u => <span key={u} className="d1-use-tag">{u}</span>)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DESIGN 2: Glass Morphism Elegant ────────────────────────────────────────
function Design2({ onTechClick, activeTech, onClose }) {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "linear-gradient(135deg, #1a1040 0%, #0d2240 50%, #1a1040 100%)", minHeight: "100vh", display: "flex", flexDirection: "column", color: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Lato:wght@300;400;700&display=swap');
        .d2-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 28px; cursor: pointer; transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1); position: relative; overflow: hidden; }
        .d2-card::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 0%, var(--glow) 0%, transparent 70%); opacity: 0; transition: opacity 0.4s; pointer-events: none; }
        .d2-card:hover::after { opacity: 1; }
        .d2-card:hover { transform: translateY(-8px) scale(1.02); border-color: rgba(255,255,255,0.25); box-shadow: 0 30px 60px rgba(0,0,0,0.4); }
        .d2-nav { background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); border-right: 1px solid rgba(255,255,255,0.08); width: 200px; flex-shrink: 0; }
        .d2-nav-item { padding: 12px 20px; font-size: 13px; color: rgba(255,255,255,0.4); cursor: pointer; border-radius: 8px; margin: 4px 12px; transition: all 0.2s; display: flex; align-items: center; gap: 10px; font-family: 'Lato'; font-weight: 300; }
        .d2-nav-item:hover, .d2-nav-item.active { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.9); }
        .d2-modal { position: fixed; inset: 0; background: rgba(10,8,30,0.8); backdrop-filter: blur(16px); display: flex; align-items: center; justify-content: center; z-index: 100; }
        .d2-modal-box { background: rgba(255,255,255,0.07); backdrop-filter: blur(40px); border: 1px solid rgba(255,255,255,0.15); border-radius: 24px; width: 700px; max-height: 88vh; overflow-y: auto; }
        .d2-modal-box::-webkit-scrollbar { width: 4px; } .d2-modal-box::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
        .d2-pill { display: inline-block; padding: 5px 14px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 100px; font-size: 12px; color: rgba(255,255,255,0.7); margin: 4px; }
        .d2-metric-track { height: 6px; background: rgba(255,255,255,0.08); border-radius: 6px; overflow: hidden; margin-top: 6px; }
        .d2-metric-fill { height: 100%; border-radius: 6px; transition: width 1s ease; }
        .d2-feature { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 13px; color: rgba(255,255,255,0.7); }
        .d2-star { color: var(--c); font-size: 8px; }
        .d2-stat-box { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 14px 18px; }
      `}</style>

      {/* Header */}
      <div style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 28px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 700, letterSpacing: 3, background: "linear-gradient(90deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NEXUS PLATFORM</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "Lato", fontWeight: 300 }}>Enterprise Suite</div>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #a78bfa, #60a5fa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, cursor: "pointer" }}>👤</div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        <div className="d2-nav">
          <div style={{ padding: "24px 20px 8px", fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, fontFamily: "Lato", textTransform: "uppercase" }}>Menu</div>
          {[["🏠","Dashboard"],["⚡","Technologies"],["🔄","Pipelines"],["📊","Reports"],["🛡","Governance"],["⚙","Settings"]].map(([icon, label]) => (
            <div key={label} className={`d2-nav-item ${label === "Technologies" ? "active" : ""}`}><span>{icon}</span>{label}</div>
          ))}
          <div style={{ margin: "20px 12px 0", background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, marginBottom: 12, fontFamily: "Lato" }}>QUICK HEALTH</div>
            {[["Qlik","#a78bfa"], ["Talend","#f97316"], ["Snow","#60a5fa"]].map(([n, c]) => (
              <div key={n} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "Lato" }}>
                <span>{n}</span><span style={{ color: c, fontSize: 10 }}>● Online</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, padding: "36px 40px" }}>
          <div style={{ fontFamily: "'Lato'", fontWeight: 300, fontSize: 13, color: "rgba(255,255,255,0.4)", letterSpacing: 2, marginBottom: 6, textTransform: "uppercase" }}>Technologies</div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 32, fontWeight: 700, marginBottom: 4, background: "linear-gradient(90deg, #fff, rgba(255,255,255,0.6))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Data Ecosystem</div>
          <div style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Lato", fontWeight: 300, marginBottom: 40, fontSize: 14 }}>3 integrated technologies · All systems operational</div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {Object.entries(techData).map(([name, tech]) => (
              <div key={name} className="d2-card" style={{ "--glow": `${tech.color}30` }} onClick={() => onTechClick(name)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: `${tech.color}20`, border: `1px solid ${tech.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{tech.icon}</div>
                  <div style={{ background: `${tech.color}15`, border: `1px solid ${tech.color}30`, borderRadius: 100, padding: "4px 12px", fontSize: 11, color: tech.color, fontFamily: "Lato", fontWeight: 700 }}>Active</div>
                </div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{name}</div>
                <div style={{ fontFamily: "Lato", fontWeight: 300, fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 20, lineHeight: 1.5 }}>{tech.tagline}</div>
                {tech.metrics.slice(0, 2).map(m => (
                  <div key={m.label} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "Lato", marginBottom: 4 }}>
                      <span>{m.label}</span><span style={{ color: tech.color, fontWeight: 700 }}>{m.value}%</span>
                    </div>
                    <div className="d2-metric-track"><div className="d2-metric-fill" style={{ width: `${m.value}%`, background: `linear-gradient(90deg, ${tech.color}99, ${tech.accent})` }} /></div>
                  </div>
                ))}
                <div style={{ marginTop: 20, color: tech.color, fontSize: 12, fontFamily: "Lato", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>Explore →</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeTech && (
        <div className="d2-modal" onClick={e => e.target === e.currentTarget && onClose()}>
          <div className="d2-modal-box">
            <div style={{ padding: "32px 36px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: `linear-gradient(135deg, ${techData[activeTech].color}12, transparent)` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                  <div style={{ width: 64, height: 64, borderRadius: 18, background: `${techData[activeTech].color}20`, border: `1px solid ${techData[activeTech].color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>{techData[activeTech].icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 26, fontWeight: 700 }}>{activeTech}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Lato", fontWeight: 300, fontSize: 13, marginTop: 4 }}>{techData[activeTech].tagline} · v{techData[activeTech].version}</div>
                    <div style={{ marginTop: 10 }}>
                      <span style={{ background: `${techData[activeTech].color}20`, border: `1px solid ${techData[activeTech].color}40`, borderRadius: 100, padding: "3px 12px", fontSize: 11, color: techData[activeTech].color, fontFamily: "Lato", fontWeight: 700 }}>● Active</span>
                    </div>
                  </div>
                </div>
                <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)", width: 36, height: 36, borderRadius: 10, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </div>
            </div>
            <div style={{ padding: "28px 36px" }}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Lato", fontWeight: 300, fontSize: 14, lineHeight: 1.8, marginBottom: 28 }}>{techData[activeTech].description}</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 28 }}>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "Lato", marginBottom: 14 }}>Key Features</div>
                  {techData[activeTech].features.map(f => (
                    <div key={f} className="d2-feature"><span style={{ color: techData[activeTech].color, fontSize: 18 }}>◆</span>{f}</div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "Lato", marginBottom: 14 }}>Performance Metrics</div>
                  {techData[activeTech].metrics.map(m => (
                    <div key={m.label} style={{ marginBottom: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,0.6)", fontFamily: "Lato", marginBottom: 6 }}>
                        <span>{m.label}</span><span style={{ color: techData[activeTech].color, fontWeight: 700 }}>{m.value}%</span>
                      </div>
                      <div className="d2-metric-track"><div className="d2-metric-fill" style={{ width: `${m.value}%`, background: `linear-gradient(90deg, ${techData[activeTech].color}, ${techData[activeTech].accent})` }} /></div>
                    </div>
                  ))}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20 }}>
                    {[["Team", techData[activeTech].team], ["License", techData[activeTech].license]].map(([k, v]) => (
                      <div key={k} className="d2-stat-box">
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: 1, fontFamily: "Lato", textTransform: "uppercase" }}>{k}</div>
                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontFamily: "Lato", fontWeight: 700, marginTop: 4 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: 2, textTransform: "uppercase", fontFamily: "Lato", marginBottom: 12 }}>Use Cases</div>
                {techData[activeTech].useCases.map(u => <span key={u} className="d2-pill">{u}</span>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DESIGN 3: Clean Minimal Light ────────────────────────────────────────────
function Design3({ onTechClick, activeTech, onClose }) {
  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#f7f6f3", minHeight: "100vh", display: "flex", flexDirection: "column", color: "#1a1a1a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap');
        .d3-nav-item { padding: 10px 16px; font-family: 'DM Sans'; font-size: 13px; color: #888; cursor: pointer; border-radius: 8px; margin: 2px 8px; transition: all 0.2s; display: flex; align-items: center; gap: 10px; }
        .d3-nav-item:hover, .d3-nav-item.active { background: #fff; color: #1a1a1a; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
        .d3-card { background: #fff; border-radius: 20px; padding: 28px; cursor: pointer; transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1); box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1.5px solid #ede9e4; }
        .d3-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); border-color: var(--bc); }
        .d3-track { height: 5px; background: #f0ece6; border-radius: 5px; overflow: hidden; }
        .d3-fill { height: 100%; border-radius: 5px; }
        .d3-modal { position: fixed; inset: 0; background: rgba(247,246,243,0.85); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; z-index: 100; }
        .d3-modal-box { background: #fff; border-radius: 24px; box-shadow: 0 40px 80px rgba(0,0,0,0.15); width: 720px; max-height: 88vh; overflow-y: auto; border: 1.5px solid #ede9e4; }
        .d3-modal-box::-webkit-scrollbar { width: 4px; } .d3-modal-box::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }
        .d3-feature { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f4f0eb; font-size: 13.5px; color: #555; font-family: 'DM Sans'; line-height: 1.5; }
        .d3-chip { display: inline-block; padding: 6px 16px; background: #f7f4ef; border: 1.5px solid #ede9e4; border-radius: 100px; font-size: 12.5px; color: #666; margin: 4px; font-family: 'DM Sans'; }
        .d3-stat { background: #f9f7f4; border-radius: 12px; padding: 14px 18px; border: 1.5px solid #ede9e4; }
      `}</style>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1.5px solid #ede9e4", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, letterSpacing: -0.5 }}>DataHub</div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 13, color: "#aaa", fontFamily: "DM Sans", fontWeight: 400 }}>Enterprise · Q1 2025</div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, cursor: "pointer" }}>👤</div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: 200, background: "#fff", borderRight: "1.5px solid #ede9e4", paddingTop: 16, flexShrink: 0 }}>
          <div style={{ padding: "8px 16px", fontSize: 10, color: "#bbb", letterSpacing: 2, fontFamily: "DM Sans", textTransform: "uppercase", marginBottom: 8 }}>Navigation</div>
          {[["🏠","Overview"], ["⚡","Technologies"], ["🔄","Workflows"], ["📊","Analytics"], ["🛡","Compliance"], ["⚙","Settings"]].map(([icon, label]) => (
            <div key={label} className={`d3-nav-item ${label === "Technologies" ? "active" : ""}`}><span>{icon}</span>{label}</div>
          ))}
          <div style={{ margin: "24px 16px 0", borderTop: "1.5px solid #ede9e4", paddingTop: 20 }}>
            <div style={{ fontSize: 10, color: "#bbb", letterSpacing: 2, fontFamily: "DM Sans", textTransform: "uppercase", marginBottom: 12 }}>Status</div>
            {Object.entries(techData).map(([name, tech]) => (
              <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", fontSize: 12, color: "#888", fontFamily: "DM Sans" }}>
                <span>{name.split(" ")[0]}</span>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: tech.color, display: "inline-block" }} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, padding: "40px 48px" }}>
          <div style={{ fontFamily: "DM Sans", fontSize: 12, color: "#aaa", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Technologies</div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, fontWeight: 400, marginBottom: 6, letterSpacing: -1 }}>Your Data Stack</div>
          <div style={{ color: "#999", fontFamily: "DM Sans", fontWeight: 300, marginBottom: 40, fontSize: 14 }}>Three integrated technologies powering your organization</div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {Object.entries(techData).map(([name, tech]) => (
              <div key={name} className="d3-card" style={{ "--bc": tech.color }} onClick={() => onTechClick(name)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: `${tech.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: tech.color }}>{tech.icon}</div>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: tech.color, marginTop: 6 }} />
                </div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, marginBottom: 6, letterSpacing: -0.5 }}>{name}</div>
                <div style={{ fontFamily: "DM Sans", fontWeight: 300, fontSize: 12.5, color: "#888", marginBottom: 22, lineHeight: 1.5 }}>{tech.tagline}</div>
                {tech.metrics.slice(0, 2).map(m => (
                  <div key={m.label} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "DM Sans", fontSize: 11.5, color: "#aaa", marginBottom: 5 }}>
                      <span>{m.label}</span><span style={{ color: tech.color, fontWeight: 600 }}>{m.value}%</span>
                    </div>
                    <div className="d3-track"><div className="d3-fill" style={{ width: `${m.value}%`, background: tech.color, opacity: 0.7 }} /></div>
                  </div>
                ))}
                <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 6, color: "#1a1a1a", fontFamily: "DM Sans", fontWeight: 600, fontSize: 13 }}>View details <span style={{ color: tech.color }}>→</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeTech && (
        <div className="d3-modal" onClick={e => e.target === e.currentTarget && onClose()}>
          <div className="d3-modal-box">
            <div style={{ padding: "32px 36px", borderBottom: "1.5px solid #ede9e4" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                  <div style={{ width: 60, height: 60, borderRadius: 18, background: `${techData[activeTech].color}12`, border: `1.5px solid ${techData[activeTech].color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: techData[activeTech].color }}>{techData[activeTech].icon}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, letterSpacing: -0.5 }}>{activeTech}</div>
                    <div style={{ fontFamily: "DM Sans", fontWeight: 300, fontSize: 13, color: "#999", marginTop: 4 }}>{techData[activeTech].tagline} · Version {techData[activeTech].version}</div>
                  </div>
                </div>
                <button onClick={onClose} style={{ background: "#f7f4ef", border: "1.5px solid #ede9e4", color: "#888", width: 36, height: 36, borderRadius: 10, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </div>
            </div>
            <div style={{ padding: "28px 36px" }}>
              <p style={{ fontFamily: "DM Sans", fontWeight: 300, fontSize: 14, color: "#666", lineHeight: 1.8, marginBottom: 28 }}>{techData[activeTech].description}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 28 }}>
                <div>
                  <div style={{ fontFamily: "DM Sans", fontSize: 11, color: "#bbb", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Features</div>
                  {techData[activeTech].features.map(f => (
                    <div key={f} className="d3-feature"><span style={{ color: techData[activeTech].color, fontSize: 18, marginTop: -2 }}>◆</span>{f}</div>
                  ))}
                </div>
                <div>
                  <div style={{ fontFamily: "DM Sans", fontSize: 11, color: "#bbb", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Performance</div>
                  {techData[activeTech].metrics.map(m => (
                    <div key={m.label} style={{ marginBottom: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "DM Sans", fontSize: 13, color: "#777", marginBottom: 6 }}>
                        <span>{m.label}</span><span style={{ color: techData[activeTech].color, fontWeight: 600 }}>{m.value}%</span>
                      </div>
                      <div className="d3-track"><div className="d3-fill" style={{ width: `${m.value}%`, background: techData[activeTech].color, opacity: 0.8 }} /></div>
                    </div>
                  ))}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20 }}>
                    {[["Team", techData[activeTech].team], ["License", techData[activeTech].license], ["Category", techData[activeTech].category], ["Docs", techData[activeTech].docs]].map(([k, v]) => (
                      <div key={k} className="d3-stat">
                        <div style={{ fontFamily: "DM Sans", fontSize: 10, color: "#bbb", letterSpacing: 1, textTransform: "uppercase" }}>{k}</div>
                        <div style={{ fontFamily: "DM Sans", fontWeight: 600, fontSize: 12.5, color: "#333", marginTop: 4 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "DM Sans", fontSize: 11, color: "#bbb", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Use Cases</div>
                {techData[activeTech].useCases.map(u => <span key={u} className="d3-chip">{u}</span>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [design, setDesign] = useState(1);
  const [activeTech, setActiveTech] = useState(null);

  const designs = [
    { id: 1, label: "Design 1", sublabel: "Dark Industrial", color: "#00b388" },
    { id: 2, label: "Design 2", sublabel: "Glass Morphism", color: "#a78bfa" },
    { id: 3, label: "Design 3", sublabel: "Clean Minimal", color: "#1a1a1a" },
  ];

  return (
    <div style={{ position: "relative" }}>
      {/* Design Switcher */}
      <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 200, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)", padding: "10px 14px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.15)" }}>
        {designs.map(d => (
          <button key={d.id} onClick={() => { setDesign(d.id); setActiveTech(null); }} style={{ padding: "7px 18px", borderRadius: 100, border: "none", cursor: "pointer", fontFamily: "system-ui", fontSize: 12, fontWeight: 600, transition: "all 0.2s", background: design === d.id ? d.color : "transparent", color: design === d.id ? "#fff" : "rgba(255,255,255,0.5)" }}>
            {d.label} <span style={{ opacity: 0.7, fontWeight: 400 }}>· {d.sublabel}</span>
          </button>
        ))}
      </div>

      {design === 1 && <Design1 onTechClick={setActiveTech} activeTech={activeTech} onClose={() => setActiveTech(null)} />} 
      {design === 2 && <Design2 onTechClick={setActiveTech} activeTech={activeTech} onClose={() => setActiveTech(null)} />} 
      {design === 3 && <Design3 onTechClick={setActiveTech} activeTech={activeTech} onClose={() => setActiveTech(null)} />}
    </div>
  );
}
