import { TenantToken } from './TenantToken'

export class UserTenantToken implements Record<string, unknown> {
  [x: string]: unknown

  exp?: number
  iat?: number
  id: string
  email?: string
  isAdmin: boolean
  tenant: TenantToken
}
