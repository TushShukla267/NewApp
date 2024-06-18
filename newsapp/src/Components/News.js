import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    const { country, category } = this.props;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=b353ff04cbaf46ae881287b25efa22bd&page=1&pageSize=8`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
  }

  handlePrevClick = async () => {
    const { country, category } = this.props;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=b353ff04cbaf46ae881287b25efa22bd&page=${this.state.page - 1}&pageSize=8`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ page: this.state.page - 1, articles: parsedData.articles, loading: false });
  }

  handleNextClick = async () => {
    const { country, category } = this.props;
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 8)) return;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=b353ff04cbaf46ae881287b25efa22bd&page=${this.state.page + 1}&pageSize=8`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ page: this.state.page + 1, articles: parsedData.articles, loading: false });
  }


  render() {

    const {isDarkMode , category} = this.props;

    const headingcolor = isDarkMode ? "white" : "black";

    return (
      <div className='container my-5'>
        <h1 style={{ display: "flex" , justifyContent : "center" , color: headingcolor , fontFamily : "initial" , fontSize : "50px" , fontWeight : "bolder"}}>Top {category} Headlines</h1>
        <br /><br />
        {this.state.loading && <Spinner />}
        <div className='row'>
          {!this.state.loading && this.state.articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 45) : "not available"} description={element.description ? element.description.slice(0, 90) : "not available"} imageurl={element.urlToImage} newsurl={element.url} isDarkMode={isDarkMode}/>
              <br /><br />
            </div>
          ))}
        </div>
        <br /><br />
        <div className="d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&laquo; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 8)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &raquo;</button>
        </div>
      </div>
    );
  }
}

export default News;
