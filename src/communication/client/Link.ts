import { HttpMethods } from './HttpMethods'

// NOTE: required to be a class so it can be easily instatiated
export class Link<T = { [key: string]: string }> {
    rel?: string
    target?: string
    method: HttpMethods
    href: string
    headers?: { [key: string]: string }
    isUrlTemplate?: boolean
    authRequired?: boolean
    template?: T
}
