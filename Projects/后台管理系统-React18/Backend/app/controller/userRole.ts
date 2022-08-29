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
   * @api {post} /api/v1/user-role Assign roles
   * @apiVersion 1.0.0
   * @apiName assignRoles
   * @apiGroup User manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiBody {number} userId The user's ID to assign roles to
   * @apiBody {number[]} roleIds Array of ID of roles to be assigned
   *
   * @apiDescription Assign specified roles to a user.
   * <br>
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {number[]} data Array of IDs of assigned roles
   *
   * @apiSuccessExample {json} Success response (example)
   * {
   *   code: 200,
   *   msg: "Roles have been assigned",
   *   data: [1, 2, // ...]
   * }
   *
   * @apiError (Error 400) RoleAssigned Role has been assigned, cannot reassign
   * @apiError (Error 400) RoleNotAssigned Role has not been assigned, cannot cancel
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response (example)
   * {
   *   code: 500,
   *   msg: "Internal server error",
   *   data: {}
   * }
   */
  public async assignUserRoles(): Promise<void> {
    const { ctx } = this
    const userId: number = ctx.request.body.userId
    const roleIds: number[] = ctx.request.body.roleIds

    const transaction = await (ctx.model as unknown as Sequelize).transaction()

    try {
      const assignedRoleIds = (await ctx.service.userRole.findUserRoles({ userId })).map(userRole => (userRole.toJSON() as UserRole).roleId)

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

      ctx.success(200, 'message.users.assign-roles.success', roleIds)
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
