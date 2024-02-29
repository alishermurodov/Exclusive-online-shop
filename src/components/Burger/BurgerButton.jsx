import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const BurgerMenuButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        // color="inherit"
        // aria-label="open menu"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      {/* <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Menu Item 1</MenuItem>
        <MenuItem onClick={handleClose}>Menu Item 2</MenuItem>
        <MenuItem onClick={handleClose}>Menu Item 3</MenuItem>
      </Menu> */}
    </div>
  );
};

export default BurgerMenuButton;
