const less = require('less')

module.exports = function (content, map, meta) {
  let css = ''

  less.render(content, (err, res) => {
    css = res.css
  })

  return css
}
