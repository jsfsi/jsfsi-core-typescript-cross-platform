/* eslint @typescript-eslint/no-explicit-any: 0 */
import axios, { AxiosError } from 'axios'
import { HttpMethods } from './HttpMethods'
import { HttpResponse } from './HttpResponse'
import { HttpRequestError } from './HttpRequestError'
import { Link } from './Link'

type AfterTransform = <T>(response: HttpResponse<T>) => HttpResponse<T>
type BeforeTransform = (link: Link) => Link
type AfterErrorTransform = (error: HttpRequestError, link: Link, data?: any) => any

export class HttpRequest {
  public static maxRedirects = 5

  private static afterTransforms: Array<AfterTransform> = []
  private static afterErrorTransform: AfterErrorTransform
  private static beforeTransforms: Array<BeforeTransform> = []

  private static async Get<T>(
    link: Link,
    maxRedirects: number,
    withCredentials?: boolean,
  ): Promise<HttpResponse<T>> {
    const result = await axios.get(link.href, {
      headers: link.headers,
      maxRedirects: maxRedirects,
      withCredentials: withCredentials,
    })
    return {
      code: result.status,
      data: result.data as T,
      headers: result.headers,
    }
  }

  private static async Post<T>(
    link: Link,
    data: any,
    withCredentials?: boolean,
  ): Promise<HttpResponse<T>> {
    const result = await axios.post(link.href, data, {
      headers: link.headers,
      withCredentials: withCredentials,
    })

    return {
      code: result.status,
      data: result.data as T,
      headers: result.headers,
    }
  }

  private static async Put<T>(
    link: Link,
    data: any,
    withCredentials?: boolean,
  ): Promise<HttpResponse<T>> {
    const result = await axios.put(link.href, data, {
      headers: link.headers,
      withCredentials: withCredentials,
    })

    return {
      code: result.status,
      data: result.data as T,
      headers: result.headers,
    }
  }

  private static async Delete<T>(
    link: Link,
    data: any,
    withCredentials?: boolean,
  ): Promise<HttpResponse<T>> {
    const result = await axios.delete(link.href, {
      headers: link.headers,
      data: data,
      withCredentials: withCredentials,
    })

    return {
      code: result.status,
      data: result.data as T,
      headers: result.headers,
    }
  }

  private static async Options<T>(
    link: Link,
    maxRedirects: number,
    withCredentials?: boolean,
  ): Promise<HttpResponse<T>> {
    const result = await axios({
      method: 'options',
      url: link.href,
      headers: link.headers,
      maxRedirects: maxRedirects,
      withCredentials: withCredentials,
    })

    return {
      code: result.status,
      data: result.data as T,
      headers: result.headers,
    }
  }

  public static after(transform: AfterTransform) {
    HttpRequest.afterTransforms.push(transform)
  }

  public static afterError(transform: AfterErrorTransform) {
    HttpRequest.afterErrorTransform = transform
  }

  public static before(transform: BeforeTransform) {
    HttpRequest.beforeTransforms.push(transform)
  }

  private static transformRequest(link: Link): Link {
    return HttpRequest.beforeTransforms.reduce<Link>((prevValue, currentValue) => {
      return currentValue(prevValue)
    }, link)
  }

  private static transformResponse<T>(response: HttpResponse<T>): HttpResponse<T> {
    return HttpRequest.afterTransforms.reduce<HttpResponse<T>>(
      (prevValue, currentValue) => {
        return currentValue(prevValue)
      },
      response,
    )
  }

  private static transformErrorResponse(error: any, link: Link, data?: any): any {
    return HttpRequest.afterErrorTransform(error, link, data)
  }

  private static async processRequest<T>(
    link: Link,
    data?: any,
    withCredentials?: boolean,
  ) {
    switch (link.method) {
      case HttpMethods.GET:
        return await HttpRequest.Get<T>(link, HttpRequest.maxRedirects, withCredentials)
      case HttpMethods.POST:
        return await HttpRequest.Post<T>(link, data, withCredentials)
      case HttpMethods.PUT:
        return await HttpRequest.Put<T>(link, data, withCredentials)
      case HttpMethods.DELETE:
        return await HttpRequest.Delete<T>(link, data, withCredentials)
      case HttpMethods.OPTIONS:
        return await HttpRequest.Options<T>(
          link,
          HttpRequest.maxRedirects,
          withCredentials,
        )
      default:
        throw new Error(`Request method not supported: ${link.method}`)
    }
  }

  // NOTE: method overload in typescript
  public static async fetch<T>(
    link: Link,
    data?: any,
    withCredentials?: boolean,
  ): Promise<HttpResponse<T>>
  public static async fetch<T>(
    link: Link,
    withCredentials?: boolean,
  ): Promise<HttpResponse<T>>
  public static async fetch<T>(
    link: Link,
    data?: any | boolean,
    withCredentials?: boolean,
  ): Promise<HttpResponse<T>> {
    // NOTE: required for method overload
    const requestWithCredentials =
      typeof data === 'boolean' && withCredentials === undefined ? data : withCredentials

    const transformedLink = HttpRequest.transformRequest(link)
    try {
      const response = await HttpRequest.processRequest<T>(
        transformedLink,
        data,
        requestWithCredentials,
      )
      return HttpRequest.transformResponse<T>(response)
    } catch (error) {
      let httpRequestError

      if ((error as AxiosError)?.response) {
        httpRequestError = new HttpRequestError(
          error.response.status,
          error.response.data,
          error.response.headers,
        )

        if (HttpRequest.afterErrorTransform) {
          return await HttpRequest.transformErrorResponse(httpRequestError, link, data)
        }
      }

      throw httpRequestError || error
    }
  }
}
