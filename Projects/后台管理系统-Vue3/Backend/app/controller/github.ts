/* eslint 'camelcase': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */

import { URLSearchParams } from 'node:url'
import { Controller } from 'egg'
import * as jwt from 'jsonwebtoken'
import { v4 as uuidV4 } from 'uuid'
import { RegisterType } from '../types'
import type { OAuthUserData } from '../types'


export default class GithubController extends Controller {

  /**
   * Get third-party login page
   * @return {Promise<void>}
   */
  public async getLoginView(): Promise<void> {
    const baseURL = 'https://github.com/login/oauth/authorize'
    const options = {
      client_id: 'f3ca6a1f5ca9ed50e6ca',
      scope: 'user'
    }

    const url = `${ baseURL }?${ new URLSearchParams(options).toString() }`
    this.ctx.redirect(url)
  }


  public async getAccessToken(): Promise<void> {
    const { ctx } = this
    const code = ctx.query.code

    const baseURL = 'https://github.com/login/oauth/access_token'
    const options = {
      client_id: 'f3ca6a1f5ca9ed50e6ca',
      client_secret: '33e0aa6ac3f01448edca777c40a10ceabeff80a6',
      code
    }

    const res = await ctx.curl(baseURL, {
      method: 'POST',
      data: options,
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    await this._getGithubUserInfo(res.data['access_token'] as string)
  }


  private async _getGithubUserInfo(accessToken: string): Promise<void> {
    const baseURL = 'https://api.github.com/user'
    const res = await this.ctx.curl(baseURL, {
      method: 'GET',
      dataType: 'json',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${ accessToken }`
      }
    })

    await this._goToAdmin({ ...res.data, provider: 'github' }, accessToken)
  }


  private async _goToAdmin(data: OAuthUserData, accessToken: string): Promise<void> {
    const { ctx } = this

    try {
      const oauth = await ctx.service.oauth.getOAuth(data)

      const user = oauth.user

      if (!user.userState) {
        await ctx.service.oauth.deleteOAuth(oauth.id)
        throw new Error('Account is closed, create a new account')
      }

      /**
       * User already exists -> login straight away
       */
      const token = jwt.sign(user.toJSON(), this.config.keys, { expiresIn: '7d' })

      ctx.cookies.set('token', token, {
        path: '/',
        maxAge: 24 * 60 * 60 * 1000, // 1 day,
        httpOnly: false,
        signed: false
      })

      ctx.redirect('http://127.0.0.1:3000/admin')
    } catch (err) {
      /**
       * User doesn't exist
       * 1. Create a user
       */
      const userInfo = {
        username: uuidV4()
          .replace(/-/g, '')
          .substring(0, 20),
        password: 'com.123456',
        captcha: '',
        registerType: RegisterType.Normal,
        github: true
      }

      const user = await ctx.service.user.createUser(userInfo)

      /**
       * 2. Save user's OAuth info
       */
      await ctx.service.oauth.createOAuth(accessToken, data.provider, data.id, user.id)

      /**
       * 3. Login (redirect to '/admin')
       */
      const token = jwt.sign(user.toJSON(), this.config.keys, { expiresIn: '7d' })

      ctx.cookies.set('token', token, {
        path: '/',
        maxAge: 24 * 60 * 60 * 1000, // 1 day,
        httpOnly: false,
        signed: false
      })

      ctx.redirect('http://127.0.0.1:3000/admin')
    }
  }
}
