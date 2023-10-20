import React from 'react';
import { Box } from '@mui/material';
import { LoadingSpinner } from './components/loadingSpinner';
import { RouterProvider } from 'react-router-dom';
import { router } from './config/router';
import { theme } from './config/theme';
import { ThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider
        router={router}
        fallbackElement={
          <Box sx={{ height: '100vh' }}>
            <LoadingSpinner />
          </Box>
        }
      />
    </ThemeProvider>
  );
}

export default App;
