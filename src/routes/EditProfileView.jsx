import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import DashboardWrapper from "../components/dashboardWrapper";
import {
  getProfilePhotoUrl,
  updateUser,
  userProfilePhoto,
} from "../firebase/firebase";
import Styles from './editProfileView.module.css'

const EditProfileView = () => {
  const [currentUser, setCurrentUser] = useState({});
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
  const [profileImg, setProfileImg] = useState(null);
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const handleUserLoggedIn = async (user) => {
    setCurrentUser(user);
    const url = await getProfilePhotoUrl(user.profilePicture);
    setProfileImg(url);
    setState(2);
  };

  const handleUserNotRegister = (user) => {
    navigate("/login");
  };

  const handleUserNotLoggedIn = (user) => {
    navigate("/login");
  };

  const handleOpenFilePicker = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleChangeFile = (e) => {
    const files = e.target.files;
    const fileReader = new FileReader();

    if (fileReader && files && files.length > 0) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function() {
        const imgeData = fileReader.result;
        const res = await userProfilePhoto(currentUser.uid, imgeData);

        if (res) {
          const tmpUser = { ...currentUser };
          tmpUser.profilePicture = res.metadata.fullPath;
          await updateUser(tmpUser);
          setCurrentUser({ ...tmpUser });
          const url = await getProfilePhotoUrl(currentUser.profilePicture);
          setProfileImg(url);
        }
      };
    }
  };

  if (state !== 2) {
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

  return (
    <DashboardWrapper>
      <div>
        <h1>Edit Profile Info</h1>
        <div className={Styles.profilePictureContainer}>
          <div>
            <img src={profileImg} alt="" width="100px" />
          </div>
          <div>
            <button className="btn" onClick={handleOpenFilePicker}>
              Choose new profile picture
            </button>
            <input
            className={Styles.fileInput}
              ref={fileRef}
              type="file"
              onChange={handleChangeFile}
            />
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default EditProfileView;
