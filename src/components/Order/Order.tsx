import React from 'react';
import MainFrame from '../Frame/MainFrame';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Menu from '../Menu/Menu';

const Grid = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  backgroundColor: theme.palette.background.paper,
}));

function Order() {
  return (
    <MainFrame>
      <Grid>
        <Menu></Menu>
      </Grid>
    </MainFrame>
  );
}

export default Order;
