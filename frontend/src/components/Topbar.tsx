import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
const Topbar: React.FC = () => {
    const [anchorEl,setAnchorEl] = useState<null | HTMLElement>(null)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
  return (
    
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Dashboard
        </Typography>
        <Button
          color="inherit"
          endIcon={<ArrowDropDownIcon />}
          onClick={handleClick}
        >
          More Links
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem component={RouterLink} to="/" onClick={handleClose}>Page 1</MenuItem>
          <MenuItem component={RouterLink} to="/page2" onClick={handleClose}>Page 2</MenuItem>
          <MenuItem component={RouterLink} to="/page3" onClick={handleClose}>Page 3</MenuItem>
        </Menu>
        <Button color="inherit" component={RouterLink} to="/about">About Page</Button>
        <Button color="inherit" component={RouterLink} to="/contact">Contact Page</Button>
    </Box>
  );
};

export default Topbar;