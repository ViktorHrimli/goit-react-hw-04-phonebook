import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { Phonebook } from 'components/App';
import { theme } from 'Thema';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Phonebook />
    </ThemeProvider>
  </React.StrictMode>
);
