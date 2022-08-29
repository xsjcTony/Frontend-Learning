/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */

import { Service } from 'egg'
import { Op } from 'sequelize'
import type { Privilege } from '../model/Privilege'
import type {
  AddPrivilegeData,
  ModifyPrivilegeData,
  PrivilegeQueryData
} from '../types'
import type { IFindOptions } from 'sequelize-typescript'


export default class PrivilegesService extends Service {

  /**
   * Get roles by query info (REST API - GET)
   * @param {RoleQueryData} query
   * @return {Promise<{rows: Privilege[], count: number}>}
   */
  public async getPrivilegesByQuery(query: PrivilegeQueryData): Promise<{
    rows: Privilege[]
    count: number
  }> {
    let baseOptions: IFindOptions<Privilege> = {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
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

    if (query.levelSorting) {
      baseOptions = {
        ...baseOptions,
        order: [['level', query.levelSorting], ['id', 'asc']]
      }
    }

    let whereOptions: IFindOptions<Privilege>['where'] = {}

    if (query.privilegeName) {
      whereOptions = {
        ...whereOptions,
        privilegeName: { [Op.substring]: query.privilegeName }
      }
    }

    if (query.parentId) {
      whereOptions = {
        ...whereOptions,
        parentId: query.parentId
      }
    }

    if (query.requestMethod) {
      whereOptions = {
        ...whereOptions,
        requestMethod: query.requestMethod
      }
    }

    if (query.level) {
      whereOptions = {
        ...whereOptions,
        level: query.level
      }
    }

    return this.ctx.model.Privilege.findAndCountAll({
      ...baseOptions,
      where: whereOptions
    })
  }


  /**
   * Look for privilege based on given `PRIMARY KEY`
   */
  public async getPrivilegeById(id: string): Promise<Privilege> {
    const privilege = await this.ctx.model.Privilege.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })

    if (privilege) {
      return privilege
    } else {
      throw new Error('message.privileges.privilege.missing')
    }
  }


  /**
   * Add privilege to database (REST API - POST)
   * @param {ModifyPrivilegeData} data
   * @return {Promise<Privilege>}
   */
  public async createPrivilege(data: AddPrivilegeData): Promise<Privilege> {
    const { privilegeName, privilegeDescription } = data

    const p1 = await this._findPrivilege({ privilegeName })
    if (p1) {
      throw new Error('message.privileges.privilege-name.exist')
    }

    const p2 = await this._findPrivilege({ privilegeDescription })
    if (p2) {
      throw new Error('message.privileges.privilege-description.exist')
    }

    return this.ctx.model.Privilege.create(data)
  }


  /**
   * Update privilege in database (REST API - PUT)
   */
  public async updatePrivilege(id: string, data: ModifyPrivilegeData): Promise<Privilege> {
    const privilege = await this.getPrivilegeById(id)
    const { privilegeName, privilegeDescription } = data

    if (data.privilegeState === undefined) {
      // modifying details
      if (privilegeName !== privilege.privilegeName) {
        const p = await this._findPrivilege({ privilegeName })
        if (p) {
          throw new Error('message.privileges.privilege-name.exist')
        }
      }

      if (privilegeDescription !== privilege.privilegeDescription) {
        const p = await this._findPrivilege({ privilegeDescription })
        if (p) {
          throw new Error('message.privileges.privilege-description.exist')
        }
      }

      await privilege.update(data)
    } else {
      // modifying state
      if (privilege.parentId === 0) {
        await this.ctx.model.Privilege.update({ privilegeState: data.privilegeState }, { where: { parentId: privilege.id } })
      }

      await privilege.update(data)
    }

    const res = privilege.toJSON() as Privilege
    delete res.updatedAt
    return res
  }


  /**
   * Delete privilege in database (REST API - DELETE)
   * @param {string} id
   * @return {Promise<Privilege>}
   */
  public async deletePrivilege(id: string): Promise<Privilege> {
    const privilege = await this.getPrivilegeById(id)

    if (privilege.parentId === 0) {
      const p = await this._findPrivilege({ parentId: privilege.id })
      if (p) {
        throw new Error('message.privileges.delete.associated')
      }
    }

    await privilege.destroy()
    return privilege
  }


  /**
   * Helper functions
   */

  /**
   * Look for **ONE** privilege from database based on given `WHERE` options
   * @param {IFindOptions<Role>["where"]} options
   * @return {Promise<Privilege|null>}
   * @private
   */
  private async _findPrivilege(options: IFindOptions<Privilege>['where']): Promise<Privilege | null> {
    return this.ctx.model.Privilege.findOne({ where: options })
  }
}
