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

export default consumablesData;