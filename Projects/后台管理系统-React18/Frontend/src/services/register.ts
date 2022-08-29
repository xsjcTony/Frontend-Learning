import * as Request from '@/utils/request'
import type { ResponseData } from './types'
import type { AccountRegisterData, EmailRegisterData } from '@/pages/Register'


export const sendVerificationEmail = async (data: { email: string }): Promise<ResponseData> => Request.get<ResponseData>('/api/v1/verify-email', data)

export const registerUser = async (data: AccountRegisterData | EmailRegisterData): Promise<ResponseData> => Request.post<ResponseData>('/api/v1/register', data)
