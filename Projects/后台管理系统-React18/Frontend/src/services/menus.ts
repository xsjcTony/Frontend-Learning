import * as Request from '@/utils/request'
import type { ResponseData } from './types'
import type { MenuQueryData } from '@/pages/Admin/Menus'
import type { Menu, MenuQueryResponse } from '@/types'


export const getMenusByQuery = async (data: MenuQueryData): Promise<ResponseData<MenuQueryResponse>> => Request.get<ResponseData<MenuQueryResponse>>(`/api/v1/menus`, data)

export const getMenuById = async (id: number): Promise<ResponseData<Menu>> => Request.get<ResponseData<Menu>>(`/api/v1/menus/${id}`)
