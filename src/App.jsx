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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      {!voiceSupported && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            ⚠️ Voice recording is not supported in this browser. Try{" "}
            <strong>Chrome</strong> or <strong>Edge</strong> for full
            functionality. All other features work normally.
          </p>
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
         <h1 className="text-4xl font-bold text-gray-900 mb-2">
  Chatodo  
</h1>
          <p className="text-gray-600">Manage your tasks efficiently</p>

          {isRecording && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-100 border border-red-300 rounded-full">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-red-700 font-medium">Recording...</span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6">
          {error && <ErrorMessage message={error} onClose={clearError} />}

          <TodoForm onAdd={addTodo} error={error} onClearError={clearError} />

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

          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
            onAddVoice={addVoiceNote}
            onRemoveVoice={removeVoiceNote}
          />
        </div>

        <div className="text-center mt-6 text-sm text-gray-600">
          <p>Built by Ruth Boahene</p>
        </div>
      </div>
    </div>
  );
}
