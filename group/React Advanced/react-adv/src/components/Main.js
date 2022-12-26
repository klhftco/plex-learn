// import React, { useState } from "react";
// import ReactMarkdown from "react-markdown";
import PleetPreview from "./pleetPreview";
import PleetPost from "./pleetPost";
import UserProfile from "./userProfile";


function Main({ activePleet, setIsUpdated }) {
  const onEditField = (key, value) => {
    console.log(key, value);
  };

  return (
    <div className="app-main">
      <PleetPreview activePleet={activePleet}/>
      <PleetPost setIsUpdated={setIsUpdated}/>
      <UserProfile activePleet={activePleet}/>
    </div>
  );
}

export default Main;
