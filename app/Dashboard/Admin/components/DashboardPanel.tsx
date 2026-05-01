"use client";

import { useState } from "react";

export default function DashboardPanel() {
  const [active, setActive] = useState("overview");

  const menu = [
    "Overview",
    "Artists",
    "Artworks",
    "Users",
    "Orders",
    "Settings",
  ];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
      
      

      {/* ================= MAIN CONTENT ================= */}
      <div style={{ flex: 1, background: "#fff", padding: "24px" }}>
        
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          
        </div>

        {/* ================= STATS ================= */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          
          <div style={cardStyle}>
            <h3>Total Artists</h3>
            <p style={numberStyle}>128</p>
          </div>

          <div style={cardStyle}>
            <h3>Total Artworks</h3>
            <p style={numberStyle}>542</p>
          </div>

          <div style={cardStyle}>
            <h3>Sold Art</h3>
            <p style={numberStyle}>89</p>
          </div>

          <div style={cardStyle}>
            <h3>Users</h3>
            <p style={numberStyle}>1,240</p>
          </div>
        </div>

        {/* ================= RECENT ACTIVITY ================= */}
        <div
          style={{
            marginTop: "30px",
            background: "#000",
            color: "#fff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3 style={{ color: "red" }}>Recent Activity</h3>

          <ul style={{ marginTop: "10px", lineHeight: "1.8" }}>
            <li>✔ New artist added</li>
            <li>✔ Artwork "Sunset" uploaded</li>
            <li>✔ Order completed</li>
            <li>✔ User registered</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ================= STYLE =================
const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "2px solid #000",
  borderRadius: "10px",
  padding: "16px",
  textAlign: "center",
  boxShadow: "4px 4px 0px red",
};

const numberStyle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "red",
};