import { ToastContainer, Bounce } from 'react-toastify'
import { BrowserRouter as Router } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ThreeCircles } from 'react-loader-spinner'
import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'

import AppRoutes from 'routes/AppRoutes'
import { getUserAccount } from 'services/authService'
import { useEffect } from 'react'
import { RootState, useAppDispatch } from 'store'
import { setLogin } from 'pages/auth.slice'
import styles from './App.module.scss'
import { setShowPageLoading, setHiddenPageLogin } from 'pages/auth.slice'

const cx = classNames.bind(styles)

function App() {
  const isShowPageLoading = useSelector((state: RootState) => state.auth.pageLoading.isShow)

  const disPatch = useAppDispatch()

  const fetchUser = async () => {
    try {
      disPatch(setShowPageLoading())
      let data = await getUserAccount()
      if (data && data.data) {
        disPatch(setLogin(data.data))
      }
      disPatch(setHiddenPageLogin())
    } catch (error) {
      disPatch(setHiddenPageLogin())
    }
  }

  useEffect(() => {
    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      <div className='App'>
        {isShowPageLoading ? (
          <div className={cx('pageLoading_container')}>
            <ThreeCircles
              visible={true}
              height='100'
              width='100'
              color='#4fa94d'
              ariaLabel='three-circles-loading'
              wrapperStyle={{}}
              wrapperClass=''
            />
            <div>Loading data...</div>
          </div>
        ) : (
          <AppRoutes />
        )}

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
