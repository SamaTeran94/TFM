import React, { Suspense } from 'react';
import './App.css';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

// Use React.lazy to dynamically import components
const Home = React.lazy(() => import('./routes/Home'));
const JuegoColores = React.lazy(() => import('./components/JuegoColores'));
const JuegoPreguntas = React.lazy(() => import('./components/JuegoPreguntas'));
const JuegoMemoria = React.lazy(() => import('./components/JuegoMemoria'));
const Nosotros = React.lazy(() => import('./components/Nosotros'));
const ColoresContextProvider = React.lazy(() => import('./components/ColoresContextProvider'));
const PreguntasContextProvider = React.lazy(() => import('./components/PreguntasContextProvider'));
const MemoriaContextProvider = React.lazy(() => import('./components/MemoriaContextProvider'));


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route
            index
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path='colores'
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ColoresContextProvider>
                  <JuegoColores
                  />
                </ColoresContextProvider>
              </Suspense>
            }
          />
          <Route
            path='preguntas'
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PreguntasContextProvider>
                  <JuegoPreguntas
                  />
                </PreguntasContextProvider>
              </Suspense>
            }
          />
          <Route
            path='memoria'
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <MemoriaContextProvider>
                  <JuegoMemoria
                  />
                </MemoriaContextProvider>
              </Suspense>
            }
          />
          <Route
            path='nosotros'
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Nosotros />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
