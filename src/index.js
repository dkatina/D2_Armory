import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material';
import PrimaryTheme from './themes/PrimaryTheme.js'
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './context/AppContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={PrimaryTheme}>
        <AppContextProvider>
          <CssBaseline>
            <App />
          </CssBaseline>
        </AppContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
