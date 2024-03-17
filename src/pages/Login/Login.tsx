import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'

import styles from './Login.module.scss'

const cx = classNames.bind(styles)

const Login = () => {
  const navigate = useNavigate()

  const handleCreateNewAccount = () => {
    navigate('/register')
  }

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
            <input className={cx('form-control')} type='text' placeholder='Enter your username...' />
            <input className={cx('form-control')} type='password' placeholder='Enter your password...' />
            <button className={cx('btn', 'btn-primary', 'col-6', 'col-sm-4')}>Login</button>
            <span className={cx('forgot-password')}>Forgot your password?</span>
            <hr />
            <button className={cx('btn', 'btn-success', 'col-6', 'col-sm-4')} onClick={handleCreateNewAccount}>
              Create new count
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
