import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import courseApi from 'src/apis/courses.api'
import ClassCard from 'src/components/ClassCard'
import { ClassItem } from 'src/types/class.type'

function Homepage() {
  const [classes, setClasses] = useState<ClassItem[]>([])

  const courseData = useQuery({
    queryKey: ['classes'],
    queryFn: () => {
      return courseApi.getCoursesOfMe()
    }
  })

  const courseList = courseData?.data?.data.data

  useEffect(() => {
    if (courseList) {
      setClasses(courseList)
    }
  }, [courseList])

  return (
    <>
      <Helmet>
        <title>Màn hình chính</title>
      </Helmet>

      <div className='p-6'>
        <div className='flex flex-wrap gap-6'>
          {classes.map((classItem) => (
            <ClassCard key={classItem.id} data={classItem} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Homepage
