/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */

/**
 * imports
 */
import { Controller } from 'egg'
import * as jwt from 'jsonwebtoken'
import AccountUserRule from '../validator/accountUserRule'
import BindAccountRule from '../validator/BindAccountRule'
import EmailUserRule from '../validator/emailUserRule'
import type { User } from '../model/User'
import type { RegisterData, LoginData, OAuthBindData, VerifyEmailData, ResetPasswordData } from '../types'


/**
 * controller
 */
export default class UserController extends Controller {

  /**
   * @api {post} /api/v1/register Register
   * @apiVersion 1.0.0
   * @apiName register
   * @apiGroup Account
   *
   * @apiBody {string{length: 6~20}} [username] Username
   * @apiBody {string} [email] E-mail address
   * @apiBody {string{length: 8~20}} password Password
   * @apiBody {boolean} [github] Whether creating user by GitHub OAuth or not
   * @apiBody {string{length: 4}} captcha The text in image captcha or the code in verification email
   *
   * @apiDescription Register user.
   * One of username or email must be provided.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {User} data Info of the register user (with roles)
   *
   * @apiError (Error 400) UsernameExists Username already exists in the database
   * @apiError (Error 400) EmailExists E-mail address already exists in the database
   *
   * @apiSuccessExample {json} Success response
   * {
   *   code: 200,
   *   msg: "Register succeed",
   *   data: {
   *     id: 1,
   *     username: "abc",
   *     email: null,
   *     // ...
   *   }
   * }
   *
   * @apiErrorExample {json} Error response
   * {
   *   code: 400,
   *   msg: "Username already exists",
   *   data: {}
   * }
   */
  public async create(): Promise<void> {
    const { ctx } = this

    try {
      // validate
      this._validateUserInfo()

      // save into database
      const user = await ctx.service.user.createUser(ctx.request.body)

      ctx.success(200, 'message.register.success', user)
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'error', err)
      }
    }
  }


  /**
   * @api {post} /api/v1/login Login
   * @apiVersion 1.0.0
   * @apiName login
   * @apiGroup Account
   *
   * @apiBody {string{length: 6~20}} [username] Username
   * @apiBody {string} [email] E-mail address
   * @apiBody {string} password Password
   * @apiBody {boolean} [remember] Token expires in 7(false) or 30(true) days
   * @apiBody {string{length: 4}} captcha The text in image captcha
   *
   * @apiDescription Login user.
   * One of username or email must be provided.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {User} data Info of the logged-in user (without roles) with JWT token
   *
   * @apiError (Error 400) InvalidLoginCredential Either username or email
   *
   * @apiSuccessExample {json} Success response
   * {
   *   code: 200,
   *   msg: "Login succeed",
   *   data: {
   *     id: 1,
   *     username: "abc",
   *     email: null,
   *     // ...
   *     token: // JWT Token
   *   }
   * }
   *
   * @apiErrorExample {json} Error response
   * {
   *   code: 400,
   *   msg: "Invalid login credential",
   *   data: {}
   * }
   */
  public async login(): Promise<void> {
    const { ctx } = this
    const data: LoginData = ctx.request.body

    try {
      ctx.helper.verifyCaptcha(data.captcha)
      const user = (await ctx.service.user.loginUser(data)).toJSON() as User

      const expiresIn = data.remember ? '30d' : '7d'

      // JWT
      const token = jwt.sign(user, this.config.keys, { expiresIn })

      ctx.success(200, 'message.login.success', { ...user, token })
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'error', err)
      }
    }
  }


  /**
   * @api {get} /api/v1/is-logged-in Check login status
   * @apiVersion 1.0.0
   * @apiName checkLoginStatus
   * @apiGroup Account
   *
   * @apiHeader {string} Authorization The JWT token
   *
   * @apiHeaderExample {json} Header example
   * { "Authorization": "e3WKLJDJF3ojfsdkljfk..." }
   *
   * @apiDescription Check user's login status by JWT Token in request header.
   * One of username or email must be provided.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {User} data Info of the loggedIn user (decoded from JWT Token)
   *
   * @apiError (Error 400) InvalidJwtToken Invalid JWT Token
   *
   * @apiSuccessExample {json} Success response
   * {
   *   code: 200,
   *   msg: "Logged in",
   *   data: {
   *     id: 1,
   *     username: "abc",
   *     email: null,
   *     // ...
   *   }
   * }
   *
   * @apiErrorExample {json} Error response
   * {
   *   code: 400,
   *   msg: "Not logged in",
   *   data: {}
   * }
   *
   * @apiSampleRequest /api/v1/is-logged-in
   */
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
   * @api {post} /api/v1/oauth/bind Bind local account with OAuth
   * @apiVersion 1.0.0
   * @apiName bindAccount
   * @apiGroup Account
   *
   * @apiBody {string{length: 6~20}} username Username
   * @apiBody {string} email E-mail address
   * @apiBody {string{length: 8~20}} password Password
   * @apiBody {string{length: 4}} captcha The code in verification email
   * @apiBody {string} oauthId The OAuth account's ID
   * @apiBody {string} provider The OAuth provider
   *
   * @apiDescription Bind local account with an OAuth account and automatically log in.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   * @apiSuccess {User} data Info of the bound user (without roles) with JWT Token
   *
   * @apiError (Error 400) UsernameExists Username already exists in the database
   * @apiError (Error 400) EmailExists E-mail address already exists in the database
   *
   * @apiSuccessExample {json} Success response
   * {
   *   code: 200,
   *   msg: "Bind account succeed",
   *   data: {
   *     id: 1,
   *     username: "abc",
   *     email: "1@2.com",
   *     // ...
   *     token: // JWT Token
   *   }
   * }
   *
   * @apiErrorExample {json} Error response
   * {
   *   code: 400,
   *   msg: "Username already exists",
   *   data: {}
   * }
   */
  public async bindAccount(): Promise<void> {
    const { ctx } = this

    try {
      // validate
      await this._validateOAuthBindInfo()

      // save into database
      const user = (await ctx.service.user.createFullUser(ctx.request.body)).toJSON() as User

      // Bind user to OAuth
      await ctx.service.oauth.updateOAuthUser(parseInt((ctx.request.body as OAuthBindData).oauthId), user.id)

      // JWT
      const token = jwt.sign(user, this.config.keys, { expiresIn: '7d' })

      ctx.success(200, 'message.oauth.bind.success', { ...user, token })
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'error', err)
      }
    }
  }


  /**
   * @api {post} /api/v1/reset-password/verify-email Reset password - verify email
   * @apiVersion 1.0.0
   * @apiName verifyEmail
   * @apiGroup Account
   *
   * @apiBody {string} email E-mail address
   * @apiBody {string{length: 4}} captcha The code in verification email
   *
   * @apiDescription Verify the verification code when resetting password.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   *
   * @apiError (Error 400) InvalidCode Invalid verification code
   * @apiError (Error 400) CodeExpired Verification code expired
   *
   * @apiSuccessExample {json} Success response
   * {
   *   code: 200,
   *   msg: "Code has been verified"
   * }
   *
   * @apiErrorExample {json} Error response
   * {
   *   code: 400,
   *   msg: "Invalid code",
   *   data: {}
   * }
   *
   * @apiSampleRequest /api/v1/reset-password/verify-email
   */
  public async verifyEmail(): Promise<void> {
    const { ctx } = this
    const { email, captcha }: VerifyEmailData = ctx.request.body

    try {
      await ctx.service.user.findByEmail(email)
      ctx.helper.verifyEmail(captcha)

      ctx.success(200, 'message.reset-password.verify.success')
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'error', err)
      }
    }
  }


  /**
   * @api {put} /api/v1/reset-password/reset Reset password
   * @apiVersion 1.0.0
   * @apiName resetPassword
   * @apiGroup Account
   *
   * @apiBody {string} email E-mail address
   * @apiBody {string{length: 8~20}} password Password
   *
   * @apiDescription Reset the user's password based on e-mail address.
   *
   * @apiSuccess {number} code 200 (Status code)
   * @apiSuccess {string} msg Response message
   *
   * @apiError (Error 400) Failed Failed to reset password
   *
   * @apiSuccessExample {json} Success response
   * {
   *   code: 200,
   *   msg: "Password has been reset"
   * }
   *
   * @apiErrorExample {json} Error response
   * {
   *   code: 400,
   *   msg: "Failed to reset",
   *   data: {}
   * }
   */
  public async resetPassword(): Promise<void> {
    const { ctx } = this
    const { email, password }: ResetPasswordData = ctx.request.body

    try {
      await ctx.service.user.resetPassword(email, password)

      ctx.success(200, 'message.reset-password.reset.success')
    } catch (err) {
      if (err instanceof Error) {
        ctx.error(400, err.message, err)
      } else {
        ctx.error(400, 'error', err)
      }
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

    if ('username' in data) {
      ctx.validate(AccountUserRule, data)
      ctx.helper.verifyCaptcha(data.captcha)
    } else if ('email' in data) {
      ctx.validate(EmailUserRule, data)
      ctx.helper.verifyEmail(data.captcha)
    } else {
      throw new Error(`Register type is invalid`)
    }
  }

  private async _validateOAuthBindInfo(): Promise<void> {
    const { ctx } = this
    const data: OAuthBindData = ctx.request.body

    // OAuth
    try {
      await ctx.service.oauth.getOAuthById({
        id: parseInt(data.oauthId, 10),
        provider: data.provider
      })
    } catch (err) {
      throw new Error('message.oauth.invalid')
    }

    ctx.validate(BindAccountRule, data)
    ctx.helper.verifyEmail(data.captcha)
  }
}
