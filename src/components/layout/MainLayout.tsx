import React, { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '10px',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    width: '95%',
    height: '95%',
  },
  [theme.breakpoints.up('sm')]: {
    width: '80%',
    height: '80%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '60%',
    height: '60%',
  },
}));

export default function MainLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <ContentBox>{children}</ContentBox>
    </Box>
  );
}
