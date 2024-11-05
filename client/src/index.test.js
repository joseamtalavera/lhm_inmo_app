import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import App from './App';

test('renders the main application without crashing', () => {
  render(
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  );

  // Check if the main component renders correctly
  expect(screen.getByText(/propiedades destacadas/i)).toBeInTheDocument();
});
