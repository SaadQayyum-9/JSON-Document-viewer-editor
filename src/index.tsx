import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App';
import HomePage from './pages/HomePage';
import theme from './theme';
import './index.css'; // Ensure global CSS is imported last.

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<HomePage documentation={[]} />} />
        </Routes>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
