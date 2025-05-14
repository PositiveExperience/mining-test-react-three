import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { Provider } from 'mobx-react';
import App from './App';
import nodeStore from './stores/NodeStore';
import horizonStore from './stores/HorizonStore';
import uiStore from './stores/UIStore';
import './index.css';

const stores = {
  nodeStore,
  horizonStore,
  uiStore
};

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider {...stores}>
        <App />
      </Provider>
    </React.StrictMode>
  );

