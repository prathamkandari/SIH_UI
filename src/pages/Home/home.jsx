import React, { useState, useEffect } from 'react';
import {AppBar, Box, Toolbar, Typography, IconButton, Switch, Avatar, Container, } from '@mui/material';
import { makeStyles } from '@mui/styles';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Header from '../../components/header';
import Scene from '../../scenes/darkInteractiveScene';
import InputBar from '../../components/inputbar';

const Home = () => {

  return (
    <Box sx={{ zIndex: '5 ', display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent:'center', width:'100vw', height:'auto', margin: '0', padding: '0'}}>
      <Scene />
      <Box sx={{zIndex: '5', padding: '20px 50px', width: '90%', marginBottom: '10%'}}>
        <Header />
      </Box>
      <InputBar />
    </Box>
  );
};

export default Home;