import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Shelf = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  backgroundColor: theme.extendBackground?.light,
  borderRadius: '4px',
  padding: '10px',
  margin: '20px 0 0 0 ',
}));
export default Shelf;
