import { Popover, PopoverContent, PopoverHandler, type PopoverProps } from '@material-tailwind/react'

interface Props extends PopoverProps {
  children: React.ReactNode
  classNameContent?: string
  render: () => React.ReactNode
}

function Dropdown({ placement = 'bottom-start', children, classNameContent, render, ...props }: Props) {
  return (
    <Popover placement={placement} {...props}>
      <PopoverHandler>{children}</PopoverHandler>
      <PopoverContent className={`z-[1100] w-[160px] px-0 py-2 !shadow-xl ${classNameContent || ''}`}>
        {render()}
      </PopoverContent>
    </Popover>
  )
}

export default Dropdown
