import axios, { AxiosError, HttpStatusCode } from 'axios'
import { ErrorResponseApi } from 'src/types/utils.type'

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export const isAxiosUnprocessableEntityError = <UnprocessableEntityError>(
  error: unknown
): error is AxiosError<UnprocessableEntityError> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const isAxiosBadRequestError = <BadRequestError>(error: unknown): error is AxiosError<BadRequestError> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
}

export const isAxiosUnauthorized = <Unauthorized>(error: unknown): error is AxiosError<Unauthorized> => {
  return (
    isAxiosError(error) &&
    (error.response?.status == HttpStatusCode.Unauthorized ||
      error.response?.status == 498 ||
      error.response?.status == 403)
  )
}

export const isAxiosNotFound = <NotFound>(error: unknown): error is AxiosError<NotFound> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.NotFound
}

export const isAxiosExpiredTokenError = <ExpiredTokenError>(error: unknown): error is AxiosError<ExpiredTokenError> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return (
    isAxiosUnauthorized<ErrorResponseApi<{ name: string; message: string }>>(error) &&
    error.response?.data.message == 'Token is expired'
  )
}
