// Required to avoid importing page with reference to server side libraries in client side. Useful to mock paged requests
export interface Page<T> {
    pages: number
    nextPage: number
    totalElements: number
    currentPage: number
    pageSize: number
    elements: Array<T>
}
