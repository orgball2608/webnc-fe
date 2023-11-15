import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MenuDesktop({ anchorEl, handleMenuClose }: any) {
  return (
    <Menu id='user-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>
        <Link to={path.profile}>Profile</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to={path.change_password}>Change Password</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>Log Out</MenuItem>
    </Menu>
  )
}
