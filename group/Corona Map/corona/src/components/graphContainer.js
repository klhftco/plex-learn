import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Label, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function GraphContainer() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
      fetch("http://localhost:4000/history").then((res) =>
        res.json().then((data) => {
          setHistory(data);
        })
      );
    }, []);

    console.log(history);
    const data = [];
    for (let k in history['cases']) {
      data.push({
        date: k,
        case: Math.round(history['cases'][k] / 1000000, 1),
        death: Math.round(history['deaths'][k] / 1000000, 1),
        recover: Math.round(history['recovered'][k] / 1000000, 1),
      })
    }

    return (
      <div className="graphContainer">
        <ResponsiveContainer width="50%" height="100%" className="graph1">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={false}/>
            <YAxis tick={false}>
              <Label
                style={{
                   textAnchor: "middle",
                   fontSize: "100%",
                   fill: "gray",
                }}
                angle={270}
                value={"Cases (M)"} />
            </YAxis>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="case" strokeWidth="2" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="death" strokeWidth="2" stroke="#006400" />
            <Line type="monotone" dataKey="recover" strokeWidth="2" stroke="#e8e337" />
          </LineChart>
        </ResponsiveContainer>
        <div className="graph2">
          <p>Laziness is a virtue</p>
          <p>There should probably be a graph here</p>
        </div>
      </div>
    );
}

export default GraphContainer;
