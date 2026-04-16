import React from "react";
import { useLocation } from "react-router-dom";
import searchData from "../data/searchData";

export default function SearchResults() {
  const query = new URLSearchParams(useLocation().search).get("query");

  const results = searchData.filter((item) =>
    item.name.toLowerCase().includes(query?.toLowerCase() || "")
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Results for: {query}</h2>

      {results.length === 0 ? (
        <p>No results found 😢</p>
      ) : (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {results.map((item, index) => (
            <div
              key={index}
              style={{
                width: "200px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "10px",
              }}
            >
              <img
                src={item.img}
                alt={item.name}
                style={{ width: "100%", height: "120px", objectFit: "cover" }}
              />
              <h4>{item.name}</h4>
              <p>{item.details}</p>
              <small>{item.rating}</small>
              <p>Type: {item.type}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}