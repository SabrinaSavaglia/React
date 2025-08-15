import './estilo.css'
import Login from './componentes/login/Login'
import Registro from './componentes/registro/Registro'
import Dashboard from './componentes/dashboard/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router'
import NoEncontrado from './componentes/NoEncontrado/NoEncontrado'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ToastContainer } from 'react-toastify'
import "react-toastify/ReactToastify.css"

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          theme="colored"
        />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
