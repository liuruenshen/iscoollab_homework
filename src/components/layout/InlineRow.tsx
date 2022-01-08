import React from 'react';
import { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import Stack, { StackProps } from '@mui/material/Stack';

export default function InlineRow({
  children,
  ...stackProps
}: PropsWithChildren<StackProps>) {
  return (
    <Box
      sx={{
        padding: '4px',
        width: '100%',
      }}
    >
      <Stack direction="row" spacing={2} {...stackProps}>
        {children}
      </Stack>
    </Box>
  );
}
