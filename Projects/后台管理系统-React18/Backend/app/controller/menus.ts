/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */


/**
 * imports
 */
import { Controller } from 'egg'
import MenuRule from '../validator/menuRule'
import type { MenuQueryData } from '../types'


/**
 * controller
 */
export default class MenusController extends Controller {

  /**
   * @api {get} /api/v1/menus Query menus
   * @apiVersion 1.0.0
   * @apiName queryMenus
   * @apiGroup Menu manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiQuery {string} [menuDescription] Menu's description
   * @apiQuery {number} [parentId] Parent menu's ID
   * @apiQuery {string} [menuKey] Menu's key
   * @apiQuery {number} [level] `1 | 2`
   * @apiQuery {string} [levelSorting] Whether `level` is sorted or not
   * <br>
   * One of `asc | desc`
   * @apiQuery {string} [current] Current page number
   * @apiQuery {string} [pageSize] The size of each page
   *
   * @apiDescription Query menus by conditions provided.
   * <br>
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {object} data `{ rows: Menu[], count: number }`
   * <br>
   * Data and count for queried menus
   *
   * @apiSuccessExample {json} Success response
   * {
   *   code: 200,
   *   msg: "success",
   *   data: {
   *     rows: // Menu[],
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
   * @apiSampleRequest /api/v1/menus
   */
  public async getMenusByQuery(): Promise<void> {
    const { ctx } = this

    try {
      const menus = await ctx.service.menus.getMenusByQuery(ctx.query as unknown as MenuQueryData)
      ctx.success(200, 'success', menus)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(500, err.message, err)
      } else {
        ctx.error(500, 'Error', err)
      }
    }
  }


  /**
   * @api {get} /api/v1/menus/:id Query menu by ID
   * @apiVersion 1.0.0
   * @apiName queryMenuById
   * @apiGroup Menu manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiParam {string} id Menu's ID
   *
   * @apiDescription Query menu by the ID provided.
   * <br>
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {Menu} data The menu found in the database
   *
   * @apiSuccessExample {json} Success response
   * {
   *   code: 200,
   *   msg: "success",
   *   data: {
   *     // Menu found
   *   }
   * }
   *
   * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
   * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
   * @apiError (Error 500) MenuNotFound No menu with the provided ID is found in the database
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response
   * {
   *   code: 500,
   *   msg: "Menu does not exist",
   *   data: {}
   * }
   *
   * @apiSampleRequest /api/v1/menus/:id
   */
  public async getMenuById(): Promise<void> {
    const { ctx } = this

    try {
      const menu = await ctx.service.menus.getMenuById(ctx.params.id)
      ctx.success(200, 'success', menu)
    } catch (err) {
      ctx.error(500, err instanceof Error ? err.message : 'Error', err)
    }
  }


  /**
   * @api {post} /api/v1/menus Create menu
   * @apiVersion 1.0.0
   * @apiName createMenu
   * @apiGroup Menu manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiBody {string} menuName Menu's name, should be an `i18n`'s ID
   * @apiBody {string} menuDescription Menu's description
   * @apiBody {string} menuKey Menu's key
   * <br>
   * `key` for `level 1` Menu, `path` for `level 2` menu
   * @apiBody {number} level Menu's level
   * <br>
   * One of `1 | 2`
   * @apiBody {number} parentId Parent menu's ID
   * <br>
   * Should be `0` for `level 1` menu
   * @apiBody {string} [menuIcon] Menu's icon, should be an `@ant-design/icons`'s icon
   *
   * @apiDescription Create a menu.
   * <br>
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   *
   * @apiSuccessExample {json} Success response (example)
   * {
   *   code: 200,
   *   msg: "Menu has been added"
   * }
   *
   * @apiError (Error 400) MenuNameExist Menu's name already exists
   * @apiError (Error 400) MenuDescriptionExist Menu's description already exists
   * @apiError (Error 400) MenuKeyExist Menu's key already exists
   * @apiError (Error 400) InvalidMenuData Invalid menu data
   * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
   * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response (example)
   * {
   *   code: 400,
   *   msg: "Menu name already exists",
   *   data: {}
   * }
   */
  public async createMenu(): Promise<void> {
    const { ctx } = this
    const data = ctx.request.body

    try {
      // validate
      ctx.validate(MenuRule, data)

      // save into database
      await ctx.service.menus.createMenu(data)

      ctx.success(200, 'message.menus.add.success')
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
  }


  /**
   * @api {put} /api/v1/menus/:id Update menu
   * @apiVersion 1.0.0
   * @apiName updateMenu
   * @apiGroup Menu manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiParam {string} id Menu's ID
   *
   * @apiBody {string} menuName Menu's name
   * @apiBody {string} menuDescription Menu's description
   * @apiBody {string} menuKey Menu's key
   * @apiBody {number} level Menu's level
   * <br>
   * One of `1 | 2`
   * @apiBody {number} parentId Parent menu's ID
   * <br>
   * Should be `0` for `level 1` menu
   * @apiBody {string} [menuIcon] Menu's icon, should be an `@ant-design/icons`'s icon
   * <br>
   * Set to `null` if desired to clear it
   * @apiBody {boolean} [menuState] Whether the menu is enabled
   *
   * @apiDescription Update a menu.
   * <br>
   * Missing properties will remain as is.
   * <br>
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {Menu} data Data of the updated menu
   *
   * @apiSuccessExample {json} Success response (example)
   * {
   *   code: 200,
   *   msg: "Menu has been updated",
   *   data: {
   *     // Updated menu
   *   }
   * }
   *
   * @apiError (Error 400) MenuNameExist Menu's name already exists
   * @apiError (Error 400) MenuDescriptionExist Menu's description already exists
   * @apiError (Error 400) MenuKeyExist Menu's key already exists
   * @apiError (Error 400) InvalidMenuData Invalid menu data
   * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
   * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response (example)
   * {
   *   code: 400,
   *   msg: "Menu's name already exists",
   *   data: {}
   * }
   */
  public async updateMenu(): Promise<void> {
    const { ctx } = this
    const data = ctx.request.body
    console.log(data)

    try {
      if (!('menuState' in data)) {
        // validate
        ctx.validate(MenuRule, data)
      }

      // save into database
      const menu = await ctx.service.menus.updateMenu(ctx.params.id, data)

      ctx.success(200, 'message.menus.menu.updated', menu)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
  }


  /**
   * @api {delete} /api/v1/menus/:id Delete menu
   * @apiVersion 1.0.0
   * @apiName deleteMenu
   * @apiGroup Menu manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiParam {string} id Menu's ID
   *
   * @apiDescription Delete a menu.
   * <br>
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {Menu} data Data of the deleted menu
   *
   * @apiSuccessExample {json} Success response (example)
   * {
   *   code: 200,
   *   msg: "Menu has been deleted",
   *   data: {
   *     // Deleted menu
   *   }
   * }
   *
   * @apiError (Error 400) MenuNotFound No menu with the provided ID is found in the database
   * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
   * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response (example)
   * {
   *   code: 400,
   *   msg: "Menu doesn't exist",
   *   data: {}
   * }
   */
  public async deleteMenu(): Promise<void> {
    const { ctx } = this

    try {
      const menu = await ctx.service.menus.deleteMenu(ctx.params.id)
      ctx.success(200, 'message.menus.menu.deleted', menu)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
  }
}
