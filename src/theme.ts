// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5', // Blue
    },
    secondary: {
      main: '#f50057', // Pink
    },
  },
});

export default theme;

