import React, { useState } from "react";
import "./MedicineSection.css";

import amoxicillin from "../images/amoxicillin.jpeg";
import azithromycin from "../images/azithromycin.jpeg";
import cetirizine from "../images/centrizine.jpeg";
import levocetirizine from "../images/levocetirizine.jpeg";
import omeprazole from "../images/omiprazole.jpeg";
import pantoprazole from "../images/pantoprazole.jpeg";
import paracetamol from "../images/paracetamol.jpeg";

const medicines = [
    {
    img: amoxicillin,
    name: "Amoxicillin",
    rating: "★★★★☆",
    details: "Antibiotic used for infections like throat, ear, and lungs."
  },
   {
    img: azithromycin,
    name: "Azithromycin",
    rating: "★★★★☆",
    details: "Antibiotic used to treat bacterial infections."
  },
  {
    img: cetirizine,
    name: "Cetirizine",
    rating: "★★★★★",
    details: "Used for allergy relief, cold, and sneezing."
  },
  {
    img: levocetirizine,
    name: "Levocetirizine",
    rating: "★★★★★",
    details: "Used for allergies, itching, and sneezing."
  },
  {
    img: omeprazole,
    name: "Omeprazole",
    rating: "★★★★☆",
    details: "Used to reduce stomach acid and treat acidity."
  },
  {
    img: pantoprazole,
    name: "Pantoprazole",
    rating: "★★★★☆",
    details: "Used for acidity, GERD, and stomach ulcers."
  },
  {
    img: paracetamol,
    name: "Paracetamol",
    rating: "★★★★☆",
    details: "Used for fever, headache, and mild pain relief."
  }
];

export default function MedicineSection() {
  const [selectedMed, setSelectedMed] = useState(null);

  return (
    <div className="medicine-section">

      <h2 className="medicine-title">
        Top Rated Medicines
      </h2>

      <div className="medicine-scroll">

        {medicines.map((med, index) => (
          <div
            key={index}
            className="medicine-card"
            onClick={() => setSelectedMed(med)}
          >
            <img src={med.img} alt={med.name} className="medicine-img" />

            <div className="medicine-name">
              {med.name}
            </div>

            <div className="stars">
              {med.rating}
            </div>
          </div>
        ))}

      </div>

      {/* 🔥 Modal */}
      {selectedMed && (
        <div className="modal">
          <div className="modal-content">

            <img src={selectedMed.img} className="medicine-img" />

            <h3>{selectedMed.name}</h3>

            <p>{selectedMed.details}</p>

            <button
              className="close-btn"
              onClick={() => setSelectedMed(null)}
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}