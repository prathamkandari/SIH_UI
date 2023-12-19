import React from 'react';
import { styled } from '@mui/system';
import { TextField, Paper, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

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
      color: '#cecece',
    },
  },
});

const CustomInput = ({ placeholder = 'Search...', onSubmit }) => {
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <Paper
      sx={{
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

export default CustomInput;
