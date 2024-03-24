import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title , description , imageurl , newsurl} = this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
            <img src={imageurl?imageurl:"https://c8.alamy.com/comp/CNYK1X/the-word-news-in-3d-letters-on-white-background-das-wort-news-aus-CNYK1X.jpg"} className="card-img-top" alt="..."/> 
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
             <p className="card-text">{description}...</p>
               <a href={newsurl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
