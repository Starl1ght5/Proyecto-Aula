import React, { useContext } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { StateContext } from '../Context/StateContext';
import { IconButton } from '@mui/material';
import { FaGear } from "react-icons/fa6";

export default function UserDropdown() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { setUser } = useContext(StateContext); 

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const logout = () => {
        window.location.reload();
        setUser(null);
        handleClose();
    }
  
    return (
      <div class="z-11">
        <IconButton aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
          <FaGear class="size-6 text-white fill-current"/>
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }}>
          <MenuItem onClick={logout}>Cerrar Sesion</MenuItem>
        </Menu>
      </div>
    );
}
