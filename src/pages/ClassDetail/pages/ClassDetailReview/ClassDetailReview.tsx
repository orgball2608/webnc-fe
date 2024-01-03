/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo } from 'react'
import { useCourseDetail } from '../../ClassDetail'
import { Role } from 'src/constants/enums'
import { useNavigate } from 'react-router-dom'
import path from 'src/constants/path'

export default function ClassDetailReview() {
  const navigate = useNavigate()
  const courseContext = useCourseDetail()
  useMemo(() => {
    if (courseContext.isSuccess && courseContext.myRole === Role.STUDENT) {
      navigate(path.notFound)
    }
    0
  }, [courseContext])
  console.log(courseContext)
  return <div>{courseContext.isSuccess && 'ClassDetailReview'}</div>
}
