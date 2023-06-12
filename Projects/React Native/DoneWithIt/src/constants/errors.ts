/* eslint-disable @typescript-eslint/switch-exhaustiveness-check */

import { ZodIssueCode } from 'zod'
import { capitalize } from '@/utils'
import type { ZodErrorMap } from 'zod'


const defaultErrorMap: ZodErrorMap = (issue, ctx) => {
  const fieldName = capitalize(issue.path.at(-1) ?? 'This field')

  let message = ctx.defaultError


  ctx.data === '' && (message = `${fieldName} is required`)


  switch (issue.code) {
    case ZodIssueCode.too_small:
      switch (issue.type) {
        case 'string':
          (ctx.data as string).length > 0
          && (message = `${fieldName} must be at least ${issue.minimum} characters`)
          break

        case 'number':
          message = `${fieldName} must be greater than or equal to ${issue.minimum}`
          break
      }
      break

    case ZodIssueCode.too_big:
      switch (issue.type) {
        case 'number':
          message = `${fieldName} must be less than or equal to ${issue.maximum}`
          break
      }
      break

    case ZodIssueCode.invalid_string:
      typeof issue.validation === 'string'
      && (message = `${capitalize(issue.validation)} is invalid`)
      break
  }


  return { message }
}


export {
  defaultErrorMap
}
