import { useState, useEffect } from "react";

function PleetList({ pleets, activePleet, setActivePleet, deletePleet }) {

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Pleet Feed</h1>
      </div>

      <div className="app-sidebar-pleets">
        {pleets.map((pleet) => (
          <div
            className={`app-sidebar-pleet ${pleet['pleet_id'] === activePleet && "active"}`}
            onClick={() => setActivePleet(pleet['pleet_id'])}
          >
            <div className="sidebar-pleet-title">
              <strong>{pleet['user']['display name']}</strong>
              <button onClick={() => deletePleet(pleet['pleet_id'])}>Delete</button>
            </div>

            <p>{pleet['text'] && pleet['text'].substr(0, 100) + (pleet['text'].length > 100 ? "..." : "")}</p>

            <small className="pleet-meta">Posted: {new Date(pleet['datetime'] * 1000).toLocaleDateString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}</small>
          </div>
        ))}
      </div>
    </div>

  );
}

export default PleetList;
