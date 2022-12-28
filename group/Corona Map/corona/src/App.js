import "./App.css";
import Map from "./components/map.js";
import StatContainer from "./components/statContainer";
import GraphContainer from "./components/graphContainer";

function App() {
  return (
    <div className="App">
      <div className="hor">
        <div className="mapContainer">
          <Map />
        </div>
        <StatContainer />
      </div>
      <GraphContainer />
    </div>
  );
}
export default App;
