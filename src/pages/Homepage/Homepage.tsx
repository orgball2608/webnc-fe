import { useQuery } from '@tanstack/react-query'
// import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Skeleton from 'react-loading-skeleton'
import courseApi from 'src/apis/courses.api'
import ClassCard from 'src/components/ClassCard'
// import { CourseItem } from 'src/types/class.type'

function Homepage() {
  // const [classes, setClasses] = useState<CourseItem[]>([])

  const courseData = useQuery({
    queryKey: ['classes'],
    queryFn: () => {
      return courseApi.getCoursesOfMe()
    }
  })

  const courseList = courseData?.data?.data.data

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
