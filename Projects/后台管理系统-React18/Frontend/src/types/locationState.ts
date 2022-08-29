interface PromptInfo {
  type: string
  promptInfo: {
    type: 'error' | 'info' | 'success' | 'warn'
    intlId: string
    duration: number
    path: string
    noPrivilege: boolean
  }
}

export const isPromptInfo = (state: unknown): state is PromptInfo => {
  if (!state) return false
  return (state as PromptInfo).type === 'prompt'
}


export interface ResetPasswordInfo {
  email: string
  verified: boolean
}

export const isResetPasswordInfo = (state: unknown): state is ResetPasswordInfo => {
  if (!state) return false
  return (state as ResetPasswordInfo).verified
}
