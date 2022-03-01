import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Order from '../Order/Order';
import History from '../History/History';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import MainFrame from '../Frame/MainFrame';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { v4 as uuidv4 } from 'uuid';
import { Helmet } from 'react-helmet';

const rootElement = document.getElementById('root');

declare global {
  const STYLE_NONCE: string;
}

const defaultCache = createCache({
  key: 'iscoollab-',
  nonce: STYLE_NONCE,
  prepend: false,
});

render(
  <React.StrictMode>
    <CacheProvider value={defaultCache}>
      <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<MainFrame />}>
              <Route index element={<Navigate to="/order" />}></Route>
              <Route path="order" element={<Order />} />
              <Route path="history" element={<History />} />
            </Route>
          </Routes>
        </HashRouter>
      </Provider>
    </CacheProvider>
  </React.StrictMode>,

  rootElement
);
