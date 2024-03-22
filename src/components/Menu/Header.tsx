import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'

import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

interface propsHeader {
  title: string
  onBack: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const Header = ({ title, onBack }: propsHeader) => {
  return (
    <header className={cx('header')}>
      <button className={cx('back-btn')} onClick={onBack}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h5 className={cx('header-title')}>{title}</h5>
    </header>
  )
}

export default Header
