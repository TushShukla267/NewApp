import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isDarkMode: false,
      progress: 0,
    };

    // Access the API key from environment variables
    this.apikey = process.env.REACT_APP_NEWS_API;
  }

  toggleMode = () => {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode,
    }));
  };

  setProgress = (progress) => {
    this.setState({ progress });
  };

  render() {
    const { isDarkMode } = this.state;
    const mode = isDarkMode ? "dark" : "light";

    document.body.style.backgroundColor = isDarkMode ? "black" : "white";

    return (
      <div>
        <Navbar toggleMode={this.toggleMode} isDarkMode={isDarkMode} mode={mode} apikey={this.apikey} setProgress={this.setProgress} />
        <LoadingBar color='#f11946' progress={this.state.progress} onLoaderFinished={() => this.setProgress(0)} />
      </div>
    );
  }
}
