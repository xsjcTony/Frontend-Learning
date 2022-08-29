import { Service } from 'egg'
import { User } from '../model/User'
import type { Oauth } from '../model/Oauth'
import type { OAuthUserData } from '../types'


export default class OauthService extends Service {

  public async getOAuth(data: OAuthUserData): Promise<Oauth> {
    const res = await this.ctx.model.Oauth.findOne({
      where: {
        uid: data.id,
        provider: data.provider
      },
      include: [{
        model: User,
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt']
        }
      }]
    })

    if (res) {
      return res
    } else {
      throw new Error('message.oauth.invalid')
    }
  }


  public async getOAuthById(data: OAuthUserData): Promise<Oauth> {
    const res = await this.ctx.model.Oauth.findOne({
      where: {
        id: data.id,
        provider: data.provider
      }
    })

    if (res) {
      return res
    } else {
      throw new Error('message.oauth.invalid')
    }
  }


  public async createOAuth(accessToken: string, provider: string, uid: number, userId: number): Promise<Oauth> {
    return this.ctx.model.Oauth.create({
      accessToken,
      provider,
      uid,
      userId
    })
  }


  public async updateOAuthUser(id: number, userId: number): Promise<void> {
    const oauth = await this.ctx.model.Oauth.findByPk(id)

    if (!oauth) {
      throw new Error(`OAuth doesn't exist`)
    }

    await oauth.update({ userId })
  }


  public async deleteOAuth(id: number): Promise<void> {
    await this.ctx.model.Oauth.destroy({ where: { id } })
  }
}
