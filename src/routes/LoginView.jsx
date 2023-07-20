import React, { useState } from "react";
import {
  GoogleAuthProvider,
  //onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import { auth } from "../firebase/firebase";
import Styles from "./LoginView.module.css";
export default function LoginView() {
  const navigate = useNavigate();
  //const [currentUser, setCurrentUser] = useState(null);
  /**
   * State
   * 0: inicializando
   * 1: loading
   * 2: Login Completo
   * 3: Login pero sin registro
   * 4: no hay nadie loggeado
   * 5: Ya existe el username
   */
  const [state, setCurrentState] = useState(0);

  const handleOnClick = async () => {
    const googleProvider = new GoogleAuthProvider();
    const singWithGoogle = async (googleProvider) => {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error(" HUBO UN ERROR ", error);
      }
    };
    await singWithGoogle(googleProvider);
  };

  const handleUserLoggedIn = (user) => {
    navigate("/dashboard");
  };
  const handleUserNotRegister = (user) => {
    navigate("/choose-username");
  };
  const handleUserNotLoggedIn = (user) => {
    setCurrentState(4);
  };

  if (state === 4) {
    return (
      <div>
        <div className={Styles.loginView}>
        <h1 style={{display: "inline-block"}} >Linkthree</h1>
          <button className={Styles.provider} onClick={handleOnClick}>
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegister={handleUserNotRegister}
    >
      <div className="lds-dual-ring"></div>
      <div>Loading... </div>
    </AuthProvider>
  );
}
