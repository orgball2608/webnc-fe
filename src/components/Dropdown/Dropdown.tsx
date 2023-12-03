import { Popover, PopoverContent, PopoverHandler, type PopoverProps } from '@material-tailwind/react'

interface Props extends PopoverProps {
  children: React.ReactNode
  render: () => React.ReactNode
}

function Dropdown({ children, render, ...props }: Props) {
  return (
    <Popover placement='bottom-start' offset={0} {...props}>
      <PopoverHandler>{children}</PopoverHandler>
      <PopoverContent className='z-[1100] w-[160px] px-0 py-2 shadow-2xl'>{render()}</PopoverContent>
    </Popover>
  )
}

export default Dropdown
