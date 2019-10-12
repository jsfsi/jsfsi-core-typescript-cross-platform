import { HttpMethods } from './HttpMethods'

export interface Link {
    name?: string
    method: HttpMethods
    href: string
    headers?: { [key: string]: string }
    templated?: boolean
}
