export class PageQuery {
  page: number
  pageSize: number

  constructor(query?: PageQuery) {
    this.page = query?.page || 0
    this.pageSize = query?.pageSize || 0
  }
}
