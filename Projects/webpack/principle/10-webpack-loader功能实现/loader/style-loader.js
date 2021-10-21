module.exports = function (content, map, meta) {
  return `
    const style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(content)}
    document.head.appendChild(style)
  `
}
