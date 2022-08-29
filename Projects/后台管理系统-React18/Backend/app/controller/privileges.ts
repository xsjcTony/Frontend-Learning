/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */


/**
 * imports
 */
import { Controller } from 'egg'
import PrivilegeRule from '../validator/privilegeRule'
import type { PrivilegeQueryData } from '../types'


/**
 * controller
 */
export default class PrivilegesController extends Controller {

  /**
   * @api {get} /api/v1/privileges Query privileges
   * @apiVersion 1.0.0
   * @apiName queryPrivileges
   * @apiGroup Privilege manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiQuery {string} [privilegeName] Privilege's name
   * @apiQuery {number} [parentId] Parent privilege's ID
   * @apiQuery {string} [requestMethod] `get | post | put | delete`
   * @apiQuery {number} [level] `1 | 2`
   * @apiQuery {string} [levelSorting] Whether `level` is sorted or not
   * <br>
   * One of `asc | desc`
   * @apiQuery {string} [current] Current page number
   * @apiQuery {string} [pageSize] The size of each page
   *
   * @apiDescription Query privileges by conditions provided.
   * <br>
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {object} data `{ rows: Privilege[], count: number }`
   * <br>
   * Data and count for queried privileges
   *
   * @apiSuccessExample {json} Success response
   * {
   *   code: 200,
   *   msg: "success",
   *   data: {
   *     rows: // Privilege[],
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
   * @apiSampleRequest /api/v1/privileges
   */
  public async getPrivilegesByQuery(): Promise<void> {
    const { ctx } = this

    try {
      const privileges = await ctx.service.privileges.getPrivilegesByQuery(ctx.query as unknown as PrivilegeQueryData)
      ctx.success(200, 'success', privileges)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(500, err.message, err)
      } else {
        ctx.error(500, 'Error', err)
      }
    }
  }


  /**
   * @api {get} /api/v1/privileges/:id Query privilege by ID
   * @apiVersion 1.0.0
   * @apiName queryPrivilegeById
   * @apiGroup Privilege manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiParam {string} id Privilege's ID
   *
   * @apiDescription Query privilege by the ID provided.
   * <br>
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {Privilege} data The privilege found in the database
   *
   * @apiSuccessExample {json} Success response
   * {
   *   code: 200,
   *   msg: "success",
   *   data: {
   *     // Privilege
   *   }
   * }
   *
   * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
   * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
   * @apiError (Error 500) PrivilegeNotFound No privilege with the provided ID is found in the database
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response
   * {
   *   code: 500,
   *   msg: "Privilege does not exist",
   *   data: {}
   * }
   *
   * @apiSampleRequest /api/v1/privileges/:id
   */
  public async getPrivilegeById(): Promise<void> {
    const { ctx } = this

    try {
      const privilege = await ctx.service.privileges.getPrivilegeById(ctx.params.id)
      ctx.success(200, 'success', privilege)
    } catch (err) {
      ctx.error(500, err instanceof Error ? err.message : 'Error', err)
    }
  }


  /**
   * @api {post} /api/v1/privileges Create privilege
   * @apiVersion 1.0.0
   * @apiName createPrivilege
   * @apiGroup Privilege manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiBody {string} privilegeName Privilege's name
   * @apiBody {string} privilegeDescription Privilege's description
   * @apiBody {number} level Privilege's level
   * <br>
   * One of `1 | 2`
   * @apiBody {string} [requestMethod] Request method
   * <br>
   * **Required** for `level 2` privilege
   * <br>
   * One of `get | post | put | delete`
   * @apiBody {string} [privilegeUrl] Privilege's request URL
   * <br>
   * **Required** for `level 2` privilege
   * @apiBody {number} parentId Parent privilege's ID
   * <br>
   * Should be `0` for `level 1` privilege
   *
   * @apiDescription Create a privilege.
   * <br>
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   *
   * @apiSuccessExample {json} Success response (example)
   * {
   *   code: 200,
   *   msg: "Privilege has been added"
   * }
   *
   * @apiError (Error 400) PrivilegeNameExist Privilege's name already exists
   * @apiError (Error 400) PrivilegeDescriptionExist Privilege's description already exists
   * @apiError (Error 400) InvalidPrivilegeData Invalid privilege data
   * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
   * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response (example)
   * {
   *   code: 400,
   *   msg: "Privilege name already exists",
   *   data: {}
   * }
   */
  public async createPrivilege(): Promise<void> {
    const { ctx } = this
    const data = ctx.request.body

    try {
      // validate
      ctx.validate(PrivilegeRule, data)

      // save into database
      await ctx.service.privileges.createPrivilege(data)

      ctx.success(200, 'message.privileges.add.success')
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
  }


  /**
   * @api {put} /api/v1/privileges/:id Update privilege
   * @apiVersion 1.0.0
   * @apiName updatePrivilege
   * @apiGroup Privilege manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiParam {string} id Privilege's ID
   *
   * @apiBody {string} privilegeName Privilege's name
   * @apiBody {string} privilegeDescription Privilege's description
   * @apiBody {number} level Privilege's level
   * <br>
   * One of `1 | 2`
   * @apiBody {string} requestMethod Request method
   * <br>
   * One of `get | post | put | delete` for `level 2` privilege
   * <br>
   * Should be `null` for `level 1` privilege
   * @apiBody {string} privilegeUrl Privilege's request URL
   * <br>
   * Should be `null` for `level 1` privilege
   * @apiBody {number} parentId Parent privilege's ID
   * <br>
   * Should be `0` for `level 1` privilege
   * @apiBody {boolean} [privilegeState] Whether the privilege is enabled
   *
   * @apiDescription Update a privilege.
   * <br>
   * Missing properties will remain as is.
   * <br>
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {Privilege} data Data of the updated privilege
   *
   * @apiSuccessExample {json} Success response (example)
   * {
   *   code: 200,
   *   msg: "Privilege has been updated",
   *   data: {
   *     // Updated privilege
   *   }
   * }
   *
   * @apiError (Error 400) PrivilegeNameExist Privilege's name already exists
   * @apiError (Error 400) PrivilegeDescriptionExist Privilege's description already exists
   * @apiError (Error 400) InvalidPrivilegeData Invalid privilege data
   * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
   * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response (example)
   * {
   *   code: 400,
   *   msg: "Privilege's name already exists",
   *   data: {}
   * }
   */
  public async updatePrivilege(): Promise<void> {
    const { ctx } = this
    const data = ctx.request.body
    console.log(data)

    try {
      if (!('privilegeState' in data)) {
        // validate
        ctx.validate(PrivilegeRule, data)
      }

      // save into database
      const privilege = await ctx.service.privileges.updatePrivilege(ctx.params.id, data)

      ctx.success(200, 'message.privileges.privilege.updated', privilege)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
  }


  /**
   * @api {delete} /api/v1/privileges/:id Delete privilege
   * @apiVersion 1.0.0
   * @apiName deletePrivilege
   * @apiGroup Privilege manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiParam {string} id Privilege's ID
   *
   * @apiDescription Delete a privilege.
   * <br>
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {Privilege} data Data of the deleted privilege
   *
   * @apiSuccessExample {json} Success response (example)
   * {
   *   code: 200,
   *   msg: "Privilege has been deleted",
   *   data: {
   *     // Deleted privilege
   *   }
   * }
   *
   * @apiError (Error 400) PrivilegeNotFound No privilege with the provided ID is found in the database
   * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
   * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response (example)
   * {
   *   code: 400,
   *   msg: "Privilege doesn't exist",
   *   data: {}
   * }
   */
  public async deletePrivilege(): Promise<void> {
    const { ctx } = this

    try {
      const privilege = await ctx.service.privileges.deletePrivilege(ctx.params.id)
      ctx.success(200, 'message.privileges.privilege.deleted', privilege)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
  }
}
