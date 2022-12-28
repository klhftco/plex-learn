import { useState, useEffect } from "react";

function StatContainer() {
    const [globalData, setGlobalData] = useState([]);

    useEffect(() => {
      fetch('http://localhost:4000/global').then((res) =>
        res.json().then((data) => {
          setGlobalData(data);
        })
      );
    }, []);

    console.log(globalData);

    return (
      <div className="statContainer">
        <div className="header">
          <h1>COVID-19 Stat Map</h1>
        </div>
        <div className="statBlock">
          <h1>Global Case Count:</h1>
          <p>{globalData['cases']}</p>
        </div>
        <div className="statBlock">
          <h1>Global Active Count:</h1>
          <p>{globalData['active']}</p>
        </div>
        <div className="statBlock">
          <h1>Global Death Count:</h1>
          <p>{globalData['deaths']}</p>
        </div>
      </div>
    );
}

export default StatContainer;
