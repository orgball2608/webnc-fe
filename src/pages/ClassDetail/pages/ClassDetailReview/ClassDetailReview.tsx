/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io'
import Skeleton from 'react-loading-skeleton'
import { Icon } from '@iconify/react'

import path from 'src/constants/path'
import IconButton from 'src/components/IconButton'
import { useCourseDetail } from '../../ClassDetail'
import { Role } from 'src/constants/enums'
import { useAppSelector } from 'src/app/store'
import { ReviewDetailModal } from 'src/components/ModalReview'
import { GradeReview, ReviewFull } from 'src/types/grade-review.type'
import gradeReviewApi from 'src/apis/review-grade.api'
import { useQuery } from '@tanstack/react-query'
import { Box, CircularProgress } from '@mui/material'

export default function ClassDetailReview() {
  const navigate = useNavigate()

  const courseContext = useCourseDetail()
  const { roleInCourse } = useAppSelector((state) => state.class)

  const { isLoading, data: courseData } = useCourseDetail()
  const [reviewSelected, setReviewSelected] = useState<ReviewFull>()

  const [isOpenNewReviews, setIsOpenNewReviews] = useState(true)
  const [isOpenCompleted, setIsOpenCompleted] = useState(true)

  const [isOpenReviewModal, setIsOpenReviewModal] = useState(false)

  const handleClick = (review: ReviewFull) => {
    setReviewSelected(review)
    setIsOpenReviewModal(true)
  }
  useEffect(() => {
    if (courseContext.isSuccess && roleInCourse.role === Role.STUDENT) {
      navigate(path.notFound)
    }
  }, [courseContext, roleInCourse])

  const reviewListQuery = useQuery({
    queryKey: ['review-list', courseData?.id],
    queryFn: () => gradeReviewApi.getReviewList(courseData?.id as number),
    enabled: Boolean(courseData?.id)
  })

  const listReviewData = reviewListQuery?.data?.data?.data

  const listCompletedReview = listReviewData?.filter((review) => review.isResolve)
  const listNewReview = listReviewData?.filter((review) => !review.isResolve)

  const reviewDetailModal = ReviewDetailModal({
    isOpen: isOpenReviewModal,
    setIsOpenReviewModal,
    reviewData: reviewSelected,
    myRole: roleInCourse.role
  })

  return (
    <div className='m-auto mt-4 w-4/5'>
      {courseContext.isSuccess && (
        <>
          <div className='mb-10'>
            <div className='mb-4 flex h-[72px] items-center justify-between border-b border-b-[#4285f4]'>
              <h2 className='text-[32px] font-normal leading-10 text-third'>New Reviews</h2>
              <div className='flex items-center'>
                <span className='hidden pr-1 text-sm font-medium text-third md:flex'>
                  {isOpenNewReviews && (listNewReview?.length || 0) + ' New Reviews'}
                </span>
                <IconButton
                  Icon={isOpenNewReviews ? <IoIosArrowDown /> : <IoIosArrowBack />}
                  tooltip={!isOpenNewReviews ? 'Mở danh sách' : 'Đóng danh sách'}
                  mode='dark'
                  onClick={() => setIsOpenNewReviews(!isOpenNewReviews)}
                />
              </div>
            </div>

            {isOpenNewReviews ? (
              <ul>
                {listNewReview &&
                  listNewReview?.length > 0 &&
                  listNewReview?.map((review, index) => (
                    <li key={index}>
                      <button
                        className={`min-h my-1 flex w-full items-center justify-between rounded-md  
                      border-b bg-opacity-60 p-6 last:border-b-0 hover:bg-lightBlue-200 md:h-16 
                      ${index % 2 === 0 ? 'bg-blue-100' : ''} `}
                        onClick={() => handleClick(review)}
                      >
                        <div className='flex space-x-2 tracking-wide'>
                          <Icon icon='material-symbols:rate-review-outline' width='30' height='30' />
                          <div className='h-100 flex pl-4 font-bold tracking-wide'>
                            {/* <div> */}
                            {/* </div>{' '} */}
                            {review?.studentId + ' - ' + review?.fullName}
                          </div>
                          <div className='tracking-wide'> đã yêu cầu phúc khảo cột điểm {review?.gradeName}</div>
                        </div>
                      </button>
                    </li>
                  ))}
                {(!listNewReview || isLoading) &&
                  Array(2)
                    .fill(0)
                    .map((_, index) => <Skeleton key={index} className='h-[54px]' />)}
              </ul>
            ) : (
              <div
                className={`cursor my-1 flex h-16 w-full items-center space-x-2 rounded-md border-b
               border-b-primary bg-lightBlue-100 p-6 last:border-b-0`}
              >
                <Icon icon='material-symbols:rate-review-outline' width='30' height='30' />
                <div className='h-100 flex pl-4 font-bold tracking-wide'>
                  {(listNewReview?.length || 0) + ' New Reviews'}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className='mb-4 flex h-[72px] items-center justify-between border-b border-b-[#4285f4]'>
              <h2 className=' text-[32px] font-normal leading-10 text-third'>Completed</h2>

              <div className='flex items-center'>
                <span className='hidden pr-1 text-sm font-medium text-third md:flex'>
                  {isOpenCompleted && (listCompletedReview?.length || 0) + ' Reviews Completed'}
                </span>
                <IconButton
                  Icon={isOpenCompleted ? <IoIosArrowDown /> : <IoIosArrowBack />}
                  tooltip={!isOpenCompleted ? 'Mở danh sách' : 'Đóng danh sách'}
                  mode='dark'
                  onClick={() => setIsOpenCompleted(!isOpenCompleted)}
                />
              </div>
            </div>
            {isOpenCompleted ? (
              <ul>
                {listCompletedReview &&
                  listCompletedReview?.length > 0 &&
                  listCompletedReview?.map((review, index) => (
                    <li key={index}>
                      <button
                        className={`min-h my-1 flex w-full items-center justify-between rounded-md border-b border-b-primary bg-gray-300 p-6 last:border-b-0 hover:bg-blue-gray-50 md:h-16 `}
                        onClick={() => handleClick(review)}
                      >
                        <div className='flex space-x-2 tracking-wide'>
                          <Icon icon='material-symbols-light:download-done' width='30' height='30' />
                          <div className='flex pl-4 font-bold tracking-wide'>
                            {review?.studentId + ' - ' + review?.fullName}
                          </div>
                          <div className='tracking-wide'> đã yêu cầu phúc khảo cột điểm {review?.gradeName}</div>
                        </div>
                      </button>
                    </li>
                  ))}

                {(!listCompletedReview || isLoading) &&
                  Array(2)
                    .fill(0)
                    .map((_, index) => <Skeleton key={index} className='h-[56px]' />)}
              </ul>
            ) : (
              <div
                className={`cursor rounded-mdlast:border-b-0 my-1 flex h-16 w-full items-center
                border-b border-b-primary bg-gray-300 p-6`}
              >
                <Icon icon='material-symbols-light:download-done' width='30' height='30' />
                <div className='flex pl-6 font-bold tracking-wide'>
                  {(listCompletedReview?.length || 0) + ' Reviews Completed'}
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {reviewDetailModal}
    </div>
  )
}
