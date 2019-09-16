// Dependencies
import '@babel/polyfill';
import React from 'react';
import axios from 'axios';
import {Provider} from 'react-redux';

// Store
import store from './store';

//  Components
import {Layout} from "./views";

//  Routes
import Routes from './Routes';

//  Styles
import './styles/_global.scss';

export default (
  <Provider store={store}>
    <Layout>
      <Routes/>
    </Layout>
  </Provider>
)
