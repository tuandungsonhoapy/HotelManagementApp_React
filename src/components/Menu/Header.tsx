import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'

import styles from './Menu.module.scss'
import Image from 'components/Image'

const cx = classNames.bind(styles)

interface propsHeader {
  title?: string
  onBack?: React.MouseEventHandler<HTMLButtonElement> | undefined
  src?: any
  username?: any
}

const Header = ({ title, onBack, src, username }: propsHeader) => {
  console.log('>>>>>>>>>>>>>. src: ', src)
  return (
    <header className={cx('header')}>
      <button className={cx('back-btn')} onClick={onBack}>
        {!src ? (
          <>
            <FontAwesomeIcon icon={faChevronLeft} />
          </>
        ) : (
          <>
            <Image className={cx('logo-userLogin')} src={src} alt='userLogin' />
          </>
        )}
      </button>
      {title && <h5 className={cx('header-title')}>{title}</h5>}
      {username && <h6 className={cx('header-userLogin')}>{username}</h6>}
    </header>
  )
}

export default Header
