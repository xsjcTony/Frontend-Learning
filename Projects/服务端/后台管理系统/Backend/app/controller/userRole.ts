/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
/* eslint '@typescript-eslint/ban-ts-comment': 'off' */


/**
 * imports
 */
import { Controller } from 'egg'
import { Sequelize } from 'sequelize'
import { UserRole } from '../model/UserRole'


/**
 * controller
 */
export default class UserRoleController extends Controller {

  /**
   * Assign role to a user (REST API - POST)
   * @return {Promise<void>}
   */
  public async assignUserRoles(): Promise<void> {
    const { ctx } = this
    const userId: number = ctx.request.body.userId
    const roleIds: number[] = ctx.request.body.roleIds

    const transaction = await (ctx.model as unknown as Sequelize).transaction()

    try {
      const assignedRoleIds = (await ctx.service.userRole.findUserRoles({ userId })).map(userRole => (userRole.toJSON() as UserRole).roleId)

      if (assignedRoleIds.length === roleIds.length) {
        ctx.success(200, 'Roles have been assigned', roleIds)
        return
      }

      // roles' id need to be added and removed
      const addRoleIds = roleIds.filter(roleId => !assignedRoleIds.includes(roleId))
      const removeRoleIds = assignedRoleIds.filter(roleId => !roleIds.includes(roleId))

      // assign roles
      for (const roleId of addRoleIds) {
        // @ts-ignore
        await ctx.service.userRole.createUserRole({ userId, roleId }, { transaction })
      }

      // unassign roles
      for (const roleId of removeRoleIds) {
        await ctx.service.userRole.deleteUserRole({ userId, roleId }, { transaction })
      }

      await transaction.commit()

      ctx.success(200, 'Roles have been assigned', roleIds)
    } catch (err) {
      await transaction.rollback()

      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Failed to assign roles', err)
      }
    }
  }
}
