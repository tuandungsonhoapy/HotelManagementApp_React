import { ToastContainer, Bounce } from 'react-toastify'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import { publicRoutes } from 'routes'
import Nav from 'components/Navigation'
import DefaultLayout from 'layouts/DefaultLayout'
import { Fragment } from 'react/jsx-runtime'

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component
            let Layout: any = Fragment
            if (route.layout) {
              Layout = route.layout
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          })}
        </Routes>
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
