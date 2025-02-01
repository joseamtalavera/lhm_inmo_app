import styled from 'styled-components';
import { Box, Card, Button, IconButton, MenuItem, DialogContentText, DialogTitle } from '@mui/material';

export const StyledCard = styled(Card)`
  max-width: 90%;
  margin: auto;
  margin-top: 5rem;
  margin-bottom: 2rem;
`;

export const StyledBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const StyledButton = styled(Button)`
  margin-right: 2rem;
  margin-bottom: 2rem;
`;

export const StyledIconButton = styled(IconButton)`
  margin-right: 2rem;
  margin-bottom: 2rem;
`;

export const StyledMenuItem = styled(MenuItem)`
  color: #1E90FF;
`;

export const StyledDialogContentText = styled(DialogContentText)`
  color: #1E90FF;
`;

export const StyledMenuBox = styled(Box)`
  display: block;
  @media (min-width: 960px) {
    display: none;
  }
`;

export const StyledTabsBox = styled(Box)`
  display: none;
  @media (min-width: 960px) {
    display: flex;
  }
`;

export const StyledActionBox = styled(Box)`
  display: flex;
  justify-content: flex-end;
  border-top: 0px solid;
  border-color: divider;
  margin-bottom: 2rem;
  margin-right: 2rem;
`;

export const StyledAlignBox = styled(Box)`
  align-self: flex-end;
  padding-top: 2rem;
`;

export const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledDialogActionsButton = styled(Button)`
  color: green;
  border-color: green;
`;

export const StyledCancelButton = styled(Button)`
  color: red;
  border-color: red;
  margin-right: 2rem;
  margin-bottom: 2rem;
`;

export const StyledDialogPaper = {
  width: "60%",
  maxHeight: '150px',
  textAlign: 'center'
};

export const StyledSaveDialogPaper = {
  color: '#1E90FF',
  boxShadow: 'none',
  borderRadius: '5px'
};

export const StyledDialogSubir = styled(DialogTitle)`
color: #1E90FF; 
`;
