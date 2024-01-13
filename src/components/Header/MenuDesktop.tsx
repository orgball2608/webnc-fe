import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { useEffect, useState } from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { useTranslation } from 'react-i18next'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MenuDesktop({ anchorEl, handleMenuClose, handleSignout }: any) {
  const { t, i18n } = useTranslation()

  const MENU_ITEMS = [
    {
      title: 'profile',
      path: path.profile,
      onClick: handleMenuClose
    },
    {
      title: 'changePassword',
      path: path.change_password,
      onClick: handleMenuClose
    },
    {
      title: 'language',
      children: [
        {
          title: 'vietnamese',
          onClick: async () => {
            await i18n.changeLanguage('vi')
          }
        },
        {
          title: 'english',
          onClick: async () => {
            await i18n.changeLanguage('en')
          }
        }
      ]
    },
    {
      title: 'logout',
      onClick: handleSignout
    }
  ]

  const [history, setHistory] = useState([{ data: MENU_ITEMS }])
  const currentMenuData = history[history.length - 1]?.data

  useEffect(() => {
    if (!anchorEl) {
      setHistory([{ data: MENU_ITEMS }])
    }
  }, [anchorEl])

  const handleBack = () => {
    setHistory((prevHistory) => prevHistory.slice(0, history.length - 1))
  }

  return (
    <Menu id='user-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} className='font-medium'>
      {history && history.length > 1 && (
        <MenuItem onClick={handleBack}>
          <IoMdArrowBack />
        </MenuItem>
      )}
      {currentMenuData?.map((item) => {
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
                {t(item.title)}
              </Link>
            ) : (
              t(item.title)
            )}
          </MenuItem>
        )
      })}
    </Menu>
  )
}
