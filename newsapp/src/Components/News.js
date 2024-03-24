import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor(){
        super();
        console.log("hello i am the constructor of News componenet")
        this.state ={
            articles : [],
            loading :false
        }
    }

    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b353ff04cbaf46ae881287b25efa22bd";
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles : parsedData.articles})
    }
  render() {
    return (
      <div className='container my-5'>
        <h1>Top Tech Headlines</h1>
        <br/><br/>
        <div className='row'>
            {this.state.articles.map((element)=>{
                return <div className="col-md-3" key={element.url}>
                <NewsItem title={element?element.title.slice(0 , 45):"not available"} description={element?element.description.slice(0 , 90):"not available"} imageurl={element?element.urlToImage:""} newsurl={element.url}/>
                </div>
            })}
        </div>
      </div>
    )
  }
}

export default News
