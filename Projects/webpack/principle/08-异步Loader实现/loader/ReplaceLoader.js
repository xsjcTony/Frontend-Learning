const { validate } = require('schema-utils')

/**
 * @param {string|Buffer} content 源文件的内容
 * @param {object} [map] 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
 * @param {any} [meta] meta 数据，可以是任何内容
 */
module.exports = function (content, map, meta) {
  // get options
  const options = this.query
  // set validate rules
  const schema = {
    type: 'object', // type of options must be an object
    properties: { // properties can be passed in
      name: {
        type: 'string' // type of property name must be string
      }
    },
    additionalProperties: false
  }

  validate(schema, options, { name: 'ReplaceLoader', baseDataPath: 'options' })

  const callback = this.async()

  setTimeout(() => {
    const result = content.replace(/Tony/g, options.name)
    callback(null, result, map, meta)
  }, 3000)
}
