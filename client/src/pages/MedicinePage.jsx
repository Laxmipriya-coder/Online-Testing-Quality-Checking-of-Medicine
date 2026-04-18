import { useEffect, useState } from "react";
import authFetch from "../utils/authFetch";
import "./MedicinePage.css";

const MedicinePage = () => {
  const [medicines, setMedicines] = useState([]);
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔵 GET ALL MEDICINES
  const fetchMedicines = async () => {
    try {
      const data = await authFetch("/medicine");
      console.log("API DATA", data);
       setMedicines(Array.isArray(data) ? data : data?.data || []);
  } catch (err) {
    console.log("Error:", err.message);
  }
};

  useEffect(() => {
    fetchMedicines();
  }, []);

  // 🔵 ADD MEDICINE
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!name || !batch) return alert("Fill all fields");

    try {
      setLoading(true);

      await authFetch("/medicine", {
        method: "POST",
        body: { name, batch }
      });

      setName("");
      setBatch("");

      fetchMedicines();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔵 DELETE MEDICINE
  const handleDelete = async (id) => {
    try {
      await authFetch(`/medicine/${id}`, {
        method: "DELETE"
      });

      fetchMedicines();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="medicine-container">

      <h2>💊 Medicine Management</h2>

      {/* ADD FORM */}
      <form className="medicine-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Medicine Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Batch Number"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        />

        <button disabled={loading}>
          {loading ? "Adding..." : "Add Medicine"}
        </button>
      </form>

      {/* LIST */}
      <div className="medicine-list">
        {medicines.length === 0 ? (
          <p>No medicines found</p>
        ) : (
          medicines.map((med) => (
            <div key={med.id} className="medicine-card">
              <div>
                <h4>{med.name}</h4>
                <p>Batch: {med.batch}</p>
              </div>

              <button onClick={() => handleDelete(med.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default MedicinePage;