/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */

import { Service } from 'egg'
import type { RolePrivilege } from '../model/RolePrivilege'
import type { ModifyRolePrivilegeData } from '../types'
import type { InstanceDestroyOptions } from 'sequelize'
import type { ICreateOptions, IFindOptions } from 'sequelize-typescript'


export default class RolePrivilegeService extends Service {

  /**
   * Add rolePrivilege to database (REST API - POST)
   * @param {ModifyRolePrivilegeData} data
   * @param {ICreateOptions} options
   * @return {Promise<UserRole>}
   */
  public async createRolePrivilege(data: ModifyRolePrivilegeData, options: ICreateOptions): Promise<RolePrivilege> {
    const { roleId, privilegeId } = data

    const rolePrivilege = await this._findUserRole({ roleId, privilegeId })
    if (rolePrivilege) {
      throw new Error(`Privilege (ID: ${ privilegeId }) has already been assigned to role (ID: ${ roleId })`)
    }

    return this.ctx.model.RolePrivilege.create(data, options)
  }


  /**
   * Delete rolePrivilege from database (REST API - POST)
   * @param {ModifyRolePrivilegeData} data
   * @param {InstanceDestroyOptions} options
   * @return {Promise<RolePrivilege>}
   */
  public async deleteRolePrivilege(data: ModifyRolePrivilegeData, options: InstanceDestroyOptions): Promise<RolePrivilege> {
    const { roleId, privilegeId } = data

    const rolePrivilege = await this._findUserRole({ roleId, privilegeId })
    if (!rolePrivilege) {
      throw new Error(`Privilege (ID: ${ privilegeId }) isn't assigned to role (ID: ${ roleId })`)
    }

    await rolePrivilege.destroy(options)
    return rolePrivilege
  }


  /**
   * Helper functions
   */

  /**
   * Look for **ALL** rolePrivileges from database based on given `WHERE` options
   * @param {IFindOptions<RolePrivilege>["where"]} where
   * @return {Promise<RolePrivilege[]>}
   */
  public async findRolePrivileges(where: IFindOptions<RolePrivilege>['where']): Promise<RolePrivilege[]> {
    return this.ctx.model.RolePrivilege.findAll({
      where,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
  }


  /**
   * Look for **ONE** rolePrivilege from database based on given `WHERE` options
   * @param {IFindOptions<RolePrivilege>["where"]} where
   * @return {Promise<RolePrivilege|null>}
   * @private
   */
  private async _findUserRole(where: IFindOptions<RolePrivilege>['where']): Promise<RolePrivilege | null> {
    return this.ctx.model.RolePrivilege.findOne({
      where,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
  }
}
