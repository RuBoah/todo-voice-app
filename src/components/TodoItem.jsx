export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
        />

        <div className="flex-1 min-w-0">
          <p
            className={`text-gray-900 ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.title}
          </p>

          {todo.transcript && (
            <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-blue-600">🎤</span>
                <p className="flex-1">{todo.transcript}</p>
              </div>
            </div>
          )}

          <p className="text-xs text-gray-400 mt-2">
            Created: {new Date(todo.createdAt).toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-600 hover:text-red-800 font-bold text-xl focus:outline-none"
          aria-label="Delete todo"
        >
          ×
        </button>
      </div>
    </div>
  );
}
