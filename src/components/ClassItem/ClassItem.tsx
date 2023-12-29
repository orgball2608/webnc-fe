import classNames from 'classnames'
import { NOTIFICATION_STATUS } from 'src/constants/enums'
import { calculateTimeDifference } from 'src/utils/utils'
import Avatar from '@mui/material/Avatar'
import randomColor from 'randomcolor'
import React from 'react'
interface Props {
  size?: 'sm' | 'md'
  name: string
  subtitle?: string
  className?: string
  notificationStatus?: NOTIFICATION_STATUS
  notificationCreatedAt?: string
  disabled?: boolean
  topic?: string
}

function ClassItem({
  subtitle,
  name,
  size = 'sm',
  className,
  disabled,
  notificationStatus,
  notificationCreatedAt,
  topic
}: Props) {
  const colorAvatar = React.useRef(
    randomColor({
      luminosity: 'dark',
      hue: 'blue',
      format: 'rgba',
      alpha: 0.9 // e.g. 'rgba(9, 1, 107, 0.6482447960879654)'
    })
  )

  return (
    <>
      <div
        role='button'
        className={classNames(
          `flex w-full items-center px-3 py-3 text-start leading-tight outline-none ${className || ''}`,
          {
            'h-[20px]': size === 'sm',
            'h-[25px]': size === 'md',
            'cursor-default': disabled
          }
        )}
      >
        <div className='mr-4 grid h-10 w-10 place-items-center'>
          <Avatar
            sizes='small' // Adjusted the sizes prop to 'small'
            alt={name}
            src={' '}
            sx={{
              bgcolor: colorAvatar.current,
              width: '80%',
              height: '80%'
              // Added height to maintain the aspect ratio
            }}
          >
            {name.charAt(0).toUpperCase()}
          </Avatar>
        </div>
        <div className='max-w-[75%] flex-1'>
          <p
            className={classNames('truncate text-sm font-medium leading-5 text-primary', {
              '!text-[#aaa]': notificationStatus === NOTIFICATION_STATUS.READ
            })}
          >
            <b>{name}</b>
          </p>
          <p
            className={classNames('truncate text-sm leading-5 text-primary', {
              '!text-[#aaa]': notificationStatus === NOTIFICATION_STATUS.READ
            })}
          >
            {topic}
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

export default ClassItem
