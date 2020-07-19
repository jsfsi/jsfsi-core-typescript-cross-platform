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

    constructor(link: Link<T>) {
        this.rel = link.rel
        this.target = link.target
        this.method = link.method
        this.href = link.href
        this.headers = link.headers
        this.isUrlTemplate = link.isUrlTemplate
        this.authRequired = link.authRequired
        this.template = link.template
    }
}
