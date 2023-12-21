import axios, { AxiosError, HttpStatusCode } from 'axios'
import { ErrorResponseApi } from 'src/types/utils.type'
import moment from 'moment'

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

export const calculateTimeDifference = (timestampStr: Date) => {
  // Parse the timestamp string using Moment.js
  const timestamp = moment(timestampStr)

  // Get the current date using Moment.js
  const currentDate = moment()

  // Calculate the differences in various units
  const yearsDifference = currentDate.diff(timestamp, 'years')
  const monthsDifference = currentDate.diff(timestamp, 'months')
  const daysDifference = currentDate.diff(timestamp, 'days')
  const hoursDifference = currentDate.diff(timestamp, 'hours')
  const minsDifference = currentDate.diff(timestamp, 'minutes')
  const secondsDifference = currentDate.diff(timestamp, 'seconds')

  if (yearsDifference > 0) {
    return yearsDifference + ' năm trước'
  } else if (monthsDifference > 0) {
    return monthsDifference + ' tháng trước'
  } else if (daysDifference > 0) {
    return daysDifference + ' ngày trước'
  } else if (hoursDifference > 0) {
    return hoursDifference + ' giờ trước'
  } else if (minsDifference > 0) {
    return minsDifference + ' phút trước'
  }

  return secondsDifference + ' giây trước'
}
