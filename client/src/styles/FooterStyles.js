// src/styles/FooterStyles.js

import styled from 'styled-components';

// Footer Container wih gradient background
export const FooterContainer = styled.footer`
  background: linear-gradient(90deg, #b3d9ff 0%, #1E90FF 100%);
  padding: 3em 0;
  width: 100%;
`;
// Footer content wrapper with flexbox layout
export const FooterContent = styled.div`
  width:100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
`;
// Footer logo Sytling with better alignment for modern layout
export const FooterLogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
`;

export const FooterLogo = styled.img`
  height: 50px;
  margin-right: 1em;

  @media (max-width: 600px) {
    height: 40px;
    margin-right: 0.5em;
  }
`;
// Upadated footer column layout to fit better on different screen sizes
export const FooterColumn = styled.div`
  flex: 1 1 33%;
  min-width: 220px;
  padding: 0 1em;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex: 1 1 100%;
    max-width: 100%;
    margin: 1em 0;
  }

`;
// FooterTitle for modern and readable appearance
export const FooterTitle = styled.h3`
  margin: 0;
  font-size: 1.3em;
  font-weight: bold;
  text-transform: none;
  color: #ffffff;
  margin-bottom: 0.5em;
`;
// FooterDetailItem for text elements in the footer
export const FooterDetailItem = styled.div`
  text-align: left;
  margin-bottom: 1em;
  line-height: 1.6;
  color: #f0f0f0; /* light grey */
`;

export const FooterDetailItemCentered = styled.div`
  text-align: center;
  margin-bottom: 1.5em;
  color: #f0f0f0; /* light grey */
  width: 100%;
`;
// FooterLink for links in the footer with underline and hover effect
export const FooterLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  border-bottom: 1px solid transparent; /* Modern border for hover effect */
  transition: border-color 0.3s ease, border-bottom 0.3s ease;

  &:hover {
    color: #f0f0f0; /* light grey */
    border-color: 1px solid #ffffff;
  }
`;
