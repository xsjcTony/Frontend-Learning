/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */

import { Service } from 'egg'
import { Op } from 'sequelize'
import { Menu } from '../model/Menu'
import { Privilege } from '../model/Privilege'
import type { Role } from '../model/Role'
import type {
  RoleQueryData,
  ModifyRoleData
} from '../types'
import type { IFindOptions } from 'sequelize-typescript'
import type { IWhereOptions } from 'sequelize-typescript/lib/interfaces/IWhereOptions'


export default class RolesService extends Service {

  /**
   * Get roles by query info (REST API - GET)
   * @param {RoleQueryData} query
   * @return {Promise<{rows: Role[], count: number}>}
   */
  public async getRolesByQuery(query: RoleQueryData): Promise<{
    rows: Role[]
    count: number
  }> {
    let baseOptions: IFindOptions<Role> = {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
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
    }

    if (query.current && query.pageSize) {
      const currentPageNumber = parseInt(query.current) || 1
      const pageSize = parseInt(query.pageSize) || 5

      baseOptions = {
        ...baseOptions,
        limit: pageSize,
        offset: (currentPageNumber - 1) * pageSize
      }
    }

    let whereOptions: IWhereOptions<unknown> = {}

    if (query.roleName) {
      whereOptions = {
        ...whereOptions,
        roleName: { [Op.substring]: query.roleName }
      }
    }

    const rows = await this.ctx.model.Role.findAll({
      ...baseOptions,
      where: whereOptions
    })

    const count = await this.ctx.model.Role.count({
      where: whereOptions
    })

    return {
      rows,
      count
    }
  }


  /**
   * Add role to database (REST API - POST)
   * @param {ModifyRoleData} data
   * @return {Promise<Role>}
   */
  public async createRole(data: ModifyRoleData): Promise<Role> {
    const { roleName, roleDescription } = data

    const r1 = await this._findRole({ roleName })
    if (r1) {
      throw new Error('message.roles.role-name.exist')
    }

    const r2 = await this._findRole({ roleDescription })
    if (r2) {
      throw new Error('message.roles.role-description.exist')
    }

    return this.ctx.model.Role.create(data)
  }


  /**
   * Delete role in database (REST API - DELETE)
   * @param {string} id
   * @return {Promise<Role>}
   */
  public async deleteRole(id: string): Promise<Role> {
    const role = await this.getRoleById(id)

    await role.destroy()
    return role
  }


  /**
   * Update role in database (REST API - PUT)
   * @param {string} id
   * @param {ModifyRoleData} data
   * @return {Promise<Role>}
   */
  public async updateRole(id: string, data: ModifyRoleData): Promise<Role> {
    const role = await this.getRoleById(id)

    const { roleName, roleDescription } = data

    if (roleName) {
      const r = await this._findRole({ roleName })
      if (r && r.roleName !== roleName) {
        throw new Error('message.roles.role-name.exist')
      }
    }

    if (roleDescription) {
      const r = await this._findRole({ roleDescription })
      if (r && r.roleDescription !== roleDescription) {
        throw new Error('message.roles.role-description.exist')
      }
    }

    await role.update(data)

    const res = role.toJSON() as Role
    delete res.updatedAt
    return res
  }


  /**
   * Look for role based on given `PRIMARY KEY`
   * @param {string} id
   * @return {Promise<Role>}
   * @private
   */
  public async getRoleById(id: string): Promise<Role> {
    const role = await this.ctx.model.Role.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
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
    })

    if (role) {
      return role
    } else {
      throw new Error('message.roles.role.missing')
    }
  }


  /**
   * Helper functions
   */

  /**
   * Look for **ONE** role from database based on given `WHERE` options
   * @param {IFindOptions<Role>["where"]} options
   * @return {Promise<Role|null>}
   * @private
   */
  private async _findRole(options: IFindOptions<Role>['where']): Promise<Role | null> {
    return this.ctx.model.Role.findOne({ where: options })
  }
}
