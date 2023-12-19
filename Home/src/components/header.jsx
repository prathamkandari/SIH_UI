import React, { useContext } from "react";
import {Box, Typography, IconButton, Stack, } from '@mui/material';
// import { ReactComponent as Logo } from "../assets/logo/aicte-logo.png";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeContext } from "./theme";
import logoLight from '../assets/logo/logo-light.png';
import logoDark from '../assets/logo/logo-dark.png';
import "../App.css";

const Header = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const getColor = () => {
      if (theme === 'dark-theme')
        return {fontFamily: 'Pacifico' , fontWeight: '1000', fontSize: '28px', color: '#efefef',}
      else 
        return {color: "black"}; 
    };

    return (
      <>
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between" 
          sx={{ backgroundColor: 'rgba(0, 0, 0, 0)', boxShadow: 'none', }}>
          <Typography variant="h5" color={getColor} component="div" sx={{fontFamily: 'Pacifico', fontWeight: '1000', fontSize: '28px'}}>
            unifieDB
          </Typography>
          <img src={theme === 'dark-theme'? logoDark: logoLight} alt="AICTE Logo" width='auto' height='50px' />
          <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={2}>
            <DarkModeSwitch
                checked={theme === 'dark-theme'}
                moonColor='#f6f1d5'
                sunColor='#ffe484'
                onChange={toggleTheme}
                size={30}
            />
            <IconButton>
              <SettingsIcon sx={{ color: "var(--primary)", fontSize: '28px' }} />
            </IconButton>
            <IconButton>
              <AccountCircleIcon sx={{ color: "var(--primary)", fontSize: '28px' }} />
            </IconButton>             
          </Stack>
        </Stack>
      </>
    );
  };
  
  export default Header;