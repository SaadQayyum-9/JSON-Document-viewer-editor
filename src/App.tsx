import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import URLInputBox from './components/URLInputBox';

export interface Page {
  title: string;
  bodyText: string;
}

const App: React.FC = () => {
  const [documentation, setDocumentation] = useState<Page[] | null>(null);
  const [isURLValid, setIsURLValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDocumentation = sessionStorage.getItem('documentation');
    if (storedDocumentation) {
      setDocumentation(JSON.parse(storedDocumentation));
      navigate('/home');
    }
  }, [navigate]);

  const handleURLSubmit = async (url: string) => {
    if (validateURL(url)) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.Pages && Array.isArray(data.Pages)) {
          const pages = data.Pages.map((page: any, index: number) => ({ ...page, id: index + 1 }));
          setDocumentation(pages);
          sessionStorage.setItem('documentation', JSON.stringify(pages));
          sessionStorage.setItem('url', url);
          navigate('/home', { state: { documentation: pages } });
        } else {
          throw new Error('The fetched JSON is not an array.');
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Fetch error:', error.message);
          if (error.message.includes('NetworkError')) {
            alert('Network error: Please check your internet connection.');
          } else {
            alert(`Error loading documentation: ${error.message}`);
          }
        } else {
          console.error('Unexpected error:', error);
          alert('An unexpected error occurred while loading documentation.');
        }
      }
    } else {
      setIsURLValid(false);
    }
  };

  const validateURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Routes>
        <Route
          path="/"
          element={<URLInputBox onSubmit={handleURLSubmit} isValid={isURLValid} />}
        />
        <Route
          path="/home"
          element={<HomePage documentation={documentation || []} />}
        />
      </Routes>
    </div>
  );
};

export default App;