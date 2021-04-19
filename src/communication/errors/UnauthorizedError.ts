export class UnauthorizedError extends Error {
  public readonly location?: string

  constructor(error: string, location?: string) {
    super(error)
    this.name = this.constructor.name
    this.location = location
  }
}
