import React, { useEffect, useRef, useState } from "react";

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
    <div>
      <hr />
      {/* <a href={url} target="_blank" rel="noopener noreferrer"> */}
      <div>
        <div>
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
              <div>{currentTitle}</div>
              <button onClick={() => setEditTitle(true)}>Edit</button>
            </>
          )}
        </div>
        <div>
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
              <div>{currentUrl}</div>
              <button onClick={() => setEditUrl(true)}>Edit</button>
            </>
          )}
        </div>
      </div>
      <div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Link;
