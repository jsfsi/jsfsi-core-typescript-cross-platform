import { TenantToken } from './TenantToken'

export class UserTenantToken {
  exp?: number
  iat?: number
  id: string
  email?: string
  isAdmin: boolean
  tenant: TenantToken
}
