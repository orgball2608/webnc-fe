import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter } from '@material-tailwind/react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import path from 'src/constants/path'
import { replace } from 'lodash'
import courseApi from 'src/apis/courses.api'
import { useQuery } from '@tanstack/react-query'

// const onConfirm: () => void
// const onCancel: () => void

export default function ClassDetailInvite() {
  const navigate = useNavigate()

  const currentURL = useLocation().pathname
  const classURL = replace(currentURL, '/invite', '/news')
  const { classId } = useParams()

  const dataCheck = useQuery({
    queryKey: ['me_courses'],
    queryFn: () => {
      return courseApi.checkEnrolled(classId as string)
    }
  })

  const dataCourse = useQuery({
    queryKey: ['courses'],
    queryFn: () => {
      return courseApi.addUserToClass(classId as string)
    },
    enabled: false
  })

  // const [course, setCourse] = useState(null)

  const checkEnrolled = dataCheck.data?.data.data

  useEffect(() => {
    if (dataCheck.isSuccess && checkEnrolled?.isEnrolled === true) {
      navigate(classURL)
    } else if (dataCheck.isError) {
      navigate(path.home)
    }
  }, [dataCheck, navigate, classURL, checkEnrolled])

  const handleCancle = () => {
    navigate(path.home)
  }

  const handleConfirm = () => {
    dataCourse.refetch()
    navigate(classURL)
  }

  return (
    <div className='mt-10 flex w-full justify-center'>
      <Card className='w-[50em] rounded-md border-2 border-solid border-[#cbd3e1] font-medium'>
        <CardBody>
          <h1 className='mb-4 text-center'>Xác nhận tham gia lớp {checkEnrolled?.course?.data?.name}</h1>
          {/* Hiển thị thông điệp và các thông tin khác */}
        </CardBody>
        <CardFooter>
          <div className='flex flex-col items-center justify-center gap-4 md:flex-row md:items-stretch'>
            <Button color='gray' fullWidth={true} className='md:w-[120px]' onClick={handleConfirm}>
              Xác nhận
            </Button>
            <Button
              color='white'
              fullWidth={true}
              className='mt-2 border-2 md:mt-0 md:w-[120px]'
              onClick={handleCancle}
            >
              Hủy
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
