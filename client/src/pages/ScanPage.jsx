import React, { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import authFetch from "../utils/authFetch";
import { useNavigate } from "react-router-dom";
import "./ScanPage.css";

const ScanPage = () => {
  const [batch, setBatch] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);

  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);

  const navigate = useNavigate();

  // 🧠 API CALL
  const handleScan = async (manualBatch) => {
    const value = manualBatch || batch;

    if (!value.trim()) {
      alert("Enter or scan barcode");
      return;
    }

    try {
      setLoading(true);

      const res = await authFetch(`/scan/${value}`);

      navigate("/result", { state: res });
    } catch (err) {
      console.error("Scan Error:", err);
      alert("Scan failed");
    } finally {
      setLoading(false);
    }
  };

  // 📷 START SCANNER
  const startScanner = async () => {
    try {
      setScanning(true);

      const codeReader = new BrowserMultiFormatReader();
      codeReaderRef.current = codeReader;

      const devices =
        await BrowserMultiFormatReader.listVideoInputDevices();

      const deviceId = devices?.[0]?.deviceId;

      if (!videoRef.current) return;

      await codeReader.decodeFromVideoDevice(
        deviceId,
        videoRef.current,
        (result, err) => {
          if (result) {
            const text = result.getText();
            setBatch(text);
            stopScanner();
            handleScan(text);
          }

          if (err && err.name !== "NotFoundException") {
            console.log(err);
          }
        }
      );
    } catch (err) {
      console.error("Camera Error:", err);
      setScanning(false);
    }
  };

  // ❌ STOP SCANNER
  const stopScanner = () => {
    setScanning(false);

    if (codeReaderRef.current) {
      try {
        codeReaderRef.current.reset?.();
      } catch (e) {}
      codeReaderRef.current = null;
    }

    const video = videoRef.current;

    if (video && video.srcObject) {
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      video.srcObject = null;
    }
  };

  // 🧹 cleanup
  useEffect(() => {
    return () => {
      if (codeReaderRef.current) {
        codeReaderRef.current.reset?.();
      }
    };
  }, []);

  return (
    <div className="scan-container">
      <div className="scan-card">

        <h2 className="title">📷 Medicine Scanner</h2>
        <p className="subtitle">
          Scan barcode or enter manually to get medicine details
        </p>

        {/* INPUT */}
        <input
          className="input-box"
          type="text"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          placeholder="Enter or scan barcode"
        />

        {/* SEARCH BUTTON */}
        <button
          className="btn primary"
          onClick={() => handleScan()}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Medicine"}
        </button>

        {/* CAMERA BUTTONS */}
        {!scanning ? (
          <button className="btn success" onClick={startScanner}>
            📷 Start Camera Scanner
          </button>
        ) : (
          <button className="btn danger" onClick={stopScanner}>
            ❌ Stop Scanner
          </button>
        )}

        {/* CAMERA VIEW */}
        <div className="camera-box">
          <video ref={videoRef} />
        </div>

      </div>
    </div>
  );
};

export default ScanPage;