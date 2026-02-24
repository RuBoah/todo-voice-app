import { useTodos } from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import ErrorMessage from "./components/ErrorMessage";

export default function App() {
  const { todos, error, addTodo, toggleTodo, deleteTodo, clearError } =
    useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📝 Todo Voice App
          </h1>
          <p className="text-gray-600">Manage your tasks efficiently</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-xl p-6">
          {/* Error Message */}
          {error && <ErrorMessage message={error} onClose={clearError} />}

          {/* Todo Form */}
          <TodoForm onAdd={addTodo} error={error} onClearError={clearError} />

          {/* Stats */}
          <div className="flex gap-4 mb-6 text-sm text-gray-600">
            <div>
              <span className="font-semibold">{todos.length}</span> total
            </div>
            <div>
              <span className="font-semibold">
                {todos.filter((t) => t.completed).length}
              </span>{" "}
              completed
            </div>
            <div>
              <span className="font-semibold">
                {todos.filter((t) => !t.completed).length}
              </span>{" "}
              active
            </div>
          </div>

          {/* Todo List */}
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>Built with React, Vite, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
