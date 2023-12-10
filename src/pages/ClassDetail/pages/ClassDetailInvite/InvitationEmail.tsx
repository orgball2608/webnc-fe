import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import courseApi from 'src/apis/courses.api'
import { useQuery } from '@tanstack/react-query'
import useQueryString from 'src/hooks/useQueryString'

export default function InvitationEmail() {
  const navigate = useNavigate()

  const currentURL = useLocation().pathname
  const { token } = useQueryString()

  const dataCourse = useQuery({
    queryKey: ['invite-email'],
    queryFn: () => {
      return courseApi.acceptInvitation(token as string)
    }
  })

  const course = dataCourse.data?.data.data
  const classURL = currentURL.replace(`/join?token=${token}`, `/${course?.id}/news`)

  useEffect(() => {
    if (dataCourse.isSuccess) {
      navigate(classURL)
    } else if (dataCourse.isError) {
      navigate(path.home)
    }
  }, [dataCourse, navigate, classURL])

  return <></>
}
