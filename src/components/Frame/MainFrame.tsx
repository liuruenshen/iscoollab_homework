import '@fontsource/roboto';
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Outlet, useNavigate } from 'react-router-dom';

import AppTheme from '../../styles/theme';
import MainLayout from '../layout/MainLayout';
import Header from '../layout/Header';
import InlineRow from '../layout/InlineRow';
import { styled } from '@mui/material/styles';

const Content = styled(Box)(() => ({
  minHeight: 'calc(100% - 100px)',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  overflowY: 'auto',
}));

function MainFrame() {
  const navigate = useNavigate();

  return (
    <AppTheme>
      <MainLayout>
        <Header>
          <InlineRow justifyContent="flex-end">
            <Button variant="contained" onClick={() => navigate('/order')}>
              {'訂餐'}
            </Button>
            <Button variant="outlined" onClick={() => navigate('/history')}>
              {'歷史記錄'}
            </Button>
          </InlineRow>
        </Header>
        <Content>
          <Outlet />
        </Content>
      </MainLayout>
    </AppTheme>
  );
}

export default MainFrame;
