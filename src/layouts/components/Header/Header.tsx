import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { Link, useNavigate } from 'react-router-dom'

import styles from './Header.module.scss'
import images from '../../../assets/images'
import Button from '../../../components/Button'
import Menu from '../../../components/Menu'
import Image from '../../../components/Image'
import Search from '../Search/Search'
import config from '../../../config'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store'
import configRoutes from '../../../config'
import { interfaceMenuItem } from 'types/menu.type'
import { logoutUser } from 'pages/auth.slice'
import { logoutUserApi } from 'services/authService'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import http from 'Utils/httpRequest'
import { set } from 'lodash'

const cx = classNames.bind(styles)

console.log('images: ', images)

const MENU = [
  {
    icon: images.iconLanguage,
    title: 'Language',
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English'
        },
        {
          type: 'language',
          code: 'vn',
          title: 'Việt Nam'
        }
      ]
    }
  },
  {
    icon: images.feedback,
    title: 'Feedback and help',
    to: '/'
  }
]

function Header() {
  const currentUser = useSelector((state: RootState) => state.auth.user)
  const [quantityInvoices, setQuantityInvoices] = useState<number>(0)
  const [checkColor, setCheckColor] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  //handleLogic
  const handleMenuChange = async (menuItem: interfaceMenuItem) => {
    console.log(menuItem)
    if (menuItem.to === configRoutes.routes.logout) {
      try {
        await logoutUserApi()
        dispatch(logoutUser())
        navigate(configRoutes.routes.home)
      } catch (error: any) {
        toast.error(error.message)
      }
    }
  }

  const groupId = currentUser.groupWithRoles.id
  let userMenu: any = []

  if (groupId === 3 || groupId === 2) {
    userMenu = [
      {
        icon: images.iconViewProfile,
        title: 'View profile',
        to: configRoutes.routes.viewprofile
      },
      {
        icon: images.iconSettings,
        title: 'Settings',
        to: configRoutes.routes.settings
      },
      ...MENU,
      {
        icon: images.iconViewProfile,
        title: 'Admin page',
        to: configRoutes.routes.user
      },
      {
        icon: images.iconLogout,
        title: 'Log out',
        to: configRoutes.routes.logout,
        separate: true
      }
    ]
  } else {
    userMenu = [
      {
        icon: images.iconViewProfile,
        title: 'View profile',
        to: configRoutes.routes.viewprofile
      },
      {
        icon: images.iconSettings,
        title: 'Settings',
        to: configRoutes.routes.settings
      },
      ...MENU,
      {
        icon: images.iconLogout,
        title: 'Log out',
        to: configRoutes.routes.logout,
        separate: true
      }
    ]
  }

  useEffect(() => {
    http
      .get('invoice/quantity-by-user')
      .then((res) => {
        setQuantityInvoices(res.data.length)
        setCheckColor(res.data.check)
      })
      .catch((error) => {
        console.log('error: ', error)
      })
  }, [currentUser])

  return (
    <header className={cx('header_container')}>
      <div className={cx('inner', 'container')}>
        <div className={cx('navbar_logo')}>
          <Link to={config.routes.home} className={cx('logo_tiktok')}>
            <img width={'100'} height={'32'} src={images.logoMogi} alt='Mogi' />
          </Link>
        </div>
        <div className={cx('navbar_menu')}>
          {currentUser.isAuthenticated && (
            <Link to={configRoutes.routes.paymentInvoice}>
              Hóa đơn thanh toán
              <span
                className={cx('badge', 'rounded-pill', {
                  'bg-danger': checkColor,
                  'bg-success': !checkColor
                })}
              >
                {quantityInvoices}
              </span>
            </Link>
          )}
          <Link to={configRoutes.routes.danhMucPhong}>Danh mục phòng</Link>
          <Link to={configRoutes.routes.services}>Dịch vụ</Link>
          <Link to={configRoutes.routes.hoiDap}>Hỏi đáp</Link>
          <Link to={configRoutes.routes.blog}>Blogs</Link>
          {currentUser.isAuthenticated ? (
            <>
              <Menu MENU={userMenu} onChange={handleMenuChange}>
                <Image className={cx('user-avatar')} src={currentUser.avatar} />
              </Menu>
            </>
          ) : (
            <>
              <Link to={configRoutes.routes.login}>Đăng nhập</Link>
            </>
          )}
        </div>
        <div className={cx('navbar_user')}>
          <Link to={configRoutes.routes.login}>Đăng tin</Link>
        </div>

        {/* {Phần html dư} */}
        <div className={cx('actions')}>
          {currentUser.isAuthenticated ? (
            <>
              {/* <Menu MENU={userMenu} onChange={handleMenuChange}>
                <Image
                  className={cx('user-avatar')}
                  src='https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7249758373889015813~c5_720x720.jpeg?lk3s=a5d48078&x-expires=1708610400&x-signature=gbvIaXsUDWGjTp31%2Fz3pWXLiIpM%3D'
                />
              </Menu> */}
            </>
          ) : (
            <>
              {/* <Menu MENU={MENU} onChange={handleMenuChange}>
                <button className={cx('more-btn')}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
              </Menu> */}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
export default Header
