import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensures it takes up the entire viewport height */
  padding: 0;
  margin: 0;
  overflow-x: hidden; /* Prevent horizontal scrolling */
`;

export const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Ensure the drawer is on top of other content */
  background-color: white;
  margin-bottom: 50px;

   @media (max-width: 780px) {
        position: relative;
        margin-bottom: 20px;
    }
`;

export const ContentWrapper = styled.div`
  flex: 1; /* Ensures it grows and fills available space */
  display: flex;
  padding: 20px;
  margin-top: 50px; /* Adjust margin-top to align with the drawer */
  background-color: #f9f9f9;
  align-items: flex-start; /* Ensure children align at the start */
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  @media (max-width: 768px) {
    margin-top: 0; /* Remove margin-top in mobile view */
    align-items: center; /* Center content in mobile view */
  }
`;

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px; /* Reduced gap */
  align-items: stretch;
  justify-content: flex-start;
  margin-top: 20px;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  @media (max-width: 768px) {
    margin-top: 0; /* Remove margin-top in mobile view */
    align-items: center; /* Center content in mobile view */
  }
`;

export const FiltersContainer = styled.div`
  flex: 1; /* Ensure it takes full width in mobile view */
  margin-right: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;  /* Adds some spacing between each filter field */
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 17px;

  @media (min-width: 768px) {
    flex: 0 0 300px;
    margin-right: 10px; /* Further reduced margin-right */
  }

  @media (max-width: 768px) {
    margin-top: 0; /* Remove margin-top in mobile view */
  }
`;

export const PropertiesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: flex-start;
  max-width: 100%;
  align-items: center; /* Center the container */
  padding: 0 10px; /* Add padding to avoid content touching the edges */

  @media (max-width: 768px) {
    width: 100%; /* Ensure it takes full width in mobile view */
    align-items: center; /* Center content in mobile view */
    justify-content: center; /* Center content in mobile view */
    padding: 0; /* Remove padding in mobile view */
    max-width: 100%; /* Increase the max-width to take more space */
  }
`;
