import classNames from 'classnames/bind'
import { Link, useNavigate } from 'react-router-dom'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import images from 'assets/images'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

//Type response
interface dataResponse {
  message: string
  code: number
  data: any
}

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
  ho: boolean
  ten: boolean
  username: boolean
  password: boolean
  phone: boolean
}

const defaultError: formErrorRegister = {
  ho: false,
  ten: false,
  username: false,
  password: false,
  phone: false
}

const Login = () => {
  const navigate = useNavigate()
  const currentUser = useSelector((state: RootState) => state.auth.user.isAuthenticated)
  const [showTab, setShowTab] = useState('logIn')
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
        .then((response) => {
          if (response.status === 200 && response.data.code === 0) {
            disPatch(LoginUserAction(response.data.data))
            navigate(configRoutes.routes.home)
          }
          if (response.status === 200 && response.data.code !== 0) toast.error(response.data.message)
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
                  <input className={cx('form-control', 'input_username')} type='text' />
                </div>
                <div className={cx('div-group', 'form-group', 'password')}>
                  <input className={cx('form-control', 'input_password')} type='password' />
                </div>
                <div className={cx('form-btn-login')}>
                  <div className={cx('div-group', 'form-group')}>
                    <button className={cx('_btn', '_btn-primary')}>Đăng nhập</button>
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
                  <input placeholder='Họ' className={cx('form-control', 'input_Ho')} type='text' />
                  <input placeholder='Tên' className={cx('form-control', 'input_Ten')} type='text' />
                </div>
                <div className={cx('div-group', 'form-group')}>
                  <input placeholder='Tên đăng nhập' className={cx('form-control', 'input_username')} type='text' />
                </div>
                <div className={cx('div-group', 'form-group', 'password')}>
                  <input placeholder='Mật khẩu' className={cx('form-control', 'input_password')} type='password' />
                </div>
                <div className={cx('div-group', 'form-group', 'password')}>
                  <input placeholder='Số điện thoại' className={cx('form-control', 'input_phone')} type='text' />
                </div>
                <div className={cx('form-btn-login')}>
                  <div className={cx('div-group', 'form-group')}>
                    <button className={cx('_btn', '_btn-primary')}>
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
