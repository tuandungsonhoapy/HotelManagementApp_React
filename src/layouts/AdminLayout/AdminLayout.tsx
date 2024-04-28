import classNames from 'classnames/bind'
import Header from 'layouts/components/Header'
import styles from './AdminLayout.module.scss'
import AdminFooter from 'layouts/components/AdminFooter'
import AdminSidebar from 'layouts/components/AdminSidebar'
import { DefaultLayoutProps } from 'interfaces/layout.interface'

const cx = classNames.bind(styles)

const AdminLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className={cx('wrap-defaultLayout')}>
      <Header />
      <AdminSidebar />
      <div className={cx('container_content')}>{children}</div>
      <AdminFooter />
    </div>
  )
}

export default AdminLayout
