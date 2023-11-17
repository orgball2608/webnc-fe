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
import { Link } from 'react-router-dom'
import MenuMobile from './MenuMobile'
import MenuDesktop from './MenuDesktop'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { useAppDispatch, useAppSelector } from 'src/app/store'
import { signout as signoutAction } from 'src/slices/auth.slice'
import path from 'src/constants/path'

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)

  const dispatch = useAppDispatch()

  // const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const signoutMutation = useMutation({
    mutationFn: authApi.signout,
    onSuccess: () => {
      dispatch(signoutAction())
    }
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

  const headerStyle = {
    minHeight: '2rem'
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
        <Toolbar className='bg-primary' style={headerStyle}>
          <IconButton size='large' edge='start' color='inherit' aria-label='open drawer' sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant='h6' component='div' style={{ cursor: 'pointer' }}>
              CLASSROOM
            </Typography>
          </Link>

          <Link to={path.landingPage} style={{ textDecoration: 'none', color: 'inherit', marginLeft: '32px' }}>
            <Typography component='div' style={{ cursor: 'pointer' }}>
              Landing Page
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
              <AccountCircle />
              <Typography style={{ marginLeft: 8 }}>{'User Name'}</Typography>
            </IconButton>
          </Box>
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
  )
}
