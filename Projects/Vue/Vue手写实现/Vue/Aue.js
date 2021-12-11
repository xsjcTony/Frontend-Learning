/**
 * Aue, a practical framework based on Vue.js 2.x
 * @author Tony Jiang
 */


/**
 * Aue main body
 */
class Aue {

  /**
   * constructor
   * @param options
   */
  constructor (options) {

    /**
     * deal with options
     */

    // options.el
    if (this.isHTMLElement(options.el)) {
      this.$el = options.el
    } else if (typeof options.el === 'string') {
      this.$el = this.query(options.el)
    } else {
      throw new Error('Missing "el" in options')
    }

    // options.data
    this.$data = options.data
    new Observer(this.$data)

    // options.methods
    this.$methods = options.methods

    // options.computed
    this.$computed = options.computed
    this.computedToData()

    // proxy data to Aue instance
    this.proxyData()

    // compile template
    new Compiler(this)

  }


  // helpers

  /**
   * check if HTMLElement
   * @param node
   * @return {boolean}
   */
  isHTMLElement (node) {
    return node instanceof HTMLElement
  }


  /**
   * check if Text node
   * @param node
   * @return {boolean}
   */
  isTextNode (node) {
    return node.nodeType === 3
  }


  /**
   * query element, throw an Error if element is not found
   * @param str
   * @return {Element}
   */
  query (str) {
    const element = document.querySelector(str)
    if (!element) {
      throw new Error(`Cannot find element with selector "${ str }"`)
    }
    return element
  }


  /**
   * proxy data in $data onto Aue instance
   */
  proxyData () {
    for (const key in this.$data) {
      Object.defineProperty(this, key, {
        get: () => { // 一定要用getter, 直接通过this.xxx赋值无法更新数据
          return this.$data[key]
        }
      })
    }
  }


  /**
   * proxy data in $computed onto $data
   */
  computedToData () {
    for (const key in this.$computed) {
      Object.defineProperty(this.$data, key, {
        enumerable: true,
        get: () => {
          return this.$computed[key].apply(this)
        }
      })
    }
  }
}


/**
 * compiler for rendering HTML
 */
class Compiler {

  /**
   * constructor
   * @param {Aue} vm - Aue instance
   */
  constructor (vm) {
    this.vm = vm

    // store the element in DOM into documentFragment
    const fragment = compilerUtils.elementToFragment(this.vm.$el)

    // compile template in documentFragment
    this.compileTemplate(fragment)

    // render compiled template into DOM
    this.vm.$el.appendChild(fragment)
  }


  /**
   * compile the template in DocumentFragment
   * @param fragment
   */
  compileTemplate (fragment) {
    const nodes = fragment.childNodes

    nodes.forEach((node) => {
      // ELEMENT_NODE
      if (this.vm.isHTMLElement(node)) {
        this.compileElementNode(node)
        // recursively compile child nodes
        this.compileTemplate(node)
      }
      // TEXT_NODE
      else if (this.vm.isTextNode(node)) {
        this.compileTextNode(node)
      }
    })
  }


  /**
   * compile ELEMENT_NODE
   * @param {Element} node
   */
  compileElementNode (node) {
    const attributes = [...node.attributes]
    attributes.forEach(({ name, value }) => {
      // directive
      if (name.startsWith('a-')) {
        const [directive, directiveProp] = name.split(':')
        const directiveName = directive.slice(2)

        if (!compilerUtils[directiveName]) {
          console.warn(`Wrong directive "${ name }" in ${ node.outerHTML.match(/<.*?>/)[0] }`)
        }

        // directive with `:`
        if (directiveProp) {
          compilerUtils[directiveName]?.(node, directiveProp, value, this.vm)
        }
        // directive without `:`
        else {
          compilerUtils[directiveName]?.(node, value, this.vm)
        }
      }
      // v-on shortcut `@event`
      else if (name.startsWith('@')) {
        const directiveProp = name.slice(1)
        compilerUtils.on(node, directiveProp, value, this.vm)
      }
    })
  }


  /**
   * compile TEXT_NODE
   * @param {Text} node
   */
  compileTextNode (node) {
    const content = node.textContent
    const interpolationRegExp = /{{.+?}}/gi

    if (interpolationRegExp.test(content)) {
      compilerUtils['interpolation'](node, content, this.vm)
    }
  }
}


/**
 * compiler helpers
 */
const compilerUtils = {

  // general helpers


  /**
   * transfer DOM nodes from element into DocumentFragment
   * @param {Element} element
   * @return {DocumentFragment}
   */
  elementToFragment (element) {
    const fragment = new DocumentFragment()
    const cn = element.childNodes
    while (cn.length !== 0) {
      fragment.appendChild(cn[0]) // 调用append或appendChild之后, 原有的node会被移除 (即DOM中的)
    }
    return fragment
  },


  /**
   * Get value from Aue instance's data
   * @param {string} prop - the value of the attribute, accept `obj.key.key2` string
   * @param {Aue} vm - Aue instance
   * @return {any} - the value retrieved from data, undefined if not found
   */
  getValue (prop, vm) {
    return prop.split('.').reduce((data, currentKey) => data?.[currentKey.trim()], vm)
  },


  /**
   * Set value to Aue instance's data
   * @param {string} prop - the value of the attribute, accept `obj.key.key2` string
   * @param {any} value - the value to be set
   * @param {Aue} vm - Aue instance
   */
  setValue (prop, value, vm) {
    prop.split('.').reduce((data, currentKey, index, array) => {
      if (index === array.length - 1) {
        data[currentKey] = value
      }
      return data[currentKey]
    }, vm.$data)
  },


  // directive compiler


  /**
   * compile `a-model` directive, bind its value with corresponding data in Aue instance
   * @param {Element} node - the ELEMENT_NODE contains `a-model` directive
   * @param {string} prop - the value of the attribute
   * @param {Aue} vm - Aue instance
   */
  model (node, prop, vm) {
    // <input>
    if (node.nodeName === 'INPUT') {
      // add watcher
      new Watcher(vm, prop, (newValue) => { node.value = newValue ?? '' })

      node.value = this.getValue(prop, vm) ?? ''

      // update data in Aue instance after user's input
      node.addEventListener('input', (event) => {
        this.setValue(prop, event.target.value, vm)
      })
    }
    // wrong tag
    else {
      console.warn(`"a-model" cannot be used on element <${ node.nodeName.toLowerCase() }>`)
    }
  },


  /**
   * compile `a-html` directive, set element's content with corresponding data in Aue instance as HTML
   * @param {Element} node - the ELEMENT_NODE contains `a-model` directive
   * @param {string} prop - the value of the attribute
   * @param {Aue} vm - Aue instance
   */
  html (node, prop, vm) {
    // add watcher
    new Watcher(vm, prop, (newValue) => { node.innerHTML = newValue ?? '' })
    node.innerHTML = this.getValue(prop, vm) ?? ''
  },


  /**
   * compile `a-text` directive, set element's content with corresponding data in Aue instance as plain text
   * @param {Element} node - the ELEMENT_NODE contains `a-text` directive
   * @param {string} prop - the value of the attribute
   * @param {Aue} vm - Aue instance
   */
  text (node, prop, vm) {
    // add watcher
    new Watcher(vm, prop, (newValue) => { node.innerText = newValue ?? '' })
    node.innerText = this.getValue(prop, vm) ?? ''
  },


  /**
   * compile `a-on` directive, add method as callback of the EventListener of the element
   * @param {Element} node - the ELEMENT_NODE contains `a-on` directive
   * @param {string} eventType - the event type
   * @param {string} method - the callback method
   * @param {Aue} vm - Aue instance
   */
  on (node, eventType, method, vm) {
    const methodName = method.match(/.*(?=\(.*\))/)?.[0] ?? method
    // get arguments
    const argsStr = (method.match(/\(.*\)/g)?.[0] ?? '()').slice(1, -1)
    const argsArr = argsStr.split(',').map(arg => arg.trim())

    node.addEventListener(eventType, (event) => {
      // insert native event object into arguments
      if (argsArr.includes('$event')) {
        argsArr.splice(argsArr.indexOf('$event'), 1, event)
      }
      if (argsArr.length === 1 && argsArr[0] === '') {
        argsArr.splice(0, 1, event)
      }

      // bind `this` in method to Aue instance
      vm.$methods[methodName].apply(vm, argsArr)
    })
  },


  // interpolation compiler


  /**
   * compile `{{ content }}` mustache interpolation, replace it with corresponding data in Aue instance
   * @param {Element} node - the ELEMENT_NODE contains `a-model` directive
   * @param {string} content - the content in mustache interpolation
   * @param {Aue} vm - Aue instance
   */
  interpolation (node, content, vm) {
    node.textContent = this.parseInterpolation(node, content, vm, false)
  },


  /**
   * compiler for method `interpolation()`
   * @param {Element} node - the ELEMENT_NODE contains `a-model` directive
   * @param {string} content - the content in mustache interpolation
   * @param {Aue} vm - Aue instance
   * @param {boolean} watcherCreated - true if watcher has been created, otherwise false
   * @return {string} - compiled content as string
   */
  parseInterpolation (node, content, vm, watcherCreated) {
    const interpolationRegExp = /{{(.+?)}}/gi

    return content.replaceAll(interpolationRegExp, (_, p1) => {
      const dataExp = p1.trim()

      if (dataExp === '') {
        console.warn(`Nothing in mustache interpolation ${ node.parentNode.outerHTML }`)
        return ''
      }

      // add watcher
      if (!watcherCreated) {
        new Watcher(vm, dataExp, () => { node.textContent = this.parseInterpolation(node, content, vm, true) })
      }

      const res = this.getValue(dataExp, vm)
      if (res === undefined) {
        console.warn(`${ dataExp } is not defined in ${ node.parentNode.outerHTML }`)
      }

      return res
    })
  }

}


/**
 * add getter and setter for every property of passed in object including nested object properties
 */
class Observer {
  constructor (obj) {
    this.observer(obj)
  }

  observer (obj) {
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        this.defineReactive(obj, key, obj[key])
      }
    }
  }

  defineReactive (obj, key, value) {
    this.observer(value)

    // define PubSubManager for current property
    const psm = new PubSubManager()

    const self = this
    Object.defineProperty(obj, key, {
      enumerable: true,
      get () {
        // add watcher to current property's PubSubManager
        if (PubSubManager.target) { psm.addSubscriber(PubSubManager.target) }
        return value
      },

      set (newValue) {
        if (newValue !== value) {
          self.observer(newValue)
          value = newValue
          // emit update method of current property's watcher when data's has been updated
          psm.publish()
        }
      }
    })
  }
}


/**
 * watcher class for data
 */
class Watcher {
  constructor (vm, property, callback) {
    this.vm = vm
    this.property = property
    this.callback = callback
    this.oldValue = this.getOldValue()
  }

  getOldValue () {
    PubSubManager.target = this
    const oldValue = compilerUtils.getValue(this.property, this.vm)
    PubSubManager.target = null
    return oldValue
  }

  update () {
    const newValue = compilerUtils.getValue(this.property, vm)
    this.callback(newValue, this.oldValue)
    this.oldValue = newValue
  }
}


/**
 * manage all subscribers of a property and emit the update method when the property has been updated
 */
class PubSubManager {
  constructor () {
    this.subscribers = []
  }

  addSubscriber (watcher) {
    this.subscribers.push(watcher)
  }

  publish () {
    this.subscribers.forEach((watcher) => { watcher.update() })
  }
}
