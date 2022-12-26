import React, { useState } from "react";
// import ReactMarkdown from "react-markdown";

function PleetPost({ setIsUpdated }) {
  const [username, setUsername] = useState("");
  const [pleetText, setPleetText] = useState("");
  const url = "http://localhost:5001";

  const handleSubmit = (e) => {
    e.preventDefault();
    const details = {"username": username, "text": pleetText};
    var formBody = [];
    for (var prop in details) {
      const encodedKey = encodeURIComponent(prop);
      var encodedValue = encodeURIComponent(details[prop]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch('/pleets', {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody,
    });
    setPleetText("");
    setUsername("");
    setIsUpdated(false);
  };

  return (
    <div className="app-main-pleet-edit">
      <form onSubmit={handleSubmit}>
        <p className="label">Username:</p>
        <input
          type='text'
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}/>
        <p className="label">Pleet:</p>
        <textarea
          type="text"
          value={pleetText}
          onChange={(e) => setPleetText(e.target.value)}
          placeholder="Write your pleet here..."
        ></textarea>
        <input type="submit" id='post-btn' value="Post!" />
      </form>
    </div>
  );
}

export default PleetPost;
