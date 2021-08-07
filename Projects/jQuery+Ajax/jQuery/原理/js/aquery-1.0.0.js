// aQuery = Aelita's jQuery

(function (window, undefined) {
  let aQuery = function (selector) {
    return new aQuery.prototype.init(selector);
  };

  aQuery.prototype = {
    constructor: aQuery,
    init: function (selector) {
      // trim spaces at the start and end of the string
      selector = aQuery.trim(selector);
      //  / "" / null / undefined / NaN / 0 / false
      if(!selector) {
        return this;
      }
      // function
      else if(aQuery.isFunction(selector)) {
        aQuery.ready(selector);
      }
      // String
      else if(aQuery.isString(selector)) {
        // html code
        if(aQuery.isHTML(selector)) {
          // create all DOM elements
          let temp = document.createElement("div");
          temp.innerHTML = selector;
          // add root elements to jQuery object and add length property to jQuery object
          [].push.apply(this, temp.children);
        }
        // css selector
        else {
          // find all DOM elements based on css selector
          let res = document.querySelectorAll(selector);
          // add all DOM elements to jQuery object and add length property to jQuery object
          [].push.apply(this, res);
        }
      }
      // array / array-like object
      else if(aQuery.isArray(selector)) {
        // transform into real array
        let arr = [].slice.call(selector);
        // transform into jQuery object
        [].push.apply(this, arr);
      }
      // all other data types
      else {
        this[0] = selector;
        this.length = 1;
      }
      // return processed this
      return this;
    },
    // version
    jquery: "1.0.0",
    // default selector value
    selector: "",
    // default length of a jQuery object
    length: 0,
    // [].push.apply(this)
    push: [].push,
    sort: [].sort,
    splice: [].splice,
    // transform jQuery instance object to real array
    toArray: function () {
      return [].slice.call(this);
    },
    // get DOM element in jQuery instance object by index
    get: function (index) {
      // no argument
      if(arguments.length === 0) {
        return this.toArray();
      }
      // natural number
      else if(index >= 0) {
        return this[index];
      }
      // negative number
      else {
        return this[this.length + index];
      }
    },
    // get DOM element in jQuery instance object within a jQuery object by index
    eq: function (index) {
      // no argument
      if(arguments.length === 0) {
        return aQuery();
      }
      // number
      else {
        return aQuery(this.get(index));
      }
    },
    // get first DOM element in jQuery instance object within a jQuery object
    first: function () {
      return this.eq(0);
    },
    // get last DOM element in jQuery instance object within a jQuery object
    last: function () {
      return this.eq(-1);
    },
    // traverse jQuery instance object and pass index & element to callback function
    each: function (fn) {
      return aQuery.each(this, fn);
    },
    // traverse jQuery instance object and pass index & element to callback function, return an array with all the return value from callback functions
    map: function (fn) {
      return aQuery.map(this, fn);
    }
  };

  aQuery.extend = aQuery.prototype.extend = function (obj) {
    for(let key in obj) {
      this[key] = obj[key];
    }
  };

  // tool functions
  aQuery.extend({
    isString: function (str) {
      return typeof str === "string";
    },
    isHTML: function (str) {
      return str.charAt(0) === "<" && str.charAt(str.length - 1) === ">" && str.length >= 3;
    },
    trim: function (str) {
      // check if string
      if(!aQuery.isString(str)) {
        return str;
      }
      // check if trim() is supported in current browser
      if(str.trim) {
        // support
        return str.trim();
      } else {
        // not support
        return str.replace(/^\s+|\s+$/g, "");
      }
    },
    isObject: function (selector) {
      return typeof selector === "object";
    },
    isWindow: function (selector) {
      return selector === window;
    },
    isArray: function (selector) {
      return aQuery.isObject(selector) && !aQuery.isWindow(selector) && "length" in selector;
    },
    isFunction: function (selector) {
      return typeof selector === "function";
    },
    ready: function (fn) {
      if(document.readyState === "complete") {
        fn();
      } else if(document.addEventListener) {
        document.addEventListener("DOMContentLoaded", function () {
          fn();
        });
      } else {
        document.attachEvent("onreadystatechange", function () {
          fn();
        });
      }
    },
    each: function (obj, fn) {
      // array or array-like object
      if(aQuery.isArray(obj)) {
        for(let i = 0; i < obj.length; i++) {
          let res = fn.call(obj[i], i, obj[i]);
          if(res === true) {
            continue;
          } else if(res === false) {
            break;
          }
        }
      }
      // object
      else if(aQuery.isObject(obj)) {
        for(let key in obj) {
          let res = fn.call(obj[key], key, obj[key]);
          if(res === true) {
            continue;
          } else if(res === false) {
            break;
          }
        }
      }
      return obj;
    },
    map: function (obj, fn) {
      // the array to return
      let res = [];
      // array or array-like object
      if(aQuery.isArray(obj)) {
        for(let i = 0; i < obj.length; i++) {
          res.push(fn(obj[i], i));
        }
      }
      // object
      else if(aQuery.isObject(obj)) {
        for(let key in obj) {
          res.push(fn(obj[key], key));
        }
      }
      return res;
    },

    /**
     * get the next sibling of specified DOM element node
     * @param {Element | Node} element - the DOM element node to search with
     * @returns {Element | null} the specified element's next element node sibling or null
     */
    nextSibling: function (element) {
      let next = element.nextSibling;
      if(next !== null && next.nodeType !== 1) {
        next = next.nextSibling;
      }
      return next;
    },

    /**
     * get the previous sibling of specified DOM element node
     * @param {Element | Node} element - the DOM element node to search with
     * @returns {Element | null} the specified element's previous element node sibling or null
     */
    prevSibling: function (element) {
      let prev = element.previousSibling;
      if(prev !== null && prev.nodeType !== 1) {
        prev = prev.previousSibling;
      }
      return prev;
    },

    /**
     * get specified style value of the element
     * @param {Element} element - the DOM element
     * @param {string} styleName - the css property name
     * @returns {string} - the computed style property value
     */
    getStyle: function (element, styleName) {
      // compatibility
      if(getComputedStyle) {
        // >=IE9
        return getComputedStyle(element)[styleName];
      } else {
        // <IE9
        return element.currentStyle[styleName];
      }
    },

    /**
     * set specified style of the element
     * @param {Element} element - the DOM element
     * @param {string} styleName - the css property name
     * @param {string | number} styleValue - the css property value
     */
    setStyle: function (element, styleName, styleValue) {
      // add "px" if number or string of number
      if(typeof styleValue === "number" || !isNaN(styleValue)) {
        styleValue += "px";
      }
      element.style[styleName] = styleValue;
    },

    /**
     * add an event for a DOM element
     * @param {Element} element - the DOM element
     * @param {string} eventName - the event name
     * @param {function} callback - the callback function
     */
    addEvent: function (element, eventName, callback) {
      // >=IE9
      if(element.addEventListener) {
        element.addEventListener(eventName, callback);
      }
      // <IE9
      else {
        element.attachEvent("on" + eventName, callback);
      }
    }
  });

  // DOM functions
  aQuery.prototype.extend({
    // clear all child nodes of all DOM elements in jQuery instance object
    empty: function () {
      return this.each(function (index, element) {
        element.innerHTML = "";
      });
    },

    // take elements out from the DOM tree as well as all its child nodes in jQuery instance object, optionally filtered by selector
    remove: function (selector) {
      // no selector
      if(arguments.length === 0) {
        this.each(function (index, element) {
          element.parentNode.removeChild(element);
        });
      }
      // has selector
      else {
        let self = this;
        // find elements by selector and traverse
        $(selector).each(function (index, element) {
          // get element type
          let type = element.tagName;
          // traverse the jQuery instance object to be removed
          self.each(function (i, e) {
            // check if type equals
            if(type === e.tagName) {
              // equal then remove
              e.parentNode.removeChild(e);
            }
          });
        });
      }
      return this;
    },

    // retrieve the HTML code of first DOM element or set HTML code for all DOM elements in jQuery instance object
    html: function (code) {
      // no argument (retrieve the first)
      if(arguments.length === 0) {
        return this[0].innerHTML;
      } else {
        // set HTML code
        this.each(function (index, element) {
          element.innerHTML = code;
        });
      }
      return this;
    },

    // retrieve or set text of all DOM elements in jQuery instance object
    text: function (text) {
      // no argument
      if(arguments.length === 0) {
        // retrieve
        let res = "";
        this.each(function (index, element) {
          res += element.innerText;
        });
        return res;
      } else {
        // set
        this.each(function (index, element) {
          element.innerText = text;
        });
      }
      return this;
    },

    /**
     * append DOM nodes to the last position of target elements' child nodes
     * @param {selector | HTML | Element | Element[] | aQuery} element - the target element
     * @returns {aQuery} an aQuery instance object contains all added elements in an array
     */
    appendTo: function (element) {
      let self = this;
      // the array to return
      let res = [];
      // transform into jQuery instance object
      let target = $(element);
      // traverse target elements
      aQuery.each(target, function (index, element) {
        // traverse source elements
        aQuery.each(self, function (i, e) {
          // check if the first target element
          if(index === 0) {
            // append straight away
            element.appendChild(e);
            res.push(e);
          } else {
            // clone then append
            let temp = e.cloneNode(true);
            element.appendChild(temp);
            res.push(temp);
          }
        });
      });
      return $(res);
    },

    /**
     * insert DOM nodes to the first position of target elements' child nodes
     * @param {selector | HTML | Element | Element[] | aQuery} element - the target element
     * @returns {aQuery} an aQuery instance object contains all added elements in an array
     */
    prependTo: function (element) {
      let self = this;
      // the array to return
      let res = [];
      // transform into jQuery instance object
      let target = $(element);
      // traverse target elements
      aQuery.each(target, function (index, element) {
        // traverse source elements
        aQuery.each(self, function (i, e) {
          // check if the first target element
          if(index === 0) {
            // append straight away
            element.insertBefore(e, element.firstChild);
            res.push(e);
          } else {
            // clone then append
            let temp = e.cloneNode(true);
            element.insertBefore(temp, element.firstChild);
            res.push(temp);
          }
        });
      });
      return $(res);
    },

    /**
     * append DOM nodes to the last position of target elements' child nodes
     * @param {text | HTML | Element | Element[] | aQuery} element - the DOM nodes to be added
     * @returns {aQuery} the aQuery instance object called this function
     */
    append: function (element) {
      // check if string
      if(aQuery.isString(element)) {
        aQuery.each(this, function () {
          this.innerHTML += element;
        });
      } else {
        $(element).appendTo(this);
      }
      return this;
    },

    /**
     * insert DOM nodes to the first position of target elements' child nodes
     * @param {text | HTML | Element | Element[] | aQuery} element - the DOM nodes to be added
     * @returns {aQuery} the aQuery instance object called this function
     */
    prepend: function (element) {
      // check if string
      if(aQuery.isString(element)) {
        aQuery.each(this, function () {
          this.innerHTML = element + this.innerHTML;
        });
      } else {
        $(element).prependTo(this);
      }
      return this;
    },

    /**
     * insert DOM nodes as the previous sibling of each target element
     * @param {selector | HTML | Element | Element[] | aQuery} element - the target element
     * @returns {aQuery} an aQuery instance object contains all added elements in an array
     */
    insertBefore: function (element) {
      let self = this;
      // the array to return
      let res = [];
      // transform into jQuery instance object
      let target = $(element);
      // traverse target elements
      aQuery.each(target, function (index, element) {
        // traverse source elements
        aQuery.each(self, function (i, e) {
          // check if the first target element
          if(index === 0) {
            // insert straight away
            element.parentNode.insertBefore(e, element);
            res.push(e);
          } else {
            // clone then insert
            let temp = e.cloneNode(true);
            element.parentNode.insertBefore(temp, element);
            res.push(temp);
          }
        });
      });
      return $(res);
    },

    /**
     * insert DOM nodes as the next sibling of each target element
     * @param {selector | HTML | Element | Element[] | aQuery} element - the target element
     * @returns {aQuery} an aQuery instance object contains all added elements in an array
     */
    insertAfter: function (element) {
      let self = this;
      // the array to return
      let res = [];
      // transform into jQuery instance object
      let target = $(element);
      // traverse target elements
      aQuery.each(target, function (index, element) {
        // traverse source elements
        let nextSibling = element.nextSibling;
        aQuery.each(self, function (i, e) {
          // check if the first target element
          if(index === 0) {
            // insert straight away
            element.parentNode.insertBefore(e, nextSibling);
            res.push(e);
          } else {
            // clone then insert
            let temp = e.cloneNode(true);
            element.parentNode.insertBefore(temp, nextSibling);
            res.push(temp);
          }
        });
      });
      return $(res);
    },

    /**
     * insert DOM nodes as the previous sibling of each target element
     * @param {text | HTML | Element | Element[] | aQuery} element - the DOM nodes to be added
     * @returns {aQuery} the aQuery instance object called this function
     */
    before: function (element) {
      // check if string
      if(aQuery.isString(element)) {
        // html code
        if(aQuery.isHTML(element)) {
          $(element).insertBefore(this);
        } else {
          // normal string
          aQuery.each(this, function () {
            this.parentNode.insertBefore(document.createTextNode(element), this);
          });
        }
      } else {
        $(element).insertBefore(this);
      }
      return this;
    },

    /**
     * insert DOM nodes as the next sibling of each target element
     * @param {text | HTML | Element | Element[] | aQuery} element - the DOM nodes to be added
     * @returns {aQuery} the aQuery instance object called this function
     */
    after: function (element) {
      // check if string
      if(aQuery.isString(element)) {
        // html code
        if(aQuery.isHTML(element)) {
          $(element).insertAfter(this);
        } else {
          // normal string
          aQuery.each(this, function () {
            this.parentNode.insertBefore(document.createTextNode(element), this.nextSibling);
          });
        }
      } else {
        $(element).insertAfter(this);
      }
      return this;
    },

    /**
     * get the next sibling of each element in jQuery instance object, optionally filtered by selector
     * @param {selector} selector - a selector expression of the same type that we can pass to the $() function
     * @returns {aQuery} an aQuery instance object contains all matching siblings
     */
    next: function (selector) {
      // the array to pass into $() and return
      let res = [];
      let temp = [];
      // traverse all elements in instance object
      this.each(function () {
        // check if has next element sibling
        let nextSibling = aQuery.nextSibling(this);
        if(nextSibling === null) {
          return true;
        }
        temp.push(nextSibling);
      });
      // check if selector exists
      if(arguments.length !== 0) {
        // has selector
        let elements = $(selector);
        aQuery.each(temp, function (index, element) {
          // satisfy with selector filter
          elements.each(function (i, e) {
            if(element === e) {
              res.push(element);
              return false;
            }
            return true;
          });
        });
      } else {
        // no selector
        res = temp;
      }
      return $(res);
    },

    /**
     * get the previous sibling of each element in jQuery instance object, optionally filtered by selector
     * @param {selector} selector - a selector expression of the same type that we can pass to the $() function
     * @returns {aQuery} an aQuery instance object contains all matching siblings
     */
    prev: function (selector) {
      // the array to pass into $() and return
      let res = [];
      let temp = [];
      // traverse all elements in instance object
      this.each(function () {
        // check if has next element sibling
        let previousSibling = aQuery.prevSibling(this);
        if(previousSibling === null) {
          return true;
        }
        temp.push(previousSibling);
      });
      // check if selector exists
      if(arguments.length !== 0) {
        // has selector
        let elements = $(selector);
        aQuery.each(temp, function (index, element) {
          // satisfy with selector filter
          elements.each(function (i, e) {
            if(element === e) {
              res.push(element);
              return false;
            }
            return true;
          });
        });
      } else {
        // no selector
        res = temp;
      }
      return $(res);
    },

    /**
     * replace all target elements with specified elements in jQuery instance object
     * @param {selector | Element | Element[] | aQuery} element - the target element
     * @returns {aQuery} an aQuery instance object contains all added elements in an array
     */
    replaceAll: function (element) {
      // transform into jQuery instance object
      let target = $(element);
      // insert specified elements before target elements and save returned value for return
      let res = this.insertBefore(target);
      // remove target
      target.remove();
      return res;
    },

    /**
     * replace all target elements with specified elements in jQuery instance object
     * @param {text | HTML | Element | Element[] | aQuery} element - the DOM nodes to insert
     * @returns {aQuery} an aQuery instance object contains removed elements
     */
    replaceWith: function (element) {
      let res = this.before(element);
      this.remove();
      return res;
    },

    /**
     * Create a deep copy of the set of matched elements.
     * @param {boolean} [deep] - A Boolean indicating whether event handlers should be copied along with the elements.
     * @returns {aQuery} - the jQuery instance object contains cloned DOM elements
     */
    clone: function (deep) {
      // Array to return
      let res = [];
      // deep clone
      if(deep) {
        this.each(function (index, element) {
          let temp = element.cloneNode(true);
          aQuery.each(element.eventsCache, function (eventName, callbacks) {
            aQuery.each(callbacks, function(i, callback) {
              $(temp).on(eventName, callback);
            })
          });
          res.push(temp);
        });
      }
      // shallow clone
      else {
        this.each(function (index, element) {
          res.push(element.cloneNode(true));
        });
      }
      // return as jQuery instance object
      return $(res);
    }
  });

  // Attribute functions
  aQuery.prototype.extend({

    /**
     * get or set attributes of elements in jQuery instance object
     * @param {string | object} attr - the attribute name to get or set value, or an object includes attributes' name and value in pairs for set
     * @param {string} [value] - the value to set for the attribute
     * @returns {string|aQuery} - the attribute value, or the jQuery instance object calls the setter
     */
    attr: function (attr, value) {
      // string
      if(aQuery.isString(attr)) {
        // value exists?
        if(arguments.length === 1) {
          // no value
          return this[0].getAttribute(attr);
        } else {
          // has value
          this.each(function (index, element) {
            if(!value) {
              element.removeAttribute(attr);
            } else {
              element.setAttribute(attr, value + "");
            }
          });
        }
      }
      // object
      else if(aQuery.isObject(attr)) {
        this.each(function (index, element) {
          for(let key in attr) {
            if(!attr[key]) {
              element.removeAttribute(key);
            } else {
              element.setAttribute(key, attr[key] + "");
            }
          }
        });
      }
      return this;
    },

    /**
     * get or set properties of elements in jQuery instance object, recommended for getting or setting selectedIndex, tagName, nodeName, nodeType, ownerDocument, defaultChecked, or defaultSelected
     * @param {string | object} prop - the property name to get or set value, or an object includes properties' name and value in pairs for set
     * @param {string} [value] - the value to set for the property
     * @returns {string|aQuery} - the property value, or the jQuery instance object calls the setter
     */
    prop: function (prop, value) {
      // string
      if(aQuery.isString(prop)) {
        // value exists?
        if(arguments.length === 1) {
          // no value
          return this[0][prop];
        } else {
          // has value
          this.each(function (index, element) {
            element[prop] = value;
          });
        }
      }
      // object
      else if(aQuery.isObject(prop)) {
        this.each(function (index, element) {
          for(let key in prop) {
            element[key] = prop[key];
          }
        });
      }
      return this;
    },

    /**
     * get or set css properties of elements in jQuery instance object
     * @param {string | object} styleName - the css property name to get or set value, or an object includes css properties' name and value in pairs for set
     * @param {string | number} [value] - the value to set for the css property
     * @returns {string|aQuery} - the css property value, or the jQuery instance object calls the setter
     */
    css: function (styleName, value) {
      // string
      if(aQuery.isString(styleName)) {
        // value exists?
        if(arguments.length === 1) {
          // no value
          return aQuery.getStyle(this[0], styleName);
        } else {
          // has value
          this.each(function (index, element) {
            aQuery.setStyle(element, styleName, value);
          });
        }
      }
      // array
      else if(aQuery.isArray(styleName)) {
        let self = this;
        let res = {};
        aQuery.each(styleName, function (index, element) {
          res[element] = aQuery.getStyle(self[0], element);
        });
        return res;
      }
      // object
      else if(aQuery.isObject(styleName)) {
        this.each(function (index, element) {
          aQuery.each(styleName, function (key, value) {
            aQuery.setStyle(element, key, value);
          });
        });
      }
      return this;
    },

    /**
     * get or set the value of input elements
     * @param {string | number | Array} [value] - new value for setter
     * @returns {aQuery | undefined | string} - the value of the first element, or the jQuery instance object calls the setter
     */
    val: function (value) {
      // no arguments --> getter
      if(arguments.length === 0) {
        // empty collection
        if(this.length === 0) {
          return undefined;
        }
        // get the value of first element
        else {
          return this[0].value;
        }
      }
      // setter
      else {
        this.each(function (index, element) {
          element.value = value;
        });
      }
      return this;
    },

    /**
     * check if any of elements in the jQuery instance object are assigned the given class
     * @param {string} className - the class name to search for
     * @returns {boolean} - true if assigned, otherwise false
     */
    hasClass: function (className) {
      // no arguments
      if(arguments.length === 0) {
        return false;
      }
      let res = false;
      this.each(function (index, element) {
        // store class names into an array
        let classNames = ` ${element.className} `;
        // given class name assigned (convert arguments into string)
        if(classNames.includes(` ${className} `)) {
          res = true;
          return false;
        }
      });
      return res;
    },

    /**
     * Adds the specified class(es) to each element in the set of matched elements.
     * @param {string|Array} className - One or more space-separated / in-Array classes to be added to the class attribute of each matched element.
     * @returns {aQuery} - the jQuery instance object calls the setter
     */
    addClass: function (className) {
      // invalid arguments
      if(!className) {
        return this;
      }
      this.each(function (index, element) {
        // convert string classes into array
        let classNames = element.className.split(" ");
        let classNamesNew = [...classNames];
        // string
        if(aQuery.isString(className)) {
          // convert string classes into array
          let classNamesAdd = className.split(" ");
          aQuery.each(classNamesAdd, function (i, e) {
            // class not assigned --> add into new class names array
            if(!classNames.includes(e)) {
              classNamesNew.push(e);
            }
          });
        }
        // Array
        else if(aQuery.isArray(className)) {
          aQuery.each(className, function (i, e) {
            // class not assigned --> add into new class names array
            if(!classNames.includes(e)) {
              classNamesNew.push(e);
            }
          });
        }
        // set class names by the new class names array
        element.className = classNamesNew.join(" ");
      });
      return this;
    },

    /**
     * Remove a single class or multiple classes from each element in the set of matched elements.
     * @param {string|Array} className - One or more space-separated / in-Array classes to be removed from the class attribute of each matched element.
     * @returns {aQuery} - the jQuery instance object calls the setter
     */
    removeClass: function (className) {
      // invalid arguments
      if(!className) {
        return this;
      }
      this.each(function (index, element) {
        // convert string classes into array
        let classNames = element.className.split(" ");
        let classNamesNew = [...classNames];
        // string
        if(aQuery.isString(className)) {
          // convert string classes into array
          let classNamesRemoval = className.split(" ");
          aQuery.each(classNamesRemoval, function (i, e) {
            // class assigned --> remove from new class names array
            if(classNames.includes(e)) {
              classNamesNew.splice(classNamesNew.indexOf(e), 1);
            }
          });
        }
        // Array
        else if(aQuery.isArray(className)) {
          aQuery.each(className, function (i, e) {
            // class not assigned --> remove from new class names array
            if(classNames.includes(e)) {
              classNamesNew.splice(classNamesNew.indexOf(e), 1);
            }
          });
        }
        // set class names by the new class names array
        element.className = classNamesNew.join(" ");
      });
      return this;
    },

    /**
     * Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the state argument.
     * @param {string|Array} className - One or more classes (separated by spaces / in Array) to be toggled for each element in the matched set.
     * @returns {aQuery} - the jQuery instance object calls the setter
     */
    toggleClass: function (className) {
      // invalid arguments
      if(!className) {
        return this;
      }
      this.each(function (index, element) {
        // convert string classes into array
        let classNames = element.className.split(" ");
        let classNamesNew = [...classNames];
        // string
        if(aQuery.isString(className)) {
          // convert string classes into array
          let classNamesToggle = className.split(" ");
          aQuery.each(classNamesToggle, function (i, e) {
            // class assigned --> remove from new class names array
            if(classNames.includes(e)) {
              classNamesNew.splice(classNamesNew.indexOf(e), 1);
            }
            // class not assigned --> add into new class names array
            else {
              classNamesNew.push(e);
            }
          });
        }
        // Array
        else if(aQuery.isArray(className)) {
          aQuery.each(className, function (i, e) {
            // class assigned --> remove from new class names array
            if(classNames.includes(e)) {
              classNamesNew.splice(classNamesNew.indexOf(e), 1);
            }
            // class not assigned --> add into new class names array
            else {
              classNamesNew.push(e);
            }
          });
        }
        // set class names by the new class names array
        element.className = classNamesNew.join(" ");
      });
      return this;
    }
  });

  // Event functions
  aQuery.prototype.extend({
    /**
     * Attach an event handler function for one or more events to the selected elements.
     * @param {string} eventName - the event name
     * @param {Function} callback - the callback function
     * @returns {aQuery} - the jQuery instance object calls the function
     */
    on: function (eventName, callback) {
      this.each(function (index, element) {
        if(!element.eventsCache) {
          element.eventsCache = {};
        }
        if(!element.eventsCache[eventName]) {
          element.eventsCache[eventName] = [];
          element.eventsCache[eventName].push(callback);
          aQuery.addEvent(element, eventName, function () {
            aQuery.each(element.eventsCache[eventName], function (k, method) {
              method.call(element);
            });
          });
        } else {
          element.eventsCache[eventName].push(callback);
        }
      });
      return this;
    },

    /**
     * Remove an event handler.
     * @param {string} eventName - the event name
     * @param {Function} [callback] - the callback function
     * @returns {aQuery} - the jQuery instance object calls the function
     */
    off: function (eventName, callback) {
      // no arguments
      if(arguments.length === 0) {
        this.each(function (index, element) {
          element.eventsCache = {};
        });
      }
      // one arguments
      else if(arguments.length === 1) {
        this.each(function (index, element) {
          element.eventsCache[eventName] = [];
        });
      }
      // two arguments
      else if(arguments.length === 2) {
        this.each(function (index, element) {
          let events = element.eventsCache[eventName];
          if(events.includes(callback)) {
            events.splice(events.indexOf(callback), 1);
          }
        });
      }
      return this;
    }
  });

  aQuery.prototype.init.prototype = aQuery.prototype;
  window.aQuery = window.$ = aQuery;
})(window);