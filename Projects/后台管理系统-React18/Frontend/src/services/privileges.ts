import { EditPrivilegeData } from '@/pages/Admin/Privileges/components/EditPrivilegeModalForm'
import * as Request from '@/utils/request'
import type { ResponseData } from './types'
import type { PrivilegeQueryData } from '@/pages/Admin/Privileges'
import type { AddPrivilegeData } from '@/pages/Admin/Privileges/components/AddPrivilegeModalForm'
import type { Privilege, PrivilegeQueryResponse } from '@/types'


export const getPrivilegesByQuery = async (data: PrivilegeQueryData): Promise<ResponseData<PrivilegeQueryResponse>> => Request.get<ResponseData<PrivilegeQueryResponse>>(`/api/v1/privileges`, data)

export const updatePrivilegeState = async (id: number, privilegeState: boolean): Promise<ResponseData<Privilege>> => Request.put<ResponseData<Privilege>>(`/api/v1/privileges/${id}`, { privilegeState })

export const deletePrivilege = async (id: number): Promise<ResponseData<Privilege>> => Request.deleteRequest<ResponseData<Privilege>>(`/api/v1/privileges/${id}`)

export const addPrivilege = async (data: AddPrivilegeData): Promise<ResponseData> => Request.post<ResponseData>('/api/v1/privileges', data)

export const updatePrivilege = async (id: number, data: EditPrivilegeData): Promise<ResponseData<Privilege>> => Request.put<ResponseData<Privilege>>(`/api/v1/privileges/${id}`, data)

export const getPrivilegeById = async (id: number): Promise<ResponseData<Privilege>> => Request.get<ResponseData<Privilege>>(`/api/v1/privileges/${id}`)
