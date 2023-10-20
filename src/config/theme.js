import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#054b82',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});
