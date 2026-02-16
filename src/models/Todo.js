class Todo {
  constructor(title) {
    this.id = this.generateId();
    this.title = title;
    this.completed = false;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.transcript = null;
    this.transcriptCreatedAt = null;
  }

  generateId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `${timestamp}-${random}`;
  }

  toJSON() {
    return {   
      id: this.id,
      title: this.title,
      completed: this.completed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      transcript: this.transcript,
      transcriptCreatedAt: this.transcriptCreatedAt,
    };
  }

  static fromJSON(json) {
    const todo = new Todo(json.title);
    Object.assign(todo, json);
    return todo;
  }
}

export default Todo;
