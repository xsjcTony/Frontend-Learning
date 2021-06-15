function checkType(any) {
  return Object.prototype.toString.call(any).slice(8, -1);
}
function clone(any) {
  if (checkType(any) === "Object") {
    // 拷贝对象
    let o = {};
    for (let key in any) {
      o[key] = clone(any[key]);
    }
    return o;
  } else if (checkType(any) === "Array") {
    // 拷贝数组
    var arr = [];
    for (let i = 0, len = any.length; i < len; i++) {
      arr[i] = clone(any[i]);
    }
    return arr;
  } else if (checkType(any) === "Function") {
    // 拷贝函数
    return new Function("return " + any.toString()).call(this);
  } else if (checkType(any) === "Date") {
    // 拷贝日期
    return new Date(any.valueOf());
  } else if (checkType(any) === "RegExp") {
    // 拷贝正则
    return new RegExp(any);
  } else if (checkType(any) === "Map") {
    // 拷贝Map 集合
    let m = new Map();
    any.forEach((v, k) => {
      m.set(k, clone(v));
    });
    return m;
  } else if (checkType(any) === "Set") {
    // 拷贝Set 集合
    let s = new Set();
    for (let val of any.values()) {
      s.add(clone(val));
    }
    return s;
  }
  return any;
}
// 测试

let student = {
  name: "小明",
  skills: ["踢球", "跑步", "打羽毛球"],
  age: 18,
  companion: {
    name: "小华",
    age: 18,
  },
  map: new Map([["aaa", "123"]]),
  fn: function () {
    console.log(`我的名字叫${this.name}`);
  },
  // Array.from
  set: new Set([1, 2, 3, 4, 5]),
};

let newA = clone(student);
console.log(newA);

let newB = clone(student);
console.log(newB);

// student.age = 21;
// student.companion.age = 20;
// student.set.add("1123");
// student.skills.push("计算机");
// student.name = "小梅";
// student.map.set("name", "小明");
// console.log(student);
// console.log(newA);
// student.fn("student");
// newA.fn("newA");
