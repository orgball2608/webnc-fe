import { useAppSelector } from 'src/app/store'

function Homepage() {
  const { profile } = useAppSelector((state) => state.auth)
  console.log(profile)

  return <div>Homepage</div>
}

export default Homepage
