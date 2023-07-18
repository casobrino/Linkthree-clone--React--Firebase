import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ChooseUsername from "./routes/ChooseUsername";
import Dashboard from "./routes/Dashboard";
import EditProfileView from "./routes/EditProfileView";
import LoginView from "./routes/LoginView";
import PublicProfileView from "./routes/PublicProfileView";
import Signout from "./routes/Signout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/profile" element={<EditProfileView />} />
      <Route path="/signout" element={<Signout />} />
      <Route path="u/:username" element={<PublicProfileView />} />
      <Route path="choose-username" element={<ChooseUsername />} />
    </Routes>
  </BrowserRouter>
);
reportWebVitals();
