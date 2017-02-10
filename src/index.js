import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Routes } from './containers/Routes';
import { store } from './store';
import './index.css';

const router = (
  <Provider store={store}>
    {Routes}
  </Provider>
);

render(router, document.getElementById('root'));
