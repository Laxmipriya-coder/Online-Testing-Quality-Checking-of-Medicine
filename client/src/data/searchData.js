import consumablesData from "./consumablesData";

import amoxicillin from "../images/amoxicillin.jpeg";
import azithromycin from "../images/azithromycin.jpeg";
import cetirizine from "../images/centrizine.jpeg";
import levocetirizine from "../images/levocetirizine.jpeg";
import omeprazole from "../images/omiprazole.jpeg";
import pantoprazole from "../images/pantoprazole.jpeg";
import paracetamol from "../images/paracetamol.jpeg";

// MEDICINE DATA
const medicines = [
  {
    type: "medicine",
    img: amoxicillin,
    name: "Amoxicillin",
    rating: "★★★★☆",
    details: "Antibiotic used for infections"
  },
  {
    type: "medicine",
    img: azithromycin,
    name: "Azithromycin",
    rating: "★★★★☆",
    details: "Treats bacterial infections"
  },
  {
    type: "medicine",
    img: cetirizine,
    name: "Cetirizine",
    rating: "★★★★★",
    details: "Allergy relief medicine"
  },
  {
    type: "medicine",
    img: levocetirizine,
    name: "Levocetirizine",
    rating: "★★★★★",
    details: "Allergy & itching relief"
  },
  {
    type: "medicine",
    img: omeprazole,
    name: "Omeprazole",
    rating: "★★★★☆",
    details: "Reduces stomach acid"
  },
  {
    type: "medicine",
    img: pantoprazole,
    name: "Pantoprazole",
    rating: "★★★★☆",
    details: "Acidity treatment"
  },
  {
    type: "medicine",
    img: paracetamol,
    name: "Paracetamol",
    rating: "★★★★☆",
    details: "Fever & pain relief"
  }
];

// COMBINED EXPORT
const searchData = [...medicines, ...consumablesData.map(item => ({
  type: "consumable",
  img: item.image,
  name: item.name,
  rating: item.rating,
  details: item.description
}))];

export default searchData;