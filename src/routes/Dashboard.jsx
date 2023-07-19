import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {v4 as uuidv4} from 'uuid'
import AuthProvider from "../components/authProvider";
import DashboardWrapper from "../components/dashboardWrapper";
import {
  deleteLink,
  getLinks,
  insertNewLink,
  updateLink,
} from "../firebase/firebase";
import Link from "../components/link";
const Dashboard = () => {
  const navigate = useNavigate();
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
  const [title, settitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  const handleUserLoggedIn = async (user) => {
    setCurrentUser(user);
    setState(2);
    const resLinks = await getLinks(user.uid);
    setLinks([...resLinks]);
    console.log(resLinks);
  };

  const handleUserNotRegister = (user) => {
    navigate("/login");
  };

  const handleUserNotLoggedIn = (user) => {
    navigate("/login");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    //console.log(e.values);
    const newPost = {
      title,
      url,
    };
    addLink();
    console.log(newPost);
  };

  const handleDeleteLink = async (id) => {
    await deleteLink(id);
    const updatedLinks = links.filter((item) => item.docId !== id);
    setLinks([...updatedLinks]);
  };

  const handleUpdateLink = async (docId, title, url) => {
    const link = links.find((item) => item.docId === docId);
    link.title = title;
    link.url = url;
    await updateLink(docId, link);
  };

  const addLink = async () => {
    if (title !== "" && url !== "") {
      const newLink = {
        id: uuidv4(),
        title,
        url,
        uid: currentUser.uid,
      };
      const res = await insertNewLink({ ...newLink });
      newLink.docId = res.id;
      settitle("");
      setUrl("");
      setLinks([...links, newLink]);
    }
  };

  if (state === 0) {
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
        <h1>Dashboard</h1>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="url">Url</label>
            <input
              type="text"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <input type="submit" value={"Crear new link"} />
        </form>
        <div>
          {links.map((link) => (
            <Link
              key={link.docId}
              docId={link.docId}
              url={link.url}
              title={link.title}
              onDelete={handleDeleteLink}
              onUpdate={handleUpdateLink}
            />
          ))}
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default Dashboard;
