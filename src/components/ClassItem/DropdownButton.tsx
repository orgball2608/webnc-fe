import classNames from 'classnames'
import { MdOutlinePeopleAlt } from 'react-icons/md'
// import { SiGoogleclassroom } from 'react-icons/si'
import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io'
// import { LuGraduationCap } from 'react-icons/lu'
import { RiGraduationCapLine } from 'react-icons/ri'
interface Props {
  size?: 'sm' | 'md'
  name: string
  className?: string
  disabled?: boolean
  onClick?: () => void
  checkOpen: boolean
}

function DropdownButton({ name, size = 'sm', className, disabled, onClick, checkOpen }: Props) {
  return (
    <>
      <button
        className={classNames(
          `my-1 flex w-full items-center rounded-lg px-0.5 py-5 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 ${
            className || ''
          }`,
          {
            'h-[20px]': size === 'sm',
            'h-[25px]': size === 'md',
            'cursor-default': disabled
          }
        )}
        onClick={onClick}
      >
        <div className='mr-6 flex h-10 w-10 place-items-center'>
          {checkOpen === true ? (
            <IoMdArrowDropdown style={{ fontSize: '1rem' }} />
          ) : (
            <IoMdArrowDropright style={{ fontSize: '1rem' }} />
          )}
          {name === 'Teaching' ? (
            <MdOutlinePeopleAlt style={{ fontSize: '1.5rem' }} />
          ) : (
            <RiGraduationCapLine style={{ fontSize: '1.5rem' }} />
          )}
        </div>
        <div className='max-w-[75%] flex-1'>
          <p className={classNames('truncate text-sm font-medium leading-5 text-primary')}>
            <b>{name}</b>
          </p>
        </div>
      </button>
    </>
  )
}

export default DropdownButton
