import Todo from "../models/Todo.js";
import { validateTodoTitle } from "../utils/validation.js";

class TodoService {
  constructor(storage) {
    this.storage = storage;
    this.todos = [];
  }

  loadTodos() {
    this.todos = this.storage.load();
    return this.todos;
  }

  saveTodos() {
    return this.storage.save(this.todos);
  }

  getAllTodos() {
    return [...this.todos];
  }

  getTodoById(id) {
    return this.todos.find((todo) => todo.id === id);
  }

  createTodo(title) {
    const validation = validateTodoTitle(title);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const todo = new Todo(title.trim());
    this.todos.push(todo);
    this.saveTodos();

    return todo;
  }

  toggleTodo(id) {
    const todo = this.getTodoById(id);
    if (!todo) {
      throw new Error("Todo not found");
    }

    todo.completed = !todo.completed;
    todo.updatedAt = new Date().toISOString();
    this.saveTodos();

    return todo;
  }

  deleteTodo(id) {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error("Todo not found");
    }

    this.todos.splice(index, 1);
    this.saveTodos();
    return true;
  }

  updateTodo(id, newTitle) {
    const todo = this.getTodoById(id);
    if (!todo) {
      throw new Error("Todo not found");
    }

    const validation = validateTodoTitle(newTitle);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    todo.title = newTitle.trim();
    todo.updatedAt = new Date().toISOString();
    this.saveTodos();

    return todo;
  }

  addTranscript(id, transcript) {
    const todo = this.getTodoById(id);
    if (!todo) {
      throw new Error("Todo not found");
    }

    todo.transcript = transcript;
    todo.transcriptCreatedAt = new Date().toISOString();
    todo.updatedAt = new Date().toISOString();
    this.saveTodos();

    return todo;
  }

  removeTranscript(id) {
    const todo = this.getTodoById(id);
    if (!todo) {
      throw new Error("Todo not found");
    }

    todo.transcript = null;
    todo.transcriptCreatedAt = null;
    todo.updatedAt = new Date().toISOString();
    this.saveTodos();

    return todo;
  }
}

export default TodoService;
