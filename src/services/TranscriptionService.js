class TranscriptionService {
  constructor() {
    this.recognition = null;
    this.isListening = false;

    this.isSupported = this.checkSupport();
  }

  checkSupport() {
    return "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
  }

  initialize() {
    if (!this.isSupported) {
      throw new Error("Speech recognition not supported in this browser");
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = "en-US";
    this.recognition.maxAlternatives = 1;
  }

  /**
   * Start listening
   * @param {Function} onResult - Callback when transcription complete
   * @param {Function} onError - Callback on error
   */
  startListening(onResult, onError) {
    if (!this.isSupported) {
      onError(new Error("Speech recognition not supported"));
      return;
    }

    if (!this.recognition) {
      this.initialize();
    }

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      this.isListening = false;
      onResult(transcript);
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      let errorMessage = "Speech recognition error";

      switch (event.error) {
        case "no-speech":
          errorMessage = "No speech detected. Please try again.";
          break;
        case "audio-capture":
          errorMessage = "Microphone not found or not accessible.";
          break;
        case "not-allowed":
          errorMessage = "Microphone permission denied.";
          break;
        case "network":
          errorMessage = "Network error. Check your connection.";
          break;
        default:
          errorMessage = `Error: ${event.error}`;
      }

      onError(new Error(errorMessage));
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (error) {
      this.isListening = false;
      onError(error);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  getIsListening() {
    return this.isListening;
  }
}

export default TranscriptionService;
