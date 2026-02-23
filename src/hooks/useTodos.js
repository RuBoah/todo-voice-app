import { useState, useEffect } from "react";
import TodoService from "../services/TodoService.js";
import LocalStorage from "../storage/LocalStorage.js";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

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

  const clearError = () => {
    setError(null);
  };

  return {
    todos,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearError,
  };
}
