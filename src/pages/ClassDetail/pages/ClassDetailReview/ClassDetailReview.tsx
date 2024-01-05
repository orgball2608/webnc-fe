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
import { GradeReview } from 'src/types/GradeReview .type'

// const reviewFake = {
//   id: 1,
//   gradeId: 1,
//   expectedGrade: 10,
//   explanation: "lam tot",
//   isResolve: false,
//   createdById: 1,
//   grade: Grade
//   createdBy: User

//   createdAt: string
//   updatedAt: string
// }

export default function ClassDetailReview() {
  const navigate = useNavigate()
  const courseContext = useCourseDetail()
  const { roleInCourse } = useAppSelector((state) => state.class)
  useEffect(() => {
    if (courseContext.isSuccess && roleInCourse.role === Role.STUDENT) {
      navigate(path.notFound)
    }
  }, [courseContext, roleInCourse])

  // const { profile } = useAppSelector((state) => state.auth)
  const { members, isLoading } = useCourseDetail()
  const [reviewSelected, setReviewSelected] = useState<GradeReview>()

  const [isOpenNewReviews, setIsOpenNewReviews] = useState(true)
  const [isOpenCompleted, setIsOpenCompleted] = useState(true)

  const [isOpenReviewModal, setIsOpenReviewModal] = useState(false)

  const handleClick = (review: GradeReview) => {
    setReviewSelected(review)
    setIsOpenReviewModal(true)
  }

  const reviewDetailModal = ReviewDetailModal({
    isOpen: isOpenReviewModal,
    onOpen: () => setIsOpenReviewModal(true),
    onClose: () => setIsOpenReviewModal(false)
    // review: reviewSelected
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
                  {isOpenNewReviews && (members?.enrollments?.length || 0) + ' New Reviews'}
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
                {members?.courseTeachers &&
                  members.courseTeachers.length > 0 &&
                  members.courseTeachers.map((member, index) => (
                    <li key={index}>
                      <button
                        className={`min-h my-1 flex w-full items-center justify-between rounded-md  
                        border-b bg-opacity-60 p-6 last:border-b-0 hover:bg-lightBlue-100 md:h-16 
                        ${index % 2 === 0 ? 'bg-blue-50' : ''} `}
                        onClick={() => handleClick(member)}
                      >
                        <div className='flex space-x-2 tracking-wide'>
                          <Icon icon='material-symbols:rate-review-outline' width='30' height='30' />
                          <div className='h-100 flex pl-4 font-bold tracking-wide'>
                            {/* <div> */}
                            {/* </div>{' '} */}
                            20120443 - {member?.teacher?.firstName + ' ' + member?.teacher?.lastName + ' '}
                          </div>
                          <div className='tracking-wide'> đã yêu cầu phúc khảo cột điểm giữa kỳ</div>
                        </div>
                      </button>
                    </li>
                  ))}
                {(!members?.courseTeachers || members.courseTeachers.length === 0) &&
                  isLoading &&
                  Array(2)
                    .fill(0)
                    .map((_, index) => <Skeleton key={index} className='h-[54px]' />)}
              </ul>
            ) : (
              <div
                className={`cursor my-1 flex h-16 w-full items-center rounded-md border-b border-b-primary
               bg-lightBlue-100 p-3 last:border-b-0`}
              >
                <Icon icon='material-symbols:rate-review-outline' width='30' height='30' />
                <div className='h-100 flex pl-4 font-bold tracking-wide'>
                  {(members?.enrollments?.length || 0) + ' New Reviews'}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className='mb-4 flex h-[72px] items-center justify-between border-b border-b-[#4285f4]'>
              <h2 className=' text-[32px] font-normal leading-10 text-third'>Completed</h2>

              <div className='flex items-center'>
                <span className='hidden pr-1 text-sm font-medium text-third md:flex'>
                  {isOpenCompleted && (members?.enrollments?.length || 0) + ' Reviews Completed'}
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
                {members?.enrollments &&
                  members.enrollments.length > 0 &&
                  members.enrollments.map((member, index) => (
                    <li key={index}>
                      <button
                        className={`min-h my-1 flex w-full items-center justify-between rounded-md border-b border-b-primary bg-gray-300 p-6 last:border-b-0 hover:bg-blue-gray-50 md:h-16 `}
                        onClick={() => handleClick(member)}
                      >
                        <div className='flex space-x-2 tracking-wide'>
                          <Icon icon='material-symbols-light:download-done' width='30' height='30' />
                          <div className='flex pl-4 font-bold tracking-wide'>
                            20120443 - {member?.teacher?.firstName + ' ' + member?.teacher?.lastName + ' '}
                          </div>
                          <div className='tracking-wide'> đã yêu cầu phúc khảo cột điểm giữa kỳ</div>
                        </div>
                      </button>
                    </li>
                  ))}

                {(!members?.enrollments || members.enrollments.length === 0) &&
                  isLoading &&
                  Array(2)
                    .fill(0)
                    .map((_, index) => <Skeleton key={index} className='h-[56px]' />)}
              </ul>
            ) : (
              <div
                className={`cursor rounded-mdlast:border-b-0 my-1 flex h-16 w-full items-center
                border-b border-b-primary bg-gray-300 p-3`}
              >
                <Icon icon='material-symbols-light:download-done' width='30' height='30' />
                <div className='flex pl-6 font-bold tracking-wide'>
                  {(members?.enrollments?.length || 0) + ' Reviews Completed'}
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
