import { useTodos } from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import ErrorMessage from "./components/ErrorMessage";
import { useState, useEffect } from "react";

export default function App() {
  const {
    todos,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    addVoiceNote,
    removeVoiceNote,
    isRecording,
    clearError,
  } = useTodos();
  const [voiceSupported, setVoiceSupported] = useState(true);

  useEffect(() => {
    const supported =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
    setVoiceSupported(supported);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-10 px-4">
      {!voiceSupported && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl max-w-3xl mx-auto">
          <p className="text-yellow-800 text-sm">
            ⚠️ Voice recording is not supported in this browser. Try{" "}
            <strong>Chrome</strong> or <strong>Edge</strong> for full
            functionality. All other features work normally.
          </p>
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        {/* ✨ Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-3">
            <span className="text-5xl">🎙️</span>
          </div>
          <h1 className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm tracking-tight">
            Chatodo
          </h1>
          <p className="text-purple-300 text-sm font-medium tracking-widest uppercase">
            your voice-powered task list
          </p>

          {isRecording && (
            <div className="mt-5 inline-flex items-center gap-2 px-5 py-2 bg-pink-100 border border-pink-300 rounded-full shadow-sm">
              <span className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></span>
              <span className="text-pink-600 font-medium text-sm">
                Recording...
              </span>
            </div>
          )}
        </div>

        {/* Main card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-100 border border-purple-100 p-6">
          {error && <ErrorMessage message={error} onClose={clearError} />}

          <TodoForm onAdd={addTodo} error={error} onClearError={clearError} />

          {/* Stats bar */}
          <div className="flex gap-4 mb-6 text-sm">
            <div className="px-3 py-1 bg-purple-50 rounded-full text-purple-600">
              <span className="font-semibold">{todos.length}</span> total
            </div>
            <div className="px-3 py-1 bg-green-50 rounded-full text-green-600">
              <span className="font-semibold">
                {todos.filter((t) => t.completed).length}
              </span>{" "}
              completed
            </div>
            <div className="px-3 py-1 bg-pink-50 rounded-full text-pink-600">
              <span className="font-semibold">
                {todos.filter((t) => !t.completed).length}
              </span>{" "}
              active
            </div>
          </div>

          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
            onAddVoice={addVoiceNote}
            onRemoveVoice={removeVoiceNote}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-purple-300 font-medium tracking-wide">
          <p>✨ Built by Ruth Boahene</p>
        </div>
      </div>
    </div>
  );
}
