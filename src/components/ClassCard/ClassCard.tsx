import { Link } from 'react-router-dom'
import IconButton from '../IconButton'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { LuFolder, LuUserSquare } from 'react-icons/lu'
import { Avatar } from '@material-tailwind/react'
import Dropdown, { DropdownItem } from '../Dropdown'
import defaultUser from 'src/assets/images/default-user.webp'
import { ClassItem } from 'src/types/class.type'

interface Props {
  data: ClassItem
}

// eslint-disable-next-line no-empty-pattern
function ClassCard({ data }: Props) {
  return (
    <div className='flex h-[300px] w-[300px] cursor-pointer flex-col overflow-hidden rounded-lg border border-primary bg-white text-white hover:shadow-lg'>
      <header className="relative h-[100px] bg-[url('/src/assets/images/img_graduation.jpg')] bg-cover px-4 pb-3 pt-4">
        <Link to={'/class/123/news'} className='absolute bottom-0 left-0 right-0 top-0'></Link>

        <div className='flex items-start justify-between'>
          <Link to={'/class/123/news'} className='relative inline-block max-w-[80%] hover:underline'>
            <h2 className='truncate text-[22px] font-normal leading-7'>{data.name}</h2>
            <p className='min-h-[20px] truncate text-[13px] font-normal leading-5'>{data.description}</p>
          </Link>
        </div>

        <div className='relative mt-1 max-w-[80%]'>
          <p className='truncate text-[13px] leading-5 hover:underline'>{data.owner.name}</p>
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
          <Avatar src={data.owner?.avatar || defaultUser} alt='user avatar' size='xl' />
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
