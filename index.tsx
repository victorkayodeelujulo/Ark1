import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ARKAENIA_LOGO } from './constants';

const favicon = document.querySelector('link[rel="icon"]');
if (favicon) {
  favicon.setAttribute('href', ARKAENIA_LOGO);
  favicon.setAttribute('type', 'image/png');
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);