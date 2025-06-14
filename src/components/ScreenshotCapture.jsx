/*import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

const ScreenshotCapture = () => {
  const [listening, setListening] = useState(() => localStorage.getItem('voiceListening') === 'true');
  const [showToast, setShowToast] = useState(false);
  const micRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    micRef.current = new SpeechRecognition();
    micRef.current.continuous = true;
    micRef.current.interimResults = false;
    micRef.current.lang = 'en-US';

    micRef.current.onstart = () => setListening(true);
    micRef.current.onend = () => setListening(false);

    micRef.current.onresult = (e) => {
      const transcript = e.results[e.resultIndex][0].transcript.toLowerCase();
      if (transcript.includes('take screenshot')) takeScreenshot();
    };

    if (listening) micRef.current.start();

    return () => micRef.current?.stop();
  }, [listening]);

  useEffect(() => {
    localStorage.setItem('voiceListening', listening.toString());
  }, [listening]);

  const toggleListening = () => {
    if (!micRef.current) return;
    listening ? micRef.current.stop() : micRef.current.start();
  };

  const takeScreenshot = () => {
    html2canvas(document.body).then(canvas => {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `screenshot_${timestamp}.png`;

      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL();
      link.click();

      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    });
  };

  return (
    <>
      <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
        <button
          onClick={toggleListening}
          style={{
            padding: '10px 16px',
            backgroundColor: listening ? '#0f0' : '#f33',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {listening ? '🎤 Listening (Click to Stop)' : '🛑 Not Listening (Click to Start)'}
        </button>
      </div>

      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: 80,
          right: 20,
          backgroundColor: '#333',
          color: '#fff',
          padding: '10px 15px',
          borderRadius: '5px',
          zIndex: 1000,
          fontSize: '0.9rem',
          animation: 'fadeinout 2s ease'
        }}>
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

export default ScreenshotCapture;*/
