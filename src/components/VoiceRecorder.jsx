import { useState, useEffect } from "react";

/**
 * VoiceRecorder Component
 * Microphone button for voice recording
 */
export default function VoiceRecorder({
  onTranscript,
  onError,
  disabled,
  isRecording,
}) {
  const handleClick = () => {
    if (disabled || isRecording) return;

    // Trigger recording
    onTranscript();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isRecording}
      className={`p-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isRecording
          ? "bg-red-500 hover:bg-red-600 focus:ring-red-500 animate-pulse cursor-wait"
          : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
      } ${disabled || isRecording ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      aria-label={isRecording ? "Recording..." : "Start recording"}
      title={isRecording ? "Recording..." : "Click to record voice note"}
    >
      <span className="text-2xl">{isRecording ? "⏹️" : "🎤"}</span>
    </button>
  );
}
