import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Menu from '../Menu/Menu';
import Cart from '../Cart/Cart';

const Grid = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  backgroundColor: theme.palette.background.paper,
}));

function Order() {
  return (
    <Grid>
      <Menu></Menu>
      <Cart></Cart>
    </Grid>
  );
}

export default Order;
