import React from "react";
import { Link } from "react-router-dom";
import Style from './dashboardWrapper.module.css'

export default function DashboardWrapper({ children }) {
  return (
    <div>
      <nav className={Style.nav}>
        <div className={Style.logo} >Logotipo</div>
        <Link to="/dashboard">Links</Link>
        <Link to="/dashboard/profile">Perfil</Link>
        <Link to="/signout">Log out</Link>
      </nav>
      <div className="main-container" >{children}</div>
    </div>
  );
}

