import React, { Component } from "react";
import News from "./News";
import newsimg from './newsimg.jpeg';

export class Navbar extends Component {
  state = {
    searchQuery: "",
    category: "technology",
    country: "in",
    Infinity_scroll: false
  };

  togglescroll = (event) => {
    this.setState({
      Infinity_scroll: event.target.checked,
    });
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
    const { isDarkMode, mode, apikey, setProgress} = this.props;
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
                  <option value="ca">Canada</option>
                  <option value="jp">Japan</option>
                  <option value="ru">Russia</option>
                  <option value="fr">France</option>
                  <option value="it">Italy</option>
                </select>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <nav className={`navbar navbar-${mode} bg-${mode}`}>
                <div className="container-fluid">
                  <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search for categorys like business/entertainment/health/science/sports/technology"
                      aria-label="Search"
                      size={78}
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
              &nbsp;&nbsp;
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckInfiniteScroll"
                  onChange={this.togglescroll}
                  checked={this.state.Infinity_scroll}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckInfiniteScroll"
                  style={{ color: navTextColor }}
                  id="modelabel"
                >
                  {this.state.Infinity_scroll ? "Disable Infinite Scroll" : "Enable Infinite Scroll"}
                </label>
              </div>
            </div>
          </div>
        </nav>
        <News 
          key={`${this.state.country}-${this.state.category}`} 
          country={this.state.country} 
          category={this.state.category} 
          isDarkMode={isDarkMode} 
          apikey={apikey} 
          setProgress={setProgress} 
          Infinity_scroll={this.state.Infinity_scroll} 
        />
      </div>
    );
  }
}

export default Navbar;
