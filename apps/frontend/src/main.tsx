import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import i18n from './assets/i18n/i18next';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import store, { persistor } from './app/reduxs/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </I18nextProvider>
    </BrowserRouter>
  </StrictMode>
);
