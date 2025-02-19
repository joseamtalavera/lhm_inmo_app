import styled from 'styled-components';
import { 
  Button, 
  Box, 
  IconButton, 
  TableCell,
  Typography,
  TableRow,
  Tab
} from '@mui/material';

export const StyledTypography = styled(Typography)`
  margin-bottom: 2rem;
  color: #1E90FF;
`;

export const StyledBox = styled(Box)`
  margin-top: 2rem;
`;    

export const StyledButton = styled(Button)`
  margin-right: 2rem;
  margin-bottom: 2rem;
`;

export const StyledIconButton = styled(IconButton)`
  margin-right: 1rem;
  margin-bottom: 1rem;
  color: #1E90FF;
`;

export const StyledTableCell = styled(TableCell)`
  font-weight: bold;
`;

export const StyledTableRow = styled(TableRow)`
  background-color: #f0f0f0;
`;

export const StyledTab = styled(Tab)`
  color: inherit;
  &:hover {
    color: #1E90FF;
  }
  &.Mui-selected {
    color: #1E90FF;
    border-bottom: 2px solid #1E90FF;
  }
`;

