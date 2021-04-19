/* eslint @typescript-eslint/ban-types: 0 */
export interface HttpResponse<T = {}> {
  code: number
  data: T
  headers: { [key: string]: string | Array<string> }
}
