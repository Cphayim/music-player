/**
 * 在节点上添加一个 class
 * @param {DOMElement} el
 * @param {string} className
 */
export function addClass(el, className) {
  if (hasClass(el, className)) return
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

/**
 * 判断节点上是否存在某个 class
 * @param {DOMElement} el
 * @param {string} className
 * @return
 */
export function hasClass(el, className) {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}