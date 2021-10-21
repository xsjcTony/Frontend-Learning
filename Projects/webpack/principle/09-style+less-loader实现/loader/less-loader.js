const less = require('less')

module.exports = function (content, map, meta) {
  const callback = this.async()

  less.render(content, (err, res) => {
    callback(err, res.css, map, meta)
  })
}
