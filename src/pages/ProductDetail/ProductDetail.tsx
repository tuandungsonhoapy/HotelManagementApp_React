import classNames from 'classnames/bind'
import styles from './ProductDetail.module.scss'

const cx = classNames.bind(styles)

const ProductDetail = (props: any) => (
  <div className={cx('productdetail_contaier')}>
    <div>
      <input type='text' style={{ height: '20px', border: '1px solid black' }} />
    </div>
  </div>
)

export default ProductDetail
