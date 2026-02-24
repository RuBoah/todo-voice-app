import { useState, useEffect } from "react";

export default function VoiceRecorder({ onTranscript, onError, disabled }) {
  const [isListening, setIsListening] = useState(false);

  const handleClick = () => {
    if (disabled) return;

    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      onTranscript();
    }
  };

  useEffect(() => {
    if (disabled) {
      setIsListening(false);
    }
  }, [disabled]);

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`p-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isListening
          ? "bg-red-500 hover:bg-red-600 focus:ring-red-500 animate-pulse"
          : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      aria-label={isListening ? "Stop recording" : "Start recording"}
      title={isListening ? "Recording..." : "Click to record voice note"}
    >
      <span className="text-2xl">{isListening ? "⏹️" : "🎤"}</span>
    </button>
  );
}
