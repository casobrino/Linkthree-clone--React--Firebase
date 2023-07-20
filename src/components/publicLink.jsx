import React from "react";
export default function PublicLink({ linkUrl, linkTitle }) {
  return (
    <div>
      <a href={linkUrl}>{linkTitle}</a>
    </div>
  );
}
