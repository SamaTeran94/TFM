import './App.css';
import './index.css';
import JuegoColores from './components/JuegoColores';
import JuegoPreguntas from './components/JuegoPreguntas';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import JuegoMemoria from './components/JuegoMemoria';
import Navbar from './components/Navbar';
import ColoresContextProvider from './components/ColoresContextProvider.jsx'
import PreguntasContextProvider from './components/PreguntasContextProvider';
import MemoriaContextProvider from './components/MemoriaContextProvider';

function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Home />} />
          <Route
            path='colores'
            element={
              <ColoresContextProvider>
                <JuegoColores
                />
              </ColoresContextProvider>
            }
          />
          <Route
            path='preguntas'
            element={
              <PreguntasContextProvider>
                <JuegoPreguntas
                />
              </PreguntasContextProvider>
            }
          />
          <Route path='memoria'
            element={
              <MemoriaContextProvider>
                <JuegoMemoria
                />
              </MemoriaContextProvider>
            }
          />
        </Route>
      </Routes>

    </>
  );
}

export default App;
