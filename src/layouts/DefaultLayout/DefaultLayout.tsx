import classNames from 'classnames/bind'
import Header from 'layouts/components/Header'
import styles from './DefaultLayout.module.scss'
import Footer from 'layouts/components/Footer'
import { DefaultLayoutProps } from 'interfaces/layout.interface'

const cx = classNames.bind(styles)

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className={cx('wrap-defaultLayout')}>
      <Header />
      <div className={cx('container_content')}>{children}</div>
      <Footer />
    </div>
  )
}

export default DefaultLayout
