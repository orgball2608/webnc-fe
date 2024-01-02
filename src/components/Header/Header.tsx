import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import { Link, useMatch } from 'react-router-dom'
import MenuMobile from './MenuMobile'
import MenuDesktop from './MenuDesktop'
import { useMutation, useQuery } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { useAppDispatch, useAppSelector } from 'src/app/store'
import { signout as signoutAction } from 'src/slices/auth.slice'
import path from 'src/constants/path'
import { FaPlus } from 'react-icons/fa6'
import Dropdown, { DropdownItem } from '../Dropdown'
import { Button } from '@material-tailwind/react'
import ModalManageClass, { JoinClassModal } from '../ModalManageClass'
import notificationApi from 'src/apis/notification.api'
import { NotificationItem } from 'src/types/notification.type'
import { NOTIFICATION_STATUS } from 'src/constants/enums'
import AccountItem from '../AccountItem'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import { BsChevronLeft } from 'react-icons/bs'

// eslint-disable-next-line prettier/prettier, @typescript-eslint/no-explicit-any
export default function Header({ onToggleSidebar }: { onToggleSidebar: any }) {
  const homepageMatch = useMatch(path.home)
  const breadcrumbs = useAppSelector((state) => state.app.breadcrumbs)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isOpenCreateClassModal, setIsOpenCreateClassModal] = React.useState(false)
  const [isOpenJoinClassModal, setIsOpenJoinClassModal] = React.useState(false)

  const dispatch = useAppDispatch()
  const { profile, isAuthenticated } = useAppSelector((state) => state.auth)

  // const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const signoutMutation = useMutation({
    mutationFn: authApi.signout,
    onSuccess: () => {
      dispatch(signoutAction())
    }
  })

  const getNotificationsQuery = useQuery({
    queryKey: ['notifications'],
    queryFn: notificationApi.getNotifications,
    enabled: isAuthenticated
  })

  React.useEffect(() => {
    if (isAuthenticated) {
      getNotificationsQuery.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  const notifications = getNotificationsQuery.data?.data.data
  const unreadNotifications = React.useMemo<NotificationItem[]>(() => {
    if (notifications && notifications.length > 0)
      return notifications.filter((notification) => notification.status === NOTIFICATION_STATUS.UNREAD)
    return []
  }, [notifications])

  const markNotificationAsReadMutation = useMutation({
    mutationFn: notificationApi.markAsRead
  })

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleSignout = () => {
    signoutMutation.mutate()
    handleMenuClose()
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = MenuDesktop({ anchorEl, handleMenuClose, handleSignout })

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = MenuMobile({
    mobileMoreAnchorEl,
    mobileMenuId,
    isMobileMenuOpen,
    handleMobileMenuClose,
    handleProfileMenuOpen
  })

  const markNotificationAsRead = (id: number) => {
    markNotificationAsReadMutation.mutate(id, {
      onSuccess: () => {
        getNotificationsQuery.refetch()
      }
    })
  }

  const markAllNotificationAsRead = async () => {
    if (!unreadNotifications || unreadNotifications.length === 0) return

    await Promise.all(unreadNotifications.map((item) => markNotificationAsReadMutation.mutateAsync(item.id)))
    await getNotificationsQuery.refetch()

    toast.success('Đánh dấu tất cả là đã đọc thành công!')
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='fixed'>
          <Toolbar className='bg-primary' style={{ minHeight: '64px' }}>
            {isAuthenticated && (
              <>
                <IconButton
                  size='large'
                  edge='start'
                  color='inherit'
                  aria-label='open drawer'
                  sx={{ mr: 2 }}
                  onClick={onToggleSidebar}
                >
                  <MenuIcon />
                </IconButton>
              </>
            )}
            <div>
              <Link to={path.home} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant='h6' component='div' style={{ cursor: 'pointer' }} className='hover:underline'>
                  Lớp học
                </Typography>
              </Link>
            </div>

            {breadcrumbs &&
              breadcrumbs.length > 0 &&
              breadcrumbs.map((breadcrumb) => (
                <div key={breadcrumb.path} className='ml-2 flex items-center gap-2'>
                  <span className='text-xl'>
                    <BsChevronLeft />
                  </span>
                  <Link to={breadcrumb.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant='h6' component='div' style={{ cursor: 'pointer' }} className='hover:underline'>
                      {breadcrumb.name}
                    </Typography>
                  </Link>
                </div>
              ))}

            <Box sx={{ flexGrow: 1 }} />
            {/* <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size='large' aria-label='show 17 new notifications' color='inherit'>
                <Badge badgeContent={17} color='error'>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size='large'
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                {profile?.avatar ? (
                  <img src={profile?.avatar} alt='' className='h-6 w-6 rounded-full border-white' />
                ) : (
                  <AccountCircle />
                )}
      
                <Typography style={{ marginLeft: 8 }}>{profile?.firstName + ' ' + profile?.lastName}</Typography>
              </IconButton>
            </Box> */}

            {isAuthenticated ? (
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {Boolean(homepageMatch) && (
                  <Dropdown
                    placement='bottom-end'
                    render={() => (
                      <>
                        <DropdownItem onClick={() => setIsOpenJoinClassModal(true)}>Tham gia lớp học</DropdownItem>
                        <DropdownItem onClick={() => setIsOpenCreateClassModal(true)}>Tạo lớp học</DropdownItem>
                      </>
                    )}
                  >
                    <IconButton size='large' color='inherit'>
                      <FaPlus className='text-2xl' />
                    </IconButton>
                  </Dropdown>
                )}

                {notifications && notifications.length > 0 ? (
                  <Dropdown
                    placement='bottom-end'
                    offset={{
                      crossAxis: 30
                    }}
                    classNameContent='w-[360px] max-h-[calc(100vh-100px)] overflow-y-auto'
                    render={() => (
                      <>
                        <div className='flex justify-end px-5 py-1'>
                          <Button
                            variant='text'
                            className={classNames('px-3 py-2 text-[14px] font-normal normal-case', {
                              '!text-primary !opacity-80': unreadNotifications.length === 0,
                              'text-blue': unreadNotifications.length > 0
                            })}
                            disabled={!unreadNotifications || unreadNotifications.length === 0}
                            onClick={markAllNotificationAsRead}
                          >
                            Đánh dấu tất cả là đã đọc
                          </Button>
                        </div>
                        {notifications?.map((notification) => (
                          <DropdownItem
                            key={notification.id}
                            onClick={() => markNotificationAsRead(notification.id)}
                            disabled={notification.status === NOTIFICATION_STATUS.READ}
                          >
                            <AccountItem
                              className='h-fit !px-0 py-3'
                              alt=''
                              avatarUrl=''
                              name={notification.title}
                              subtitle={notification.body}
                              notificationStatus={notification.status}
                              notificationCreatedAt={notification.createdAt}
                              disabled={notification.status === NOTIFICATION_STATUS.READ}
                            />
                          </DropdownItem>
                        ))}
                      </>
                    )}
                  >
                    <IconButton size='large' color='inherit'>
                      <Badge badgeContent={unreadNotifications?.length} color='error'>
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </Dropdown>
                ) : (
                  <>
                    <IconButton size='large' color='inherit'>
                      <NotificationsIcon />
                    </IconButton>
                  </>
                )}

                <IconButton
                  size='large'
                  edge='end'
                  aria-label='account of current user'
                  aria-controls={menuId}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
                  color='inherit'
                >
                  {profile?.avatar ? (
                    <img src={profile?.avatar} alt='' className='h-6 w-6 rounded-full border-white' />
                  ) : (
                    <AccountCircle />
                  )}
                  <Typography style={{ marginLeft: 8 }}>{profile?.firstName + ' ' + profile?.lastName}</Typography>
                </IconButton>
              </Box>
            ) : (
              <Link to={path.signin} className='inline-block'>
                <Button size='md' variant='text' className='text-white'>
                  Login
                </Button>
              </Link>
            )}

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>

      <ModalManageClass open={isOpenCreateClassModal} handler={() => setIsOpenCreateClassModal((prev) => !prev)} />
      <JoinClassModal open={isOpenJoinClassModal} handler={() => setIsOpenJoinClassModal((prev) => !prev)} />
    </>
  )
}
