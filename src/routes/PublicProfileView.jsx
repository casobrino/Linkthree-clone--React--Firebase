import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  existsUsername,
  getProfilePhotoUrl,
  getUserPublicProfileInfo,
} from "../firebase/firebase";

const PublicProfileView = () => {
  const params = useParams();
  const [profile, setProfile] = useState(undefined);
  const [url, setUrl] = useState("");
  /**
   * State
   * 0: inicializando
   * 1: loading
   * 2: Login Completo
   * 3: Login pero sin registro
   * 4: no hay nadie loggeado
   * 5: Ya existe el username
   * 6 valido y cargado
   * 7: username no existe
   */
  const [state, setState] = useState(1);

  useEffect(() => {
    getProfile();
    async function getProfile() {
      const username = params.username;
      try {
        const userUid = await existsUsername(username);
        if (userUid) {
          const userInfo = await getUserPublicProfileInfo(userUid);
          console.log(userInfo);
          const url = await getProfilePhotoUrl(
            userInfo.profileInfo.profilePicture
          );
          setProfile(userInfo);
          setUrl(url);
          setState(6);
        } else {
          setState(7);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [params]);

  console.log("aaaaaa", profile);
  if (state === 7) {
    return <h1>Username dosnt exist</h1>;
  }

  if (state === 1) {
    return (
      <div>
        <div className="lds-dual-ring"></div>
        <div>Loading... </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <img src={url} alt="" />
      </div>
      //TODO: Despleagr la informacion
    </div>
  );
};

export default PublicProfileView;
