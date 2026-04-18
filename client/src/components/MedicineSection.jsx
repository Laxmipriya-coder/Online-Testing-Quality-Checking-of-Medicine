import { useEffect, useState } from "react";
import authFetch from "../utils/authFetch";
import { BASE_URL } from "../utils/api";

const MedicineSection = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    authFetch(`${BASE_URL}/medicine`)
      .then(res => res.json())
      .then(data => setMedicines(data));
  }, []);

  return (
    <div>
      <ul>
        {medicines.map((med, i) => (
          <li key={i}>
            {med.name} - {med.batch_no}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineSection;