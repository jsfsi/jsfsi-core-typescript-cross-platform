export class HttpRequestError {
  statusCode: number
  message?: string
  headers: { [key: string]: string | Array<string> }

  constructor(
    statusCode: number,
    message?: string,
    headers?: { [key: string]: string | Array<string> },
  ) {
    this.statusCode = statusCode
    this.message = message
    this.headers = headers
  }
}
