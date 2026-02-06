import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import HomePage from "./Pages/HomePage/index";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from './Pages/HomePage/theme';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    </>
  </StrictMode>
);