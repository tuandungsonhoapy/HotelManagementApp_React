import { ToastContainer, Bounce } from 'react-toastify'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import Nav from 'components/Navigation'
import AppRoutes from 'routes/AppRoutes'

function App() {
  return (
    <Router>
      <div className='App'>
        <AppRoutes />
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
          transition={Bounce}
        />
      </div>
    </Router>
  )
}

export default App
