import React, { useState } from "react";
import "./PopularMedicine.css";

// images import (tumhare folder ke hisaab se)
import paraImg from "../images/paracetamol.jpeg";
import aziImg from "../images/azithromycin.jpeg";
import cetiImg from "../images/centrizine.jpeg";
import omeImg from "../images/omiprazole.jpeg";

const popularMedicines = [
  {
    name: "Paracetamol",
    image: paraImg,
    rating: 5,
    benefits: "Reduces fever and relieves mild to moderate pain.",
    review: "Very effective and widely used medicine with minimal side effects."
  },
  {
    name: "Azithromycin",
    image: aziImg,
    rating: 4,
    benefits: "Treats bacterial infections like throat and skin infections.",
    review: "Works fast but should be taken with doctor advice."
  },
  {
    name: "Cetirizine",
    image: cetiImg,
    rating: 5,
    benefits: "Relieves allergy symptoms like sneezing and itching.",
    review: "Very useful for allergies, may cause slight drowsiness."
  },
  {
    name: "Omeprazole",
    image: omeImg,
    rating: 4,
    benefits: "Reduces stomach acid and treats acidity.",
    review: "Helpful for acid reflux but long-term use should be monitored."
  },
];

const PopularMedicine = () => {

  const [selectedMedicine, setSelectedMedicine] = useState(null);

  return (
    <div className="popular-section">

      <h2 className="popular-title">Popular Medicines</h2>

      {/* 🔹 Cards */}
      <div className="popular-grid">
        {popularMedicines.map((med, index) => (
          <div
            key={index}
            className="popular-card"
            onClick={() => setSelectedMedicine(med)}
          >
            <img src={med.image} alt={med.name} className="popular-img" />
            <h4 className="popular-name">{med.name}</h4>

            <div className="popular-rating">
              {"★".repeat(med.rating)}
              {"☆".repeat(5 - med.rating)}
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 Details Section */}
      {selectedMedicine && (
        <div className="medicine-details">
          <h2>{selectedMedicine.name}</h2>
          <p><strong>Benefits:</strong> {selectedMedicine.benefits}</p>
          <p><strong>Review:</strong> {selectedMedicine.review}</p>
        </div>
      )}

    </div>
  );
};

export default PopularMedicine;