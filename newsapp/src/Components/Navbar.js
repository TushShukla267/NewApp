import React, { Component } from "react";
import News from "./News";
import newsimg from './newsimg.jpeg';
export class Navbar extends Component {
  state = {
    searchQuery: "",
    category: "technology",
    country: "in"
  };

  handleToggleMode = () => {
    this.props.toggleMode();
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleCountryChange = (event) => {
    this.setState({ country: event.target.value });
  };

  handleSearchClick = () => {
    this.setState({ category: this.state.searchQuery });
  };

  render() {
    const { isDarkMode, mode } = this.props;
    const navTextColor = isDarkMode ? "white" : "black";

    return (
      <div>
        <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}>
          <div className="container-fluid">
            <nav className="navbar navbar-light bg-light">
              <div className="container">
                <img
                  src={newsimg}
                  height={50}
                  alt="News"
                />
              </div>
            </nav>
            <div style={{ fontFamily: "cursive" }}>
              <h1 className="navbar-brand">DailyNews</h1>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="me-auto">
                <select
                  className="form-select"
                  aria-label="Select Country"
                  value={this.state.country}
                  onChange={this.handleCountryChange}
                >
                  <option value="in">India</option>
                  <option value="us">United States</option>
                </select>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <nav className={`navbar navbar-${mode} bg-${mode}`}>
                <div className="container-fluid">
                  <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search for category of news you want"
                      aria-label="Search"
                      size={35}
                      value={this.state.searchQuery}
                      onChange={this.handleSearchChange}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <button
                      className="btn btn-outline-success"
                      type="button"
                      onClick={this.handleSearchClick}
                    >
                      Search
                    </button>
                  </form>
                </div>
              </nav>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={this.handleToggleMode}
                  checked={isDarkMode}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                  style={{ color: navTextColor }}
                  id="modelabel"
                >
                  {isDarkMode ? "Dark Mode" : "Light Mode"}
                </label>
              </div>
            </div>
          </div>
        </nav>
        <News key={`${this.state.country}-${this.state.category}`} country={this.state.country} category={this.state.category} isDarkMode={isDarkMode} />
      </div>
    );
  }
}

export default Navbar;
