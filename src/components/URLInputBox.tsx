import React, { useState } from 'react';
import { TextField, Button, Tabs, Tab, Box, Typography } from '@mui/material';

interface URLInputBoxProps {
  onSubmit: (url: string) => void;
  isValid: boolean;
}

const URLInputBox: React.FC<URLInputBoxProps> = ({ onSubmit, isValid }) => {
  const [url, setUrl] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(url);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',backgroundColor: '#b8b3b3' }}>
      <Box style={{ width: '400px', backgroundColor: '#ddd7e8', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="URL" />
          <Tab label="Example" />
        </Tabs>
        {tabIndex === 0 && (
          <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField
              label="Enter JSON documentation URL"
              variant="outlined"
              value={url}
              onChange={handleInputChange}
              error={!isValid}
              helperText={!isValid && "Please enter a valid URL."}
              style={{ marginBottom: '10px', width: '100%' }}
            />
            <Button variant="contained" color="primary" type="submit">
              Load Documentation
            </Button>
          </form>
        )}
        {tabIndex === 1 && (
          
          <Box style={{ padding: '20px', textAlign: 'left', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
            <Typography style={{ textAlign: 'center', fontWeight: '700' }}>
                A correct JSON should contain key 'Pages' and as many Objects inside with their keys of "title" and "bodyText"
            </Typography>
            {`{
    "Pages": [
        {
            "title": "Title/Heading example",
            "bodyText": "Content example"
        }
    ]
}`}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default URLInputBox;
