import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainPage } from '~pages/main/main-page';
import { SuperheroPage } from '~pages/superhero/superhero-page';

import { Layout } from './layout/layout';
import { Providers } from './providers/providers';
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
