// define constants for Promise status
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  /**
   * Construct the new Promise object.
   * @param {Function} handler - A function to be executed by the constructor, during the process of constructing the new Promise object.
   */
  constructor(handler) {
    // initialize default status to pending
    this.status = PENDING;
    // initialize parameters for callback function
    this.value = undefined;
    this.reason = undefined;
    // initialize monitor callback functions
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    // check if handler is a function, throw an error if not
    if(!this._isFunction(handler)) {
      throw new Error(handler + " is not a function.");
    }
    // pass two parameters (callback function) into handler
    handler(this._resolve.bind(this), this._reject.bind(this));
  }

  /**
   * Execute callback functions once the status of promise is changed
   * @param {Function} [onFulfilled] - Callback function on promise fulfilled.
   * @param {Function} [onRejected] - Callback function on promise rejected.
   * @returns {MyPromise} - A new Promise object
   */
  then(onFulfilled, onRejected) {
    return new MyPromise((nextResolve, nextReject) => {
      // instant execute if status is fulfilled
      if(this.status === FULFILLED) {
        // check whether onFulfilled is passed in
        if(this._isFunction(onFulfilled)) {
          try {
            let result = onFulfilled(this.value);
            // check if result is a Promise object
            if(result instanceof MyPromise) {
              result.then(nextResolve, nextReject);
            }
            // not a Promise object
            else {
              // pass the returned value to the new Promise object's resolve callback function
              nextResolve(result);
            }
          } catch(e) {
            nextReject(e);
          }
        }
        // onFulfilled is undefined
        else if(arguments.length === 0) {
          nextResolve(this.value);
        }
      }

      // instant execute if status is rejected
      if(this.status === REJECTED) {
        try {
          // check if onRejected is undefined
          if(arguments.length < 2) {
            nextReject(this.reason);
          } else if(this._isFunction(onRejected)) {
            let result = onRejected(this.reason);
            // check if result is a Promise object
            if(result instanceof MyPromise) {
              result.then(nextResolve, nextReject);
            }
            // not a Promise object
            else {
              // pass the returned value to the new Promise object's resolve callback function
              nextResolve(result);
            }
          }
        } catch(e) {
          nextReject(e);
        }
      }

      // check if status is pending
      if(this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          // check whether onFulfilled is passed in
          if(this._isFunction(onFulfilled)) {
            try {
              let result = onFulfilled(this.value);
              // check if result is a Promise object
              if(result instanceof MyPromise) {
                result.then(nextResolve, nextReject);
              }
              // not a Promise object
              else {
                // pass the returned value to the new Promise object's resolve callback function
                nextResolve(result);
              }
            } catch(e) {
              nextReject(e);
            }
          }
          // onFulfilled is undefined
          else if(arguments.length === 0) {
            nextResolve(this.value);
          }
        });

        this.onRejectedCallbacks.push(() => {
          try {
            // check if onRejected is undefined
            if(arguments.length < 2) {
              nextReject(this.reason);
            } else if(this._isFunction(onRejected)) {
              let result = onRejected(this.reason);
              // check if result is a Promise object
              if(result instanceof MyPromise) {
                result.then(nextResolve, nextReject);
              }
              // not a Promise object
              else {
                // pass the returned value to the new Promise object's resolve callback function
                nextResolve(result);
              }
            }
          } catch(e) {
            nextReject(e);
          }
        });
      }
    });
  }

  /**
   * Returns a Promise and deals with rejected cases only. It internally calls `obj.then(undefined, onRejected)`.
   * @param {Function} onRejected - Callback function on promise rejected.
   * @returns {MyPromise} - A new Promise object
   */
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  /**
   * Fulfill the promise.
   * @param {unknown} value - The value to pass into the callback function
   * @private
   */
  _resolve(value) {
    // change status to fulfilled (when pending)
    if(this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      this.onFulfilledCallbacks.forEach(fn => fn(this.value));
    }
  }

  /**
   * Reject the promise.
   * @param {string} reason - The reason that promise is rejected.
   * @private
   */
  _reject(reason) {
    // change status to rejected (when pending)
    if(this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach(fn => fn(this.reason));
    }
  }

  /**
   * Check whether the argument is a function.
   * @param {unknown} fn - The function to check
   * @returns {boolean} `true` if fn is a function, otherwise `false`
   * @private
   */
  _isFunction(fn) {
    return typeof fn === "function";
  }

  /**
   * The `Promise.all()` method takes an iterable of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises. This returned promise will resolve when all of the input's promises have resolved, or if the input iterable contains no promises. It rejects immediately upon any of the input promises rejecting or non-promises throwing an error, and will reject with this first rejection message / error.
   * @param {Iterable} list - An iterable object such as an Array.
   * @returns {MyPromise}
   * - An already resolved Promise if the iterable passed is empty.
   * - An asynchronously resolved Promise if the iterable passed contains no promises. Note, Google Chrome 58 returns an already resolved promise in this case.
   */
  static all(list) {
    return new MyPromise((resolve, reject) => {
      // Array to be passed into resolve function if all promise resolved
      let arr = [];
      // count promise resolved
      let resolvedCount = 0;
      // Iterate over list of promises
      for(let promise of list) {
        promise.then(msg => {
          arr.push(msg);
          if(++resolvedCount === list.length) {
            resolve(arr);
          }
        }).catch(error => reject(error));
      }
    });
  }

  /**
   * The `Promise.race()` method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise.
   * @param {Iterable} list - An iterable object such as an Array.
   * @returns {MyPromise} - A pending Promise that asynchronously yields the value of the first promise in the given iterable to fulfill or reject.
   */
  static race(list) {
    return new MyPromise((resolve, reject) => {
      for(let promise of list) {
        promise.then(value => resolve(value)).catch(error => reject(error));
      }
    })
  }
}