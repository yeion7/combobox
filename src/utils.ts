let idCounter = 0

/**
 * This generates a unique ID for an instance of Downshift
 * @return {String} the unique ID
 */
export function generateId() {
  return String(idCounter++)
}