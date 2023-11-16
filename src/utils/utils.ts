import axios, { AxiosError, HttpStatusCode } from 'axios'

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
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}
