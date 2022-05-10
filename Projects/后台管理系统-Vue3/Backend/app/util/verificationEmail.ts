/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */

import { Context } from 'egg'
import nodemailer, { Transporter } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import type { EmailInfo } from '../types'


/**
 * helper functions
 */
let transporter: Transporter<SMTPTransport.SentMessageInfo> | undefined

/**
 * Create reusable transporter object using the default SMTP transport.
 * @return {Transporter}
 */
function _createTransporter(ctx: Context): Transporter<SMTPTransport.SentMessageInfo> {
  if (transporter) { return transporter }

  const { host, port, user, pass } = ctx.app.config.smtp
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: true, // true for 465, false for other ports
    auth: {
      user,
      pass
    }
  })

  return transporter
}

/**
 * Define email info and verification code.
 * @return {EmailInfo}
 */
function _createEmailInfoAndCode(ctx: Context, to: string): EmailInfo {
  const verificationCode = Math.random().toString(16).slice(2, 6).toLowerCase()

  ctx.session.email = verificationCode
  ctx.session.maxAge = 120 * 1000 // 2 min

  return {
    from: 'Aelita <xsjcTony@126.com>', // sender address
    to, // list of receivers
    subject: 'Backstage management system verification', // Subject line
    text: `You are registering the backstage management system, Your code is ${ verificationCode }` // plain text body
  }
}


/**
 * main functions
 */

/**
 * Send mail.
 * @param {Context} ctx
 * @param {string} to - List of receivers' email address.
 * @return {Promise<SMTPTransport.SentMessageInfo>}
 */
export const sendVerificationEmail = async (ctx: Context, to: string): Promise<SMTPTransport.SentMessageInfo> => {
  const transporter = _createTransporter(ctx)
  return transporter.sendMail(_createEmailInfoAndCode(ctx, to))
}

/**
 * Verify Email.
 * @param {Context} ctx
 * @param {string} clientCode
 */
export const verifyEmail = (ctx: Context, clientCode: string): void => {
  const emailCode: string | null | undefined = ctx.session.email

  if (!emailCode) {
    // captcha expired
    throw new Error('Code has expired. Click to send another verification email.')
  } else if (emailCode.toLowerCase() !== clientCode.toLowerCase()) {
    // invalid
    throw new Error('Incorrect verification code.')
  }

  ctx.session.email = null
}
