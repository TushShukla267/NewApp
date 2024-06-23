import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };

    document.title = `Daily News - ${this.capitalizeFirstLetter(
      this.props.category
    )} `;
  }

  async componentDidMount() {
    this.updateNews();
  }

  updateNews = async () => {
    const { country, category, apikey, setProgress } = this.props;
    setProgress(0); // Start the loading bar
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${this.state.page}&pageSize=8`;
    this.setState({ loading: true });
    let data = await fetch(url);
    setProgress(50); // Halfway through fetching
    let parsedData = await data.json();
    setProgress(75); // Three-quarters through fetching
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    setProgress(100); // Fetching complete
  };

  fetchMoreData = async () => {
    const { country, category, apikey } = this.props;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${
      this.state.page + 1
    }&pageSize=8`;
    this.setState({ page: this.state.page + 1 });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 }, this.updateNews);
  };

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 8)) return;
    this.setState({ page: this.state.page + 1 }, this.updateNews);
  };

  capitalizeFirstLetter = (category) => {
    return category ? category.charAt(0).toUpperCase() + category.slice(1) : "";
  };

  render() {
    const { isDarkMode, category, Infinity_scroll } = this.props;
    const headingColor = isDarkMode ? "white" : "black";
    const capitalizedCategory = this.capitalizeFirstLetter(category);

    return (
      <div className="container my-5">
        <h1
          className="container text-center my-4 p-3"
          style={{
            fontFamily: "initial",
            fontSize: "50px",
            fontWeight: "bolder",
            backgroundColor: "yellow",
            border: "7px solid",
            borderColor: headingColor,
          }}
        >
          Top {capitalizedCategory} Headlines
        </h1>

        <br />
        <br />
        {this.state.loading && <Spinner />}
        {Infinity_scroll ? (
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
            endMessage={
              <p style={{ textAlign: "center", color: headingColor }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div className="row">
              {this.state.articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={
                      element.title
                        ? element.title.slice(0, 45)
                        : "not available"
                    }
                    description={
                      element.description
                        ? element.description.slice(0, 90)
                        : "not available"
                    }
                    imageurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    publishedAt={element.publishedAt}
                    isDarkMode={isDarkMode}
                  />
                  <br />
                  <br />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <>
            <div className="row">
              {!this.state.loading &&
                this.state.articles.map((element) => (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={
                        element.title
                          ? element.title.slice(0, 45)
                          : "not available"
                      }
                      description={
                        element.description
                          ? element.description.slice(0, 90)
                          : "not available"
                      }
                      imageurl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      publishedAt={element.publishedAt}
                      isDarkMode={isDarkMode}
                    />
                    <br />
                    <br />
                  </div>
                ))}
            </div>
            <br />
            <br />
            <div className="d-flex justify-content-between">
              <button
                disabled={this.state.page <= 1}
                type="button"
                className="btn btn-primary"
                onClick={this.handlePrevClick}
              >
                &laquo; Previous
              </button>
              <button
                disabled={
                  this.state.page + 1 > Math.ceil(this.state.totalResults / 8)
                }
                type="button"
                className="btn btn-primary"
                onClick={this.handleNextClick}
              >
                Next &raquo;
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default News;
