// src/styles/AllPropertiesPageStyles.js

import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensures it takes up the entire viewport height */
  padding: 0;
  margin: 0;
`;

// Drawer container that handles menu
export const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Ensure the drawer is on top of other content */
  background-color: white;
  margin-bottom: 50px;
`;

// Wrapper for the main content in the middle of the page
export const ContentWrapper = styled.div`
  flex: 1; /* Ensures it grows and fills available space */
  display: flex;
  padding: 20px;
  margin-top: 50px; /* Adjust margin-top to align with the drawer */
  background-color: #f9f9f9;
  align-items: flex-start; /* Ensure children align at the start */
`;

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 20px;
`;

export const FiltersContainer = styled.div`
  flex: 0 0 300px; /* Increase the width to match the new max-width */
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;  /* Adds some spacing between each filter field */
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 17px;
`;

export const PropertiesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: flex-start;
  /* margin: 2em auto;
  max-width: 1200px; */
  max-width: calc(100% - 260px); /* Make sure it takes available space considering filter's width */
 
`;

export const PropertyCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  margin: 1em;
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const PropertyImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

export const PropertyInfo = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PropertyTitle = styled.h3`
  margin: 0 0 0.5em 0;
  font-size: 1.2em;
`;

export const PropertyDescription = styled.p`
  font-size: 0.9em;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
`;

export const PropertyPrice = styled.p`
  font-size: 1em;
  color: #333;
  font-weight: bold;
  margin-top: 0.5em;
`;

export const PropertyButton = styled.button`
  background-color: #007BFF;
  color: #fff;
  padding: 0.75em 1em;
  border: none;
  border-radius: 4px;
  margin-top: 1em;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;