import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {
      title,
      description,
      imageurl,
      newsurl,
      isDarkMode,
      author,
      publishedAt,
    } = this.props;

    const descriptioncolor = isDarkMode ? "white" : "black";
    const titlecolor = isDarkMode ? "white" : "black";
    const datcolor = isDarkMode ? "white" : "black";

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          height: "500px",
          padding: "10px",
        }}
      >
        <div style={{ width: "18rem" }}>
          <img
            src={
              imageurl
                ? imageurl
                : "https://c8.alamy.com/comp/CNYK1X/the-word-news-in-3d-letters-on-white-background-das-wort-news-aus-CNYK1X.jpg"
            }
            className="card-img-top"
            alt="..."
            height={200}
          />
          <div className="card-body" style={{ paddingTop: "10px" }}>
            <h5 className="card-title" style={{ color: titlecolor }}>
              {title}...
            </h5>
            <span className="badge bg-success">By, {author ? author : "unknown"}</span>
            <p className="card-text" style={{ color: descriptioncolor }}>
              {description}...
            </p>
            <p className="card-text">
              <small style={{ color: datcolor }}>
                published at:{" "}
                {publishedAt ? new Date(publishedAt).toUTCString() : "unknown"}
              </small>
            </p>
            <a
              href={newsurl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
