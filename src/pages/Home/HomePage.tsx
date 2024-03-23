import classNames from 'classnames/bind'
import styles from './HomePage.module.scss'

const cx = classNames.bind(styles)

function HomePage(props: any) {
  return (
    <div className={cx('homePage_container')}>
      This is Home Page!
      <div className='btn btn-primary'>
        <button>Bootstrap</button>
      </div>
    </div>
  )
}

export default HomePage
