import { encryptByMd5 } from '../utils/crypto.js'
import User from '../database/sequelizeModel/User.js'


export const getUser = async (username) => {
  return await User.findAll({
    where: {
      username
    }
  })
}


export const createUser = async ({ username, password, gender }) => {
  await User.create({
    username,
    password: encryptByMd5(password),
    gender
  })
}


export const checkCredential = async ({ username, password }) => {
  return await User.findAll({
    where: {
      username,
      password: encryptByMd5(password)
    }
  })
}
