export class InternalServerError extends Error {
  constructor(error: string) {
    super(error)
    this.name = this.constructor.name
  }
}
