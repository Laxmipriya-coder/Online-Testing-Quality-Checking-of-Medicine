import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Fake DB
const MEDICINE_DB = {
  "123456789": {
    name: "Paracetamol 500mg",
    manufacturer: "Jay Shree Pharma",
    uses: "Fever & Pain Relief",
    sideEffects: "Nausea",
    lot: "AL2165",
    exp: "12/2026",
    rating: 4.2,
    alternatives: ["Crocin", "Dolo 650"]
  }
};

export default function ScanPage() {
  const [barcode, setBarcode] = useState("");
  const [medicine, setMedicine] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [history, setHistory] = useState([]);

  // 🔊 Voice
  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
  };

  // 📅 Expiry Check
  const checkExpiry = (exp) => {
    const [m, y] = exp.split("/");
    const expiry = new Date(y, m - 1);
    return expiry >= new Date();
  };

  // ⚠️ Near Expiry
  const nearExpiry = (exp) => {
    const [m, y] = exp.split("/");
    const expiry = new Date(y, m - 1);
    const today = new Date();

    const diffMonths =
      (expiry.getFullYear() - today.getFullYear()) * 12 +
      (expiry.getMonth() - today.getMonth());

    return diffMonths <= 1 && diffMonths >= 0;
  };

  // 🧠 Safety Score
  const calculateScore = (med) => {
    let score = 100;

    if (!checkExpiry(med.exp)) score -= 60;
    if (nearExpiry(med.exp)) score -= 20;
    if (med.sideEffects.toLowerCase().includes("nausea")) score -= 10;

    return score;
  };

  // 🚀 Scan
  const handleScan = () => {
    setScanning(true);

    setTimeout(() => {
      const data = MEDICINE_DB[barcode];

      if (data) {
        const score = calculateScore(data);
        const valid = checkExpiry(data.exp);

        const result = { ...data, score, valid };

        setMedicine(result);

        // 🔊 Voice
        speak(valid ? "Medicine is safe" : "Warning! Medicine expired");

        // ⚠️ Alert
        if (!valid) alert("⚠️ Medicine is expired!");

        // 📜 History
        const newHistory = [
          {
            name: data.name,
            time: new Date().toLocaleString()
          },
          ...history
        ].slice(0, 5);

        setHistory(newHistory);
      } else {
        setMedicine(null);
      }

      setScanning(false);
    }, 1200);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold text-center">
        Scan Medicine
      </h1>

      {/* INPUT */}
      <div className="shadow-xl p-4 rounded-2xl bg-white">
        <input
          type="text"
          placeholder="Enter barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="w-full p-3 border rounded-xl mb-3"
        />

        <button
          onClick={handleScan}
          className="w-full py-3 bg-blue-500 text-white rounded-xl"
        >
          Scan
        </button>
      </div>

      {/* LOADING */}
      {scanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-blue-500"
        >
          Scanning...
        </motion.div>
      )}

      {/* RESULT */}
      {medicine && !scanning && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="p-4 bg-white rounded-2xl shadow-xl space-y-3">

            <h2 className="text-xl font-bold">{medicine.name}</h2>

            <p><b>Manufacturer:</b> {medicine.manufacturer}</p>
            <p><b>Uses:</b> {medicine.uses}</p>
            <p><b>Expiry:</b> {medicine.exp}</p>

            {/* STATUS */}
            <div
              className={`p-3 text-white text-center rounded-xl ${
                medicine.valid ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {medicine.valid ? "✔ SAFE" : "❌ EXPIRED"}
            </div>

            {/* Near expiry */}
            {nearExpiry(medicine.exp) && (
              <p className="text-yellow-600 font-bold">
                ⚠️ Expiring Soon!
              </p>
            )}

            {/* SCORE */}
            <p className="text-lg font-bold">
              Safety Score: {medicine.score}%
            </p>

            {/* SUGGESTIONS */}
            {!medicine.valid && (
              <div>
                <p className="font-semibold">Alternatives:</p>
                <ul className="list-disc ml-5">
                  {medicine.alternatives.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </motion.div>
      )}

      {/* HISTORY */}
      {history.length > 0 && (
        <div className="bg-white p-4 rounded-2xl shadow-xl">
          <h3 className="font-bold mb-2">Scan History</h3>

          {history.map((h, i) => (
            <p key={i}>
              {h.name} - {h.time}
            </p>
          ))}
        </div>
      )}

      {/* NOT FOUND */}
      {!medicine && barcode && !scanning && (
        <p className="text-red-500 text-center">
          No medicine found
        </p>
      )}

    </div>
  );
}