import classNames from 'classnames'
import { useState } from 'react'
import defaultUser from 'src/assets/images/default-user.webp'

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  rounded?: boolean
}

function Image({ src, alt, className, size = 'md', rounded, fallback: customFallback = defaultUser, ...props }: Props) {
  const [fallback, setFallback] = useState('')

  const classes = classNames('inline-block object-cover object-center rounded-xl', {
    className,
    'w-8 h-8': size === 'sm',
    'w-9 h-9': size === 'md',
    'w-10 h-10': size === 'lg',
    'w-[75px] h-[75px]': size === 'xl',
    'rounded-full': rounded
  })

  return (
    <img
      {...props}
      className={classes}
      src={src || fallback}
      alt={alt}
      onError={() => {
        setFallback(customFallback)
      }}
    />
  )
}

export default Image
