import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Grid = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '10px',
  padding: '20px',
  boxSizing: 'border-box',
}));

export default Grid;
