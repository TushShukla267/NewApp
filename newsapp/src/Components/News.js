import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

    constructor(){
        super();
        console.log("hello i am the constructor of News componenet")
        this.state ={
            articles : [],
            loading :false,
            page:1
        }
    }

    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b353ff04cbaf46ae881287b25efa22bd&page=1&pageSize=8";
        this.setState({loading:true})  // set state to show spinner when data is being fetched
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles : parsedData.articles , totalResults:parsedData.totalResults ,loading:false})
    }

     HandlePrevClick = async () =>{
        let url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b353ff04cbaf46ae881287b25efa22bd&page=${this.state.page - 1}&pageSize=8`;
        this.setState({loading:true}) 
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page : this.state.page - 1,
            articles : parsedData.articles,
            loading:false
        })

    }

    HandleNextClick = async () =>{
        let url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b353ff04cbaf46ae881287b25efa22bd&page=${this.state.page + 1}&pageSize=8`;
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/8)){

        }
        else{
            this.setState({loading:true}) 
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                page : this.state.page +1,
                articles : parsedData.articles,
                loading:false
        })
            
        }
    }

  render() {
    return (
      <div className='container my-5'>
        <h1>Top Tech Headlines</h1>
        <br/><br/>
        {this.state.loading && <Spinner/>}
        <div className='row'>
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-3" key={element.url}>
                <NewsItem title={element?element.title.slice(0 , 45):"not available"} description={element?element.description.slice(0 , 90):"not available"} imageurl={element?element.urlToImage:""} newsurl={element.url}/>
                </div>
            })}
        </div>

        <br/><br/><br/><br/>

        <div className="d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" class="btn btn-primary" onClick={this.HandlePrevClick}>&laquo; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/8)} type="button" class="btn btn-primary" onClick={this.HandleNextClick}>Next &raquo;</button>
        </div>

      </div>
    )
  }
}

export default News
