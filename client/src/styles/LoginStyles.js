
import styled from 'styled-components';
import { Box, Button, Link, Grid, Typography, Dialog, DialogTitle, DialogContentText } from '@mui/material';

export const FormContainer = styled(Box)`
  max-width: 500px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
`;

export const LoginGrid = styled(Grid)`
  text-align: center;
`;

export const LoginButton = styled(Button)`
  margin-top: 0;
  margin-bottom: 16px;
  background-color: #1E90FF;
  color: white;

  &:hover {
    background-color: blue;
  }
`;

export const TitleTypography = styled(Typography)`
  text-align: center;
  margin-bottom: 20px;
`;

export const BodyTypography = styled(Typography)`
  text-align: center;
  margin-bottom: 16px;
`;

export const RecoveryLink = styled(Link)`
  text-decoration: none;
  color: #1E90FF;
`;

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 60%;
    max-height: 190px;
    text-align: center;
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  font-size: ${({ isError }) => (isError ? '12px' : 'default')};
`;

export const DialogButton = styled(Button)`
  color: green;
  border-color: green;
`;

export const BlueText = styled(DialogContentText)`
  color: #1E90FF;
`;

