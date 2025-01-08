import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Menu from '../components/Menu';
import PageViewer from '../components/PageViewer';
import { Button, Box } from '@mui/material';

interface Page {
  title: string;
  bodyText: string;
}

interface HomePageProps {
  documentation: Page[];
}

const HomePage: React.FC<HomePageProps> = ({ documentation }) => {
  const [pages, setPages] = useState<Page[]>(documentation);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedDocumentation = sessionStorage.getItem('documentation');
    if (storedDocumentation) {
      const parsedDocumentation = JSON.parse(storedDocumentation);
      setPages(parsedDocumentation);
      if (parsedDocumentation.length > 0) {
        setCurrentPage(parsedDocumentation[0]);
      }
    } else {
      setPages(documentation);
      if (documentation.length > 0) {
        setCurrentPage(documentation[0]);
      }
    }
  }, [documentation]);

  useEffect(() => {
    const pageIndex = new URLSearchParams(location.search).get('page');
    if (pageIndex) {
      handleSelectPage(Number(pageIndex) - 1);
    } else if (pages.length > 0) {
      setCurrentPage(pages[0]);
    }
  }, [location.search, pages]);

  const handleSelectPage = (index: number) => {
    const page = pages[index] || null;
    setCurrentPage(page);
    navigate(`?page=${index + 1}`);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (updatedPage: Page) => {
    const updatedPages = pages.map((page, index) => (index === pages.indexOf(currentPage!) ? updatedPage : page));
    setPages(updatedPages);
    setCurrentPage(updatedPage);
    sessionStorage.setItem('documentation', JSON.stringify(updatedPages));
    toggleEditMode();
  };

  const handleAddPage = () => {
    const newPage: Page = { title: `New Page ${pages.length + 1}`, bodyText: '' };
    const updatedPages = [...pages, newPage];
    setPages(updatedPages);
    sessionStorage.setItem('documentation', JSON.stringify(updatedPages));
  };

  const handleRemovePage = (index: number) => {
    const updatedPages = pages.filter((_, i) => i !== index);
    setPages(updatedPages);
    if (currentPage === pages[index]) {
      setCurrentPage(updatedPages.length > 0 ? updatedPages[0] : null);
    }
    sessionStorage.setItem('documentation', JSON.stringify(updatedPages));
  };

  const handleExport = () => {
    const pagesWithoutIds = pages.map(({ title, bodyText }) => ({ title, bodyText }));
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ Pages: pagesWithoutIds }));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "documentation.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleBack = () => {
    if (window.confirm('Are you sure you want to go back? This will end the current session.')) {
      sessionStorage.clear();
      navigate('/');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '350px', borderRight: '1px solid #ccc', display: 'flex', flexDirection: 'column', backgroundColor: '#3a255b' }}>
        <Box style={{ padding: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Button variant="contained" color="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleExport}>
            Export
          </Button>
        </Box>
        <Menu pages={pages} onSelect={handleSelectPage} onAddPage={handleAddPage} onRemovePage={handleRemovePage} />
      </div>
      <div style={{ flexGrow: 1, padding: '20px', overflowY: 'auto', backgroundColor: '#cacbcf' }}>
        {currentPage && (
          <PageViewer
            page={currentPage}
            isEditing={isEditing}
            onToggleEdit={toggleEditMode}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;