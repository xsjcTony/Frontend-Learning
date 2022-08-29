/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */

import { Service } from 'egg'
import type { RoleMenu } from '../model/RoleMenu'
import type { ModifyRoleMenuData } from '../types'
import type { InstanceDestroyOptions } from 'sequelize'
import type { ICreateOptions, IFindOptions } from 'sequelize-typescript'


export default class RoleMenuService extends Service {

  /**
   * Add roleMenu to database (REST API - POST)
   */
  public async createRoleMenu(data: ModifyRoleMenuData, options: ICreateOptions): Promise<RoleMenu> {
    const { roleId, menuId } = data

    const roleMenu = await this._findRoleMenu({ roleId, menuId })
    if (roleMenu) {
      throw new Error(`Menu (ID: ${menuId}) has already been assigned to role (ID: ${roleId})`)
    }

    return this.ctx.model.RoleMenu.create(data, options)
  }


  /**
   * Delete roleMenu from database (REST API - POST)
   */
  public async deleteRoleMenu(data: ModifyRoleMenuData, options: InstanceDestroyOptions): Promise<RoleMenu> {
    const { roleId, menuId } = data

    const roleMenu = await this._findRoleMenu({ roleId, menuId })
    if (!roleMenu) {
      throw new Error(`Menu (ID: ${menuId}) isn't assigned to role (ID: ${roleId})`)
    }

    await roleMenu.destroy(options)
    return roleMenu
  }


  /**
   * Helper functions
   */

  /**
   * Look for **ALL** roleMenus from database based on given `WHERE` options
   */
  public async findRoleMenus(where: IFindOptions<RoleMenu>['where']): Promise<RoleMenu[]> {
    return this.ctx.model.RoleMenu.findAll({
      where,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
  }


  /**
   * Look for **ONE** roleMenu from database based on given `WHERE` options
   * @private
   */
  private async _findRoleMenu(where: IFindOptions<RoleMenu>['where']): Promise<RoleMenu | null> {
    return this.ctx.model.RoleMenu.findOne({
      where,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
  }
}
