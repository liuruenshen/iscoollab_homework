import React from 'react'
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Order from "../Order/Order";

const rootElement = document.getElementById("root");

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Order />}>
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);