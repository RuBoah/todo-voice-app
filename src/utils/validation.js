export function validateTodoTitle(title) {
  if (!title || typeof title !== "string") {
    return {
      valid: false,
      error: "Title is required",
    };
  }

  const trimmed = title.trim();
  if (trimmed.length === 0) {
    return {
      valid: false,
      error: "Title cannot be empty",
    };
  }

  if (trimmed.length > 200) {
    return {
      valid: false,
      error: "Title cannot exceed 200 characters",
    };
  }

  return { valid: true };
}
