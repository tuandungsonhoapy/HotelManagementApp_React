import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { Link } from 'react-router-dom'

import styles from './Header.module.scss'
import images from '../../../assets/images'
import Button from '../../../components/Button'
import Menu from '../../../components/Menu'
import Image from '../../../components/Image'
import Search from '../Search/Search'
import config from '../../../config'

const cx = classNames.bind(styles)

console.log('images: ', images)

const MENU = [
  {
    icon: images.iconLanguage,
    title: 'English',
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
  const currentUser = true

  //handleLogic
  const handleMenuChange = (menuItem: any) => {
    console.log(menuItem)
  }

  const userMenu = [
    {
      icon: images.iconViewProfile,
      title: 'View profile',
      to: '/viewprofile'
    },
    {
      icon: images.iconFavorites,
      title: 'Favorites'
    },
    {
      icon: images.iconSettings,
      title: 'Settings',
      to: '/settings'
    },
    ...MENU,
    {
      icon: images.iconLogout,
      title: 'Log out',
      to: '/logout',
      separate: true
    }
  ]

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to={config.routes.home} className={cx('logo_tiktok')}>
          <img className={cx('logo_branch')} src={images.logo} alt='Tiktok' />
        </Link>
        <Search />
        <div className={cx('actions')}>
          {currentUser ? (
            <>
              {/* <Button leftIcon={<FontAwesomeIcon icon={faPlus} />} bordered>
                Upload
              </Button> */}
              <Tippy content='Giỏ hàng' placement='bottom'>
                <div className={cx('box-icon-messages')}>
                  <Link to='/cart' />
                  <FontAwesomeIcon className={cx('icon-cart-shopping')} icon={faCartShopping} />
                </div>
              </Tippy>
              {/* <Tippy content='Inbox' placement='bottom'>
                <div className={cx('box-icon-inbox')}>
                  <img src={images.iconInbox} alt='Inbox' />
                </div>
              </Tippy> */}
            </>
          ) : (
            <>
              <Button text>Upload</Button>
              <Button primary>Log in</Button>
            </>
          )}
          {currentUser ? (
            <>
              <Menu MENU={userMenu} onChange={handleMenuChange}>
                <Image
                  className={cx('user-avatar')}
                  src='https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7249758373889015813~c5_720x720.jpeg?lk3s=a5d48078&x-expires=1708610400&x-signature=gbvIaXsUDWGjTp31%2Fz3pWXLiIpM%3D'
                />
              </Menu>
            </>
          ) : (
            <>
              <Menu MENU={MENU} onChange={handleMenuChange}>
                <button className={cx('more-btn')}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
              </Menu>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
export default Header
