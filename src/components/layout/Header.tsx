import React from 'react';
import { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';

export default function MainLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'primary.light',
        padding: '16px',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </Box>
  );
}
