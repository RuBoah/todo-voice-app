import { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, editTitle);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          disabled={isEditing}
          className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50"
        />

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={200}
                autoFocus
              />
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
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
                {todo.updatedAt !== todo.createdAt && (
                  <> · Updated: {new Date(todo.updatedAt).toLocaleString()}</>
                )}
              </p>
            </>
          )}
        </div>

        {!isEditing && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none"
              aria-label="Edit todo"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-red-600 hover:text-red-800 font-bold text-xl focus:outline-none"
              aria-label="Delete todo"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
