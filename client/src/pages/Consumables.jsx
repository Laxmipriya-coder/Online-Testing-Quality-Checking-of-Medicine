import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Consumables.css";

import mask from "../images/mask.jpg";
import gloves from "../images/handgloves.jpg";
import syringe from "../images/syringe.jpg";
import sanitizer from "../images/sanitizer.jpg";

const consumablesData = [
  {
    id: 1,
    name: "Face Mask",
    image: mask,
    rating: 4,
    description: "Protects from dust, viruses and pollution.",
  },
  {
    id: 2,
    name: "Hand Gloves",
    image: gloves,
    rating: 5,
    description: "Used for hygiene and safety in medical use.",
  },
  {
    id: 3,
    name: "Syringe",
    image: syringe,
    rating: 4,
    description: "Used for injections and medical procedures.",
  },
  {
    id: 4,
    name: "Sanitizer",
    image: sanitizer,
    rating: 5,
    description: "Kills germs and keeps hands clean.",
  },
];

const Consumables = () => {
  const navigate = useNavigate();

  return (
    <div className="consumable-page">
      <h1 className="title">Popular Consumables</h1>

      <div className="consumable-container">
        {consumablesData.map((item) => (
          <div className="consumable-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>

            <div className="rating">
              {"⭐".repeat(item.rating)}
            </div>

            <button
              className="view-btn"
              onClick={() => navigate(`/consumable/${item.id}`, { state: item })}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Consumables;