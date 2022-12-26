// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import PleetList from "./components/pleetList";
import Main from "./components/Main";

function App() {
  const url = "http://localhost:5001";
  const [isUpdated, setIsUpdated] = useState(false);
  const [pleets, updatePleets] = useState([]);
  const [activePleet, setActivePleet] = useState(false);

  // using public API, might need CORS (cross-origin-resource-sharing headers)
  useEffect(() => {
    fetch("/pleets").then((res) =>
      res.json().then((data) => {
        updatePleets(data['pleets']);
        setIsUpdated(true);
      })
    );
  }, [isUpdated]);

  const deletePleet = (pleet_id) => {
    fetch("/pleets/"+pleet_id, {method: "DELETE"});
    setIsUpdated(false);
  }

  const getActivePleet = () => {
    return pleets.find((pleet) => pleet['pleet_id'] === activePleet);
  };

  return (
    <div className="App">
      <PleetList
        pleets={pleets}
        activePleet={activePleet}
        setActivePleet={setActivePleet}
        deletePleet={deletePleet}
      />
      <Main
        activePleet={getActivePleet()}
        setIsUpdated={setIsUpdated}
      />
    </div>
  );
}

export default App;
