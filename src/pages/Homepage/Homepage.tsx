import { useAppSelector } from 'src/app/store'

function Homepage() {
  const { profile } = useAppSelector((state) => state.auth)

  return <div className='mt-30'>{JSON.stringify(profile)}</div>
}

export default Homepage
