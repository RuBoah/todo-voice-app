import { useState, useEffect } from "react";
import TodoService from "../services/TodoService.js";
import LocalStorage from "../storage/LocalStorage.js";
import TranscriptionService from "../services/TranscriptionService.js";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  const [transcriptionService] = useState(() => new TranscriptionService());
  const [isRecording, setIsRecording] = useState(false);

  const [service] = useState(() => {
    const storage = new LocalStorage();
    return new TodoService(storage);
  });

  useEffect(() => {
    const loadedTodos = service.loadTodos();
    setTodos(loadedTodos);
  }, [service]);

  const addTodo = (title) => {
    try {
      const newTodo = service.createTodo(title);
      setTodos(service.getAllTodos());
      setError(null);
      return newTodo;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const toggleTodo = (id) => {
    try {
      service.toggleTodo(id);
      setTodos(service.getAllTodos());
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTodo = (id) => {
    try {
      service.deleteTodo(id);
      setTodos(service.getAllTodos());
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const addVoiceNote = (todoId) => {
    if (!transcriptionService.isSupported) {
      setError(
        "Voice Reading is not supported in this browser. Try using Chrome or Edge.",
      );
      return;
    }

    setIsRecording(true);
    setError(null);

    transcriptionService.startListening(
      // On Success
      (transcript) => {
        try {
          service.addTranscript(todoId, transcript);
          setTodos(service.getAllTodos());
        } catch (err) {
          setError(err.message);
        } finally {
          setIsRecording(false);
        }
      },

      // On Error
      (error) => {
        setError(error.message);
        setIsRecording(false);
      },
    );
  };

  const removeVoiceNote = (todoId) => {
    try {
      service.removeTranscript(todoId);
      setTodos(service.getAllTodos());
    } catch (err) {
      setError(err.message);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const updateTodo = (id, newTitle) => {
    try {
      service.updateTodo(id, newTitle);
      setTodos(service.getAllTodos());
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    todos,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearError,
    updateTodo,
    addVoiceNote,
    removeVoiceNote,
    isRecording,
  };
}
