import '@fontsource/roboto';
import React, { PropsWithChildren } from 'react'

import AppTheme from '../../styles/theme';
import MainLayout from '../layout/MainLayout';
import Header from '../layout/Header';

function MainFrame({children}: PropsWithChildren<object>) {
  return (
    <AppTheme>
      <MainLayout>
        <Header>
        </Header>
        {children}
      </MainLayout>
    </AppTheme>
  );
}

export default MainFrame;
