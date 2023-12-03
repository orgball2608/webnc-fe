import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import IconButton from '../IconButton'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { LuFolder, LuUserSquare } from 'react-icons/lu'
import { Avatar } from '@material-tailwind/react'
import { useAppSelector } from 'src/app/store'
import Dropdown, { DropdownItem } from '../Dropdown'

function ClassCard() {
  const { profile } = useAppSelector((state) => state.auth)

  return (
    <div className='flex h-[300px] w-[300px] cursor-pointer flex-col overflow-hidden rounded-lg border border-primary text-white hover:shadow-lg'>
      <header className="relative h-[100px] bg-[url('/src/assets/images/img_graduation.jpg')] bg-cover px-4 pb-3 pt-4">
        <Link to={path.home} className='absolute bottom-0 left-0 right-0 top-0'></Link>

        <div className='flex items-start justify-between'>
          <Link to={path.home} className='relative inline-block max-w-[80%] hover:underline'>
            <h2 className='truncate text-[22px] font-normal leading-7'>test</h2>
            <p className='min-h-[20px] truncate text-[13px] font-normal leading-5'>20CTT4</p>
          </Link>
        </div>

        <div className='relative mt-1 max-w-[80%]'>
          <p className='truncate text-[13px] leading-5 hover:underline'>
            {profile?.firstName + ' ' + profile?.lastName}
          </p>
        </div>

        <Dropdown
          render={() => (
            <>
              {/* <DropdownItem>Di chuyển</DropdownItem> */}
              <DropdownItem>Hủy đăng ký</DropdownItem>
            </>
          )}
        >
          <div className='absolute right-1 top-1'>
            <IconButton Icon={<BsThreeDotsVertical />} />
          </div>
        </Dropdown>

        <div className='absolute bottom-0 right-3 translate-y-1/2'>
          <Avatar src={profile?.avatar} alt='user avatar' size='xl' />
        </div>
      </header>

      <div className='flex-1'></div>

      <footer className='h-14 border-t border-t-primary p-1'>
        <div className='flex justify-end'>
          <IconButton Icon={<LuUserSquare />} mode='dark' tooltip={`Mở bài tập của bạn cho "test"`} />
          <IconButton Icon={<LuFolder />} mode='dark' />
        </div>
      </footer>
    </div>
  )
}

export default ClassCard
