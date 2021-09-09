// Required to avoid importing page with reference to server side libraries in client side. Useful to mock paged requests
export class Page<T> {
  pages: number
  nextPage: number
  totalElements: number
  currentPage: number
  pageSize: number
  elements: Array<T>

  constructor(page?: Page<T>) {
    this.pages = page?.pages || 0
    this.nextPage = page?.nextPage || 0
    this.totalElements = page?.totalElements || 0
    this.currentPage = page?.currentPage || 0
    this.pageSize = page?.pageSize || 0
    this.elements = page?.elements || []
  }
}
