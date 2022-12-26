// import React, { useState } from "react";
// import ReactMarkdown from "react-markdown";

function PleetPreview({ activePleet }) {

  if(!activePleet) return (<div className="no-active-pleet">No pleet selected</div>);

  return (
    <div className="app-main-pleet-preview">
      <h1 className="preview-title">{activePleet['user']['display name']}</h1>

      <div className="markdown-preview">
        <small className="pleet-meta">Posted: {new Date(activePleet['datetime'] * 1000).toLocaleDateString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}</small>

        <p>{activePleet['text']}</p>
      </div>
    </div>
  );
}

export default PleetPreview;
