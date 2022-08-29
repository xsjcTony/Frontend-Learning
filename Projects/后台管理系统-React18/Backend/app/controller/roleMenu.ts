/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
/* eslint '@typescript-eslint/ban-ts-comment': 'off' */


/**
 * imports
 */
import { Controller } from 'egg'
import type { RoleMenu } from '../model/RoleMenu'
import type { Sequelize } from 'sequelize'


/**
 * controller
 */
export default class RoleMenuController extends Controller {

  /**
   * @api {post} /api/v1/role-menu Assign menus
   * @apiVersion 1.0.0
   * @apiName assignMenus
   * @apiGroup Role manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiBody {number} roleId The role's ID to assign privileges to
   * @apiBody {number[]} menuIds Array of ID of menus to be assigned
   *
   * @apiDescription Assign specified menus to a role.
   * <br>
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {number[]} data Array of IDs of assigned menus
   *
   * @apiSuccessExample {json} Success response (example)
   * {
   *   code: 200,
   *   msg: "Menus have been assigned",
   *   data: [1, 2, // ...]
   * }
   *
   * @apiError (Error 400) MenuAssigned Menu has been assigned, cannot reassign
   * @apiError (Error 400) MenuNotAssigned Menu has not been assigned, cannot cancel
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response (example)
   * {
   *   code: 500,
   *   msg: "Internal server error",
   *   data: {}
   * }
   */
  public async assignRoleMenus(): Promise<void> {
    const { ctx } = this
    const roleId: number = ctx.request.body.roleId
    const menuIds: number[] = ctx.request.body.menuIds

    const transaction = await (ctx.model as unknown as Sequelize).transaction()

    try {
      const assignedMenuIds = (await ctx.service.roleMenu.findRoleMenus({ roleId })).map(roleMenu => (roleMenu.toJSON() as RoleMenu).menuId)

      // menus' id need to be added and removed
      const addMenuIds = menuIds.filter(menuId => !assignedMenuIds.includes(menuId))
      const removeMenuIds = assignedMenuIds.filter(menuId => !menuIds.includes(menuId))

      // assign menus
      for (const menuId of addMenuIds) {
        // @ts-ignore
        await ctx.service.roleMenu.createRoleMenu({ roleId, menuId }, { transaction })
      }

      // unassign menus
      for (const menuId of removeMenuIds) {
        await ctx.service.roleMenu.deleteRoleMenu({ roleId, menuId }, { transaction })
      }

      await transaction.commit()

      ctx.success(200, 'message.roles.assign-menus.success', menuIds)
    } catch (err) {
      await transaction.rollback()

      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Failed to assign menus', err)
      }
    }
  }
}
