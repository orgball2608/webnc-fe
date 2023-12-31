import { Button } from '@material-tailwind/react'
import { useAppSelector } from 'src/app/store'
import Image from 'src/components/Image'
import IconButton from 'src/components/IconButton'
import { FaCircleInfo } from 'react-icons/fa6'
import { useState } from 'react'
import classNames from 'classnames'
import { useMutation } from '@tanstack/react-query'
import courseApi from 'src/apis/courses.api'
import Skeleton from 'react-loading-skeleton'
import { FaPencilAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { LuCheck, LuCopy } from 'react-icons/lu'
import { Role } from 'src/constants/enums'
import { useCourseDetail } from '../../ClassDetail'

function ClassDetailNews() {
  const { id: classId, data: courseDetailData, refetch: refetchCourseDetail } = useCourseDetail()
  const param = useParams()
  const classId = param?.classId
  const { roleInCourse } = useAppSelector((state) => state.class)
  const [isCopied, setIsCopied] = useState(false)

  const getCourseDetailQuery = useQuery({
    queryKey: ['course-detail', classId],
    queryFn: () => courseApi.getCourseDetail(classId as string),
    enabled: Boolean(classId)
  })
  const courseDetailData = getCourseDetailQuery.data?.data.data

  const uploadBackgroundMutation = useMutation({
    mutationKey: ['upload-course-background', classId],
    mutationFn: (body: FormData) => courseApi.uploadBackground(classId as string, body),
    onSuccess: () => {
      toast.success('Thay đổi hình nền thành công!')
      refetchCourseDetail()
    }
  })

  const { profile } = useAppSelector((state) => state.auth)
  const [isMoreInfo, setIsMoreInfo] = useState(false)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const body = new FormData()
      body.append('avatar', file)
      uploadBackgroundMutation.mutate(body)
    }
  }

  const handleClickCopy = () => {
    setIsCopied(true)
    navigator.clipboard.writeText(courseDetailData?.code as string)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <>
      <div
        className={classNames(`relative flex h-[240px] flex-col bg-[length:100%_100%] bg-no-repeat px-6 py-4`, {
          'rounded-lg': !isMoreInfo,
          'rounded-t-lg shadow-md': isMoreInfo
        })}
        style={{ backgroundImage: `url('${courseDetailData?.avatar || '/assets/images/img_graduation.jpg'}')` }}
      >
        <div className='flex justify-end'>
          {courseDetailData?.createdBy.id === profile?.id && (
            <Button
              variant='filled'
              color='white'
              className='relative flex h-[36px] w-[130px] items-center gap-2 px-3 py-0 text-sm normal-case text-primary !shadow-md'
            >
              <label
                htmlFor='course-background'
                className='absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center px-3 py-0'
              >
                <span className='ml-3'>Tùy chỉnh</span>
              </label>
              <FaPencilAlt className='h-[18px] w-[18px]' />
            </Button>
          )}

          <input
            id='course-background'
            type='file'
            accept='.png, .jpg, .jpeg, .webp'
            hidden
            onChange={onFileChange}
            onClick={(event) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ;(event.target as any).value = null
            }}
          />
        </div>
        <div className='mt-auto pr-20'>
          <h1 className='text-[36px] font-medium text-white drop-shadow-md'>
            {courseDetailData?.name || <Skeleton className='skeleton-custom' />}
          </h1>
          <p className='text-[22px] font-normal text-white drop-shadow-md'>
            {courseDetailData?.description || <Skeleton className='skeleton-custom' />}
          </p>
        </div>

        <button className='absolute bottom-1 right-1' onClick={() => setIsMoreInfo((prev) => !prev)}>
          <IconButton Icon={<FaCircleInfo />} />
        </button>
      </div>

      {isMoreInfo && (
        <div className='rounded-b-lg bg-white p-6 text-primary shadow-md'>
          <p className='text-sm'>
            <span className='font-medium'>Chủ đề </span> {courseDetailData?.topic || <Skeleton />}
          </p>
          <p className='text-sm'>
            <span className='font-medium'>Phòng </span> {courseDetailData?.room || <Skeleton />}
          </p>
        </div>
      )}

      <div className='mt-6 flex gap-6'>
        <div>
          {roleInCourse.role === Role.TEACHER && !getCourseDetailQuery.isPending && (
            <div className='mb-3 w-48 rounded-lg border border-primary px-4 pb-2 pt-4'>
              <h2 className='mb-2 text-sm font-medium text-primary'>Class code</h2>
              <div className='mb-2 flex items-center'>
                <p className='= w-full overflow-hidden text-ellipsis text-2xl font-bold'>{courseDetailData?.code}</p>
                <IconButton
                  Icon={isCopied ? <LuCheck /> : <LuCopy />}
                  tooltip='copy link'
                  mode='dark'
                  onClick={handleClickCopy}
                />
              </div>
            </div>
          )}
          <div className='w-48 rounded-lg border border-primary px-4 pb-2 pt-4'>
            <h2 className='mb-4 text-sm font-medium text-primary'>Sắp đến hạn</h2>
            <p className='text-[13px] leading-5 text-fourth'>Tuyệt vời, không có bài tập nào sắp đến hạn!</p>
            <div className='mt-2 flex justify-end'>
              <Button variant='text' className='px-3 text-third' size='md'>
                Xem tất cả
              </Button>
            </div>
          </div>
        </div>

        <div className='flex-1'>
          <div className='group mb-6 flex h-[72px] cursor-pointer items-center rounded-lg border border-primary shadow-md'>
            <div className='ml-2 flex h-full w-[72px] items-center justify-center'>
              <Image src={profile?.avatar as string} alt='avatar' size='lg' />
            </div>
            <p className='text-[13px] leading-5 text-fourth group-hover:text-secondary'>
              Thông báo nội dung nào đó cho lớp học của bạn
            </p>
          </div>
        </div>
      </div>
      {/* 
      <EditorProvider extensions={extensions} content={content}>
        <FloatingMenu>This is the floating menu</FloatingMenu>
        <BubbleMenu>This is the bubble menu</BubbleMenu>
      </EditorProvider> */}
    </>
  )
}

export default ClassDetailNews
