/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */

import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { unlink } from 'node:fs/promises'
import xlsx from 'node-xlsx'
import { generateCaptcha, verifyCaptcha } from '../util/captcha'
import { sendVerificationEmail, verifyEmail } from '../util/verificationEmail'
import type { ExcelUserData, ImportUserData, UserResponse } from '../types'
import type { IHelper } from 'egg'
import type { EggFile } from 'egg-multipart'
import type { PathLike } from 'node:fs'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'


export default {
  generateCaptcha(this: IHelper): string {
    return generateCaptcha(this.ctx)
  },


  verifyCaptcha(this: IHelper, clientCaptcha: string): void {
    verifyCaptcha(this.ctx, clientCaptcha)
  },


  async sendVerificationEmail(this: IHelper, to: string): Promise<SMTPTransport.SentMessageInfo> {
    return sendVerificationEmail(this.ctx, to)
  },


  verifyEmail(this: IHelper, clientCode: string): void {
    verifyEmail(this.ctx, clientCode)
  },


  encryptByMd5(this: IHelper, password: string): string {
    // 加盐处理
    return this._md5(`${password}${this.app.config.keys}`)
  },


  excelToUsers(excel: EggFile): ImportUserData[] {
    const w = xlsx.parse(excel.filepath)
    const data = w[0] ? w[0].data : []
    const keys = data.shift() as string[]

    if (
      !keys.includes('password')
      || !keys.includes('username') && !keys.includes('email')
    ) {
      throw new Error('message.users.import.invalid')
    }

    const users: ImportUserData[] = []

    data.forEach((row) => {
      if (row instanceof Array) {
        const user = {} as ImportUserData
        row.forEach((col, index) => {
          Object.defineProperty<ImportUserData>(user, keys[index], {
            value: col === 0 ? false : col === 1 ? true : col,
            enumerable: true
          })
        })
        users.push(user)
      }
    })

    return users
  },


  userToExcel(user: UserResponse): ExcelUserData[] {
    const res: ExcelUserData[] = []

    for (const key in user) {
      const data = user[key as keyof UserResponse]

      if (typeof data === 'boolean') {
        res.push(data ? 1 : 0)
      } else {
        res.push(data)
      }
    }

    return res
  },


  async removeFile(path: PathLike): Promise<void> {
    if (existsSync(path)) {
      await unlink(path)
    }
  },


  uniqueArray<T>(arr: T[], key?: keyof T): T[] {
    // primitive array
    if (key === undefined) {
      return [...new Set(arr)]
    }

    // object array
    const map = new Map<T[keyof T], T>()
    arr.forEach((item) => {
      if (!map.has(item[key])) {
        map.set(item[key], item)
      }
    })
    return [...map.values()]
  },


  /**
   * Helper Functions
   */

  _md5(password: string): string {
    return createHash('md5')
      .update(password)
      .digest('hex')
  }
}
