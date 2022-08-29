/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-call': 'off' */

/**
 * imports
 */
import { Controller } from 'egg'


/**
 * controller
 */
export default class UtilController extends Controller {

  /**
   * @api {get} /api/v1/captcha Get image captcha
   * @apiVersion 1.0.0
   * @apiName imageCaptcha
   * @apiGroup Utility
   *
   * @apiDescription Will return a SVG captcha image including 4 digits.
   *
   * @apiSampleRequest /api/v1/captcha
   */
  public async generateCaptcha(): Promise<void> {
    const { ctx } = this
    ctx.type = 'image/svg+xml'
    ctx.body = ctx.helper.generateCaptcha()
  }


  /**
   * @api {get} /api/v1/verify-email Send verification email
   * @apiVersion 1.0.0
   * @apiName sendVerificationEmail
   * @apiGroup Utility
   *
   * @apiQuery {string} email The e-mail address to send the verification email to
   *
   * @apiDescription Send a verification email to the specified e-mail address.
   */
  public async sendVerificationEmail(): Promise<void> {
    const { ctx } = this
    try {
      const data = await ctx.helper.sendVerificationEmail(ctx.query.email)
      ctx.success(200, 'Email sent.', data)
    } catch (err) {
      ctx.error(400, 'Failed to send email.', err)
    }
  }
}
