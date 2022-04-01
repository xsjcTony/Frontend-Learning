/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */

import { Service } from 'egg'
import { Op } from 'sequelize'
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
import { Privilege } from '../model/Privilege'


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

    if (query.currentPageNumber && query.pageSize) {
      const currentPageNumber = parseInt(query.currentPageNumber) || 1
      const pageSize = parseInt(query.pageSize) || 10

      baseOptions = {
        ...baseOptions,
        limit: pageSize,
        offset: (currentPageNumber - 1) * pageSize
      }
    }

    const { role, origin, type, keyword } = query

    let whereOptions: IWhereOptions<unknown> = {}

    // origin indicated
    if (origin) {
      if (origin === 'github') {
        whereOptions = {
          ...whereOptions,
          [origin]: true
        }
      } else {
        whereOptions = {
          ...whereOptions,
          github: false
        }
      }
    }

    // type indicated
    if (type) {
      whereOptions = {
        ...whereOptions,
        [type]: { [Op.substring]: keyword }
      }
    } else {
      whereOptions = {
        ...whereOptions,
        [Op.or]: [
          { username: { [Op.substring]: keyword } },
          { email: { [Op.substring]: keyword } }
        ]
      }
    }

    // role indicated
    if (role) {

    }

    return this.ctx.model.User.findAndCountAll({
      ...baseOptions,
      where: whereOptions
    })
  }


  /**
   * Add user to database (REST API - POST)
   * @param {AddUserData | ImportUserData} data
   * @param {ICreateOptions} options
   * @return {Promise<User>}
   */
  public async createUser(data: AddUserData | ImportUserData, options?: ICreateOptions): Promise<User> {
    const { username, email } = data
    data.password = this.ctx.helper.encryptByMd5(data.password)

    if (username) {
      const user = await this._findUser({ username })
      if (user) {
        throw new Error(`Username "${ username }" already exists`)
      }
    }

    if (email) {
      const user = await this._findUser({ email })
      if (user) {
        throw new Error(`Email "${ email }" already exists`)
      }
    }

    if (!username && !email) {
      throw new Error('Require at least one of username and email')
    }

    return this.ctx.model.User.create(data, options)
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
      return user
    } else {
      throw new Error('User doesn\'t exist.')
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

    if (data.password) {
      data.password = this.ctx.helper.encryptByMd5(data.password)
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
        include: [{
          model: Privilege,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          through: {
            attributes: []
          }
        }]
      }]
    })

    if (user) {
      return user
    } else {
      throw new Error('User doesn\'t exist.')
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
