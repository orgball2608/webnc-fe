import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { useState } from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { useTranslation } from 'react-i18next'

type MenuItemType = {
  title: string
  path?: string
  onClick?: () => void
  children?: MenuItemType[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MenuDesktop({ anchorEl, handleMenuClose, handleSignout }: any) {
  const { t, i18n } = useTranslation()

  const MENU_ITEMS = [
    {
      title: t('profile'),
      path: path.profile,
      onClick: handleMenuClose
    },
    {
      title: t('changePassword'),
      path: path.change_password,
      onClick: handleMenuClose
    },
    {
      title: t('language'),
      children: [
        {
          title: t('vietnamese'),
          onClick: async () => {
            await i18n.changeLanguage('vi')
          }
        },
        {
          title: t('english'),
          onClick: async () => {
            await i18n.changeLanguage('en')
          }
        }
      ]
    },
    {
      title: t('logout'),
      onClick: handleSignout
    }
  ]

  const [history, setHistory] = useState([{ data: MENU_ITEMS }])
  const currentMenuData = history[history.length - 1].data

  const handleBack = () => {
    setHistory((prevHistory) => prevHistory.slice(0, history.length - 1))
  }

  return (
    <Menu id='user-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} className='font-medium'>
      {history.length > 1 && (
        <MenuItem onClick={handleBack}>
          <IoMdArrowBack />
        </MenuItem>
      )}
      {currentMenuData.map((item) => {
        const isParent = !!item.children

        return (
          <MenuItem
            key={item.title}
            onClick={() => {
              if (isParent) {
                setHistory((prevHistory) => [...prevHistory, { data: item.children }])
              } else {
                item.onClick()
              }
            }}
            className='min-w-[200px]'
          >
            {item.path ? (
              <Link to={item.path} className='w-full'>
                {item.title}
              </Link>
            ) : (
              item.title
            )}
          </MenuItem>
        )
      })}
    </Menu>
  )
}
