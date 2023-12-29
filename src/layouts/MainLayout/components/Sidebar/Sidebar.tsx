import { NavLink, useLocation, useParams } from 'react-router-dom'
import homeIcon from 'src/assets/images/sidebar/home.svg'
import path from 'src/constants/path'
import classNames from 'classnames'
import { useQuery } from '@tanstack/react-query'
import courseApi from 'src/apis/courses.api'
import HomeItem from 'src/components/ClassItem/HomeItem'
import ClassItem from 'src/components/ClassItem/ClassItem'
import { useEffect } from 'react'

const weightMD = 720
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Sidebar({ onToggleSidebar }: { onToggleSidebar: any }) {
  const { classId } = useParams()
  const location = useLocation()

  const courseData = useQuery({
    queryKey: ['classes'],
    queryFn: () => {
      return courseApi.getCoursesOfMe()
    }
  })

  const courseList = courseData?.data?.data.data

  useEffect(() => {
    console.log(window.innerWidth)
    const handleResize = () => {
      if (window.innerWidth < weightMD) {
        onToggleSidebar(false)
      } else {
        onToggleSidebar(true)
      }
    }
    if (window.innerWidth < weightMD) {
      console.log(1)
      onToggleSidebar()
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <>
      <nav className='flex max-h-[100%] flex-col gap-1 overflow-y-auto p-2 font-sans text-base font-normal text-blue-gray-700'>
        <NavLink
          to={path.home}
          className={({ isActive }) =>
            classNames(
              'my-3 rounded-lg py-2 transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900',
              {
                'bg-[#1a73e81f]': isActive
              }
            )
          }
        >
          <HomeItem avatarUrl={homeIcon} alt={'home'} name={'Home'} />
        </NavLink>
        <hr className='my-1 border-t border-blue-gray-200' />
        {courseList?.map((item, index) => (
          <NavLink
            key={index}
            to={`class/${item.id}/news`}
            className={() =>
              classNames(
                'rounded-lg py-3 transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900',
                {
                  'bg-[#1a73e81f]': classId === String(item?.id)
                }
              )
            }
          >
            <ClassItem key={index} topic={item?.topic as string} name={item?.name} />
          </NavLink>
        ))}
      </nav>
    </>
  )
}

export default Sidebar
