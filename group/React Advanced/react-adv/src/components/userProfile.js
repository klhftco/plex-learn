import React, { useState, useEffect } from "react";
// import ReactMarkdown from "react-markdown";

function UserProfile({ activePleet }) {
  const [userPleets, setUserPleets] = useState([]);

  useEffect(() => {
    if (activePleet) {
      // console.log(activePleet['user']['user_id']);
      fetch("/users/"+activePleet['user']['user_id']+"/pleets", { method: "GET" }).then((res) =>
        res.json().then((data) => {
          setUserPleets(data['pleets']);
        })
      );
    }
  }, [activePleet]);

  if(!activePleet) {
    return (
      <div className="app-main-pleet-preview-2">
        <h1 className="preview-title">More from:
          <span className="blue"> No user selected </span>
        </h1>
        <div className="no-active-pleet">No pleet selected</div>
      </div>
    );
  }


  return (
    <div className="app-main-pleet-preview-2">
      <h1 className="preview-title">More from:
        <span className="blue"> {activePleet['user']['display name']}</span>
      </h1>

      <div className="app-sidebar-pleets-user">
        {userPleets.map((pleet) => (
          <div className={`app-sidebar-pleet`} >
            <p>{pleet['text']}</p>

            <small className="pleet-meta">Posted: {new Date(pleet['datetime'] * 1000).toLocaleDateString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}</small>
          </div>
        ))}
      </div>
    </div>
  );

  // <p className="dead"> Edit User Display Name </p>
}

export default UserProfile;
