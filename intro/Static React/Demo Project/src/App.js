import React from 'react';
import './App.css';
import logo from './PlexTechLogo.png';

var Button = ({title, task}) => {
  return (
    <button onClick = { task }>{ title }</button>
  );
}


class Practice_1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    }
  }

  // <button onClick={() => this.setState({value : current + 1})}>+</button>
  // <button onClick={() => this.setState({value : current - 1})}>-</button>

  render() {
    const current = this.state.value
    return (
      <div>
        <div className='section two'>
          <h2>This is a representation of a component.</h2>
          <div className='buttons'>
            <Button title="+" task={() => this.setState({value : current + 1})} />
            <Button title="-" task={() => this.setState({value : current - 1})} />
          </div>
          <h2>Current Value: {current}</h2>
        </div>
        <Practice_2 value = {current}/>
      </div>
    )
  }
}

function Practice_2(props) {
  return (
    <div className='section three'>
      <h2>This is a representation of props passed down from the section above: {props.value}</h2>
    </div>
  )
}

function App() {
  return (
    <html>
      <head>
        <title>React Playground</title>
      </head>
      <body>
        <div className='section one'>
            <h1>Welcome to the React Demo for PlexTech Advanced Team, Fall 2022</h1>
            <img src={logo} width='3%' height='40%'/>
        </div>
        <Practice_1/>
      </body>
    </html>
  );
}

export default App;
