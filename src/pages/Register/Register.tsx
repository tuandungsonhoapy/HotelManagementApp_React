import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'

import styles from './Register.module.scss'
import { defaultFormRegister } from 'constants/register'
import { useRef, useState } from 'react'
import { interfaceRegister } from 'types/register.type'
import http from 'Utils/httpRequest'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)

interface formError {
  email: boolean
  password: boolean
  confirmPassword: boolean
  username: boolean
  address: boolean
  phone: boolean
}

const defaultError: formError = {
  email: false,
  password: false,
  confirmPassword: false,
  username: false,
  address: false,
  phone: false
}

const Register = () => {
  const navigate = useNavigate()
  const [formRegister, setFormRegister] = useState<interfaceRegister>(defaultFormRegister)
  const [formError, setFormError] = useState<formError>(defaultError)

  const resultError = useRef(false)

  const validateFormRegister = () => {
    setFormError(defaultError)
    resultError.current = false
    if (!formRegister.email) {
      setFormError((prev) => ({ ...prev, email: true, result: true }))
      resultError.current = true
    }
    if (!formRegister.password) {
      setFormError((prev) => ({ ...prev, password: true, result: true }))
      resultError.current = true
    }
    if (!formRegister.username) {
      setFormError((prev) => ({ ...prev, username: true, result: true }))
      resultError.current = true
    }
    if (!formRegister.address) {
      setFormError((prev) => ({ ...prev, address: true, result: true }))
      resultError.current = true
    }
    if (!formRegister.phone) {
      setFormError((prev) => ({ ...prev, phone: true, result: true }))
      resultError.current = true
    }
    if (formRegister.password !== formRegister.confirmPassword) {
      setFormError((prev) => ({ ...prev, confirmPassword: true, result: true }))
      resultError.current = true
    }
    if (resultError.current === true) return false
    return true
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const handleRegister = () => {
    let check = validateFormRegister()
    if (check === true) {
      http
        .post('register', {
          email: formRegister.email,
          password: formRegister.password,
          username: formRegister.username,
          phone: formRegister.phone,
          address: formRegister.address
        })
        .then((response: any) => {
          console.log(response)
        })
        .catch((error: any) => {
          toast.error('Register failed!')
        })
    }
  }

  return (
    <div className={cx('register_container', 'mt-3')}>
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
            <div className={cx('form-group', 'col-12')}>
              <label>Email:</label>
              <input
                className={formError.email ? cx('form-control', 'is-invalid') : cx('form-control')}
                type='email'
                placeholder='Enter your username...'
                value={formRegister.email}
                onChange={(e) => setFormRegister({ ...formRegister, email: e.target.value })}
              />
            </div>
            <div className={cx('form-group', 'col-12')}>
              <label>Password:</label>
              <input
                className={formError.password ? cx('form-control', 'is-invalid') : cx('form-control')}
                type='password'
                placeholder='Enter your password...'
                value={formRegister.password}
                onChange={(e) => setFormRegister({ ...formRegister, password: e.target.value })}
              />
            </div>
            <div className={cx('form-group', 'col-12')}>
              <label>Re-enter Password:</label>
              <input
                className={formError.confirmPassword ? cx('form-control', 'is-invalid') : cx('form-control')}
                type='password'
                placeholder='Re-enter your password...'
                value={formRegister.confirmPassword}
                onChange={(e) => setFormRegister({ ...formRegister, confirmPassword: e.target.value })}
              />
            </div>
            <div className={cx('form-group', 'col-12')}>
              <label>Username:</label>
              <input
                className={formError.username ? cx('form-control', 'is-invalid') : cx('form-control')}
                type='text'
                placeholder='Enter username...'
                value={formRegister.username}
                onChange={(e) => setFormRegister({ ...formRegister, username: e.target.value })}
              />
            </div>
            <div className={cx('form-group', 'col-12')}>
              <label>Address:</label>
              <input
                className={formError.address ? cx('form-control', 'is-invalid') : cx('form-control')}
                type='text'
                placeholder='Enter address...'
                value={formRegister.address}
                onChange={(e) => setFormRegister({ ...formRegister, address: e.target.value })}
              />
            </div>
            <div className={cx('form-group', 'col-12')}>
              <label>PhoneNumber:</label>
              <input
                className={formError.phone ? cx('form-control', 'is-invalid') : cx('form-control')}
                type='text'
                placeholder='Enter your phone number...'
                value={formRegister.phone}
                onChange={(e) => setFormRegister({ ...formRegister, phone: e.target.value })}
              />
            </div>
            <button className={cx('btn', 'btn-primary', 'col-6', 'col-sm-6')} onClick={handleRegister}>
              Register
            </button>
            <hr />
            <button className={cx('btn', 'btn-success', 'col-6', 'col-sm-6')} onClick={handleLogin}>
              Already've an account. Login!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
