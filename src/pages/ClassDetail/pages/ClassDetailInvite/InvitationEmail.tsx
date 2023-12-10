import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import courseApi from 'src/apis/courses.api'
import { useQuery } from '@tanstack/react-query'
// import { toast } from 'react-toastify'
import useQueryString from 'src/hooks/useQueryString'

// const onConfirm: () => void
// const onCancel: () => void

export default function InvitationEmail() {
  const navigate = useNavigate()

  const currentURL = useLocation().pathname
  const { token } = useQueryString()
  // const { token } = useParams()

  const dataCourse = useQuery({
    queryKey: ['invite-email'],
    queryFn: () => {
      return courseApi.acceptInvitation(token as string)
    }
  })

  // const [course, setCourse] = useState(null)

  const course = dataCourse.data?.data.data
  const classURL = currentURL.replace(`/join?token=${token}`, `/${course?.id}/news`)

  useEffect(() => {
    if (dataCourse.isSuccess) {
      console.log('success')

      navigate(classURL)
    } else if (dataCourse.isError) {
      navigate(path.home)
    }
  }, [dataCourse, navigate, classURL])

  return <></>
}
