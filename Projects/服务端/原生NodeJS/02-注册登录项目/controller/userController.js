import Ajv from 'ajv'
import userSchema from './../validator/userSchema.js'
import { paramsToObject } from './../utils/utils.js'
import {
  checkCredential,
  createUser,
  getUser
} from './../service/userService.js'
import { ErrorModel, SuccessModel } from '../model/ResultModel.js'
import errorConst from '../config/errorConst.js'


const ajv = new Ajv()


// private helper functions
/**
 * Validate user's data against USER JSON SCHEMA
 * @param {Object} data - User's data
 * @return {[boolean, ErrorObject[]]} - [validation result, errors]
 * @private
 */
const _validateUser = (data) => {
  const validate = ajv.compile(userSchema)
  return [validate(data), validate.errors]
}


/**
 * Check if user exists in database
 * @param {string} username - `username`
 * @return {Promise<boolean>} - `true` if user exists, `false` otherwise
 * @private
 */
const _userExists = async (username) => {
  const user = await getUser(username)
  return user.length !== 0
}


// public functions
/**
 * Register user
 * @param {URLSearchParams} data - User's data
 * @return {Promise<ErrorModel|SuccessModel>}
 */
export const registerUser = async (data) => {
  // convert URLSearchParams into Object
  let { username, password, gender } = paramsToObject(data)

  // validate data with user JSON schema
  const [valid, errors] = _validateUser({ username, password, gender })
  if (!valid) {
    return new ErrorModel(errorConst.userRegDataError(errors))
  }

  // determine whether user already exists in database
  const exists = await _userExists(username)
  if (exists) {
    return new ErrorModel(errorConst.userRegDataExists({
      username
    }))
  }

  // register user
  try {
    await createUser({ username, password, gender })
    return new SuccessModel({
      msg: '注册成功',
      data: {
        username
      }
    })
  } catch (err) {
    return new ErrorModel(errorConst.userRegError(err))
  }
}


/**
 * Login user
 * @param {URLSearchParams} data - User's login credential
 * @return {Promise<ErrorModel|SuccessModel>}
 */
export const loginUser = async (data) => {
  // convert URLSearchParams into Object
  let { username, password } = paramsToObject(data)

  // check credential in database
  let user = await checkCredential({ username, password })

  if (user.length !== 0) {
    user = user[0].toJSON()
    delete user['password']

    return new SuccessModel({
      msg: '登录成功',
      data: user
    })
  } else {
    return new ErrorModel(errorConst.userLoginError({
      username
    }))
  }
}
