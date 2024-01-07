import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import gradeApi from 'src/apis/grade.api'
import { useCourseDetail } from '../../ClassDetail'
import { Card, Typography } from '@material-tailwind/react'
import { Box, Button, CircularProgress } from '@mui/material'
import { USER_MESSAGES } from 'src/constants/constants'
import { CreateReviewModal, ReviewDetailModal } from 'src/components/ModalReview'
import { StudentGrade } from 'src/types/grade.type'

const TABLE_HEAD = ['#', 'Tên điểm', '%', 'Điểm', '']

export default function GradeStudent() {
  const { id: classId, myRole } = useCourseDetail()
  const [isOpenNewModal, setIsOpeNewModal] = useState(false)
  const [isOpenReviewModal, setIsOpeReviewModal] = useState(false)
  const [selected, setSelected] = useState<StudentGrade>()

  const getCourseDetailQuery = useQuery({
    queryKey: ['my-grade', classId],
    queryFn: () => gradeApi.getMyGrade(classId as string),
    enabled: Boolean(classId)
  })

  const response = getCourseDetailQuery?.data?.data
  const gadeData = response?.data?.gradeBoard
  const infoSutdent = response?.data?.infoStudent
  const messages = response?.message

  let totalGrade = 0
  let totalScale = 0
  let isLast
  let classes

  const handleClickNewReview = (grade: StudentGrade) => {
    setIsOpeNewModal(true)
    setSelected(grade)
  }

  const handleClickReview = (grade: StudentGrade) => {
    setIsOpeReviewModal(true)
    setSelected(grade)
  }

  const createReviewModal = CreateReviewModal({
    isOpen: isOpenNewModal,
    onClose: () => setIsOpeNewModal(false),
    gradeData: selected,
    infoSutdent
  })

  const reviewModal = ReviewDetailModal({
    isOpen: isOpenReviewModal,
    setIsOpenReviewModal: setIsOpeReviewModal,
    reviewData: {
      id: selected?.grades[0]?.GradeReview[0]?.id,
      explanation: selected?.grades[0]?.GradeReview[0]?.explanation,
      expectedGrade: selected?.grades[0]?.GradeReview[0]?.expectedGrade,
      isResolve: selected?.grades[0]?.GradeReview[0]?.isResolve,
      gradeId: selected?.grades[0]?.id,
      grade: selected?.grades[0]?.grade,
      gradeName: selected?.name,
      fullName: infoSutdent?.fullName,
      studentId: infoSutdent?.studentId,
      courseId: selected?.courseId
    },
    myRole
  })

  return (
    <>
      {getCourseDetailQuery.isLoading && (
        <div className='mt-80'>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: getCourseDetailQuery.isLoading ? 'flex' : 'none' // Hiển thị khi isLoading là true
            }}
          >
            <CircularProgress />
          </Box>
        </div>
      )}
      {messages == USER_MESSAGES.STUDENTID_HAS_NOT_BEEN_ENTERED && (
        <div className='-mt-2 mb-10 space-x-4 text-center text-lg'>
          <strong>Tài khoản của bạn chưa có studentID, vui lòng nhập studentID để xem điểm</strong>
        </div>
      )}
      {!getCourseDetailQuery.isLoading && (
        <Card className='m-auto h-full w-full overflow-scroll md:w-3/4'>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: getCourseDetailQuery.isLoading ? 'flex' : 'none' // Hiển thị khi isLoading là true
            }}
          >
            <CircularProgress />
          </Box>

          <table className='w-full min-w-max table-auto text-left'>
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className='border-b border-blue-gray-100 bg-blue-gray-50 px-8 py-6'>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='text-center font-normal leading-none opacity-70'
                    >
                      <strong>{head}</strong>
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {getCourseDetailQuery.isLoading && (
                <tr>
                  <td className='border-b py-20' colSpan={5}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: getCourseDetailQuery.isLoading ? 'flex' : 'none' // Hiển thị khi isLoading là true
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  </td>
                </tr>
              )}
              {gadeData?.length === 0 && (
                <tr>
                  <td className='border-bpx-8 py-6' colSpan={5}>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='text-center font-normal leading-none opacity-70'
                    >
                      <strong>Chưa có thành phẩn điểm nào</strong>
                    </Typography>
                  </td>
                </tr>
              )}
              {gadeData?.map((grade, index) => {
                isLast = index === gadeData?.length
                classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'
                totalGrade += grade?.grades[0]?.grade * grade?.scale
                totalScale += grade?.scale

                return (
                  <tr key={grade.id}>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='text-center font-normal'>
                        {grade?.index || 0}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='ml-6 font-normal'>
                        {grade?.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='text-center font-normal'>
                        {grade?.scale || 0}%
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='text-center font-normal'>
                        {grade?.isFinalized ? grade?.grades[0]?.grade || 'N/A' : 'N/A'}
                      </Typography>
                    </td>
                    <td className={`${classes}`}>
                      <div className='ml-8 flex min-w-min items-center'>
                        {' '}
                        {grade?.isFinalized &&
                          grade?.grades[0]?.grade &&
                          (grade?.grades[0]?.GradeReview.length > 0 ? (
                            <Button
                              onClick={() => handleClickReview(grade)}
                              variant='outlined'
                              color='primary'
                              sx={{
                                textTransform: 'none',
                                '&:hover': { backgroundColor: '#2196f3', color: '#fff' },
                                borderRadius: '10px'
                              }}
                            >
                              Review
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleClickNewReview(grade)}
                              variant='outlined'
                              color='primary'
                              sx={{
                                textTransform: 'none',
                                '&:hover': { backgroundColor: '#2196f3', color: '#fff' },
                                borderRadius: '10px'
                              }}
                            >
                              Review
                            </Button>
                          ))}
                      </div>
                    </td>
                  </tr>
                )
              })}
              <tr>
                <td className={classes}>
                  <Typography variant='small' color='blue-gray' className='font-normal'>
                    {' '}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant='small' color='blue-gray' className='ml-6 font-normal'>
                    <strong>Tổng</strong>
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant='small' color='blue-gray' className='text-center font-normal'>
                    <strong>{totalScale || 0}%</strong>
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant='small' color='blue-gray' className='text-center font-normal'>
                    <strong>{Number((totalGrade / totalScale).toFixed(2)) || 'N/A'}</strong>
                  </Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
      )}
      {createReviewModal}
      {reviewModal}
    </>
  )
}
