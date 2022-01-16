import mongoose from 'mongoose'

await mongoose.connect('mongodb://127.0.0.1:27017/it666')

const userSchema = new mongoose.Schema({
  name: String,
  age: Number
})

const User = mongoose.model('User', userSchema)


// create
/*
await User.create([
  { name: 'zs', age: 18 },
  { name: 'ls', age: 22 },
  { name: 'ww', age: 21 },
  { name: 'zl', age: 23 }
])
*/


// read
/*
const res = await User.find({ name: 'zs' }, '-_id name age', { skip: 0, limit: 5 }).exec()
*/


// update
/*
const res = await User.updateMany({ name: 'ls' }, { $set: { age: 888 } })
*/


// delete
const res = await User.deleteMany({ name: 'ww' })
console.log(res)
