import Leftside from './components/Leftside'

interface Props {
  children?: React.ReactNode
}

function AuthLayout({ children }: Props) {
  return (
    <div className='container flex flex-col items-center gap-24 px-10 py-5 lg:h-screen lg:flex-row'>
      <div className='flex-1'>
        <Leftside />
      </div>
      <div className='w-full flex-1'>{children}</div>
    </div>
  )
}

export default AuthLayout
