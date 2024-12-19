// src/components/FiltersStyles.js

import styled from 'styled-components';

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  background-color: #fff;
  border: 0px solid #ddd;
  border-radius: 8px;
  width: 100%; /* Makes the container take up the full width */
  max-width: 400px; /* Increase the max-width to make it wider */
  box-sizing: border-box; /* Ensure padding is included in the width */
`;

export const Title = styled.h2`
  font-size: 20px;
  color: grey;
  font-weight: 150;  /* Thin font weight */
  margin-bottom: 20px;
`;

// A wrapper for grouping related filters (e.g., Property Type, Price, Size)
export const FilterGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  flex-wrap: nowrap; /* Ensures the group doesn't wrap to the next line */
`;

export const FilterRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const FilterLabel = styled.label`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

export const FilterInput = styled.input`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 100%; /* Ensure inputs take up the full width of the container */
`;

export const FilterButton = styled.button`
  padding: 10px;
  background-color: #1E90FF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
  }
`;

