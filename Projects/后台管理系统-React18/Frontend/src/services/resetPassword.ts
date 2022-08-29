import * as Request from '@/utils/request'
import type { ResponseData } from './types'
import type { ResetPasswordData } from '@/pages/resetPassword/Reset'
import type { VerifyEmailData } from '@/pages/resetPassword/Verify'


export const verifyEmail = async (data: VerifyEmailData): Promise<ResponseData> => Request.post<ResponseData>('/api/v1/reset-password/verify-email', data)

export const resetPassword = async (data: ResetPasswordData): Promise<ResponseData> => Request.put<ResponseData>('/api/v1/reset-password/reset', data)
