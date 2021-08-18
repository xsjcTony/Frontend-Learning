class MyArray {
  constructor() {
    for(let i = 0; i < arguments.length; i++) {
      this[i] = arguments[i];
    }
    this.length = arguments.length;
  }

  [Symbol.iterator]() {
    let index = 0;
    let self = this;
    return {
      next: function () {
        if(index < self.length) {
          return {
            value: self[index++],
            done: false
          };
        } else {
          return {
            value: self[index],
            done: true
          };
        }
      }
    };
  }
}