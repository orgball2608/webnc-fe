import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MenuDesktop({ anchorEl, handleMenuClose, handleSignout }: any) {
  return (
    <Menu id='user-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>
        <Link to={path.profile} className='w-full'>
          Profile
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to={path.change_password} className='w-full'>
          Change Password
        </Link>
      </MenuItem>
      <MenuItem onClick={handleSignout}>Log Out</MenuItem>
    </Menu>
  )
}
