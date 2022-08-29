/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
/* eslint '@typescript-eslint/ban-ts-comment': 'off' */


/**
 * imports
 */
import * as fs from 'node:fs/promises'
import path from 'node:path'
import { Controller } from 'egg'
import xlsx from 'node-xlsx'
import AddUserRule from '../validator/addUserRule'
import EditUserRule from '../validator/editUserRule'
import type { User } from '../model/User'
import type { ExcelUserData, ImportUserData, UserQueryData } from '../types'
import type { Sequelize } from 'sequelize'


/**
 * controller
 */
export default class UsersController extends Controller {

  /**
   * @api {get} /api/v1/users Query users
   * @apiVersion 1.0.0
   * @apiName queryUsers
   * @apiGroup User manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiQuery {string} [username] Username
   * @apiQuery {string} [email] E-mail address
   * @apiQuery {string} [current] Current page number
   * @apiQuery {string} [pageSize] The size of each page
   *
   * @apiDescription Query users by conditions provided.
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {object} data `{ rows: User[], count: number }` <br> Data and count for queried users (with roles)
   *
   * @apiSuccessExample {json} Success response
   * {
   *   code: 200,
   *   msg: "success",
   *   data: {
   *     rows: // User[],
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
   * @apiSampleRequest /api/v1/users
   */
  public async getUsersByQuery(): Promise<void> {
    const { ctx } = this

    try {
      const users = await ctx.service.users.getUsersByQuery(ctx.query as unknown as UserQueryData)
      ctx.success(200, 'success', users)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(500, err.message, err)
      } else {
        ctx.error(500, 'Error', err)
      }
    }
  }


  /**
   * @api {post} /api/v1/users Create user
   * @apiVersion 1.0.0
   * @apiName createUser
   * @apiGroup User manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiBody {string} [username] Username
   * @apiBody {string} [email] E-mail address. Is optional when importing user
   * @apiBody {string} password Password
   * @apiBody {boolean} [userState] Whether the account is enabled <br> Can also be a `number`, `1` means `true`, `0` means `false`
   * @apiBody {boolean} [github] Whether the account is associated to GitHub OAuth <br> Can also be a `number`, `1` means `true`, `0` means `false`
   * @apiBody {string} [avatarUrl] User's avatar's path
   *
   * @apiDescription Create a user.
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   *
   * @apiSuccessExample {json} Success response (example)
   * {
   *   code: 200,
   *   msg: "User has been added"
   * }
   *
   * @apiError (Error 400) UsernameExist Username already exists
   * @apiError (Error 400) EmailExist E-mail address already exists
   * @apiError (Error 400) InvalidUserData Invalid user data
   * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
   * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response (example)
   * {
   *   code: 400,
   *   msg: "Username already exists",
   *   data: {}
   * }
   */
  public async createUser(): Promise<void> {
    const { ctx } = this
    const data = ctx.request.body

    try {
      // validate
      ctx.validate(AddUserRule, data)

      // save into database
      await ctx.service.users.createUser(data)

      ctx.success(200, 'message.users.add.success')
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
  }


  /**
   * @api {delete} /api/v1/users/:id Delete user
   * @apiVersion 1.0.0
   * @apiName deleteUser
   * @apiGroup User manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiParam {string} id User's ID
   *
   * @apiDescription Delete a user.
   * Will also delete the user's avatar image.
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {User} data Data of the deleted user (with roles)
   *
   * @apiSuccessExample {json} Success response (example)
   * {
   *   code: 200,
   *   msg: "User has been deleted",
   *   data: {
   *     // User
   *   }
   * }
   *
   * @apiError (Error 400) UserNotFound No user with the provided ID is found in the database
   * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
   * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response (example)
   * {
   *   code: 400,
   *   msg: "User doesn't exist",
   *   data: {}
   * }
   */
  public async deleteUser(): Promise<void> {
    const { ctx } = this

    try {
      const user = await ctx.service.users.deleteUser(ctx.params.id)
      ctx.success(200, 'message.users.user.deleted', user)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
  }


  /**
   * @api {put} /api/v1/users/:id Update user
   * @apiVersion 1.0.0
   * @apiName updateUser
   * @apiGroup User manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiParam {string} id User's ID
   *
   * @apiBody {string} [username] Username
   * @apiBody {string} email E-mail address
   * @apiBody {string} [password] Password
   * @apiBody {boolean} [userState] Whether the account is enabled
   *
   * @apiDescription Update a user.
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {User} data Data of the updated user (with roles and privileges)
   *
   * @apiSuccessExample {json} Success response (example)
   * {
   *   code: 200,
   *   msg: "User has been updated",
   *   data: {
   *     // Updated user
   *   }
   * }
   *
   * @apiError (Error 400) UsernameExist Username already exists
   * @apiError (Error 400) EmailExist E-mail address already exists
   * @apiError (Error 400) InvalidUserData Invalid user data
   * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
   * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response (example)
   * {
   *   code: 400,
   *   msg: "Username already exists",
   *   data: {}
   * }
   */
  public async updateUser(): Promise<void> {
    const { ctx } = this
    const data = ctx.request.body

    try {
      if (!('userState' in data)) {
        // validate
        ctx.validate(EditUserRule, data)
      }

      // save into database
      const user = await ctx.service.users.updateUser(ctx.params.id, data)

      ctx.success(200, 'message.users.user.updated', user)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'Error', err)
      }
    }
  }


  /**
   * @api {get} /api/v1/users/:id Query user by ID
   * @apiVersion 1.0.0
   * @apiName queryUserById
   * @apiGroup User manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiParam {string} id User's ID
   *
   * @apiDescription Query user by ID provided.
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {User} data The user found in the database (with roles, privileges and menus)
   *
   * @apiSuccessExample {json} Success response
   * {
   *   code: 200,
   *   msg: "success",
   *   data: {
   *     // User
   *   }
   * }
   *
   * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
   * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
   * @apiError (Error 500) UserNotFound No user with the provided ID is found in the database
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response
   * {
   *   code: 500,
   *   msg: "User does not exist",
   *   data: {}
   * }
   *
   * @apiSampleRequest /api/v1/users/:id
   */
  public async getUserById(): Promise<void> {
    const { ctx } = this

    try {
      const user = await ctx.service.users.getUserById(ctx.params.id)
      ctx.success(200, 'success', user)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(500, err.message, err)
      } else {
        ctx.error(500, 'Error', err)
      }
    }
  }


  /**
   * @api {post} /api/v1/upload-user-avatar Upload avatar
   * @apiVersion 1.0.0
   * @apiName uploadAvatar
   * @apiGroup User manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiBody {File} file The avatar image file to be uploaded <br> Image format is limited to `.png` and `.jpg`
   *
   * @apiDescription Upload user's avatar image file.
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {string} data The file path of the uploaded avatar
   *
   * @apiSuccessExample {json} Success response (example)
   * {
   *   code: 200,
   *   msg: "Avatar has been uploaded",
   *   data: "/public/assets/..."
   * }
   *
   * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
   * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response (example)
   * {
   *   code: 500,
   *   msg: "Failed to upload avatar",
   *   data: {}
   * }
   */
  public async uploadAvatar(): Promise<void> {
    const { ctx } = this
    const avatar = ctx.request.files[0]

    const fileName = ctx.helper.encryptByMd5(`${avatar.filename}${Date.now()}`) + path.extname(avatar.filename)
    const filePath = path.join('/public/assets/images/avatars', fileName)
      .replace(/\\/g, '/')
    const absoluteFilePath = path.join(this.config.baseDir, 'app', filePath)

    // copy file
    try {
      const avatarContent = await fs.readFile(avatar.filepath)
      await fs.writeFile(absoluteFilePath, avatarContent)
    } catch (err) {
      ctx.error(500, 'message.users.avatar.upload.error', err)
    } finally {
      void ctx.cleanupRequestFiles() // clear temp file
    }

    ctx.success(200, 'message.users.avatar.upload.success', filePath)
  }


  /**
   * @api {post} /api/v1/import-users Import users
   * @apiVersion 1.0.0
   * @apiName importUsers
   * @apiGroup User manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiBody {File} file The Excel sheet (`.xlsx`) contain users' data
   *
   * @apiDescription Import users by Excel sheet.
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   *
   * @apiSuccessExample {json} Success response (example)
   * {
   *   code: 200,
   *   msg: "Users have been imported",
   * }
   *
   * @apiError (Error 400) InvalidUserData Invalid user data
   * @apiError (Error 401) InvalidJwtToken Invalid JWT Token
   * @apiError (Error 401) NoPrivilege User is not allowed to perform the action
   * @apiError (Error 500) UsernameExist Username already exists
   * @apiError (Error 500) EmailExist E-mail address already exists
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response (example)
   * {
   *   code: 400,
   *   msg: "Invalid user data",
   *   data: {}
   * }
   */
  public async importUsers(): Promise<void> {
    const { ctx } = this

    let users: ImportUserData[]

    try {
      users = ctx.helper.excelToUsers(ctx.request.files[0])
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'error', err)
      }
      void ctx.cleanupRequestFiles()
      return
    } finally {
      void ctx.cleanupRequestFiles()
    }

    const transaction = await (ctx.model as unknown as Sequelize).transaction()

    try {
      for (const user of users) {
        // @ts-ignore
        await ctx.service.users.createUser(user, { transaction })
      }

      await transaction.commit()
      ctx.success(200, 'message.users.import.success')
    } catch (err) {
      await transaction.rollback()

      if (err instanceof Error) {
        ctx.error(500, err.message, err)
      } else {
        ctx.error(500, 'error', err)
      }
    } finally {
      void ctx.cleanupRequestFiles()
    }
  }


  /**
   * @api {get} /api/v1/export-all-users Export all users
   * @apiVersion 1.0.0
   * @apiName exportAllUsers
   * @apiGroup User manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiDescription Export all users to an Excel (`.xlsx`) file.
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {Blob} blob A blob to be downloaded
   *
   * @apiSuccessExample {Blob} Success response (example)
   * Blob file: users.xlsx
   *
   * @apiSampleRequest /api/v1/export-all-users
   */
  public async exportAllUsers(): Promise<void> {
    const { ctx } = this
    const users = (await ctx.service.users.getAllUsers()).map(user => user.toJSON() as User)

    if (users.length === 0) {
      ctx.error(500, 'message.users.export.no-user')
      return
    }

    const keys = Object.keys(users[0])

    const data: (ExcelUserData[] | string[])[] = [keys]
    users.forEach(user => void data.push(ctx.helper.userToExcel(user)))

    const buffer = xlsx.build([{
      name: 'Users',
      data,
      options: {}
    }])

    ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ctx.attachment('users.xlsx')
    ctx.body = buffer
  }


  /**
   * @api {post} /api/v1/delete-temp-avatars Delete avatars
   * @apiVersion 1.0.0
   * @apiName deleteAvatars
   * @apiGroup User manager
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiBody {string[]} avatarUrls Array of path of avatars to be deleted
   *
   * @apiDescription Delete specified avatar image files.
   * <br>
   * Should be used when uploading avatars to delete unnecessary files.
   * <br>
   * User's JWT Token must be provided to pass the authentication.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   *
   * @apiSuccessExample {json} Success response (example)
   * {
   *   code: 200,
   *   msg: "success"
   * }
   *
   * @apiError (Error 500) InternalServerError Internal server error
   *
   * @apiErrorExample {json} Error response (example)
   * {
   *   code: 500,
   *   msg: "Internal server error",
   *   data: {}
   * }
   */
  public async deleteTempAvatars(): Promise<void> {
    const { ctx } = this
    const avatarUrls = (ctx.request.body as string[])
      .filter(avatarUrl => !avatarUrl.endsWith('avatar.jpg'))

    for (const avatarUrl of avatarUrls) {
      try {
        const avatarPath = path.join(this.config.baseDir, 'app', avatarUrl)
        await ctx.helper.removeFile(avatarPath)
      } catch (err) {
        ctx.error(500, err instanceof Error ? err.message : 'error', err)
      }
    }

    ctx.success(200, 'success')
  }
}
