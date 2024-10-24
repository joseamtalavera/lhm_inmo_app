// BasicTablePropiedadesStyles.js

import styled from 'styled-components';
import { Box, CircularProgress, Chip } from '@mui/material';
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
export const StyledChip = styled(Chip)`
  border-color: ${(props) => (props.active ? 'green' : 'red')};
  color: black;
  height: 24px;

  & .MuiChip-icon {
    color: ${(props) => (props.active ? 'green' : 'red')};
  }
`;
export const StyledCheckCircleIcon = styled(CheckCircleIcon)`
  font-size: small;
`;

export const StyledCancelIcon = styled(CancelIcon)`
  font-size: small; 
`;