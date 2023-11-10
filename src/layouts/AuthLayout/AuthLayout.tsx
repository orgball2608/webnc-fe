import Leftside from './components/Leftside'

interface Props {
  children?: React.ReactNode
}

function AuthLayout({ children }: Props) {
  return (
    <div className='container flex h-screen max-w-[56rem] flex-col items-center gap-24 py-5 lg:flex-row'>
      <div className='flex-1'>
        <Leftside />
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  )
}

export default AuthLayout
