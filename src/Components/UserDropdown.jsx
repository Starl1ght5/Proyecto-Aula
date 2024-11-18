import React, { useContext } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { StateContext } from '../Context/StateContext';
import { IconButton } from '@mui/material';
import { FaAddressCard } from "react-icons/fa";

export default function UserDropdown() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { setUser, user } = useContext(StateContext); 

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
      window.location.reload();
    };

    const logout = () => {
        setUser(null);
        handleClose();
    }
  
    return (
      <div className='z-11 flex justify-between gap-4'>
        <p className='text-white mt-[6px] text-lg' >@{user.username}</p>
        <IconButton aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
          <FaAddressCard class="size-6 text-white fill-current"/>
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }}>
          <MenuItem onClick={logout}>Cerrar Sesion</MenuItem>
        </Menu>
      </div>
    );
}
