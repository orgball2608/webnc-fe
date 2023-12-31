import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Skeleton from 'react-loading-skeleton'
import courseApi from 'src/apis/courses.api'
import { useAppDispatch } from 'src/app/store'
import ClassCard from 'src/components/ClassCard'
import { clearBreadcrumbs } from 'src/slices/app.slice'
import { setMyClass } from 'src/slices/class.slice'
import { CourseItem } from 'src/types/course.type'

function Homepage() {
  const dispatch = useAppDispatch()

  const courseData = useQuery({
    queryKey: ['classes'],
    queryFn: () => {
      return courseApi.getCoursesOfMe()
    }
  })

  const courseList = courseData?.data?.data.data as CourseItem[]

  useEffect(() => {
    if (courseData.isSuccess) {
      dispatch(setMyClass({ courseList }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseList])

  useEffect(() => {
    dispatch(clearBreadcrumbs())
  }, [])

  return (
    <>
      <Helmet>
        <title>Màn hình chính</title>
      </Helmet>

      <div className='p-6'>
        <div className='flex flex-wrap gap-6'>
          {courseList &&
            courseList.length > 0 &&
            courseList.map((classItem) => <ClassCard key={classItem.id} data={classItem} />)}

          {(!courseList || courseList.length === 0) &&
            courseData.isLoading &&
            Array(6)
              .fill(0)
              .map((_, index) => <Skeleton key={index} className='h-[300px] w-[300px] rounded-lg' />)}
        </div>
      </div>
    </>
  )
}

export default Homepage
