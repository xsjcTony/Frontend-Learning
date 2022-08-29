import * as Request from '@/utils/request'
import type { ResponseData } from './types'
import type { OAuthRegisterData } from '@/pages/OAuth/Github'
import type { UserWithJWT } from '@/types'


export const bindAccount = async (data: OAuthRegisterData): Promise<ResponseData<UserWithJWT>> => Request.post<ResponseData<UserWithJWT>>('/api/v1/oauth/bind', data)
