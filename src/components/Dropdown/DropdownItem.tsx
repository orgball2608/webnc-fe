interface Props {
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

function DropdownItem({ children, onClick }: Props) {
  return (
    <button
      className='flex h-[48px] w-full cursor-pointer items-center px-4 text-base font-medium leading-6 text-primary outline-none transition-all hover:bg-blue-gray-50 active:bg-blueGray-100'
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default DropdownItem
