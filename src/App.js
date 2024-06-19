import './App.css';
import React, { Component } from 'react';
import Navbar from './Components/Navbar';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isDarkMode: false,
    };
  }

  toggleMode = () => {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode,
    }));
  };

  render() {
    const { isDarkMode } = this.state;
    const mode = isDarkMode ? "dark" : "light";

    document.body.style.backgroundColor = isDarkMode ? "black" : "white";

    return (
      <div>
        <Navbar toggleMode={this.toggleMode} isDarkMode={isDarkMode} mode={mode} />
      </div>
    );
  }
}
