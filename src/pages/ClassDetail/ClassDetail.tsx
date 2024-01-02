import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import { useEffect, useMemo, useState } from 'react'
import { NavLink, Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import courseApi from 'src/apis/courses.api'
import { useAppDispatch, useAppSelector } from 'src/app/store'
import path from 'src/constants/path'
import { clearBreadcrumbs, setBreadcrumbs } from 'src/slices/app.slice'
import { CourseItem, MembersList } from 'src/types/course.type'
import { Role } from 'src/constants/enums'
import { setRoleInCourses } from 'src/slices/class.slice'

type ContextType = {
  id: string | undefined
  data: CourseItem | null
  refetch: () => void
  members: MembersList
  myRole: Role
  isLoading: boolean
  isPending: boolean
}

function ClassDetail() {
  const { classId } = useParams()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { profile } = useAppSelector((state) => state.auth)

  const [myRole, setMyRole] = useState<string>(Role.STUDENT)
  console.log(myRole)

  const tabs = useMemo(() => {
    return [
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
  }, [classId])

  const getCourseDetailQuery = useQuery({
    queryKey: ['course-detail', classId],
    queryFn: () => courseApi.getCourseDetail(classId as string),
    enabled: Boolean(classId)
  })

  const courseDetailData = getCourseDetailQuery.data?.data.data

  const membersData = useQuery({
    queryKey: ['members', classId],
    queryFn: () => {
      return courseApi.getUserInClass(classId as string)
    },
    enabled: Boolean(classId)
  })

  const members = membersData.data?.data.data[0]

  useEffect(() => {
    if (!isEmpty(courseDetailData)) {
      dispatch(setBreadcrumbs([{ name: courseDetailData.name, path: `/class/${classId}/news` }]))
    }
  }, [courseDetailData])

  useEffect(() => {
    if (membersData.isError) {
      navigate(path.home)
    } else if (membersData.isSuccess) {
      const isTeacher = members?.courseTeachers?.some((teacher) => teacher.teacher.id === profile?.id)
      if (isTeacher) {
        setMyRole(Role.TEACHER)
      }
    }
  }, [membersData, navigate, members, profile])

  useEffect(() => {
    return () => {
      dispatch(clearBreadcrumbs())
    }
  }, [])

  const refetchCourseDetail = () => {
    getCourseDetailQuery.refetch()
  }

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
        <Outlet
          context={{
            id: classId,
            data: courseDetailData,
            refetch: refetchCourseDetail,
            myRole,
            members,
            isLoading: getCourseDetailQuery.isLoading || membersData.isLoading,
            isPending: getCourseDetailQuery.isPending || membersData.isPending
          }}
        />
      </div>
    </>
  )
}

export function useCourseDetail() {
  return useOutletContext<ContextType>()
}

export default ClassDetail
