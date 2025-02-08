// BasicTablePropiedadesStyles.js

import styled from 'styled-components';
import { Box, CircularProgress, Chip, TableContainer, Table, TableCell, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContentText } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlined  from '@mui/icons-material/EditOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export const StyledBox = styled(Box)`
  max-width: lg;
  margin: auto;
  box-shadow: 0;
  height: 550px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledCircularProgress = styled(CircularProgress)`
  color: #1E90FF;
`;

export const StyledTableContainer = styled(TableContainer)`
  width: 100%;
  @media (max-width: 600px) {
    overflow-x: auto;
  }
`;

export const StyledTable = styled(Table)`
  min-width: 650px;
  @media (max-width: 600px) {
    min-width: 100%;
  }
`;

export const StyledTableHeaderCell = styled(TableCell)`
  font-weight: bold;
  background-color: #f0f0f0;
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

export const StyledTableCell = styled(TableCell)`
  padding: 8px;
  @media (max-width: 600px) {
    padding: 4px;
    font-size: 0.8rem;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const ImageWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #ccc;
  margin-right: 10px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PropertyImage = styled.img`
  width: 100px;
  height: auto;
`;

export const PropertyCardImage = styled.img`
  width: 100%;
  height: auto;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
export const EditIcon = styled(EditOutlined)`
  color: #1E90FF;
  cursor: pointer;
`;

export const DeleteIcon = styled(DeleteOutlineIcon)`
  color: #1E90FF;
  cursor: pointer;
`;

export const StyledCheckCircleIcon = styled(CheckCircleIcon)`
  font-size: small;
`;

export const StyledCancelIcon = styled(CancelIcon)`
  font-size: small; 
`;

export const StyledCard = styled(Card)`
  display: none;
  margin-bottom: 16px;
  @media (max-width: 600px) {
    display: block; // Show card on mobile
  }
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
`;

export const StyledCardTitle = styled(Typography)`
  font-weight: bold;
  margin-bottom: 8px;
  margin-top: 8px;
  color: #1E90FF;
`;

export const StyledCardActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
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

export const RedDialogButton = styled(Button)`
  color: red;
  border-color: red;
`;

export const StyledDeleteDialogText = styled(DialogContentText)`
  color: #1E90FF;
`;

