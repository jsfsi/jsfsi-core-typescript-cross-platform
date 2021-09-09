export class TenantToken {
  id: string
  allowUserRegister: boolean
  allowChildrenTenant?: boolean
  roles: string[]

  constructor(data?: TenantToken) {
    this.id = data?.id
    this.allowUserRegister = data?.allowUserRegister
    this.allowChildrenTenant = data?.allowChildrenTenant
    this.roles = data?.roles
  }
}
