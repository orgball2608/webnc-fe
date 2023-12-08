import classNames from 'classnames'
import { NavLink, Outlet, useParams } from 'react-router-dom'

function ClassDetail() {
  const { classId } = useParams()
  const tabs = [
    {
      title: 'Bảng tin',
      path: `/class/${classId}/news`
    },
    {
      title: 'Bài tập trên lớp',
      path: `/class/${classId}/excercises`
    },
    {
      title: 'Mọi người',
      path: `/class/${classId}/people`
    }
  ]
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

      <div className='p-6'>
        <Outlet />
      </div>
    </>
  )
}

export default ClassDetail
