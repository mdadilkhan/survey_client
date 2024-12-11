import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from "react-redux";
import { store, persistor } from './store/store.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import { RecoilRoot } from "recoil";

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <RecoilRoot>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </RecoilRoot>
  // </StrictMode>
);
