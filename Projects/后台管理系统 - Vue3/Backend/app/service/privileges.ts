/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */

import { Service } from 'egg'
import { Op } from 'sequelize'
import type { Privilege } from '../model/Privilege'
import type {
  ModifyPrivilegeData,
  PrivilegeQueryData
} from '../types'
import type { IFindOptions } from 'sequelize-typescript'


export default class PrivilegesService extends Service {

  /**
   * Get roles by query info (REST API - GET)
   * @param {RoleQueryData} query
   * @return {Promise<{rows: Role[], count: number}>}
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

    if (query.currentPageNumber && query.pageSize) {
      const currentPageNumber = parseInt(query.currentPageNumber) || 1
      const pageSize = parseInt(query.pageSize) || 10

      baseOptions = {
        ...baseOptions,
        limit: pageSize,
        offset: (currentPageNumber - 1) * pageSize
      }
    }

    let whereOptions: IFindOptions<Privilege>['where'] = {}

    if (query.type) {
      whereOptions = {
        ...whereOptions,
        type: query.type
      }
    }


    return this.ctx.model.Privilege.findAndCountAll({
      ...baseOptions,
      where: {
        ...whereOptions,
        privilegeName: { [Op.substring]: query.keyword }
      }
    })
  }


  /**
   * Add privilege to database (REST API - POST)
   * @param {ModifyPrivilegeData} data
   * @return {Promise<Privilege>}
   */
  public async createPrivilege(data: ModifyPrivilegeData): Promise<Privilege> {
    const { privilegeName, privilegeDescription } = data

    const p1 = await this._findPrivilege({ privilegeName })
    if (p1) {
      throw new Error(`Privilege "${ privilegeName }" already exists`)
    }

    const p2 = await this._findPrivilege({ privilegeDescription })
    if (p2) {
      throw new Error(`Privilege description must be unique`)
    }

    return this.ctx.model.Privilege.create(data)
  }


  /**
   * Update privilege in database (REST API - PUT)
   */
  public async updatePrivilege(id: string, data: ModifyPrivilegeData): Promise<Privilege> {
    const privilege = await this._getPrivilegeById(id)
    const { privilegeName, privilegeDescription } = data

    if (!('privilegeState' in data)) {
      if (privilegeName !== privilege.privilegeName) {
        const p = await this._findPrivilege({ privilegeName })
        if (p) {
          throw new Error(`Privilege "${ privilegeName }" already exists`)
        }
      }

      if (privilegeDescription !== privilege.privilegeDescription) {
        const p = await this._findPrivilege({ privilegeDescription })
        if (p) {
          throw new Error(`Privilege description must be unique`)
        }
      }
    }

    await privilege.update(data)

    const res = privilege.toJSON() as Privilege
    delete res.updatedAt
    return res
  }


  /**
   * Delete privilege in database (REST API - DELETE)
   * @param {string} id
   * @return {Promise<Role>}
   */
  public async deletePrivilege(id: string): Promise<Privilege> {
    const role = await this._getPrivilegeById(id)

    await role.destroy()
    return role
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


  /**
   * Look for privilege based on given `PRIMARY KEY`
   * @param {string} id
   * @return {Promise<Privilege>}
   * @private
   */
  private async _getPrivilegeById(id: string): Promise<Privilege> {
    const privilege = await this.ctx.model.Privilege.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })

    if (privilege) {
      return privilege
    } else {
      throw new Error('Privilege doesn\'t exist.')
    }
  }
}
