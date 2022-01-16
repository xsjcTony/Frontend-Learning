import { Sequelize, DataTypes, Op } from 'sequelize'


// connect to MySQL -> [database] demo
const sequelize = new Sequelize('demo', 'root', '123456', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    idle: 2000,
    acquire: 30000
  }
})


// create table `user`
/*
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING, // varchar(255)
    unique: true,
    allowNull: false
  },
  age: {
    type: DataTypes.TINYINT.UNSIGNED,
    defaultValue: 24
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'unisex'),
    defaultValue: 'unisex'
  }
}, {
  tableName: 'user',
  timestamps: false,
  indexes: [
    {
      name: 'age',
      fields: ['age']
    }
  ]
})
*/

// create table `book`
/*
const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING, // varchar(255)
    unique: true,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    defaultValue: 24
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  tableName: 'book',
  timestamps: false
})
*/


// sync all models defined to database
// await sequelize.sync()


// create data in table `user`
/*
const tony = await User.create({
  name: 'Tony',
  age: 24,
  gender: 'male'
})
*/


// find data
/*
const res = await User.findByPk(2)
*/


// modify data
/*
await User.update({
  name: 'zs'
}, {
  where: {
    id: 2
  }
})
*/


// delete data
/*
await User.destroy({
  where: {
    id: 1
  }
})
*/


// Query
// find multiple instances with fields and conditions
/*
const users = (await User.findAll({
  attributes: ['name', 'age'],
  where: {
    [Op.or]: {
      age: {
        [Op.lte]: 22
      },
      gender: 'male'
    }
  }
})).map(user => user.toJSON())
console.log(users)
*/


// find multiple instance by limit & order by
/*
const users = (await User.findAll({
  offset: 2,
  limit: 4,
  order: [
    ['age', 'DESC'],
    ['id', 'DESC']
  ]
})).map(user => user.toJSON())
console.log(users)
*/


// relational search
// one to one
/*
User.hasOne(Book, {
  foreignKey: 'user_id',
  sourceKey: 'id'
})
const user = await User.findOne({
  where: {
    id: 1
  },
  include: [
    { model: Book }
  ]
})
console.log(user.toJSON())
console.log(user.Book.toJSON())

Book.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id'
})
const book = await Book.findOne({
  where: {
    id: 1
  },
  include: [
    { model: User }
  ]
})
console.log(book.toJSON())
console.log(book.User.toJSON())
*/

// one to many (one user has many books / one book belongs to one user)
/*
User.hasMany(Book, {
  foreignKey: 'user_id',
  sourceKey: 'id'
})
const user = await User.findOne({
  where: {
    id: 1
  },
  include: [
    { model: Book }
  ]
})
console.log(user.toJSON())
user.Books.forEach((book) => { console.log(book.toJSON()) })


Book.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id'
})
const book = await Book.findOne({
  where: {
    id: 3
  },
  include: [
    { model: User }
  ]
})
console.log(book.toJSON())
console.log(book.User.toJSON())
*/

// many to many
/*
// create table `student`
const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  tableName: 'student',
  timestamps: false
})

// create table `teacher`
const Teacher = sequelize.define('Teacher', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  tableName: 'teacher',
  timestamps: false
})

// create relation table `student_teacher_relation`
const StudentTeacherRelation = sequelize.define('StudentTeacherRelation', {}, {
  tableName: 'student_teacher_relation',
  timestamps: false
})

// build many-to-many relationship through
Student.belongsToMany(Teacher, {
  through: StudentTeacherRelation,
  foreignKey: 'student_id'
})
Teacher.belongsToMany(Student, {
  through: StudentTeacherRelation,
  foreignKey: 'teacher_id'
})

// await sequelize.sync()

// queries
const student = await Student.findOne({
  where: {
    id: 1
  },
  include: [
    { model: Teacher }
  ]
})
console.log(student.toJSON())
student.Teachers.forEach((teacher) => { console.log(teacher.toJSON()) })

const teacher = await Teacher.findOne({
  where: {
    id: 1
  },
  include: [
    { model: Student }
  ]
})
console.log(teacher.toJSON())
teacher.Students.forEach((student) => { console.log(student.toJSON()) })
*/
