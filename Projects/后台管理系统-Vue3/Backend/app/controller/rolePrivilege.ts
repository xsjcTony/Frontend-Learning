/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
/* eslint '@typescript-eslint/ban-ts-comment': 'off' */


/**
 * imports
 */
import { Controller } from 'egg'
import { Sequelize } from 'sequelize'
import { RolePrivilege } from '../model/RolePrivilege'


/**
 * controller
 */
export default class RolePrivilegeController extends Controller {

  /**
   * Assign role to a user (REST API - POST)
   * @return {Promise<void>}
   */
  public async assignRolePrivileges(): Promise<void> {
    const { ctx } = this
    const roleId: number = ctx.request.body.roleId
    const privilegeIds: number[] = ctx.request.body.privilegeIds

    const transaction = await (ctx.model as unknown as Sequelize).transaction()

    try {
      const assignedPrivilegeIds = (await ctx.service.rolePrivilege.findRolePrivileges({ roleId })).map(rolePrivilege => (rolePrivilege.toJSON() as RolePrivilege).privilegeId)

      if (assignedPrivilegeIds.length === privilegeIds.length) {
        ctx.success(200, 'Privileges have been assigned', privilegeIds)
        return
      }

      // privileges' id need to be added and removed
      const addPrivilegeIds = privilegeIds.filter(privilegeId => !assignedPrivilegeIds.includes(privilegeId))
      const removePrivilegeIds = assignedPrivilegeIds.filter(privilegeId => !privilegeIds.includes(privilegeId))

      // assign roles
      for (const privilegeId of addPrivilegeIds) {
        // @ts-ignore
        await ctx.service.rolePrivilege.createRolePrivilege({ roleId, privilegeId }, { transaction })
      }

      // unassign roles
      for (const privilegeId of removePrivilegeIds) {
        await ctx.service.rolePrivilege.deleteRolePrivilege({ roleId, privilegeId }, { transaction })
      }

      await transaction.commit()

      ctx.success(200, 'Privileges have been assigned', privilegeIds)
    } catch (err) {
      await transaction.rollback()

      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Failed to assign privileges', err)
      }
    }
  }
}
