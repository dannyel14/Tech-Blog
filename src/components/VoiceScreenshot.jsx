import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

const VoiceScreenshot = () => {
  const [listening, setListening] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const micRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const mic = new SpeechRecognition();
    mic.continuous = true;
    mic.interimResults = false;
    mic.lang = "en-US";

    mic.onstart = () => setListening(true);
    mic.onend = () => {
      setListening(false);
      // auto-restart with small delay (prevents error in Chrome)
      if (micRef.current?.shouldListen && !listening) {
        setTimeout(() => mic.start(), 300);
      }
    };

    mic.onresult = (e) => {
      const transcript =
        e.results[e.resultIndex][0].transcript.toLowerCase();
      if (transcript.includes("screenshot")) takeScreenshot();
    };

    micRef.current = mic;

    return () => {
      mic.stop();
      micRef.current = null;
    };
  }, [listening]);

  const toggleListening = () => {
    if (!micRef.current) return;
    if (listening) {
      micRef.current.shouldListen = false;
      micRef.current.stop();
    } else {
      micRef.current.shouldListen = true;
      micRef.current.start();
    }
  };

  const takeScreenshot = () => {
  const target = document.documentElement; // ✅ viewport root

  html2canvas(target, {
    scale: 2, // lower scale = faster
    width: window.innerWidth,
    height: window.innerHeight,
    x: window.scrollX,
    y: window.scrollY,
    logging: false, // disable console logs from html2canvas
  }).then((canvas) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `screenshot_${timestamp}.png`;

    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();

    // 🔦 Flash effect
    const flash = document.createElement("div");
    flash.style.position = "fixed";
    flash.style.top = 0;
    flash.style.left = 0;
    flash.style.width = "100vw";
    flash.style.height = "100vh";
    flash.style.background = "#fff";
    flash.style.opacity = "0.9";
    flash.style.zIndex = "9999";
    flash.style.transition = "opacity 0.25s ease"; // quicker fade

    document.body.appendChild(flash);

    setTimeout(() => {
      flash.style.opacity = "0";
      setTimeout(() => flash.remove(), 250);
    }, 50);

    // ✅ Toast (shorter delay if you want faster feedback)
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  });
};


  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <button
          onClick={toggleListening}
          style={{
            padding: "8px 12px",
            backgroundColor: listening ? "#10b981" : "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "13px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            transition: "transform 0.2s ease",
          }}
        >
          {listening ? "🎤 Listening" : "🎙️ Start Voice"}
        </button>
      </div>

      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: 70,
            right: 16,
            backgroundColor: "#333",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: "6px",
            zIndex: 1000,
            fontSize: "0.75rem",
            animation: "fadeinout 2s ease",
          }}
        >
          📸 Screenshot saved!
        </div>
      )}

      <style>{`
        @keyframes fadeinout {
          0% { opacity: 0; transform: translateY(10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>
    </>
  );
};

export default VoiceScreenshot;
