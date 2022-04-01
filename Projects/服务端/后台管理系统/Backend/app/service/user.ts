import { Service } from 'egg'
import { Role } from '../model/Role'
import type { User } from '../model/User'
import type { LoginData, RegisterData } from '../types'
import type { WhereOptions } from 'sequelize'
import { Privilege } from '../model/Privilege'


export default class UserService extends Service {

  /**
   * Create user in database.
   * @param {RegisterData} data
   * @return {Promise<object>}
   */
  public async createUser(data: RegisterData): Promise<User> {
    const encryptedPassword = this.ctx.helper.encryptByMd5(data.password)

    if ('username' in data) {
      // Normal Register
      return this._createUserByUsername(data.username, encryptedPassword, data.github)
    } else {
      // Email Register
      return this._createUserByEmail(data.email, encryptedPassword)
    }
  }


  /**
   * Login user
   * @param {LoginData} data
   * @return {Promise<object>}
   */
  public async loginUser(data: LoginData): Promise<User> {
    const usernameRegex = /^[A-Za-z0-9]{6,20}$/
    const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    const { username, password } = data
    const encryptedPassword = this.ctx.helper.encryptByMd5(password)

    if (usernameRegex.test(username)) {
      // Username Login
      return this._loginUserByUsername(username, encryptedPassword)
    } else if (emailRegex.test(username)) {
      // Email Login
      return this._loginUserByEmail(username, encryptedPassword)
    } else {
      // Invalid username or email
      throw new Error('Invalid username or email')
    }
  }


  /**
   * Helper functions
   */


  /**
   * Look for **ONE** user from database based on given where options.
   * @param {WhereOptions} options
   * @return {Promise<User | null>}
   * @private
   */
  private async _findUser(options: WhereOptions): Promise<User | null> {
    return this.ctx.model.User.findOne({
      where: options,
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
    })
  }


  /**
   * Create user in database by USERNAME.
   * @param {string} username
   * @param {string} password
   * @param {boolean} [github = false]
   * @return {Promise<User>}
   * @private
   */
  private async _createUserByUsername(username: string, password: string, github = false): Promise<User> {
    const user = await this._findUser({ username })
    if (user) {
      throw new Error('Username already exists.')
    }

    const data = await this.ctx.model.User.create({
      username,
      password,
      github
    })

    const res = await this.ctx.model.User.findByPk(data.id, {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      },
      include: [{
        model: Role,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        through: {
          attributes: []
        }
      }]
    })

    if (res) {
      return res
    } else {
      throw new Error()
    }
  }


  /**
   * Create user in database by EMAIL.
   * @param {string} email
   * @param {string} password
   * @return {Promise<User>}
   * @private
   */
  private async _createUserByEmail(email: string, password: string): Promise<User> {
    const user = await this._findUser({ email })
    if (user) {
      throw new Error('Username already exists.')
    }

    const data = await this.ctx.model.User.create({
      email,
      password
    })

    const res = await this.ctx.model.User.findByPk(data.id, {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      },
      include: [{
        model: Role,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        through: {
          attributes: []
        }
      }]
    })

    if (res) {
      return res
    } else {
      throw new Error()
    }
  }


  /**
   * Login user by USERNAME
   * @param {string} username
   * @param {string} password
   * @return {Promise<User>}
   * @private
   */
  private async _loginUserByUsername(username: string, password: string): Promise<User> {
    const user = await this._findUser({ username, password })

    if (!user || !user.userState) {
      throw new Error('Incorrect login credential')
    }

    return user
  }


  /**
   * Login user by EMAIL
   * @param {string} email
   * @param {string} password
   * @return {Promise<User>}
   * @private
   */
  private async _loginUserByEmail(email: string, password: string): Promise<User> {
    const user = await this._findUser({ email, password })

    if (!user || !user.userState) {
      throw new Error('Incorrect login credential')
    }

    return user
  }
}
