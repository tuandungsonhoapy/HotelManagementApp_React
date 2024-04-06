import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'
import { useLayoutEffect, useRef, useState } from 'react'

import styles from './Login.module.scss'
import { defaultFormLogin } from 'constants/register'
import { interfaceLogin } from 'types/auth.type'
import { toast } from 'react-toastify'
import { loginUser } from 'services/authService'
import configRoutes from '../../config'
import { RootState, useAppDispatch } from 'store'
import { loginUser as LoginUserAction } from 'pages/auth.slice'
import { useSelector } from 'react-redux'

const cx = classNames.bind(styles)

interface formErrorLogin {
  username: boolean
  password: boolean
}

const defaultFormErrorLogin: formErrorLogin = {
  username: false,
  password: false
}

const OldLogin = () => {
  const navigate = useNavigate()
  const currentUser = useSelector((state: RootState) => state.auth.user.isAuthenticated)
  const [formLogin, setFormLogin] = useState<interfaceLogin>(defaultFormLogin)
  const [formErrorLogin, setFormErrorLogin] = useState<formErrorLogin>(defaultFormErrorLogin)

  //Kết quả kiểm tra form login người dùng nhập có lỗi không
  const resultErrorLogin = useRef(false)

  //action of Redux
  const disPatch = useAppDispatch()

  const handleCreateNewAccount = () => {
    navigate(configRoutes.routes.register)
  }

  const checkFormLogin = () => {
    resultErrorLogin.current = false
    setFormErrorLogin(defaultFormErrorLogin)
    if (!formLogin.username) {
      setFormErrorLogin((prev) => ({ ...prev, username: true }))
      resultErrorLogin.current = true
    }
    if (!formLogin.password) {
      setFormErrorLogin((prev) => ({ ...prev, password: true }))
      resultErrorLogin.current = true
    }
    if (resultErrorLogin.current === true) return false
    return true
  }

  const handleLogin = () => {
    const checkLogin = checkFormLogin()
    if (checkLogin === false) {
      toast.error('Vui lòng nhập đầy đủ thông tin đăng nhập!')
    } else {
      loginUser(formLogin)
        .then((response: any) => {
          if (response.status === 200 && response.code === 0) {
            disPatch(LoginUserAction(response.data))
            navigate(configRoutes.routes.home)
          }
          if (response.status === 200 && response.code !== 0) toast.error(response.message)
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })
    }
  }

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.charCode === 13) {
      handleLogin()
    }
  }

  useLayoutEffect(() => {
    if (currentUser) navigate(configRoutes.routes.home)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cx('login_container', 'mt-3')}>
      <div className={cx('container')}>
        <div className={cx('row', 'px-1', 'px-sm-0')}>
          <div className={cx('content-left', 'col-7', 'd-none', 'd-sm-block')}>
            <div className={cx('brand')}>NongNghiep VN</div>
            <div className={cx('brand_detail')}>Chúng tôi cung cấp cho bạn dịch vụ thuê đất!</div>
          </div>
          <div
            className={cx(
              'content-right',
              'col-12',
              'col-sm-5',
              'd-flex',
              'flex-column',
              'gap-3',
              'align-items-center',
              'p-4'
            )}
          >
            <div className={cx('brand', 'd-sm-none')}>NongNghiep VN</div>
            <input
              className={formErrorLogin.username ? cx('form-control', 'is-invalid') : cx('form-control')}
              type='text'
              placeholder='Enter your username...'
              value={formLogin.username}
              onChange={(e) => setFormLogin({ ...formLogin, username: e.target.value })}
              onKeyPress={(e) => handlePressEnter(e)}
            />
            <input
              className={formErrorLogin.password ? cx('form-control', 'is-invalid') : cx('form-control')}
              type='password'
              placeholder='Enter your password...'
              value={formLogin.password}
              onChange={(e) => setFormLogin({ ...formLogin, password: e.target.value })}
              onKeyPress={(e) => handlePressEnter(e)}
            />
            <button className={cx('btn', 'btn-primary', 'col-6', 'col-sm-6')} onClick={handleLogin}>
              Login
            </button>
            <span className={cx('forgot-password')}>Forgot your password?</span>
            <hr />
            <button className={cx('btn', 'btn-success', 'col-6', 'col-sm-6')} onClick={handleCreateNewAccount}>
              Create new account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OldLogin
