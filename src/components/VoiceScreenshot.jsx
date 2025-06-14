import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

const VoiceScreenshot = () => {
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
      if (transcript.includes('screenshot')) takeScreenshot();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('voiceListening', listening.toString());

    if (listening && micRef.current) {
      micRef.current.start();
    } else {
      micRef.current?.stop();
    }

    return () => micRef.current?.stop();
  }, [listening]);

  const toggleListening = () => {
    if (!micRef.current) return;
    setListening((prev) => !prev);
  };

  const takeScreenshot = () => {
    const target = document.getElementById('root') || document.documentElement;

    html2canvas(target, {
      scrollY: -window.scrollY,  // Ensure full view capture
      scale: 2,                  // High resolution
      useCORS: true              // Avoid cross-origin image issues
    }).then(canvas => {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `screenshot_${timestamp}.png`;

      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();

      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    });
  };

  return (
    <>
      <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
        <button
          onClick={toggleListening}
          style={{
            padding: '8px 12px',
            backgroundColor: listening ? '#10b981' : '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '13px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          {listening ? '🎤 Listening' : '🎙️ Start Voice'}
        </button>
      </div>

      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: 70,
          right: 16,
          backgroundColor: '#333',
          color: '#fff',
          padding: '8px 12px',
          borderRadius: '6px',
          zIndex: 1000,
          fontSize: '0.75rem',
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

export default VoiceScreenshot;
