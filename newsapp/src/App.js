// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      isDarkMode: false,
      mode :"light",
    };
  }

  toggleMode = () => {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode,
      mode : prevState.isDarkMode ? "light" : "dark"
    }));
  };

  
  
  render() {

    const { isDarkMode } = this.state;
    const { mode } = this.state;

    return (
      <div>
        <Navbar toggleMode={this.toggleMode} isDarkMode={isDarkMode} mode={mode}/>
        <News/>
      </div>
    )
  }
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
