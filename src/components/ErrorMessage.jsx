export default function ErrorMessage({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-red-600 text-xl">⚠️</span>
        <p className="text-red-800 text-sm font-medium">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-red-600 hover:text-red-800 font-bold text-lg"
          aria-label="Close error"
        >
          ×
        </button>
      )}
    </div>
  );
}
