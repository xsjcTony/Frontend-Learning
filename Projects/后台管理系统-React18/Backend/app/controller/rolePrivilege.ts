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
   * @api {post} /api/v1/role-privilege Assign privileges
   * @apiVersion 1.0.0
   * @apiName assignPrivileges
   * @apiGroup Role manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiBody {number} roleId The role's ID to assign privileges to
   * @apiBody {number[]} privilegeIds Array of ID of privileges to be assigned
   *
   * @apiDescription Assign specified privileges to a role.
   * <br>
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {number[]} data Array of IDs of assigned privileges
   *
   * @apiSuccessExample {json} Success response (example)
   * {
   *   code: 200,
   *   msg: "Privileges have been assigned",
   *   data: [1, 2, // ...]
   * }
   *
   * @apiError (Error 400) PrivilegeAssigned Privilege has been assigned, cannot reassign
   * @apiError (Error 400) PrivilegeNotAssigned Privilege has not been assigned, cannot cancel
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response (example)
   * {
   *   code: 500,
   *   msg: "Internal server error",
   *   data: {}
   * }
   */
  public async assignRolePrivileges(): Promise<void> {
    const { ctx } = this
    const roleId: number = ctx.request.body.roleId
    const privilegeIds: number[] = ctx.request.body.privilegeIds

    const transaction = await (ctx.model as unknown as Sequelize).transaction()

    try {
      const assignedPrivilegeIds = (await ctx.service.rolePrivilege.findRolePrivileges({ roleId })).map(rolePrivilege => (rolePrivilege.toJSON() as RolePrivilege).privilegeId)

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

      ctx.success(200, 'message.roles.assign-privileges.success', privilegeIds)
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
