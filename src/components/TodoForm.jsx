import { useState } from "react";

export default function TodoForm({ onAdd, error, onClearError }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim()) {
      onAdd(title);
      setTitle("");
    }
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
    if (error && onClearError) {
      onClearError();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={handleChange}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          maxLength={200}
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Todo
        </button>
      </div>
      {title.length > 0 && (
        <p className="text-xs text-gray-500 mt-2">
          {title.length} / 200 characters
        </p>
      )}
    </form>
  );
}
