import classNames from 'classnames'

interface Props {
  size?: 'sm' | 'md'
  img: string
  alt?: string
  title: string
  subtitle?: string
}

function AccountItem({ img, alt, subtitle, title, size = 'sm' }: Props) {
  return (
    <>
      <div
        role='button'
        className={classNames('flex w-full items-center px-3 text-start leading-tight outline-none', {
          'h-[40px]': size === 'sm',
          'h-[48px]': size === 'md'
        })}
      >
        <div className='mr-4 grid w-10 place-items-center'>
          <img src={img} className='h-6 w-6' alt={alt} />
        </div>
        <div className='max-w-[75%] flex-1'>
          <p className='truncate text-sm font-medium leading-5 text-primary'>{title}</p>
          {subtitle && (
            <p className='max-w-full truncate text-[12px] font-normal leading-[1rem] text-secondary'>{subtitle}</p>
          )}
        </div>
      </div>
    </>
  )
}

export default AccountItem
