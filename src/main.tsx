import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './services/firebase';

import './styles/global.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
