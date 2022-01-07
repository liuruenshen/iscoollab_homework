import React from 'react'
import { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export default function InlineRow({ children }: PropsWithChildren<unknown>) {
  return (
    <Box
      sx={{
        padding: '4px',
      }}
    >
      <Stack direction="row" spacing={2}>
        {children}
      </Stack>
    </Box>
  );
}
