/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */

/**
 * imports
 */
import { Controller } from 'egg'
import * as jwt from 'jsonwebtoken'
import { User } from '../model/User'
import { RegisterType, RegisterData, LoginData } from '../types'
import EmailUserRule from '../validator/emailUserRule'
import NormalUserRule from '../validator/normalUserRule'


/**
 * controller
 */
export default class UserController extends Controller {

  /**
   * Register user and create corresponding row in database.
   * @return {Promise<void>} - Result.
   */
  public async create(): Promise<void> {
    const { ctx } = this

    try {
      // validate
      this._validateUserInfo()

      // save into database
      const user = await ctx.service.user.createUser(ctx.request.body)

      ctx.success(200, 'Registered', user)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'error', err)
      }
    }
  }


  /**
   * Login user and save login status
   * @return {Promise<void>}
   */
  public async login(): Promise<void> {
    const { ctx } = this
    const data: LoginData = ctx.request.body

    try {
      ctx.helper.verifyCaptcha(data.captcha)
      const user = (await ctx.service.user.loginUser(data)).toJSON() as User

      // JWT
      const token = jwt.sign(user, this.config.keys, { expiresIn: '7d' })

      ctx.success(200, 'Logged in', { ...user, token })
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'error', err)
      }
    }
  }


  public async isLoggedIn(): Promise<void> {
    const { ctx } = this

    const token = ctx.get('Authorization')

    try {
      const data = jwt.verify(token, this.config.keys)
      ctx.success(200, 'Logged in', data)
    } catch (err) {
      ctx.error(400, 'not logged in', err)
    }
  }


  /**
   * Helper functions
   */


  /**
   * Validate helper.
   * @private
   */
  private _validateUserInfo(): void {
    const { ctx } = this
    const data: RegisterData = ctx.request.body
    const registerType: RegisterType = data.registerType

    switch (registerType) {
      case RegisterType.Normal:
        ctx.validate(NormalUserRule, data)
        ctx.helper.verifyCaptcha(data.captcha)
        break
      case RegisterType.Email:
        ctx.validate(EmailUserRule, data)
        ctx.helper.verifyEmail(data.captcha)
        break
      default:
        throw new Error(`Register type '${ data.registerType }' is invalid`)
    }
  }
}
