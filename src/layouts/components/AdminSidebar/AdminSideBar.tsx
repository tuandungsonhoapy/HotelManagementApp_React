import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './AdminSideBar.module.scss'
import routesConfig from '../../../config'

const cx = classNames.bind(styles)

const AdminSidebar = () => {
  return (
    <div className={cx('sidebar')}>
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <Link to={routesConfig.routes.user}>Quản lý tài khoản</Link>
        </li>
        <li>
          <Link to={routesConfig.routes.roomManagement}>Quản lý phòng</Link>
        </li>
        <li>
          <Link to={routesConfig.routes.invoiceManagement}>Quản lý hóa đơn</Link>
        </li>
        {/* <li>
          <Link to='/manage-employees'>Quản lý nhân viên</Link>
        </li> */}
        <li>
          <Link to={routesConfig.routes.serviceManagement}>Quản lý dịch vụ</Link>
        </li>
      </ul>
    </div>
  )
}

export default AdminSidebar
