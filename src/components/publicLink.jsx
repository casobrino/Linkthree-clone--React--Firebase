import React from "react";
import Styles from "./publicLink.module.css";
export default function PublicLink({ linkUrl, linkTitle }) {
  return (
    <a className={Styles.publicLinkContainer} href={linkUrl}>
      <div>{linkTitle}</div>
    </a>
  );
}
