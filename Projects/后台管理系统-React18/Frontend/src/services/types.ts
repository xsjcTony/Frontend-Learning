export interface ResponseData<T = unknown, U = string> {
  code: number
  msg: U
  data: T
}
