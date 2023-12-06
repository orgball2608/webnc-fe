import { List, ListItem, ListItemPrefix } from '@material-tailwind/react'
import { NavLink } from 'react-router-dom'
import homeIcon from 'src/assets/images/sidebar/home.svg'
import path from 'src/constants/path'
import classNames from 'classnames'
import AccountItem from 'src/components/AccountItem'

const data = [
  {
    to: path.home,
    title: 'Màn hình chính',
    iconSrc: homeIcon,
    iconAlt: 'home'
  },
  {
    to: path.signin,
    title: 'Test1',
    iconSrc: homeIcon,
    iconAlt: 'home'
  },
  {
    to: path.signup,
    title: 'Test2',
    iconSrc: homeIcon,
    iconAlt: 'home'
  }
]

function Sidebar() {
  return (
    <>
      <nav className='flex flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700'>
        {data.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              classNames(
                'rounded-lg transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900',
                {
                  'bg-[#1a73e81f]': isActive
                }
              )
            }
          >
            <AccountItem key={index} img={item.iconSrc} alt={item.iconAlt} title={item.title} />
          </NavLink>
        ))}
      </nav>
    </>
  )
}

export default Sidebar
