import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import "./ScanPage.css";

// DEMO DATABASE (replace with backend later)
const productDatabase = {
  "123456": {
    name: "Paracetamol",
    type: "Medicine",
    expiry: "2026-12-10",
    composition: "Acetaminophen 500mg",
    description: "Used for fever and pain relief"
  },
  "987654": {
    name: "Face Mask",
    type: "Consumable",
    expiry: "2027-06-01",
    composition: "Non-woven fabric",
    description: "Protects from dust and virus"
  }
};

export default function ScanPage() {
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);
  const [torchOn, setTorchOn] = useState(false);

  // 🔊 beep sound
  const playBeep = () => {
    const audio = new Audio(
      "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
    );
    audio.play();
  };

  // 📷 START SCANNER
  const startScan = async () => {
    try {
      const codeReader = new BrowserMultiFormatReader();
      codeReaderRef.current = codeReader;

      const devices = await BrowserMultiFormatReader.listVideoInputDevices();
      const deviceId = devices[0]?.deviceId;

      if (!deviceId) {
        setError("No camera found");
        return;
      }

      setScanning(true);

      codeReader.decodeFromVideoDevice(
        deviceId,
        videoRef.current,
        (result, err) => {
          if (result) {
            const code = result.getText();
            console.log("Scanned:", code);

            if (productDatabase[code]) {
              playBeep();
              setResult(productDatabase[code]);
              stopScan();
            } else {
              setError("Product not found in database");
            }
          }
        }
      );
    } catch (err) {
      setError("Camera access failed");
    }
  };

  // 🛑 STOP SCANNER
  const stopScan = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }
    setScanning(false);
  };

  // 🔦 Torch (works on supported devices only)
  const toggleTorch = async () => {
    try {
      const track = videoRef.current?.srcObject?.getVideoTracks?.()[0];

      if (track && track.getCapabilities().torch) {
        await track.applyConstraints({
          advanced: [{ torch: !torchOn }]
        });
        setTorchOn(!torchOn);
      } else {
        alert("Torch not supported on this device");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    return () => stopScan();
  }, []);

  return (
    <div className="scan-container">

      <h2>📷 PRO Medicine Scanner</h2>

      {/* CAMERA */}
      <video ref={videoRef} className="camera-box" />

      {/* BUTTONS */}
      <div className="btn-group">

        {!scanning ? (
          <button onClick={startScan}>▶ Start Scan</button>
        ) : (
          <button onClick={stopScan}>⛔ Stop Scan</button>
        )}

        <button onClick={toggleTorch}>
          🔦 {torchOn ? "Torch Off" : "Torch On"}
        </button>

      </div>

      {/* ERROR */}
      {error && <p className="error">{error}</p>}

      {/* RESULT */}
      {result && (
        <div className="result-card">

          <h3>{result.name}</h3>

          <p><b>Type:</b> {result.type}</p>
          <p><b>Expiry:</b> {result.expiry}</p>
          <p><b>Composition:</b> {result.composition}</p>
          <p><b>Description:</b> {result.description}</p>

          <button onClick={() => {
            setResult(null);
            setError("");
            startScan();
          }}>
            🔄 Scan Again
          </button>

        </div>
      )}

    </div>
  );
}