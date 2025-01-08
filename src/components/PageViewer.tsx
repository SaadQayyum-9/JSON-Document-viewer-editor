import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Page } from '../App';
import { TextField, Button, Box } from '@mui/material';

interface PageViewerProps {
  page: Page;
  isEditing: boolean;
  onToggleEdit: () => void;
  onSave: (updatedPage: Page) => void;
}

const PageViewer: React.FC<PageViewerProps> = ({ page, isEditing, onToggleEdit, onSave }) => {
  const [editedTitle, setEditedTitle] = useState(page.title);
  const [editedBodyText, setEditedBodyText] = useState(page.bodyText);

  useEffect(() => {
    setEditedTitle(page.title);
    setEditedBodyText(page.bodyText);
  }, [page]);

  const handleSave = () => {
    const updatedPage = { ...page, title: editedTitle, bodyText: editedBodyText };
    onSave(updatedPage);
  };

  return (
    <div>
      <Box style={{ backgroundColor: '#d1d6f5', padding: '10px', borderRadius: '5px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {isEditing ? (
          <TextField
            label="Title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            fullWidth
            style={{ marginRight: '10px' }}
          />
        ) : (
          <h2 style={{ flexGrow: 1 }}>{page.title}</h2>
        )}
        <Button variant="contained" color="primary" onClick={isEditing ? handleSave : onToggleEdit}>
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </Box>
      {isEditing ? (
        <TextField
          label="Content"
          value={editedBodyText}
          onChange={(e) => setEditedBodyText(e.target.value)}
          fullWidth
          multiline
          rows={20}
          style={{ marginBottom: '20px' }}
        />
      ) : (
        <ReactMarkdown>{page.bodyText}</ReactMarkdown>
      )}
    </div>
  );
};

export default PageViewer;
