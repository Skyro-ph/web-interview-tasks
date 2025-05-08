import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from '~app/layout/Layout';
import { Providers } from '~app/providers';

import { MainPage } from '~pages/main/MainPage';
import { SuperheroPage } from '~pages/superhero/SuperheroPage';

import './root.css';

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path=":id" element={<SuperheroPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Providers>
  );
}

export default App;

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
