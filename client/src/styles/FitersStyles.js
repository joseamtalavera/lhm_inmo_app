import styled from 'styled-components';

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  background-color: #fff;
  border: 0px solid #ddd;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  height: auto;
  @media (max-width: 820px) {
    max-width: 100%;
  }
`;

export const Title = styled.h2`
  font-size: 20px;
  color: #1E90FF;
  font-weight: 250;
  margin-bottom: 20px;
`;

export const FilterGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  flex-wrap: nowrap;
`;

export const FilterRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const FilterLabel = styled.label`
  font-size: 14px;
  color: #000;
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
  max-width: 100%;
  color: #000;
`;

export const FilterButton = styled.button`
  padding: 10px;
  background-color: transparent;
  color: #1E90FF;
  border: 1px solid #1E90FF;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;

  &:hover {
    background-color: #1E90FF;
    color: white;
  }
`;

export const FilterButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  width: 100%;
`;


