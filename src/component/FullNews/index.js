import React from "react";
import { useParams } from "react-router-dom";

export default function FullNews() {
  const { data } = useParams();
  console.log(data);

  return data ? (
    <div id="main">
      <div className="h3" style={{ color: "red" }}>
        UnderProgress
      </div>
      <div className="blog-card">
        <figure className="card-banner img-holder">
          <img
            src={data.urlToImage}
            loading="lazy"
            alt="Creating is a privilege but it’s also a gift"
            className="img-cover"
          />
        </figure>
        <div className="card-content">
          <ul
            className="card-meta-list"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <li>
              <a href="#" className="card-tag">
                Source: {data?.source?.name}
              </a>
            </li>
          </ul>
          <h3 className="h4">
            <a href="#" className="card-title hover:underline">
              {data.title}
            </a>
          </h3>
          <p className="card-text">{data.description}</p>
        </div>
      </div>
    </div>
  ) : (
    <div>No Data</div>
  );
}
