import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ClientContext} from './context/globalContext';
import {userState} from './context/globalState';
import { devConfig } from './dev';
import ZoomVideo from '@zoom/videosdk';

const client = ZoomVideo.createClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ClientContext.Provider value = {client}>
        <App/>
      </ClientContext.Provider>
  </React.StrictMode>
);
