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

  /* Optional: Set default font sizes */
  body {
    font-size: 16px;
    line-height: 1.5;
  }

  /* Optional: Style headings */
  h1, h2, h3, h4, h5, h6 {
    font-family: inherit;
    color: inherit;
    margin: 0 0 1em;
  }

  /* Optional: Style links */
  a {
    color: inherit;
    text-decoration: none;
  }
`;
