import classNames from 'classnames/bind'

import styles from './UserManagementPage.module.scss'

const cx = classNames.bind(styles)

const UserManagementPage = () => {
  return (
    <div className={cx('UserManagementPage_container')}>
      <div>This is a user management page!</div>
    </div>
  )
}

export default UserManagementPage
