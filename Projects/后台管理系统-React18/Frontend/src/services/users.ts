import * as Request from '@/utils/request'
import type { ResponseData } from './types'
import type { UserQueryData } from '@/pages/Admin/Users'
import type { AddUserData } from '@/pages/Admin/Users/components/AddUserModalForm'
import type { AssignRolesData } from '@/pages/Admin/Users/components/AssignRolesModalForm'
import type { EditUserData } from '@/pages/Admin/Users/components/EditUserModalForm'
import type { User, UserQueryResponse } from '@/types'


export const getUserById = async (id: number): Promise<ResponseData<User>> => Request.get<ResponseData<User>>(`/api/v1/users/${id}`)

export const getUsersByQuery = async (data: UserQueryData): Promise<ResponseData<UserQueryResponse>> => Request.get<ResponseData<UserQueryResponse>>(`/api/v1/users`, data)

export const updateUserState = async (id: number, userState: boolean): Promise<ResponseData<User>> => Request.put<ResponseData<User>>(`/api/v1/users/${id}`, { userState })

export const deleteUser = async (id: number): Promise<ResponseData<User>> => Request.deleteRequest<ResponseData<User>>(`/api/v1/users/${id}`)

export const exportAllUsers = async (): Promise<Blob | ResponseData> => Request.getFile<Blob | ResponseData>('/api/v1/export-all-users')

export const addUser = async (data: AddUserData): Promise<ResponseData> => Request.post<ResponseData>('/api/v1/users', data)

export const updateUser = async (id: number, data: EditUserData): Promise<ResponseData<User>> => Request.put<ResponseData<User>>(`/api/v1/users/${id}`, data)

export const deleteTempAvatars = async (data: string[]): Promise<ResponseData> => Request.post<ResponseData>(`/api/v1/delete-temp-avatars`, data)

export const assignRoles = async (data: AssignRolesData): Promise<ResponseData<number[]>> => Request.post<ResponseData<number[]>>('/api/v1/user-role', data)
