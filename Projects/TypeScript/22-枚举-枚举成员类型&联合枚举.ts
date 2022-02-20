// 枚举成员类型
/*
enum Gender4 {
  Male,
  Female = 'Test'
}
interface TestInterface {
  age: Gender4.Male,
  name: Gender4.Female
}
class Person implements TestInterface {
  age: Gender4.Male = 8
  name: Gender4.Female = Gender4.Female
}
*/


// 联合枚举
/*
enum Gender {
  Male,
  Female
}
// 会被视为
interface TestInterface2 {
  gender: Gender // gender: (Gender.Male | Gender.Female)
}
*/
