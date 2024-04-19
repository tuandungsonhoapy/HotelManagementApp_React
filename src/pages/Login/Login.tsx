import classNames from 'classnames/bind'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import styles from './Login.module.scss'
import { toast } from 'react-toastify'
import configRoutes from '../../config'
import { RootState, useAppDispatch } from 'store'
import {
  register,
  setConfirmPassword,
  setFirstNameRegister,
  setLastNameRegister,
  setPasswordRegister,
  setPhoneRegister,
  setUsernameRegister,
  login,
  setUsernameLogin,
  setPasswordLogin
} from 'pages/auth.slice'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import images from 'assets/images'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { dataResponse } from 'types/auth.type'

const cx = classNames.bind(styles)

//Type formErrorLogin
interface formErrorLogin {
  username: boolean
  password: boolean
}

const defaultFormErrorLogin: formErrorLogin = {
  username: false,
  password: false
}

//Type formErrorRegister
interface formErrorRegister {
  firstName: boolean
  lastName: boolean
  username: boolean
  password: boolean
  confirmPassword: boolean
  phone: boolean
}

const defaultErrorRegister: formErrorRegister = {
  firstName: false,
  lastName: false,
  username: false,
  password: false,
  confirmPassword: false,
  phone: false
}

const Login = () => {
  const navigate = useNavigate()
  const authentication = useSelector((state: RootState) => state.auth)
  const [showTab, setShowTab] = useState('logIn')
  const [formErrorLogin, setFormErrorLogin] = useState<formErrorLogin>(defaultFormErrorLogin)
  const [formErrorRegister, setFormErrorRegister] = useState<formErrorRegister>(defaultErrorRegister)

  //Kết quả kiểm tra form login người dùng nhập có lỗi không
  const resultErrorInput = useRef(false)

  //action of Redux
  const disPatch = useAppDispatch()

  const handleCreateNewAccount = () => {
    navigate(configRoutes.routes.register)
  }

  const formRegister = authentication.registerInfo

  const validateFormRegister = () => {
    setFormErrorRegister(defaultErrorRegister)
    resultErrorInput.current = false
    if (!formRegister.firstName) {
      setFormErrorRegister((prev) => ({ ...prev, firstName: true }))
      resultErrorInput.current = true
      toast.error('Vui lòng nhập họ của bạn!')
    }
    if (!formRegister.lastName) {
      setFormErrorRegister((prev) => ({ ...prev, lastName: true }))
      resultErrorInput.current = true
      toast.error('Vui lòng nhập tên của bạn!')
    }
    if (!formRegister.username) {
      setFormErrorRegister((prev) => ({ ...prev, username: true }))
      resultErrorInput.current = true
      toast.error('Vui lòng nhập tài khoản!')
    }
    if (!formRegister.password) {
      setFormErrorRegister((prev) => ({ ...prev, password: true }))
      resultErrorInput.current = true
      toast.error('Vui lòng nhập mật khẩu!')
    }
    if (formRegister.password.length < 6 && formRegister.password.length > 0) {
      setFormErrorRegister((prev) => ({ ...prev, password: true }))
      resultErrorInput.current = true
      toast.error('Vui lòng nhập mật khẩu ít nhất 6 ký tự!')
    }
    if (!formRegister.phone) {
      setFormErrorRegister((prev) => ({ ...prev, phone: true }))
      resultErrorInput.current = true
      toast.error('Vui lòng nhập số điện thoại!')
    }
    if (formRegister.password !== formRegister.confirmPassword) {
      setFormErrorRegister((prev) => ({ ...prev, confirmPassword: true }))
      resultErrorInput.current = true
      toast.error('Mật khẩu xác nhận không chính xác!')
    }
    if (resultErrorInput.current === true) return false
    return true
  }

  const formLogin = authentication.loginInfo

  const checkFormLogin = () => {
    resultErrorInput.current = false
    setFormErrorLogin(defaultFormErrorLogin)
    if (!formLogin.username) {
      setFormErrorLogin((prev) => ({ ...prev, username: true }))
      resultErrorInput.current = true
      toast.error('Vui lòng nhập tài khoản!')
    }
    if (!formLogin.password) {
      setFormErrorLogin((prev) => ({ ...prev, password: true }))
      resultErrorInput.current = true
      toast.error('Vui lòng nhập mật khẩu!')
    }
    if (formLogin.password.length < 6 && formLogin.password.length > 0) {
      setFormErrorLogin((prev) => ({ ...prev, password: true }))
      resultErrorInput.current = true
      toast.error('Vui lòng nhập mật khẩu ít nhất 6 ký tự!')
    }
    if (resultErrorInput.current === true) return false
    return true
  }

  //Xử lý đăng nhập
  const handleLogin = () => {
    const checkLogin = checkFormLogin()
    if (checkLogin) {
      disPatch(login(authentication.loginInfo))
        .unwrap()
        .then((response: any) => {
          if (response.status === 200 && response.code === 0) {
            navigate(configRoutes.routes.home)
          }
          if (response.status === 200 && response.code !== 0) toast.error(response.message)
        })
        .catch((error: dataResponse) => {
          toast.error(error.message)
        })
    }
  }

  //Xử lý đăng ký
  const handleRegister = () => {
    let check = validateFormRegister()
    if (check === true) {
      disPatch(register(authentication.registerInfo))
        .unwrap()
        .then((response: any) => {
          if (response.status === 200 && response.code === 0) {
            toast.success(response.message)
          }
          if (response.status === 200 && response.code !== 0) {
            toast.error(response.message)
          }
        })
        .catch((error: dataResponse) => {
          toast.error(error.message)
        })
    }
  }

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.charCode === 13) {
      handleLogin()
    }
  }

  const handlePressEnterRegister = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.charCode === 13) {
      handleRegister()
    }
  }

  useEffect(() => {
    if (authentication.user.isAuthenticated) navigate(configRoutes.routes.home)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cx('login_container')}>
      <div className={cx('login_panel')}>
        <div className={cx('login_panel_header')}>
          <div
            onClick={() => setShowTab('logIn')}
            className={showTab === 'logIn' ? cx('tab-option', 'active') : cx('tab-option')}
          >
            Đăng nhập
          </div>
          <div
            onClick={() => setShowTab('register')}
            className={showTab === 'register' ? cx('tab-option', 'active') : cx('tab-option')}
          >
            Đăng ký
          </div>
        </div>
        {showTab === 'logIn' ? (
          <div className={cx('login_panel_body', 'row')}>
            <div className={cx('content_left', 'col-md-7', 'col-sm-7')}>
              <div className={cx('login-form')}>
                <div className={cx('div-group', 'form-group')}>
                  <input
                    onKeyPress={handlePressEnter}
                    placeholder='Tên đăng nhập'
                    className={cx('form-control', 'input_username', {
                      'is-invalid': formErrorLogin.username
                    })}
                    type='text'
                    value={formLogin.username}
                    onChange={(e) => disPatch(setUsernameLogin(e.target.value))}
                  />
                </div>
                <div className={cx('div-group', 'form-group', 'password')}>
                  <input
                    onKeyPress={handlePressEnter}
                    placeholder='Mật khẩu'
                    className={cx('form-control', 'input_password', {
                      'is-invalid': formErrorLogin.password
                    })}
                    type='password'
                    value={formLogin.password}
                    onChange={(e) => disPatch(setPasswordLogin(e.target.value))}
                  />
                </div>
                <div className={cx('form-btn-login')}>
                  <div className={cx('div-group', 'form-group')}>
                    <button onClick={handleLogin} className={cx('_btn', '_btn-primary')}>
                      Đăng nhập
                    </button>
                    <Link className={cx('link-forgotpassword')} to={configRoutes.routes.forgotPassword}>
                      Quên mật khẩu
                    </Link>
                  </div>
                  <div className={cx('div-group', 'form-group')}>
                    <span>
                      Bạn chưa có tài khoản?{' '}
                      <Link className={cx('btn-link', 'btn-link-register')} to={configRoutes.routes.register}>
                        Đăng ký
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('content_right', 'col-md-5', 'col-sm-5')}>
              <div className={cx('form-group')}>
                <div className={cx('form-extend-login')}>
                  <div className={cx('btn-social', 'btn-facebook')}>
                    <div className={cx('fa')}>
                      <FontAwesomeIcon icon={faFacebook} />
                    </div>
                    <span className={cx('text-login')}>Đăng nhập bằng Facebook</span>
                  </div>
                  <div className={cx('btn-social', 'btn-google')}>
                    <span className={cx('fa')}>
                      <FontAwesomeIcon icon={faGoogle} />
                    </span>
                    <span className={cx('text-login')}>Đăng nhập bằng Google</span>
                  </div>
                  <div className={cx('btn-social', 'btn-zalo')}>
                    <span className={cx('fa')}>
                      <img src={images.logoZalo} alt='zalo' />
                    </span>
                    <span className={cx('text-login')}>Đăng nhập bằng Zalo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={cx('login_panel_body', 'row')}>
            <div className={cx('content_left', 'col-md-7', 'col-sm-7')}>
              <div className={cx('register-form')}>
                <div className={cx('div-group', 'form-group', 'password', 'form-name')}>
                  <input
                    placeholder='Họ'
                    onKeyPress={handlePressEnterRegister}
                    className={cx('form-control', 'input_Ho', {
                      'is-invalid': formErrorRegister.firstName
                    })}
                    type='text'
                    value={authentication.registerInfo.firstName}
                    onChange={(e) => disPatch(setFirstNameRegister(e.target.value))}
                  />
                  <input
                    placeholder='Tên'
                    onKeyPress={handlePressEnterRegister}
                    className={cx('form-control', 'input_Ten', {
                      'is-invalid': formErrorRegister.lastName
                    })}
                    type='text'
                    value={authentication.registerInfo.lastName}
                    onChange={(e) => disPatch(setLastNameRegister(e.target.value))}
                  />
                </div>
                <div className={cx('div-group', 'form-group')}>
                  <input
                    placeholder='Tên đăng nhập'
                    onKeyPress={handlePressEnterRegister}
                    className={cx('form-control', 'input_username', {
                      'is-invalid': formErrorRegister.username
                    })}
                    type='text'
                    value={authentication.registerInfo.username}
                    onChange={(e) => disPatch(setUsernameRegister(e.target.value))}
                  />
                </div>
                <div className={cx('div-group', 'form-group', 'password')}>
                  <input
                    placeholder='Mật khẩu'
                    onKeyPress={handlePressEnterRegister}
                    className={cx('form-control', 'input_password', {
                      'is-invalid': formErrorRegister.password
                    })}
                    type='password'
                    value={authentication.registerInfo.password}
                    onChange={(e) => disPatch(setPasswordRegister(e.target.value))}
                  />
                </div>
                <div className={cx('div-group', 'form-group', 'password')}>
                  <input
                    onKeyPress={handlePressEnterRegister}
                    placeholder='Xác nhận mật khẩu'
                    className={cx('form-control', 'input_password', {
                      'is-invalid': formErrorRegister.confirmPassword
                    })}
                    type='password'
                    value={authentication.registerInfo.confirmPassword}
                    onChange={(e) => disPatch(setConfirmPassword(e.target.value))}
                  />
                </div>
                <div className={cx('div-group', 'form-group', 'password')}>
                  <input
                    placeholder='Số điện thoại'
                    className={cx('form-control', 'input_phone', {
                      'is-invalid': formErrorRegister.phone
                    })}
                    onKeyPress={handlePressEnterRegister}
                    type='text'
                    value={authentication.registerInfo.phone}
                    onChange={(e) => disPatch(setPhoneRegister(e.target.value))}
                  />
                </div>
                <div className={cx('form-btn-login')}>
                  <div className={cx('div-group', 'form-group')}>
                    <button onClick={handleRegister} className={cx('_btn', '_btn-primary')}>
                      Tiếp tục{' '}
                      <span>
                        <FontAwesomeIcon className={cx('icon_continue')} icon={faArrowRight} />
                      </span>
                    </button>
                  </div>
                  <div className={cx('div-group', 'form-group')}>
                    <span>
                      Bạn đã có tài khoản?{' '}
                      <Link className={cx('btn-link', 'btn-link-register')} to={configRoutes.routes.login}>
                        Đăng nhập
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('content_right', 'col-md-5', 'col-sm-5')}>
              <div className={cx('form-group')}>
                <div className={cx('form-extend-login')}>
                  <div className={cx('btn-social', 'btn-facebook')}>
                    <div className={cx('fa')}>
                      <FontAwesomeIcon icon={faFacebook} />
                    </div>
                    <span className={cx('text-login')}>Đăng ký bằng Facebook</span>
                  </div>
                  <div className={cx('btn-social', 'btn-google')}>
                    <span className={cx('fa')}>
                      <FontAwesomeIcon icon={faGoogle} />
                    </span>
                    <span className={cx('text-login')}>Đăng ký bằng Google</span>
                  </div>
                  <div className={cx('btn-social', 'btn-zalo')}>
                    <span className={cx('fa')}>
                      <img src={images.logoZalo} alt='zalo' />
                    </span>
                    <span className={cx('text-login')}>Đăng ký bằng Zalo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
