import classNames from 'classnames/bind'
import styles from './RealEstateItem.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

interface Props {
  item?: any
}

const RealEstateItem = ({ item }: Props) => (
  <div className={cx('property-item')}>
    <img
      src='https://cloud.mogi.vn/images/thumb-small/2024/03/01/540/fd592788ee2e41b7b0d861daea7308e3.jpg'
      alt='mpgi'
    />
    <Link to={'#'}>
      <h3 className={cx('property-title')}>Căn hộ Mt Phạm Thế Hiển 850tr/2PN,Sổ riêng,cho góp dài 0%ls O93ZZO3848</h3>
    </Link>
    <div className={cx('property-attr')}>
      <span className={cx('land')}>
        45 m<sup>2</sup>
      </span>
      <span>2 PN</span>
      <span>2 WC</span>
    </div>
    <div className={cx('price')}>850 triệu</div>
  </div>
)

export default RealEstateItem
