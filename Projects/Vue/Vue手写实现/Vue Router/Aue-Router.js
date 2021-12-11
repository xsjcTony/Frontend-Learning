/**
 * Current route information
 */
class AueRoute {
  constructor () {
    this.currentPath = null
  }
}


/**
 * AueRouter constructor
 */
class AueRouter {
  constructor (options) {
    // store mode
    this.mode = options.mode ?? 'hash'
    if (!['hash', 'history'].includes(this.mode)) {
      throw new Error(`Wrong router mode "${ this.mode }"`)
    }
    // store routes
    this.routes = options.routes ?? []
    // extract route map
    this.routeMap = this.createRouteMap()
    // initialize route information
    this.route = new AueRoute()
    this.initRoute()
  }


  /**
   * Create a route map based on routes.
   * @return {Map} - A map in the syntax of path as key and component as value.
   */
  createRouteMap () {
    return this.routes.reduce((map, route) => {
      map.set(route.path, route.component)
      return map
    }, new Map())
  }


  /**
   * Initialize default route & store route information upon updated
   */
  initRoute () {
    // hash mode
    if (this.mode === 'hash') {
      // add default hash
      if (!window.location.hash) {
        window.location.hash = '/'
      }
      // store current hash when page loaded
      document.addEventListener('DOMContentLoaded', () => {
        this.route.currentPath = window.location.hash.slice(1)
      })
      // store current hash when hash has been changed
      window.addEventListener('hashchange', () => {
        this.route.currentPath = window.location.hash.slice(1)
      })
    }

    // history mode
    else {
      // add default path
      if (!window.location.pathname) {
        window.location.pathname = '/'
      }
      // store current path when page loaded
      document.addEventListener('DOMContentLoaded', () => {
        this.route.currentPath = window.location.pathname
      })
      // store current path when back / forward action has been fired
      window.addEventListener('popstate', () => {
        this.route.currentPath = window.location.pathname
      })
    }
  }
}


/**
 * Required install method for Vue plugin.
 * @param {VueConstructor} Vue - Vue constructor.
 * @param {Object} options - Optional options.
 */
AueRouter.install = (Vue, options) => {
  // mount $router and $route to every Vue instance
  Vue.mixin({
    beforeCreate () {
      if (this.$options?.router) {
        this.$router = this.$options.router
        this.$route = this.$router.route
        Vue.util.defineReactive(this, '$router', this.$router)
      } else {
        this.$router = this.$parent.$router
        this.$route = this.$router.route
      }
    }
  })

  // global component <router-link>
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        default: '',
        required: true
      }
    },
    render () {
      return this.$router.mode === 'history' ?
        <a href={ this.to }>{ this.$slots.default }</a> :
        <a href={ `#${ this.to }` }>{ this.$slots.default }</a>
    }
  })

  // global component <router-view>
  Vue.component('router-view', {
    render (h) {
      const component = this.$router.routeMap.get(this.$route.currentPath)
      return h(component)
    }
  })
}


export default AueRouter
