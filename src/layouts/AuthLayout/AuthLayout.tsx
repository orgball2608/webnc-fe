interface Props {
  children?: React.ReactNode
}

function AuthLayout({ children }: Props) {
  return (
    <div>
      AuthLayout
      {children}
    </div>
  )
}

export default AuthLayout
