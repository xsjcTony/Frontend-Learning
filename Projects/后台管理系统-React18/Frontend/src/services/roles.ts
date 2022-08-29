import * as Request from '@/utils/request'
import type { ResponseData } from './types'
import type { RoleQueryData } from '@/pages/Admin/Roles'
import type { AddRoleData } from '@/pages/Admin/Roles/components/AddRoleModalForm'
import type { AssignMenusData } from '@/pages/Admin/Roles/components/AssignMenusModalForm'
import type { AssignPrivilegesData } from '@/pages/Admin/Roles/components/AssignPrivilegesModalForm'
import type { EditRoleData } from '@/pages/Admin/Roles/components/EditRoleModalForm'
import type { Role, RoleQueryResponse } from '@/types'


export const getRoleById = async (id: number): Promise<ResponseData<Role>> => Request.get<ResponseData<Role>>(`/api/v1/roles/${id}`)

export const getRolesByQuery = async (data: RoleQueryData): Promise<ResponseData<RoleQueryResponse>> => Request.get<ResponseData<RoleQueryResponse>>(`/api/v1/roles`, data)

export const updateRoleState = async (id: number, roleState: boolean): Promise<ResponseData<Role>> => Request.put<ResponseData<Role>>(`/api/v1/roles/${id}`, { roleState })

export const deleteRole = async (id: number): Promise<ResponseData<Role>> => Request.deleteRequest<ResponseData<Role>>(`/api/v1/roles/${id}`)

export const addRole = async (data: AddRoleData): Promise<ResponseData> => Request.post<ResponseData>('/api/v1/roles', data)

export const updateRole = async (id: number, data: EditRoleData): Promise<ResponseData<Role>> => Request.put<ResponseData<Role>>(`/api/v1/roles/${id}`, data)

export const assignPrivileges = async (data: AssignPrivilegesData): Promise<ResponseData<number[]>> => Request.post<ResponseData<number[]>>('/api/v1/role-privilege', data)

export const assignMenus = async (data: AssignMenusData): Promise<ResponseData<number[]>> => Request.post<ResponseData<number[]>>(`/api/v1/role-menu`, data)
