import React from "react";
import { Link } from "react-router-dom";

export default function DashboardWrapper({ children }) {
  return (
    <div>
      <nav>
        <div>Logotipo</div>
        <Link to="/dashboard">Links</Link>
        <Link to="/dashboard/profile">Perfil</Link>
        <Link to="/dingout">Log out</Link>
      </nav>
      <div>{children}</div>
    </div>
  );
}
