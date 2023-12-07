import { Avatar, Button } from '@material-tailwind/react'
import { useAppSelector } from 'src/app/store'
import Image from 'src/components/Image'
import IconButton from 'src/components/IconButton'
import { FaCircleInfo } from 'react-icons/fa6'
import { useState } from 'react'
import classNames from 'classnames'

function ClassDetailNews() {
  const { profile } = useAppSelector((state) => state.auth)
  const [isMoreInfo, setIsMoreInfo] = useState(false)

  return (
    <>
      <div
        className={classNames("relative flex h-[240px] bg-[url('/src/assets/images/img_graduation.jpg')] bg-cover", {
          'rounded-lg': !isMoreInfo,
          'rounded-t-lg shadow-md': isMoreInfo
        })}
      >
        <h1 className='mt-auto px-6 py-4 text-[36px] font-medium text-white'>CNPM - TH/2020/1</h1>

        <button className='absolute bottom-1 right-1' onClick={() => setIsMoreInfo((prev) => !prev)}>
          <IconButton Icon={<FaCircleInfo />} />
        </button>
      </div>

      {isMoreInfo && (
        <div className='rounded-b-lg bg-white p-6 text-primary shadow-md'>
          <p className='text-sm'>
            <span className='font-medium'>Chủ đề </span> Toán
          </p>
          <p className='text-sm'>
            <span className='font-medium'>Phòng </span> 101
          </p>
        </div>
      )}

      <div className='mt-6 flex gap-6'>
        <div className='w-48 rounded-lg border border-primary px-4 pb-2 pt-4'>
          <h2 className='mb-4 text-sm font-medium text-primary'>Sắp đến hạn</h2>
          <p className='text-[13px] leading-5 text-fourth'>Tuyệt vời, không có bài tập nào sắp đến hạn!</p>
          <div className='mt-2 flex justify-end'>
            <Button variant='text' className='px-3 text-third' size='md'>
              Xem tất cả
            </Button>
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
    </>
  )
}

export default ClassDetailNews
