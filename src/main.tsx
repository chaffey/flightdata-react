import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App'
import theme from './theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets default browser styles */}
      <App />
    </ThemeProvider>
  </StrictMode>,
)
