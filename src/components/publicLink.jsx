import React from "react";
import Styles from "./publicLink.module.css";
export default function PublicLink({ linkUrl, linkTitle }) {
  return (
    <a className={Styles.publicLinkContainer} href={linkUrl} target="_blank" rel="noopener noreferrer">
      <div>{linkTitle}</div>
    </a>
  );
}
