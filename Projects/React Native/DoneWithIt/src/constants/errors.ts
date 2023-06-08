import { setErrorMap, ZodIssueCode } from 'zod'
import { capitalize } from '@/utils'


setErrorMap((issue, ctx) => {
  let message: string


  switch (issue.code) {
    case ZodIssueCode.too_small:
      switch (issue.type) {
        case 'string':
          const fieldName = capitalize(issue.path.at(-1) ?? 'This field');

          (ctx.data as string).length === 0
            ? message = `${fieldName} is required`
            : message = `${fieldName} must be at least ${issue.minimum} characters`
          break
        default:
          message = ctx.defaultError
      }
      break
    case ZodIssueCode.invalid_string:
      typeof issue.validation === 'string'
        ? message = `${capitalize(issue.validation)} is invalid`
        : message = ctx.defaultError
      break
    default:
      message = ctx.defaultError
  }


  return { message }
})
