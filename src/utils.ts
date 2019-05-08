import computeScrollIntoView from 'compute-scroll-into-view'
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

/**
 * Scroll node into view if necessary
 */
export  function scrollIntoView(node: HTMLElement | null, menuNode: HTMLElement | null ) {
  if (node === null || menuNode === null) {
    return
  }

  const actions = computeScrollIntoView(node, {
    boundary: menuNode,
    block: 'nearest',
    scrollMode: 'if-needed',
  })
  actions.forEach(({el, top, left}) => {
    el.scrollTop = top
    el.scrollLeft = left
  })
}