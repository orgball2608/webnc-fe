// import { useCourseDetail } from './ClassDetail'
// import { Role } from 'src/constants/enums'
// import { Navigate, Outlet, useOutletContext } from 'react-router-dom'
// import path from 'src/constants/path'
// import { ContextType } from 'src/types/course.type'

// function ProtectedRouteOfTeacher() {
//   const courseDetail = useCourseDetail()
//   console.log('courseDetail', courseDetail)
//   return courseDetail.myRole === Role.STUDENT ? <Navigate to={path.notFound} /> : <Outlet context={{ courseDetail }} />
// }

// export function useCourseDetailChil() {
//   return useOutletContext<ContextType>()
// }

// export default ProtectedRouteOfTeacher
