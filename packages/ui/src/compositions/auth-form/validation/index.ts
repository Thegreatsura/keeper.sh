/**
 * Auth form validation using arktype
 */

export * from "./schemas";

/**
 * Helper function to extract validation errors from arktype result
 */
export function formatValidationErrors(errors: unknown[]): Record<string, string> {
  const errorMap: Record<string, string> = {};

  for (const error of errors) {
    if (typeof error === "object" && error !== null && "path" in error && "message" in error) {
      const path = Array.isArray(error.path) ? error.path.join(".") : String(error.path);
      errorMap[path] = String(error.message);
    }
  }

  return errorMap;
}
