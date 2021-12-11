import Vue from 'vue'


/**
 * Required install method for Vue plugin
 * @param {VueConstructor} Vue - Vue constructor
 * @param {Object} options
 */
const install = (Vue, options) => {
  // global mixin, apply on every component
  Vue.mixin({
    beforeCreate () {
      // root component => use $options.store
      if (this.$options?.store) {
        this.$store = this.$options.store
      }
      // child components => use its parent's $store
      else {
        this.$store = this.$parent.$store
      }
    }
  })
}


/**
 * Store constructor
 */
class Store {
  constructor (options) {
    // state
    Vue.util.defineReactive(this, 'state', options.state)

    // modules
    this.modules = new ModuleCollection(options)
    this.initModules(this.modules.root)

  }


  commit = (mutation, payload) => {
    this.mutations[mutation] ? this.mutations[mutation].forEach((mutation) => {
      mutation(payload)
    }) : console.error(`Mutation ${mutation} not found.`)
  }


  dispatch = (action, payload) => {
    this.actions[action] ? this.actions[action].forEach((action) => {
      action(payload)
    }) : console.error(`Action ${action} not found.`)
  }


  // helpers


  /**
   * parse getters
   * @param {Object} options
   */
  parseGetters (options) {
    const getters = options.getters ?? {}
    this.getters = this.getters ?? {}

    for (const key in getters) {
      try {
        Object.defineProperty(this.getters, key, {
          get: () => {
            return getters[key](options.state)
          }
        })
      } catch (e) {
        console.error(`duplicate getter key: ${key}`)
      }
    }
  }


  /**
   * parse mutations
   * @param {Object} options
   */
  parseMutations (options) {
    const mutations = options.mutations ?? {}
    this.mutations = this.mutations ?? {}

    for (const key in mutations) {
      this.mutations[key] = this.mutations[key] ?? []
      this.mutations[key].push((payload) => {
        mutations[key](options.state, payload)
      })
    }
  }


  /**
   * parse actions
   * @param {Object} actions
   */
  parseActions (actions = {}) {
    this.actions = this.actions ?? {}

    for (const key in actions) {
      this.actions[key] = this.actions[key] ?? []
      this.actions[key].push((payload) => {
        actions[key](this, payload)
      })
    }
  }


  /**
   * initialize modules
   * @param rootModule
   * @param {Array} arr - array contains module names
   */
  initModules (rootModule, arr = []) {
    // put data in child module into root state
    if (arr.length > 0) {
      const parent = arr.splice(0, arr.length - 1).reduce((state, currentKey) => {
        return state[currentKey]
      }, this.state)

      Vue.set(parent, arr.at(-1), rootModule._state)
    }

    // getters
    this.parseGetters(rootModule._raw)

    // mutations
    this.parseMutations(rootModule._raw)

    // actions
    this.parseActions(rootModule._raw.actions)


    // fetch data of child module
    for (const childModuleName in rootModule._children) {
      const childModule = rootModule._children[childModuleName]
      this.initModules(childModule, [...arr, childModuleName])
    }
  }
}


class ModuleCollection {
  constructor (rootModule) {
    this.register(rootModule)
  }

  register (rootModule, arr = []) {
    const module = {
      _raw: rootModule,
      _state: rootModule.state,
      _children: {}
    }

    // root module
    if (arr.length === 0) {
      this.root = module
    }
    // child module
    else {
      const parent = arr.splice(0, arr.length - 1).reduce((currentModule, childModule) => {
        return currentModule._children[childModule]
      }, this.root)
      parent._children[arr.at(-1)] = module
    }

    for (const childModuleName in rootModule.modules) {
      const childModule = rootModule.modules[childModuleName]
      this.register(childModule, [...arr, childModuleName])
    }
  }
}


export default {
  install,
  Store
}
