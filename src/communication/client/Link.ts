import { HttpMethods } from './HttpMethods'

export interface Link<T = { [key: string]: string }> {
    rel?: string
    target?: string
    method: HttpMethods
    href: string
    headers?: { [key: string]: string }
    isUrlTemplate?: boolean
    authRequired?: boolean
    template?: T
}
