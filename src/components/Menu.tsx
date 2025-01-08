import React from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface Page {
  title: string;
}

interface MenuProps {
  pages: Page[];
  onSelect: (index: number) => void;
  onAddPage: () => void;
  onRemovePage: (index: number) => void;
}

const Menu: React.FC<MenuProps> = ({ pages, onSelect, onAddPage, onRemovePage }) => {
  return (
    <div style={{ width: '300px', padding: '10px', backgroundColor: '#3a255b', color:'white', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3>JSON URL TITLES</h3>
        <IconButton onClick={onAddPage} color="primary">
          <AddIcon />
        </IconButton>
      </div>
      {pages.map((page, index) => (
        <div
          key={index}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
          onClick={() => onSelect(index)}
        >
          <span>{page.title}</span>
          <IconButton onClick={(e) => { e.stopPropagation(); onRemovePage(index); }} color="secondary">
            <RemoveIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
};

export default Menu;
