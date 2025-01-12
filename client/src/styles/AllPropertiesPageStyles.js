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
  padding: 10px;

   @media (max-width: 820px) {
        position: relative;
        margin-bottom: 20px;
    }
`;


export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  padding: 20px;
  margin-top: 50px;
  background-color: #f9f9f9;
  align-items: flex-start;
  flex-direction: row;

  /* Mobile + iPad (≤ 820px) */
  @media (max-width: 820px) {
    margin-top: 0;
    flex-direction: column; 
    /* other styles for smaller devices */
  }

  /* iPad Pro (821px to 1024px) */
  @media (min-width: 821px) and (max-width: 1024px) {
    margin-top: 0;
    flex-direction: row; 
    /* styles for iPad Pro */
  }

  /* Desktop (≥ 1025px) */
  @media (min-width: 1025px) {
    margin-top: 50px;
    flex-direction: row; 
    /* styles for larger screens */
  }
`;

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px; 
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 30px;
  flex-direction: row;


  @media (max-width: 820px) {
    margin-top: 0; /* Remove margin-top in mobile view */
    align-items: center; /* Center content in mobile view */
    flex-direction: column; /* Stack items vertically in mobile view */
   
  }

  /* iPad Pro (821px to 1024px) */
  @media (min-width: 821px) and (max-width: 1024px) {
    margin-top: 100px;
    flex-direction: row; 
  }

  /* Desktop (≥ 1025px) */
  @media (min-width: 1025px) {
    margin-top: 30px;
    flex-direction: row; 
  }
`;

export const FiltersContainer = styled.div`
  /* Base styles (desktop-first or mobile-first, whichever you prefer) */
  flex: 1; 
  margin-right: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 17px;

  @media (max-width: 820px) {
    margin-top: 0;      /* Remove top margin on very small screens */
    flex: 1;           /* Full width in mobile */
    margin-right: 0; 
    width: 100%;      
  }

  /* Tablet (821px to 1024px) */
  @media (min-width: 768px) and (max-width: 1024px) {
    flex: 0 0 300px;   /* Fixed width (like desktop) */
    margin-right: 10px;
    margin-top: 20;
  }

  /* Desktop (over 1024px) */
  @media (min-width: 1051px) {
    flex: 0 0 300px;   /* Fixed width for larger screens */
    margin-right: 10px;
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

  @media (max-width: 820px) {
    width: 100%; /* Ensure it takes full width in mobile view */
    align-items: center; /* Center content in mobile view */
    justify-content: center; /* Center content in mobile view */
    padding: 0; /* Remove padding in mobile view */
    max-width: 100%; /* Increase the max-width to take more space */
  }

  @media (max-width: 1024px) {
    width: 100%; /* Ensure it takes full width in mobile and iPad view */
    align-items: center; /* Center content in mobile and iPad view */
    justify-content: center; /* Center content in mobile and iPad view */
    padding: 0; /* Remove padding in mobile and iPad view */
    max-width: 100%; /* Increase the max-width to take more space */
  }
`;
