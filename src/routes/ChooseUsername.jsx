import React, { useState } from "react";
import AuthProvider from "../components/authProvider";
import { Link, useNavigate } from "react-router-dom";
import { existsUsername, updateUser } from "../firebase/firebase";
import Styles from "./ChooseUsername.module.css";

const ChooseUsername = () => {
  const navigate = useNavigate();
  /* State
   * 0: inicializando
   * 1: loading
   * 2: Login Completo
   * 3: Login pero sin registro
   * 4: no hay nadie loggeado
   * 5: Ya existe el username
   * 6: Nuevo username, Click par continuar
   */
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const handleUserLoggedIn = (user) => {
    navigate("/dashboard");
  };
  const handleUserNotRegister = (user) => {
    setCurrentUser(user);
    setState(3);
  };
  const handleUserNotLoggedIn = (user) => {
    navigate("/login");
  };

  const handleInputUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    if (username === "") {
      return setError("El campo es obligatorio");
    }
    const exist = await existsUsername(username);
    if (exist) {
      setState(5);
    } else {
      const tmp = { ...currentUser };
      tmp.username = username;
      tmp.processCompleted = true;
      await updateUser(tmp);
      setState(6);
    }
  };

  if (state === 3 || state === 5) {
    return (
      <div className={Styles.chooseUsernameContainer}>
        <h1>Bienvenido... {currentUser.displayName}</h1>
        {state === 5 && <p>El nombre de usuaruio ya existe, elige otro</p>}
        <p>Para terminar el proceso proporciona un nombre de usuario</p>
        <div>
          <input
            className="input"
            onChange={handleInputUsername}
            type="text"
            value={username}
            placeholder="Username unico"
          />
        </div>
        <div>
          <button className="btn" onClick={handleContinue}>
            Continuar
          </button>
        </div>
        {error && <p>{error}</p>}
      </div>
    );
  }

  if (state === 6) {
    return (
      <div className={Styles.chooseUsernameContainer}>
        <h1>Cuenta ya registrada, Ve al daashboard</h1>
        <Link to={"/dashboard"}>Continuar</Link>
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
};

export default ChooseUsername;
