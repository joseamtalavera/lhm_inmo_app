// src/styles/GlobalStyles.js

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* Reset some basic elements */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* Apply the font family */
  body, html, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #333;
    background-color: #fff;
  }

  /* Set the default font sizes */
  body {
    font-size: 16px;
    line-height: 1.5;
  }

  /* Style headings */
  h1, h2, h3, h4, h5, h6 {
    font-family: inherit;
    color: inherit;
    margin: 0 0 1em;
  }

  /* Style links */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* Global button styles */
  button {
    background-color: #1E90FF; /* Dodger Blue for the main button color */
    color: white;
    border: 2px solid #1E90FF;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #1C86EE; /* Slightly darker blue on hover */
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 5px rgba(30, 144, 255, 0.7);
    }

    &:active {
      background-color: #1874CD; /* Even darker blue when active */
    }
  }

  /* Global input field border styles */
  input, textarea {
    border: 2px solid #1E90FF; /* Dodger Blue as the border color */
    padding: 10px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #1C86EE; /* Slightly darker border on focus */
    }
  }

  /* Optional: Add styles for MUI buttons or components globally (if applicable) */
  .MuiButton-root {
    background-color: #1E90FF !important; /* Ensures MUI buttons also use the primary color */
    color: white !important;

    &:hover {
      background-color: #1C86EE !important;
    }
  }
`;
