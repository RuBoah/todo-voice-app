import Todo from "../models/Todo.js";

class LocalStorage {
  constructor(key = "todos-v1") {
    this.key = key;
  }

  save(todos) {
    try {
      const json = JSON.stringify(todos.map((t) => t.toJSON()));
      localStorage.setItem(this.key, json);
      return true;
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
      return false;
    }
  }

  load() {
    try {
      const json = localStorage.getItem(this.key);
      if (!json) return [];

      const data = JSON.parse(json);
      return data.map((item) => Todo.fromJSON(item));
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
      return [];
    }
  }

  clear() {
    try {
      localStorage.removeItem(this.key);
      return true;
    } catch (error) {
      console.error("Failed to clear localStorage:", error);
      return false;
    }
  }
}

export default LocalStorage;
