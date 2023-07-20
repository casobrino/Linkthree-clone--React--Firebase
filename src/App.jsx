import React from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "./components/authProvider";

function App() {
  const navigate = useNavigate();
  const handleUserLoggedIn = (user) => {
    navigate("/dashboard");
  };
  const handleUserNotRegister = (user) => {
    navigate("/choose-username");
  };
  const handleUserNotLoggedIn = (user) => {
    navigate("/login");
  };
  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegister={handleUserNotRegister}
    >
      <div className="loader">
        <div className="lds-dual-ring"></div>
        <div>Loading... </div>
      </div>
    </AuthProvider>
  );
}

export default App;
