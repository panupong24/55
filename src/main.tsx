import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './i18n/LanguageContext.tsx';
import { detectUserLanguage } from './i18n/detect';
import { loadLocale } from './i18n/locales';
import './index.css';

function render() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </StrictMode>,
  );
}

// Thai/English are bundled and resolve immediately; other languages are fetched
// first so the page never flashes the wrong language. Render anyway on failure.
loadLocale(detectUserLanguage()).catch(() => undefined).finally(render);
