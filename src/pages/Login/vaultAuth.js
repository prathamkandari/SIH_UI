import React, { useState } from "react";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AbcIcon from '@mui/icons-material/Abc';
import { Button, Typography, IconButton, Stack, Grid, TextField, InputAdornment } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import '../../assets/css/vaultAuth.css';
import image from "../../assets/images/vault.png";
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';



export function VaultAuth() {

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [rotateLoading, setRotateLoading] = React.useState(false); // New state for rotation
    const navigate = useNavigate();

    const handleAlertClose = () => {
        setError(false);
        setSuccess(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const vaultUrl = document.getElementById('vaulturl').value;
        const vaultName = document.getElementById('vaultname').value;

        console.log(vaultUrl);

        setLoading(true);
        setError(false);
        setSuccess(false);
        setRotateLoading(false);

        try {
            // Make a request to your login server
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({vaultUri: vaultUrl, secretName: vaultName }),
            });

            if (response.ok) {
                // Successful connection
                console.log("Successful connection");
                setError(false);
                setSuccess(true);

                // Rotate loading icon for 2 seconds before redirecting
                setRotateLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setRotateLoading(false);

                    // Redirect to the next page
                    // Replace 'your-next-page' with the actual route
                    // Example: history.push('/dashboard');
                }, 2000);
                navigate('/home');
            } else {
                // Unsuccessful connection
                setError(true);
            }
        } catch (error) {
            // Handle network errors or other issues
            setError(true);
        } finally {
            setLoading(false); // Set loading state to false regardless of success or failure
        }
    };

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
                    {/* <h2>Enter Vault Credentials</h2> */}
                    <Box id="loginContainer" component="form" onSubmit={handleSubmit}>
                        <h2>Enter Vault Credentials</h2>
                        <div className="userInput" id="userInput">
                            <TextField
                                name="vaulturl"
                                id="vaulturl"
                                label={
                                    <Typography style={{ fontSize: '18px', color: '#bdbdcd', fontWeight: '500', }}>
                                        Vault URL:
                                    </Typography>
                                }
                                sx={{
                                    width: '350px', color: 'white', '& .MuiFilledInput-root': {
                                        backgroundColor: '#0b0b1a', color: 'white'
                                    },
                                    borderBottom: '1px solid rgba( 255, 255, 255, 0.25 )'
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountBalanceWalletIcon sx={{ color: '#bdbdcd', fontSize: '18px' }} />
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
                                name="vaultname"
                                id="vaultname"
                                label={
                                    <Typography style={{ fontSize: '18px', color: '#bdbdcd', fontWeight: '500' }}>
                                        Vault Name:
                                    </Typography>
                                }
                                sx={{
                                    width: '350px', color: 'white', '& .MuiFilledInput-root': {
                                        backgroundColor: '#0b0b1a', color: 'white',
                                    },
                                    borderBottom: '1px solid rgba( 255, 255, 255, 0.25 )'
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AbcIcon sx={{ color: '#bdbdcd', fontSize: '32px' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                margin="normal"
                                variant="filled"
                                placeholder="example-name"
                            />
                        </div>
                        {error && (
                            <Alert severity="error" sx={{ mt: 2 }} action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={handleAlertClose}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }>
                                Invalid Credentials
                            </Alert>
                        )}

                        {loading && (
                            <Box
                                sx={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 9999,
                                }}
                            >
                                <CircularProgress size={60} />
                            </Box>
                        )}


                        <Grid container id="loginButton" alignItems="center" justifyContent="space-evenly">
                            <Button type="submit" variant="contained" sx={{
                                width: '125px', background: "rgba( 50, 50, 55, 0.25 )",
                                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )", backdropFilter: "blur( 4px )",
                                borderRadius: "4px", border: "1px solid rgba( 255, 255, 255, 0.075 )"
                            }} disabled={loading}
                            >
                                {rotateLoading ? (
                                    <CircularProgress size={24} sx={{ animation: 'spin 2s infinite linear' }} />
                                ) : (
                                    'Authenticate'
                                )}
                            </Button>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
};