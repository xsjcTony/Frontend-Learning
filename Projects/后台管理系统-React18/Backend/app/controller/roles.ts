/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */


/**
 * imports
 */
import { Controller } from 'egg'
import RoleRule from '../validator/roleRule'
import type { RoleQueryData } from '../types'


/**
 * controller
 */
export default class RolesController extends Controller {

  /**
   * @api {get} /api/v1/roles Query roles
   * @apiVersion 1.0.0
   * @apiName queryRoles
   * @apiGroup Role manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiQuery {string} [roleName] Role's name
   * @apiQuery {string} [current] Current page number
   * @apiQuery {string} [pageSize] The size of each page
   *
   * @apiDescription Query roles by conditions provided.
   * <br>
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {object} data `{ rows: Role[], count: number }`
   * <br>
   * Data and count for queried roles (with privileges and menus)
   *
   * @apiSuccessExample {json} Success response
   * {
   *   code: 200,
   *   msg: "success",
   *   data: {
   *     rows: // Role[],
   *     count: 3
   *   }
   * }
   *
   * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
   * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response
   * {
   *   code: 401,
   *   msg: "Permission denied",
   *   data: {}
   * }
   *
   * @apiSampleRequest /api/v1/roles
   */
  public async getRolesByQuery(): Promise<void> {
    const { ctx } = this

    try {
      const roles = await ctx.service.roles.getRolesByQuery(ctx.query as unknown as RoleQueryData)
      ctx.success(200, 'success', roles)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(500, err.message, err)
      } else {
        ctx.error(500, 'Error', err)
      }
    }
  }


  /**
   * @api {get} /api/v1/roles/:id Query role by ID
   * @apiVersion 1.0.0
   * @apiName queryRoleById
   * @apiGroup Role manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiParam {string} id Role's ID
   *
   * @apiDescription Query role by the ID provided.
   * <br>
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {Role} data The role found in the database (with privileges and menus)
   *
   * @apiSuccessExample {json} Success response
   * {
   *   code: 200,
   *   msg: "success",
   *   data: {
   *     // Role
   *   }
   * }
   *
   * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
   * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
   * @apiError (Error 500) RoleNotFound No role with the provided ID is found in the database
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response
   * {
   *   code: 500,
   *   msg: "Role does not exist",
   *   data: {}
   * }
   *
   * @apiSampleRequest /api/v1/roles/:id
   */
  public async getRoleById(): Promise<void> {
    const { ctx } = this

    try {
      const role = await ctx.service.roles.getRoleById(ctx.params.id)
      ctx.success(200, 'success', role)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(500, err.message, err)
      } else {
        ctx.error(500, 'Error', err)
      }
    }
  }


  /**
   * @api {post} /api/v1/roles Create role
   * @apiVersion 1.0.0
   * @apiName createRole
   * @apiGroup Role manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiBody {string} roleName Role's name
   * @apiBody {string} roleDescription Role's description
   *
   * @apiDescription Create a role.
   * <br>
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   *
   * @apiSuccessExample {json} Success response (example)
   * {
   *   code: 200,
   *   msg: "Role has been added"
   * }
   *
   * @apiError (Error 400) RoleNameExist Role's name already exists
   * @apiError (Error 400) RoleDescriptionExist Role's description already exists
   * @apiError (Error 400) InvalidRoleData Invalid role data
   * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
   * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response (example)
   * {
   *   code: 400,
   *   msg: "Role name already exists",
   *   data: {}
   * }
   */
  public async createRole(): Promise<void> {
    const { ctx } = this
    const data = ctx.request.body

    try {
      // validate
      ctx.validate(RoleRule, data)

      // save into database
      await ctx.service.roles.createRole(data)

      ctx.success(200, 'message.roles.add.success')
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
  }


  /**
   * @api {delete} /api/v1/roles/:id Delete role
   * @apiVersion 1.0.0
   * @apiName deleteRole
   * @apiGroup Role manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiParam {string} id Role's ID
   *
   * @apiDescription Delete a role.
   * <br>
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {Role} data Data of the deleted role (with privileges and menus)
   *
   * @apiSuccessExample {json} Success response (example)
   * {
   *   code: 200,
   *   msg: "Role has been deleted",
   *   data: {
   *     // Deleted role
   *   }
   * }
   *
   * @apiError (Error 400) RoleNotFound No role with the provided ID is found in the database
   * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
   * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response (example)
   * {
   *   code: 400,
   *   msg: "Role doesn't exist",
   *   data: {}
   * }
   */
  public async deleteRole(): Promise<void> {
    const { ctx } = this

    try {
      const role = await ctx.service.roles.deleteRole(ctx.params.id)
      ctx.success(200, 'message.roles.role.deleted', role)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
  }


  /**
   * @api {put} /api/v1/roles/:id Update role
   * @apiVersion 1.0.0
   * @apiName updateRole
   * @apiGroup Role manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiParam {string} id Role's ID
   *
   * @apiBody {string} roleName Role's name
   * @apiBody {string} roleDescription Role's description
   * @apiBody {boolean} [roleState] Whether the role is enabled
   *
   * @apiDescription Update a role.
   * <br>
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {Role} data Data of the updated role (with privileges and menus)
   *
   * @apiSuccessExample {json} Success response (example)
   * {
   *   code: 200,
   *   msg: "Role has been updated",
   *   data: {
   *     // Updated role
   *   }
   * }
   *
   * @apiError (Error 400) RoleNameExist Role's name already exists
   * @apiError (Error 400) RoleDescriptionExist Role's description already exists
   * @apiError (Error 400) InvalidRoleData Invalid role data
   * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
   * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response (example)
   * {
   *   code: 400,
   *   msg: "Role's name already exists",
   *   data: {}
   * }
   */
  public async updateRole(): Promise<void> {
    const { ctx } = this
    const data = ctx.request.body

    try {
      if (!('roleState' in data)) {
        // validate
        ctx.validate(RoleRule, data)
      }

      // save into database
      const role = await ctx.service.roles.updateRole(ctx.params.id, data)

      ctx.success(200, 'message.roles.role.updated', role)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
  }
}
