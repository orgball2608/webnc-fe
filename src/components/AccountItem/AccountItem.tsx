import classNames from 'classnames'
import Image from '../Image'

interface Props {
  size?: 'sm' | 'md'
  avatarUrl: string
  alt: string
  name: string
  subtitle?: string
  className?: string
}

function AccountItem({ avatarUrl, alt, subtitle, name, size = 'sm', className }: Props) {
  return (
    <>
      <div
        role='button'
        className={classNames('flex w-full items-center px-3 text-start leading-tight outline-none', {
          'h-[40px]': size === 'sm',
          'h-[48px]': size === 'md',
          [className]: className
        })}
      >
        <div className='mr-4 grid w-10 place-items-center'>
          <Image src={avatarUrl} className='h-6 w-6' alt={alt} />
        </div>
        <div className='max-w-[75%] flex-1'>
          <p className='truncate text-sm font-medium leading-5 text-primary'>{name}</p>
          {subtitle && (
            <p className='max-w-full truncate text-[12px] font-normal leading-[1rem] text-secondary'>{subtitle}</p>
          )}
        </div>
      </div>
    </>
  )
}

export default AccountItem
