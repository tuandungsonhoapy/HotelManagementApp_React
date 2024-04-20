import classNames from 'classnames/bind'
import styles from './SemiLayout.module.scss'
import Footer from 'layouts/components/Footer'
import { DefaultLayoutProps } from 'interfaces/layout.interface'

const cx = classNames.bind(styles)

const SemiLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className={cx('wrap-defaultLayout')}>
      <div className={cx('container_content')}>{children}</div>
      <Footer />
    </div>
  )
}

export default SemiLayout
