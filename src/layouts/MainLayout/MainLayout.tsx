interface Props {
  children?: React.ReactNode
}

function MainLayout({ children }: Props) {
  return (
    <div>
      MainLayout
      {children}
    </div>
  )
}

export default MainLayout
