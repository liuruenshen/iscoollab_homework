import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Order from '../Order/Order';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import MainFrame from '../Frame/MainFrame';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainFrame />}>
            <Route index element={<Navigate to="/order" />}></Route>
            <Route path="order" element={<Order />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);
