import React, { useEffect, useRef, useState } from "react";
import Styles from "./link.module.css";

const Link = ({ docId, title, url, onDelete, onUpdate }) => {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentUrl, setCurrentUrl] = useState(url);

  const [editTitle, setEditTitle] = useState(false);
  const [editUrl, setEditUrl] = useState(false);

  const titleRef = useRef(null);
  const urlRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [editTitle]);
  useEffect(() => {
    if (urlRef.current) {
      urlRef.current.focus();
    }
  }, [editUrl]);

  const handleBlurTitle = (e) => {
    setEditTitle(false);
    onUpdate(docId, currentTitle, currentUrl);
  };

  const handleBlurUrl = () => {
    setEditUrl(false);
    onUpdate(docId, currentTitle, currentUrl);
  };

  const handleDelete = () => {
    onDelete(docId);
  };

  return (
    <div className={Styles.link}>
      <div className={Styles.linkInfo}>
        <div className={Styles.linkTitle}>
          {editTitle ? (
            <>
              <input
                type="text"
                placeholder="nuevo titulo"
                value={currentTitle}
                ref={titleRef}
                onChange={(e) => setCurrentTitle(e.target.value)}
                onBlur={handleBlurTitle}
              />
            </>
          ) : (
            <>
              {currentTitle}
              <button
                className={Styles.btnEdit}
                onClick={() => setEditTitle(true)}
              >
                <span className="material-icons">edit</span>
              </button>
            </>
          )}
        </div>
        <div className={Styles.linkUrl}>
          {editUrl ? (
            <>
              <input
                type="text"
                placeholder="Nueva URL"
                value={currentUrl}
                ref={urlRef}
                onChange={(e) => setCurrentUrl(e.target.value)}
                onBlur={handleBlurUrl}
              />
            </>
          ) : (
            <>
              {currentUrl}
              <button className={Styles.btnEdit}>
                <span className="material-icons">edit</span>
              </button>
            </>
          )}
        </div>
      </div>
      <div className={Styles.linkActions}>
        <button className={Styles.btnDelete} onClick={handleDelete}>
          <span className="material-icons">delete</span>
        </button>
      </div>
    </div>
  );
};

export default Link;
