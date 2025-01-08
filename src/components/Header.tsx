import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const Header: React.FC = () => {
  const [url, setUrl] = useState('');

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleExport = () => {
    console.log('Export JSON for:', url);
    // TODO: Implement actual export functionality
  };

  return (
    <header style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
      <TextField 
        label="Enter Documentation URL" 
        variant="outlined" 
        value={url} 
        onChange={handleUrlChange} 
      />
      <Button 
        variant="contained" 
        color="primary"
        onClick={handleExport}
      >
        Export
      </Button>
    </header>
  );
};

export default Header;
