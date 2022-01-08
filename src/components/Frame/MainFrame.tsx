import '@fontsource/roboto';
import React, { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';

import AppTheme from '../../styles/theme';
import MainLayout from '../layout/MainLayout';
import Header from '../layout/Header';
import { styled } from '@mui/material/styles';

const Content = styled(Box)(() => ({
  height: 'calc(100% - 50px)',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  overflowY: 'auto',
}));

function MainFrame({ children }: PropsWithChildren<object>) {
  return (
    <AppTheme>
      <MainLayout>
        <Header></Header>
        <Content>{children}</Content>
      </MainLayout>
    </AppTheme>
  );
}

export default MainFrame;
