import classNames from 'classnames'
import Image from '../Image'
import { NOTIFICATION_STATUS } from 'src/constants/enums'
import { calculateTimeDifference } from 'src/utils/utils'
interface Props {
  size?: 'sm' | 'md'
  avatarUrl?: string
  alt: string
  name: string
  subtitle?: string
  className?: string
  notificationStatus?: NOTIFICATION_STATUS
  notificationCreatedAt?: string
  disabled?: boolean
}

function HomeItem({
  avatarUrl,
  alt,
  subtitle,
  name,
  size = 'sm',
  className,
  disabled,
  notificationStatus,
  notificationCreatedAt
}: Props) {
  return (
    <>
      <div
        role='button'
        className={classNames(
          `flex w-full items-center px-3 text-start leading-tight outline-none ${className || ''}`,
          {
            'h-[25px]': size === 'sm',
            'h-[30px]': size === 'md',
            'cursor-default': disabled
          }
        )}
      >
        <div className='mr-4 grid w-10 place-items-center'>
          <Image
            src={avatarUrl as string}
            alt={alt}
            className='rounded-full'
            style={{ width: '80%', height: 'auto' }}
          />
        </div>
        <div className='max-w-[75%] flex-1'>
          <p
            className={classNames('truncate text-sm font-medium leading-5 text-primary', {
              '!text-[#aaa]': notificationStatus === NOTIFICATION_STATUS.READ
            })}
          >
            {name}
          </p>
          {subtitle && (
            <p
              className={classNames('max-w-full text-[12px] font-normal leading-[1rem] text-secondary', {
                'line-clamp-2': Boolean(notificationStatus),
                truncate: !Boolean(notificationStatus),
                '!text-[#aaa]': notificationStatus === NOTIFICATION_STATUS.READ
              })}
            >
              {subtitle}
            </p>
          )}
          {notificationCreatedAt && (
            <p
              className={classNames('max-w-full text-[12px] font-normal leading-[1rem] text-secondary', {
                truncate: !Boolean(notificationStatus),
                '!text-[#aaa]': notificationStatus === NOTIFICATION_STATUS.READ,
                '!font-medium !text-blue': notificationStatus === NOTIFICATION_STATUS.UNREAD
              })}
            >
              {calculateTimeDifference(new Date(notificationCreatedAt))}
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default HomeItem
