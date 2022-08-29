/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */

import path from 'node:path'
import { Service } from 'egg'
import { Op } from 'sequelize'
import { Menu } from '../model/Menu'
import { Privilege } from '../model/Privilege'
import { Role } from '../model/Role'
import type { User } from '../model/User'
import type {
  AddUserData,
  EditUserData,
  ImportUserData,
  UserQueryData
} from '../types'
import type { WhereOptions } from 'sequelize'
import type { ICreateOptions, IFindOptions } from 'sequelize-typescript'
import type { IWhereOptions } from 'sequelize-typescript/lib/interfaces/IWhereOptions'


export default class UsersService extends Service {

  /**
   * Get all users from database (REST API - GET)
   * @return {Promise<User[]>}
   */
  public async getAllUsers(): Promise<User[]> {
    return this.ctx.model.User.findAll({
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
  }


  /**
   * Get users by query info (REST API - GET)
   * @param {UserQueryData} query
   * @return {Promise<{rows: User[], count: number}>}
   */
  public async getUsersByQuery(query: UserQueryData): Promise<{
    rows: User[]
    count: number
  }> {
    let baseOptions: IFindOptions<User> = {
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
    }

    if (query.current && query.pageSize) {
      const currentPageNumber = parseInt(query.current) || 1
      const pageSize = parseInt(query.pageSize) || 10

      baseOptions = {
        ...baseOptions,
        limit: pageSize,
        offset: (currentPageNumber - 1) * pageSize
      }
    }

    const { username, email } = query

    let whereOptions: IWhereOptions<unknown> = {}

    if (username) {
      whereOptions = {
        ...whereOptions,
        username: { [Op.substring]: username }
      }
    }

    if (email) {
      whereOptions = {
        ...whereOptions,
        email: { [Op.substring]: email }
      }
    }

    const rows = await this.ctx.model.User.findAll({
      ...baseOptions,
      where: whereOptions
    })

    const count = await this.ctx.model.User.count({
      where: whereOptions
    })

    return {
      rows,
      count
    }
  }


  /**
   * Add user to database (REST API - POST)
   * @param {AddUserData | ImportUserData} data
   * @param {ICreateOptions} options
   * @return {Promise<User>}
   */
  public async createUser(data: AddUserData | ImportUserData, options?: ICreateOptions): Promise<User> {
    const obj = { ...data }
    const { username, email } = obj
    obj.password = this.ctx.helper.encryptByMd5(data.password)

    if (email) {
      const user = await this._findUser({ email })
      if (user) {
        throw new Error(`message.register.email.exist`)
      }
    }

    if (username) {
      const user = await this._findUser({ username })
      if (user) {
        throw new Error(`message.register.username.exist`)
      }
    }

    if (!username && !email) {
      throw new Error('Require at least one of username and email')
    }

    return this.ctx.model.User.create(obj, options)
  }


  /**
   * Delete user in database (REST API - DELETE)
   * @param {string} id
   * @return {Promise<User>}
   */
  public async deleteUser(id: string): Promise<User> {
    const user = await this.ctx.model.User.findByPk(id, {
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

    if (user) {
      await user.destroy()

      if (!user.avatarUrl.endsWith('avatar.jpg')) {
        const avatarFile = path.join(this.config.baseDir, 'app', user.avatarUrl)
        await this.ctx.helper.removeFile(avatarFile)
      }

      return user
    } else {
      throw new Error('message.users.user.missing')
    }
  }


  /**
   * Update user in database (REST API - PUT)
   * @param {string} id
   * @param {AddUserData} data
   * @return {Promise<User>}
   */
  public async updateUser(id: string, data: EditUserData): Promise<User> {
    const user = await this.getUserById(id)

    const { username, email } = data
    if (data.password) {
      data.password = this.ctx.helper.encryptByMd5(data.password)
    }

    if (email) {
      const u = await this._findUser({ email })
      if (u && u.email !== email) {
        throw new Error(`message.register.email.exist`)
      }
    }

    if (username) {
      const u = await this._findUser({ username })
      if (u && u.username !== username) {
        throw new Error(`message.register.username.exist`)
      }
    }

    if (data.userState === undefined && !username && !email) {
      throw new Error('Require at least one of username and email')
    }

    await user.update(data)

    const res = user.toJSON() as User
    delete res.updatedAt
    return res
  }


  /**
   * Get user by ID (Primary key) (REST API - GET)
   * @param {string} id
   * @return {Promise<User>}
   */
  public async getUserById(id: string): Promise<User> {
    const user = await this.ctx.model.User.findByPk(id, {
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
        },
        include: [
          {
            model: Privilege,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            },
            through: {
              attributes: []
            }
          },
          {
            model: Menu,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            },
            through: {
              attributes: []
            }
          }
        ]
      }]
    })

    if (user) {
      return user
    } else {
      throw new Error('message.users.user.missing')
    }
  }


  /**
   * Helper functions
   */


  /**
   * Look for **ONE** user from database based on given `WHERE` options.
   * @param {WhereOptions} options
   * @return {Promise<User | null>}
   * @private
   */
  private async _findUser(options: WhereOptions): Promise<User | null> {
    return this.ctx.model.User.findOne({ where: options })
  }
}
