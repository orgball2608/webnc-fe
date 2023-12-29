import { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter } from '@material-tailwind/react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import path from 'src/constants/path'
import { replace } from 'lodash'
import courseApi from 'src/apis/courses.api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from 'src/app/store'
import { setInvitationLink } from 'src/slices/class.slice'
import { Box, CircularProgress } from '@mui/material'

export default function ClassDetailInvite() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { invitationLink } = useAppSelector((state) => state.class)

  const currentURL = useLocation().pathname
  const classURL = replace(currentURL, '/invite', '/news')
  const { classId } = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

  const checkEnrolled = dataCheck.data?.data.data

  useEffect(() => {
    if (dataCheck.isSuccess && checkEnrolled?.isEnrolled === true) {
      navigate(classURL)
    } else if (dataCheck.isError) {
      navigate(path.home)
    }
  }, [dataCheck, navigate, classURL, checkEnrolled])

  useEffect(() => {
    if (invitationLink) {
      dispatch(setInvitationLink(''))
    }
  }, [invitationLink, dispatch])

  const handleCancle = () => {
    navigate(path.home)
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    await dataCourse.refetch().then(async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['teaching-list']
        }),

        queryClient.invalidateQueries({
          queryKey: ['enrolled-list']
        }),
        queryClient.invalidateQueries({
          queryKey: ['classes']
        })
      ])
      toast.success('Tham gia lớp học thành công!')
      navigate(classURL)
      setIsLoading(false)
    })
    //
  }

  return (
    <div className='mt-36 flex w-full justify-center'>
      <Box
        marginTop={32}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: dataCheck.isLoading ? 'flex' : 'none' // Hiển thị khi isLoading là true
        }}
      >
        <CircularProgress />
      </Box>
      {!dataCheck.isLoading && (
        <Card className='w-[50em] rounded-md border-2 border-solid border-[#cbd3e1] font-medium'>
          <CardBody>
            <h1 className='mb-4 mt-4 text-center'>Xác nhận tham gia lớp {checkEnrolled?.course?.data?.name}</h1>
            {/* Hiển thị thông điệp và các thông tin khác */}
          </CardBody>
          <CardFooter>
            <div className='mb-4 flex flex-col items-center justify-center gap-4 md:flex-row md:items-stretch'>
              <Button
                color='gray'
                fullWidth={true}
                className='md:w-[120px]'
                onClick={handleConfirm}
                disabled={isLoading === true}
              >
                Xác nhận
              </Button>
              <Button
                color='white'
                fullWidth={true}
                className='mt-2 border-2 md:mt-0 md:w-[120px]'
                onClick={handleCancle}
                disabled={isLoading === true}
              >
                Hủy
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
