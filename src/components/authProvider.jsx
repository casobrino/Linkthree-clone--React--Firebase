import React, { useEffect } from "react";
import {
  auth,
  getUserInfo,
  registerNewUser,
  userExist,
} from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({
  children,
  onUserLoggedIn,
  onUserNotLoggedIn,
  onUserNotRegister,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExist(user.uid);
        if (isRegistered) {
          const userInfo = await getUserInfo(user.uid);
          if (userInfo.processCompleted) {
            onUserLoggedIn(userInfo);
          } else {
            onUserNotRegister(userInfo);
          }
        } else {
          await registerNewUser({
            uid: user.uid,
            displayName: user.displayName,
            profilePicture: "",
            username: "",
            processCompleted: false,
          });
          onUserNotRegister(user);
        }
        console.log(user.displayName);
      } else {
        onUserNotLoggedIn(user);
      }
    });
  }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegister]);
  return <div>{children}</div>;
};

export default AuthProvider;
