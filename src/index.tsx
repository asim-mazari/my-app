// index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import StoreMain from './Store/StoreMain'; // Check the correct path for your store

import App from './App'; // Check the correct path for your App component

ReactDOM.render(
  <Provider store={StoreMain}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
