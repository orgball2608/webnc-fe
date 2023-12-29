import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import courseApi from 'src/apis/courses.api'
import { useAppDispatch, useAppSelector } from 'src/app/store'
import { Role } from 'src/constants/enums'
import path from 'src/constants/path'
import { setRoleInCourses } from 'src/slices/class.slice'

function ClassDetail() {
  const param = useParams()
  const classId = param?.classId
  const dispatch = useAppDispatch()
  const { profile } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()

  const tabs = [
    {
      title: 'Bảng tin',
      path: `/class/${classId}/news`
    },
    {
      title: 'Điểm',
      path: `/class/${classId}/grade`
    },
    {
      title: 'Mọi người',
      path: `/class/${classId}/people`
    }
  ]

  const membersData = useQuery({
    queryKey: ['members', classId],
    queryFn: () => {
      return courseApi.getUserInClass(classId as string)
    },
    enabled: Boolean(classId)
  })

  const members = membersData.data?.data.data[0]

  useEffect(() => {
    dispatch(setRoleInCourses({ classId: classId as string, role: '' }))
    if (membersData.isError) {
      navigate(path.home)
    } else if (membersData.isSuccess) {
      const isTeacher = members?.courseTeachers?.some((teacher) => teacher.teacher.id === profile?.id)
      if (isTeacher) {
        dispatch(setRoleInCourses({ classId: classId as string, role: Role.TEACHER }))
      } else {
        dispatch(setRoleInCourses({ classId: classId as string, role: Role.STUDENT }))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membersData, navigate, members, profile, classId])

  return (
    <>
      <nav className='border-b border-b-primary'>
        <ul className='flex px-6 '>
          {tabs.map((tab, index) => (
            <li key={index} className='block'>
              <NavLink
                to={tab.path}
                className={({ isActive }) =>
                  classNames('relative flex h-12 items-center justify-center px-6 font-medium ', {
                    "bg-active-hover text-third after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:rounded-t-md after:bg-active-border after:content-['']":
                      isActive,
                    'text-secondary hover:bg-blue-gray-50 hover:text-primary': !isActive
                  })
                }
              >
                {tab.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className='max-h-[calc(100vh-120px)] overflow-y-auto p-6'>
        <Outlet />
      </div>
    </>
  )
}

export default ClassDetail
