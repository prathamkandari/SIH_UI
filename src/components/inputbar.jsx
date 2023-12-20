import React, { useState } from 'react';
import { styled } from '@mui/system';
import { TextField, Paper, IconButton, InputAdornment, Dialog, DialogTitle } from '@mui/material';
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
const InputBar = ({ placeholder, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup visibility

  const handleSubmit = async () => {
    if (inputValue) {
      try {
        const response = await fetch('http://localhost:5454/find-table', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: inputValue }),
        });

        const data = await response.json();
        setResponseData(data);
        setIsPopupOpen(true); // Open the popup on successful data fetch
      } catch (error) {
        console.error('Error:', error);
        setResponseData({ error: 'An error occurred' });
        setIsPopupOpen(true); // Open the popup also in case of error
      }
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Function to close the popup
  };

  return (
    <Paper
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
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
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
        <Dialog open={isPopupOpen} onClose={handleClosePopup}>
        {/* <DialogTitle>Response</DialogTitle> */}
        <div style={{ padding: 20 }}>
          {responseData && responseData.error ? (
            <p style={{ color: 'red' }}>{responseData.error}</p>
          ) : (
            responseData && responseData.closest_nodes && responseData.closest_nodes.map((node, index) => (
              <p key={index}>{node}</p> 
            ))
          )}
        </div>
      </Dialog>
    </Paper>
  );
};

export default InputBar;
