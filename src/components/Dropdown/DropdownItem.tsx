import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

// active:bg-blueGray-100

function DropdownItem({ children, className, disabled, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={classNames(
        `flex min-h-[48px] w-full cursor-pointer items-center px-4 text-base font-medium leading-6 text-primary outline-none transition-all ${
          className || ''
        }`,
        {
          'hover:bg-blue-gray-50 active:bg-blueGray-100': !disabled,
          'cursor-default': disabled
        }
      )}
    >
      {children}
    </button>
  )
}

export default DropdownItem
