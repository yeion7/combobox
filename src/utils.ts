let idCounter = 0

/**
 * This generates a unique ID for an instance of Downshift
 * @return {String} the unique ID
 */
export function generateId() {
  return String(idCounter++)
}

export function normalizeArrowKey(event: any): string {
  const {key, keyCode} = event
  /* istanbul ignore next (ie) */
  if (keyCode >= 37 && keyCode <= 40 && key.indexOf('Arrow') !== 0) {
    return `Arrow${key}`
  }
  return key
}