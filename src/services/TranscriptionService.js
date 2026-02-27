class TranscriptionService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.isSupported = this.checkSupport();
  }

  checkSupport() {
    return (
      typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    );
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
   * @param {Function} onResult
   * @param {Function} onError
   */
  startListening(onResult, onError) {
    if (!this.isSupported) {
      onError(new Error("Speech recognition not supported"));
      return;
    }

    // Prevent multiple simultaneous recordings
    if (this.isListening) {
      console.warn("Already listening, ignoring start request");
      return;
    }

    if (!this.recognition) {
      this.initialize();
    }

    // Set up event handlers
    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      this.isListening = false;
      onResult(transcript);
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      let errorMessage = "Speech recognition error";

      // Ignore abort errors (user cancelled)
      if (event.error === "aborted") {
        console.log("Recognition aborted by user");
        return;
      }

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

    // Start recognition with error handling
    try {
      this.recognition.start();
      this.isListening = true;
    } catch (error) {
      // Already started error
      if (error.name === "InvalidStateError") {
        console.warn("Recognition already started, stopping and restarting");
        this.stopListening();

        // Try again after brief delay
        setTimeout(() => {
          try {
            this.recognition.start();
            this.isListening = true;
          } catch (retryError) {
            this.isListening = false;
            onError(retryError);
          }
        }, 100);
      } else {
        this.isListening = false;
        onError(error);
      }
    }
  }

  /**
   * Stop listening
   */
  stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.warn("Stop error:", e);
      }
      this.isListening = false;
    }
  }

  /**
   * Get listening state
   */
  getIsListening() {
    return this.isListening;
  }
}

export default TranscriptionService;
