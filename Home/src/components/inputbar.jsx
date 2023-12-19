import React, { useState } from 'react';
import { styled } from '@mui/system';
import { TextField, Paper, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './inputbar.css';

const StyledTextField = styled(TextField)({
  width: '100%',
  backgroundColor: 'rgba(50, 50, 55, 0.25)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  color: '#efefef',
  '& input': {
    color: '#efefef',
    '&::placeholder': {
      color: '#fff',
    },
  },
});

const InputBar = ({placeholder = 'Hello, I am Unity. Ask me anything regarding your database cluster.', onSubmit }) => {

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <Paper
      // className='gradient-border' // Add className prop to Paper component
      sx={{
        zIndex: '10',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '800px',
        minHeight: '50px',
        backgroundColor: 'rgba(50, 50, 55, 0.25)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        color: '#efefef',
        '&:hover': { border: 'none', borderBottom: '1px solid primary' }
      }}
    >
      <StyledTextField
        placeholder={placeholder}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSubmit}>
                <SendIcon style={{ color: '#efefef' }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
};

export default InputBar;