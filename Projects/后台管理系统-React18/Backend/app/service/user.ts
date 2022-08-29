import { Service } from 'egg'
import { Role } from '../model/Role'
import type { User } from '../model/User'
import type { LoginData, OAuthBindData, RegisterData } from '../types'
import type { WhereOptions } from 'sequelize'


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
    const { password } = data
    const encryptedPassword = this.ctx.helper.encryptByMd5(password)

    if ('username' in data) {
      return this._loginUserByUsername(data.username, encryptedPassword)
    } else {
      return this._loginUserByEmail(data.email, encryptedPassword)
    }
  }


  public async createFullUser(data: OAuthBindData): Promise<User> {
    const encryptedPassword = this.ctx.helper.encryptByMd5(data.password)

    const { username, email } = data

    return this._createUser(username, email, encryptedPassword)
  }


  public async findByEmail(email: string): Promise<User | null> {
    const res = await this._findUser({ email })

    if (res) {
      return res
    } else {
      throw new Error('message.reset-password.verify.email.invalid')
    }
  }


  public async resetPassword(email: string, password: string): Promise<User> {
    const encryptedPassword = this.ctx.helper.encryptByMd5(password)

    const user = await this._findUser({ email })

    if (!user) {
      throw new Error('message.reset-password.verify.email.invalid')
    }

    await user.update({ password: encryptedPassword })

    const res = user.toJSON() as User
    delete res.updatedAt
    return res
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
      throw new Error('message.register.username.exist')
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
      throw new Error('message.register.email.exist')
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


  private async _createUser(username: string, email: string, password: string): Promise<User> {
    let user = await this._findUser({ username })
    if (user) {
      throw new Error('message.register.username.exist')
    }

    user = await this._findUser({ email })
    if (user) {
      throw new Error('message.register.email.exist')
    }

    const data = await this.ctx.model.User.create({
      username,
      email,
      password,
      github: true
    })

    const res = await this.ctx.model.User.findByPk(data.id, {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
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
      throw new Error('message.login.wrong-username')
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
      throw new Error('message.login.wrong-email')
    }

    return user
  }
}
