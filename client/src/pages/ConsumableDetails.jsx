import React from "react";
import { useParams } from "react-router-dom";
import consumablesData from "../data/consumablesData";

const ConsumableDetails = () => {
  const { id } = useParams();

  const item = consumablesData.find(
    (data) => data.id === parseInt(id)
  );

  if (!item) {
    return <h2 style={{ textAlign: "center" }}>No Data Found ❌</h2>;
  }

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>{item.name}</h1>

      <img src={item.image} alt={item.name} width="150" />

      <p>{item.description}</p>

      <div>{"⭐".repeat(item.rating)}</div>
    </div>
  );
};

export default ConsumableDetails;