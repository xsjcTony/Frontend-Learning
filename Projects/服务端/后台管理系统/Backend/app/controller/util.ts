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

  public async generateCaptcha(): Promise<void> {
    const { ctx } = this
    ctx.type = 'image/svg+xml'
    ctx.body = ctx.helper.generateCaptcha()
  }

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
