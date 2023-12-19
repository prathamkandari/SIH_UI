import React, {useState} from "react";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AbcIcon from '@mui/icons-material/Abc';
import {Button, Typography, IconButton, Stack, Grid, TextField, InputAdornment } from '@mui/material';
import '../../assets/css/vaultAuth.css';
import image from "../../assets/images/vault.png"

export const VaultAuth = () => {

    return (
        <Grid id="page" conatiner xs={12} justifyContent="center" alignItems="center">
            <Grid id="container" container xs={12}>
                <Grid id="imgGrid" container xs={7}>
                    <img id="loginImages" src={image} alt="vault image" />
                </Grid>
                <Grid
                    id="loginGrid"
                    container
                    xs={5}
                    alignItems="center"
                    justifyContent="space-evenly"
                    direction="column"
                >
                <h2>Enter Vault Credentials</h2>
                <div id="loginContainer">
                <div classname="userInput" id="userInput">
                    <TextField
                    id="vaulturl"
                    label={
                        <Typography style={{ fontSize: '18px', color: '#bdbdcd', fontWeight: '500',}}>
                        Vault URL:
                        </Typography>
                    }
                    sx={{ width: '350px', color: 'white', '& .MuiFilledInput-root': {
                        backgroundColor: '#0b0b1a', color: 'white'}, 
                        borderBottom: '1px solid rgba( 255, 255, 255, 0.25 )'}}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <AccountBalanceWalletIcon sx={{ color: '#bdbdcd', fontSize: '18px'}} />
                        </InputAdornment>
                        )
                    }}
                    margin="normal"
                    variant="filled"
                    color="primary"
                    placeholder="https://example.com/"
                    />
                </div>
                <div className="userInput" id="userInput">
                    <TextField
                    id="vaultname"
                    label={
                        <Typography style={{ fontSize: '18px', color: '#bdbdcd', fontWeight: '500' }}>
                        Vault Name:
                        </Typography>
                    }
                    sx={{ width: '350px', color: 'white', '& .MuiFilledInput-root': {
                        backgroundColor: '#0b0b1a', color: 'white',}, 
                        borderBottom: '1px solid rgba( 255, 255, 255, 0.25 )'}}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <AbcIcon sx={{ color: '#bdbdcd', fontSize: '32px'}} />
                        </InputAdornment>
                        ),
                    }}
                    margin="normal"
                    variant="filled"
                    placeholder="example-name"
                    />
                </div>
                </div>

                <Grid container id="loginButton" alignItems="center" justifyContent="space-evenly">
                    <Button variant="contained" sx={{ width: '125px',background: "rgba( 50, 50, 55, 0.25 )", 
                    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )", backdropFilter: "blur( 4px )", 
                    borderRadius: "4px", border: "1px solid rgba( 255, 255, 255, 0.075 )" }}>
                    Authenticate
                    </Button>
                </Grid>

                </Grid>
            </Grid>
        </Grid>
    )   
};

export default VaultAuth;