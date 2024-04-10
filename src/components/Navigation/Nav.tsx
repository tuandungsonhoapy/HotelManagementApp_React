import { NavLink } from 'react-router-dom'
import classNames from 'classnames/bind'

import configRoutes from '../../config'
import styles from './Nav.module.scss'

const cx = classNames.bind(styles)

const Nav = () => (
  <div className={cx('topnav')}>
    <NavLink to={configRoutes.routes.home}>Home</NavLink>
    <NavLink to={configRoutes.routes.login}>Login</NavLink>
    <NavLink to={configRoutes.routes.blog}>Blogs</NavLink>
  </div>
)

export default Nav
