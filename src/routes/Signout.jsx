import React from "react";
import AuthProvider from "../components/authProvider";
import { useNavigate } from "react-router-dom";
import { logOut } from "../firebase/firebase";

const Signout = () => {
  const navigate = useNavigate();


  const handleUserLoggedIn = async (user) => {
    await logOut();
  };

  const handleUserNotRegister = (user) => {
    navigate("/login");
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
      <div className="loader" >
        <div className="lds-dual-ring"></div>
        <div>Loading... </div>
      </div>
    </AuthProvider>
  );
};

export default Signout;
