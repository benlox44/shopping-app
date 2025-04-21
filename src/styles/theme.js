import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // Cambia a 'dark' para el modo oscuro
    primary: {
      main: '#00796b',
    },
    secondary: {
      main: '#ff4081',
    },
    success: {
      main: '#4caf50',
    },
    error: {
      main: '#e74c3c',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

export default theme;