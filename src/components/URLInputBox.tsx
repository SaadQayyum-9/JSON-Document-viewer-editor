import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

interface URLInputBoxProps {
  onSubmit: (url: string) => void;
  isValid: boolean;
}

const URLInputBox: React.FC<URLInputBoxProps> = ({ onSubmit, isValid }) => {
  const [url, setUrl] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    onSubmit(url);  // Call the parent submit handler
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <TextField
        label="Enter JSON documentation URL"
        variant="outlined"
        value={url}
        onChange={handleInputChange}
        error={!isValid}
        helperText={!isValid && "Please enter a valid URL."}
        style={{ marginRight: '10px', width: '300px' }}
      />
      <Button variant="contained" color="primary" type="submit">
        Load Documentation
      </Button>
    </form>
  );
};

export default URLInputBox;
