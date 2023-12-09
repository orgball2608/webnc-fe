import { Tooltip } from '@material-tailwind/react'
import classNames from 'classnames'
import { ButtonHTMLAttributes, ForwardRefExoticComponent, RefAttributes } from 'react'
import { Link, LinkProps } from 'react-router-dom'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: React.ReactNode
  mode?: 'dark' | 'light'
  tooltip?: string
  to?: string
}

function IconButton({ mode = 'light', tooltip, to, className, disabled, Icon, ...passProps }: Props) {
  const classes = classNames(
    'transition-all relative overflow-hidden flex h-[48px] w-[48px] items-center justify-center rounded-full bg-transparent text-2xl active:bg-gray-900/20',
    {
      'text-white hover:bg-[#0000000a]': mode === 'light',
      'text-primary hover:bg-[#f5f5f5]': mode === 'dark',
      className
    }
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props: any = { ...passProps }

  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key]
      }
    })
  }

  let Comp: string | ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>> = 'div'

  if (to) {
    Comp = Link
    props.to = to
  }

  return tooltip ? (
    <Tooltip content={tooltip} placement='bottom' className='py-[2px] text-xs'>
      <Comp {...props} className={classes}>
        <span className='relative'>{Icon}</span>
      </Comp>
    </Tooltip>
  ) : (
    <Comp {...props} className={classes}>
      <span className='relative'>{Icon}</span>
    </Comp>
  )
}

export default IconButton
